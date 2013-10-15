//Add this view to the figure type registry
OsciTk.views.figureTypeRegistry["default"] = "MultiColumnFigure";

OsciTk.views.MultiColumnFigure = OsciTk.views.BaseView.extend({
	tagName: 'figure',
	template: OsciTk.templateManager.get('multi-column-figure'),
	initialize: function(options) {
		this.options = options;
		//set some defaults
		this.layoutComplete = false;
		this.contentRendered = false;
		this.sizeCalculated = false;
		this.calculatedHeight = 0;
		this.calculatedWidth = 0;
		this.position = {x:[0,0], y:[0,0]};

		this.$el.attr("id", this.model.get("id"));
		this.$el.addClass(this.model.get("type"));

		this.listenTo(Backbone, 'pageChanged', this.toggleVisibility);
	},
	events: {
		"click .figure_content" : "fullscreen"
	},
	toggleVisibility: function(data) {
		if (this.parent.options.pageNumber === data.page) {
			if (!this.contentRendered) {
				this.renderContent();
			}

			this.$el.css("visibility", "visible");
		} else {
			this.$el.css("visibility", "hidden");
		}
	},
	render: function() {
		//template the element
		this.$el.html(this.template(this.model.toJSON()));

		//calculate the size based on layout hints
		this.sizeElement();

		//position the element on the page
		var isPositioned = this.positionElement();

		if (isPositioned) {
			this.layoutComplete = true;
		}

		return this;
	},
	renderContent: function() {
		this.$el.find(".figure_content").html(this.model.get('content'));

		this.contentRendered = true;
	},
	fullscreen: function() {
		$.fancybox.open({
			content: this.model.get('content')
		});
	},
	positionElement: function() {
		var modelData = this.model.toJSON();
		var dimensions = this.options.sectionDimensions;

		//if element shouold not be visible on the page, hide it and return
		if (modelData.position.vertical === "n") {
			this.$el.hide();
			return true;
		}

		var column;
		var currentColumn = this.parent.getCurrentColumn();
		if (currentColumn === null) {
			currentColumn = this.parent.processingData.columns[this.parent.processingData.currentColumn];
		}
		//Detemine the start column based on the layout hint
		switch (modelData.position.horizontal) {
			//right
			case 'r':
				column = dimensions.columnsPerPage - 1;
				break;
			//left & fullpage
			case 'l':
			case 'p':
				column = 0;
				break;
			//In the current column
			//case 'i':
			default:
				//load the current column to make sure we get the correct one
				column = currentColumn.pageColumnNum;
		}

		var positioned = false;
		var numColumns = this.model.get('calculatedColumns');
		var offsetLeft = 0;
		var offsetTop = 0;
		var maxPositionAttemps = Math.ceil(dimensions.columnsPerPage / numColumns);
		if (modelData.position.horizontal === 'i') {
			maxPositionAttemps = this.parent.processingData.columns.length;
		}
		var positionAttempt = 0;
		var pageFigures = this.parent.getChildViewsByType('figure');
		var numPageFigures = pageFigures.length;

		//Detemine the left offset start column and width of the figure
		if ((column + numColumns) > dimensions.columnsPerPage) {
			column -= (column + numColumns) - dimensions.columnsPerPage;
		}

		whilePositioned:
		while (!positioned && positionAttempt <= maxPositionAttemps) {
			positionAttempt++;

			//If the figure is not as wide as the available space, center it
			var availableWidth = 0;
			if (modelData.position.horizontal === "p" || dimensions.columnsPerPage === 1) {
				availableWidth = dimensions.outerSectionWidth;
			} else {
				availableWidth = (dimensions.columnWidth * numColumns) + ((numColumns + 1) * dimensions.gutterWidth);
			}

			var addLeftPadding = 0;
			if (this.calculatedWidth < availableWidth && availableWidth <= dimensions.outerSectionWidth) {
				addLeftPadding = Math.floor((availableWidth - this.calculatedWidth) / 2);
			}

			var gutters = currentColumn.pageColumnNum;
			offsetLeft = (currentColumn.pageColumnNum * dimensions.columnWidth) + (gutters * dimensions.gutterWidth) + addLeftPadding;

			//Determine the top offset based on the layout hint
			switch (modelData.position.vertical) {
				//top & fullpage
				case 't':
				case 'p':
					offsetTop = 0;
					break;
				//bottom
				case 'b':
					offsetTop = dimensions.innerSectionHeight - this.calculatedHeight;
					break;
				//case inline
				case 'i':
					offsetTop = currentColumn.position.top + currentColumn.height - currentColumn.heightRemain;
					break;
			}

			//set the offsets
			this.$el.css({
				'top': offsetTop + 'px',
				'left': offsetLeft + 'px'
			});

			var figureX = [offsetLeft, offsetLeft + this.calculatedWidth];
			var figureY = [offsetTop, offsetTop + this.calculatedHeight];
			this.position = {
				x : figureX,
				y : figureY
			};

			positioned = true;

			if (offsetLeft < 0 || figureX[1] > dimensions.outerSectionWidth || figureY[1] > dimensions.outerSectionHeight) {
				positioned = false;
			}

			//check if current placement overlaps any other figures
			if (positioned && numPageFigures && numPageFigures > 1) {
				for (i = 0; i < numPageFigures; i++) {
					if (pageFigures[i].cid === this.cid) {
						continue;
					}

					var elemX = pageFigures[i].position.x;
					var elemY = pageFigures[i].position.y;

					if (figureX[0] < elemX[1] && figureX[1] > elemX[0] &&
						figureY[0] < elemY[1] && figureY[1] > elemY[0]
					) {
						positioned = false;
						break;
					}
				}
			}

			if (!positioned) {
				//adjust the start column to see if the figure can be positioned on the page
				switch (modelData.position.horizontal) {
					//right
					case 'r':
						column--;
						if (column < 0) {
							break whilePositioned;
						}
						break;
					//left & fullpage
					case 'l':
					case 'p':
						column++;
						if (column >= dimensions.columnsPerPage) {
							break whilePositioned;
						}
						break;
					//no horizontal position
					default:
						column++;
						if (column >= dimensions.columnsPerPage) {
							column = 0;
						}
				}

				//update the currentColumn
				if (modelData.position.horizontal === 'i') {
					currentColumn = this.parent.processingData.columns[column];
				} else {
					if ((column + numColumns) > dimensions.columnsPerPage) {
						column -= (column + numColumns) - dimensions.columnsPerPage;
					}
					currentColumn = _find(this.parent.processingData.columns, function(col) {
						return col.pageColumnNum === column;
					});
				}
			}
		}

		if (maxPositionAttemps === positionAttempt && dimensions.columnsPerPage === 1) {
			positioned = true;
		}

		return positioned;
	},
	sizeElement: function() {
		var width, height;
		var dimensions = this.options.sectionDimensions;
		var modelData = this.model.toJSON();

		//Only process size data if figure will be displayed
		if (modelData.position === "n") {
			this.calculatedHeight = this.$el.height();
			this.calculatedWidth = this.$el.width();
			return this;
		}

		//If a percentage based width hint is specified, convert to number of columns to cover
		if (typeof(modelData.columns) === 'string' && modelData.columns.indexOf("%") > 0) {
			modelData.columns = Math.ceil((parseInt(modelData.columns, 10) / 100) * dimensions.columnsPerPage);
		}

		//for plate images set width to full page
		if (modelData.position.horizontal === 'p') {
			modelData.columns = dimensions.columnsPerPage;
		}

		//Calculate maximum width for a figure
		if (modelData.columns > dimensions.columnsPerPage || modelData.position === 'p') {
			width = dimensions.innerSectionWidth;
			modelData.columns = dimensions.columnsPerPage;
		} else {
			width = (modelData.columns * dimensions.columnWidth) + (dimensions.gutterWidth * (modelData.columns - 1));
		}
		width = Math.floor(width);
		this.$el.css("width", width + "px");

		//Get the height of the caption
		var captionHeight = this.$el.find("figcaption").outerHeight(true);

		//Calculate height of figure plus the caption
		height = (width / modelData.aspect) + captionHeight;

		//If the height of the figure is greater than the page height, scale it down
		if (height > dimensions.innerSectionHeight) {
			height = dimensions.innerSectionHeight;

			//set new width and the new column coverage number
			width = (height - captionHeight) * modelData.aspect;
			this.$el.css("width", width + "px");

			//update caption height at new width
			captionHeight = this.$el.find("figcaption").outerHeight(true);

			//update column coverage
			modelData.columns = Math.ceil((width + dimensions.gutterWidth) / (dimensions.gutterWidth + dimensions.columnWidth));
		}

		//dont use partial pixels
		width = Math.floor(width);
		height = Math.floor(height);

		this.$el.css({ height : height + "px", width : width + "px"});

		this.calculatedHeight = height;
		this.calculatedWidth = width;

		//update model number of columns based on calculations
		this.model.set('calculatedColumns', modelData.columns);

		//Set the size of the figure content div inside the actual figure element
		this.$el.find('.figure_content').css({
			width : width,
			height : height - captionHeight
		});

		this.sizeCalculated = true;
		return this;
	}
});
