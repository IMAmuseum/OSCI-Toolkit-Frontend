OsciTk.views.MultiColumnPage = OsciTk.views.Page.extend({
    initialize: function(options) {
        this._super('initialize');
        this.options = options;
        this.columnTemplate = OsciTk.templateManager.get('multi-column-column');
        this.visible = false;
        this.paragraphControlsViews = [];
    },

    onClose: function() {
        this.model = undefined;
    },

    events: {
        'click a.figure_reference': 'onFigureReferenceClicked',
        'click .content-paragraph': 'onParagraphClicked'
    },

    onFigureReferenceClicked: function(event_data) {
        var figureId = event_data.currentTarget.hash.substring(1);
        var figureView = app.views.figures[figureId];
        if (figureView && figureView.fullscreen) {
            figureView.fullscreen();
        }
        return false;
    },

    onParagraphClicked: function(e) {
        e.preventDefault();

        var p = $(e.currentTarget);
        var pNum = p.data("paragraph_number");

        Backbone.trigger("paragraphClicked", {paragraphNumber: pNum});
    },

    hide: function() {
        this.$el.css("visibility", "hidden");
        this.visible = false;
    },

    show: function() {
        this.$el.css("visibility", "visible");
        this.visible = true;
    },

    resetPage: function() {
        this.removeAllContent();

        for(var i = 0, c = this.paragraphControlsViews.length; i < c; i++) {
            this.removeView(this.paragraphControlsViews[i]);
        }
        this.paragraphControlsViews = [];

        this.$el.children(':not(figure)').remove();

        this.initializeColumns();
    },

    render : function() {
        if (this.processingData.rendered) {
            return this;
        }

        this.hide();

        //size the page to fit the view window
        this.$el.css({
            width: this.parent.dimensions.innerSectionWidth,
            height: this.parent.dimensions.innerSectionHeight
        });

        this.initializeColumns();

        //set rendered flag so that render does not get called more than once while iterating over content
        this.processingData.rendered = true;

        return this;
    },

    layoutContent : function(contentId) {
        var overflow = 'none';
        var column = this.getCurrentColumn(contentId);

        if (column === null) {
            this.processingComplete();
            overflow = 'contentOverflow';
            return overflow;
        }

        var content = $(this.getContentById(contentId));

        column.$el.append(content);

        var lineHeight = parseFloat(content.css("line-height"));
        var contentPosition = content.position();

        //If all of the content is overflowing the column remove it and move to next column
        if ((column.height - contentPosition.top) < lineHeight) {
            content.remove();
            column.heightRemain = 0;
            overflow = 'contentOverflow';
            return overflow;
        }

        var contentHeight = content.outerHeight(true);

        //If offset defined (should always be negative) add it to the height of the content to get the correct top margin
        var offset = 0;
        var columnOffset = column.offset;
        if (column.offset < 0) {
            offset = contentHeight + column.offset;

            //Set the top margin
            content.css("margin-top", "-" + offset + "px");

            //remove the offset so that all items are not shifted up
            column.offset = 0;
        }

        var contentMargin = {
            top : parseInt(content.css("margin-top"), 10),
            bottom : parseInt(content.css("margin-bottom"), 10)
        };

        //Update how much vertical height remains in the column
        var heightRemain = column.heightRemain - content.outerHeight(true);
        if (heightRemain > 0 && heightRemain < lineHeight) {
            heightRemain = 0;
        } else if (heightRemain < 0 && heightRemain >= (contentMargin.bottom * -1)) {
            heightRemain = 0;
        }

        //If we have negative height remaining, the content must be repeated in the next column
        if (heightRemain < 0) {
            //var temp = Math.floor((column.height - contentPosition.top) / lineHeight);

            var visibleLines = Math.floor((column.height - contentPosition.top) / lineHeight);
            var newHeight = (visibleLines * lineHeight) + contentPosition.top;
            var heightDiff = column.height - newHeight;

            if (heightDiff > 0) {
                //assign the new height to remove any partial lines of text
                column.height = newHeight;
                column.$el.height(newHeight + "px");

                heightRemain = heightRemain - heightDiff;
            }

            overflow = 'contentOverflow';

            if (this.processingData.currentColumn === (this.parent.dimensions.columnsPerPage - 1)) {
                this.processingComplete();
            }

            //If all of the content is overflowing the column remove it and move to next column
            if ((column.height - contentPosition.top) < lineHeight) {
                content.remove();
                this.removeContent(content.data("osci_content_id"));
                column.heightRemain = 0;
                overflow = 'contentOverflow';
                return overflow;
            }
        }

        if (heightRemain === 0 && this.processingData.currentColumn === (this.parent.dimensions.columnsPerPage - 1)) {
            this.processingComplete();
        }

        column.heightRemain = heightRemain;

        //place a paragraph number
        if (content.is("p")) {
            var paragraphNumber = content.data("paragraph_number");
            var contentIdentifier = content.data("osci_content_id");
            var pidIsOnPage = this.$el.find(".paragraph-identifier-" + paragraphNumber);

            //add a class so we can attach global events
            content.addClass("content-paragraph");

            if (pidIsOnPage.length === 0) {
                var columnPosition = column.$el.position();
                var pcv = new OsciTk.views.ParagraphControlsView({
                    content: content,
                    position: {
                        top: (columnPosition.top + contentPosition.top) + "px",
                        left: (columnPosition.left + contentPosition.left - this.parent.dimensions.gutterWidth) + "px"
                    }
                });
                this.addView(pcv);
                pcv.initializeTooltip();

                this.paragraphControlsViews.push(pcv);
            }
        }

        return overflow;
    },

    getCurrentColumn : function(contentId) {
        var currentColumn = null;
        var lineHeight = parseInt(this.$el.css("line-height"), 10);
        lineHeight = lineHeight ? lineHeight : this.parent.options.defaultLineHeight;
        var minColHeight =  lineHeight * this.parent.dimensions.minLinesPerColumn;

        if (this.processingData.columns[this.processingData.currentColumn] &&
            this.processingData.columns[this.processingData.currentColumn].height >= minColHeight &&
            this.processingData.columns[this.processingData.currentColumn].heightRemain > 0) {
            currentColumn = this.processingData.columns[this.processingData.currentColumn];
        } else {
            for(var i = 0; i < this.parent.dimensions.columnsPerPage; i++) {
                if (this.processingData.columns[i] !== undefined &&
                    this.processingData.columns[i].height >= minColHeight &&
                    this.processingData.columns[i].heightRemain > 0) {
                    currentColumn = this.processingData.columns[i];
                    this.processingData.currentColumn = i;
                    break;
                }
            }
        }

        if (currentColumn !== null && currentColumn.$el === null) {
            if (this.processingData.currentColumn > 0) {
                currentColumn.offset = this.processingData.columns[(this.processingData.currentColumn - 1)].heightRemain;
            } else {
                var pageNum = this.parent.getPageNumberForSelector("[data-osci_content_id='" + contentId + "']");
                var previousPage = this.parent.getChildViewByIndex(pageNum - 1);
                if (previousPage) {
                    currentColumn.offset = previousPage.processingData.columns[previousPage.processingData.columns.length - 1].heightRemain;
                }
            }

            var columnCss = {
                width : this.parent.dimensions.columnWidth + "px",
                height : currentColumn.height + "px",
                left : this.processingData.columns[this.processingData.currentColumn].position.left,
                top : this.processingData.columns[this.processingData.currentColumn].position.top
            };

            currentColumn.$el = $(this.columnTemplate())
                .appendTo(this.$el)
                .addClass('column-' + this.processingData.currentColumn)
                .css(columnCss);
        }

        return currentColumn;
    },

    initializeColumns: function() {
        this.processingData.columns = [];

        var pageFigures = this.getChildViewsByType('figure');
        var numPageFigures = pageFigures.length;
        var lineHeight = parseInt(this.$el.css("line-height"), 10);
        lineHeight = lineHeight ? lineHeight : this.parent.options.defaultLineHeight;
        var minColHeight =  lineHeight * this.parent.dimensions.minLinesPerColumn;

        for (var i = 0; i < this.parent.dimensions.columnsPerPage; i++) {
            var leftPosition = (i * this.parent.dimensions.columnWidth) + (this.parent.dimensions.gutterWidth * (i + 1));
            var height = this.parent.dimensions.innerSectionHeight;
            var topPosition = 0;

            var columnPosition = {
                x : [leftPosition, leftPosition + this.parent.dimensions.columnWidth],
                y : [topPosition, topPosition + height]
            };

            if (numPageFigures) {
                for (var j = 0; j < numPageFigures; j++) {

                    var elemX = pageFigures[j].position.x;
                    var elemY = pageFigures[j].position.y;

                    if (columnPosition.x[0] < elemX[1] && columnPosition.x[1] > elemX[0] &&
                        columnPosition.y[0] < elemY[1] && columnPosition.y[1] > elemY[0]
                    ) {
                        height = height - pageFigures[j].calculatedHeight - this.parent.dimensions.figureContentGutter;

                        //Adjust column top offset based on vertical location of the figure
                        switch (pageFigures[j].model.get("position").vertical) {
                            //top
                            case 't':
                            //fullpage
                            case 'p':
                                topPosition = topPosition + pageFigures[j].calculatedHeight + this.parent.dimensions.figureContentGutter;
                                break;
                            //bottom
                            case 'b':
                                topPosition = topPosition;
                                break;
                        }

                        columnPosition.y = [topPosition, topPosition + height];
                    }
                }
            }

            height = Math.floor(height);
            if (height > minColHeight) {
                this.processingData.columns.push({
                    height : height,
                    heightRemain : height > 0 ? height : 0,
                    '$el' : null,
                    offset : 0,
                    position : {
                        left : columnPosition.x[0],
                        top : columnPosition.y[0]
                    }
                });
            }
        }

        this.processingData.currentColumn = 0;
    },

    addFigure: function(figureViewInstance) {
        var figurePlaced = false;

        this.addView(figureViewInstance);

        if (!figureViewInstance.layoutComplete) {
            figureViewInstance.render();

            if (figureViewInstance.layoutComplete) {
                //figure was placed
                figurePlaced = true;
            } else {
                //figure was not placed... carryover to next page
                figurePlaced = false;
                this.removeView(figureViewInstance, false);
            }
        }

        return figurePlaced;
    }
});
