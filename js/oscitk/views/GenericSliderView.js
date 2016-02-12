OsciTk.views.GenericSliderView = OsciTk.views.BaseView.extend({
	
	className: 'generic-slider',

	template: OsciTk.templateManager.get('generic-slider'),

	defaults: {
			orientation: 'horizontal',
			hidden: false,
			buttonSize: 20,
			position: 0,
			verticalOffset: 0,
			horizontalOffset : 0,
			positioning : '',
			prepend: false
	},

	events: {
		'click .generic-slider-slider': 'sliderClicked',
		'click .generic-slider-prev': 'prevClicked',
		'click .generic-slider-next': 'nextClicked',
		'dblclick .generic-slider-slider': 'doubleClicked',
		'dblclick .generic-slider-prev': 'doubleClicked',
		'dblclick .generic-slider-next': 'doubleClicked',

		'dragstart .generic-slider-slider': 'startDrag',
		'dragend .generic-slider-slider': 'endDrag',

		'touchstart .generic-slider-slider': 'startDrag',
		'touchend .generic-slider-slider': 'endDrag',
		
		'mousedown .generic-slider-slider': 'startDrag',
		'mouseup .generic-slider-slider': 'endDrag',

		'blur .generic-slider-slider': 'endDrag'
	},

	initialize: function(options) {
		this.options = options;

		// The passed in 'element' element has to contain another element with the class 'slider-content', like in this example:
		// 
		//   <div id="my-slider"><div class="slider-content"></div></div>
		//   
		// where #my-slider is the div with fixed size, and .slider-content is the larger element that will slide in it.
		// To create a slider in those elements:
		// 
		//   slider = new OsciTk.views.GenericSliderView({element: this.$el.find('#my-slider')});
		//   slider.render();

		this.orientation = this.options.orientation ? this.options.orientation : this.defaults.orientation;
		this.hidden = this.options.hidden ? this.options.hidden : this.defaults.hidden;
		this.buttonSize = this.options.buttonSize ? this.options.buttonSize : this.defaults.buttonSize;
		this.position = this.options.position ? this.options.position : this.defaults.position;
		this.verticalOffset = this.options.verticalOffset ? this.options.verticalOffset : this.defaults.verticalOffset;
		this.positioning = this.options.positioning ? this.options.positioning : this.defaults.positioning;
		this.horizontalOffset = this.options.horizontalOffset ? this.options.horizontalOffset : this.defaults.horizontalOffset;
		this.prepend = this.options.prepend ? this.options.prepend : this.defaults.prepend;

		this.$el.addClass('generic-slider-' + this.orientation);

		this.containerElement = this.options.element;

		this.containerElement.css('position', 'relative');
		this.containerElement.css('overflow', 'hidden');
		this.containerElement.find('.slider-content').css('position', 'absolute');
		// this.containerElement = $(this.options.element);

		// if (this.containerElement.length > 1) {
		// 	// Only one element can be used at a time.
		// 	this.containerElement = this.containerElement.first();
		// }
		
		// Attach self to the calling parent view, if defined, adding the slider content to the container element's parent.
		if (typeof this.options.parent != 'undefined') {
		  this.options.parent.addView(this, this.containerElement.parent());
	  }
		
    this.listenTo(Backbone, "windowResized", function() {
      this.updateSlider();
    });
	},

	render: function() {
		this.$el.html(this.template());

		this.$el.parent().css('position', 'relative');
		
		if (this.orientation == 'horizontal') {
			this.$el.find('.generic-slider-prev').css('width', this.buttonSize);
			this.$el.find('.generic-slider-next').css('width', this.buttonSize);
		}
		else {			
			this.$el.find('.generic-slider-prev').css('height', this.buttonSize);
			this.$el.find('.generic-slider-next').css('height', this.buttonSize);
			if (this.verticalOffset){
				this.$el.css('top',this.verticalOffset);
			}
		}

		if (this.positioning){			
			this.$el.css(this.positioning, this.horizontalOffset);
		}

		this.updateSlider();

		thisview = this;
		this.$el.find(".head").css({"transition": "none"});
		if (this.orientation == 'vertical') {

			this.$el.find(".head").draggable({ containment: "parent", axis: "y",  scroll: false,
				drag: function() {	
					positionofheadPercent = (($(this).position().top) *100 ) / $(this).parent().height();
					myNewPos = (positionofheadPercent * ( $(this).parent().parent().parent().find('.slider-content').height() ) / 100) ;					
					$(this).parent().parent().parent().find('.slider-content').css('top', '-' + Math.floor(myNewPos) + 'px');
				}
			});

		}
		else {

			this.$el.find(".head").draggable({containment:"parent", axis: "x",  scroll: false,
				drag: function() {	
					positionofheadPercent = (($(this).position().left) *100 ) / $(this).parent().width();
					myNewPos = (positionofheadPercent * ( $(this).parent().parent().parent().find('.slider-content').width() ) / 100) ;					
					$(this).parent().parent().parent().find('.slider-content').css('left', '-' + Math.floor(myNewPos) + 'px');
				}
			});
		}

		$("body").mouseup(function() {
			thisview.endDrag();
		});

	},

	prevClicked: function (e) {
		e.preventDefault();
		
		this.newPos = this.headPos - this.headSize / 2;
		if (this.newPos < 0) {
			this.newPos = 0;
		}

		this.updatePosition(this.newPos);
	},

	nextClicked: function (e) {
		e.preventDefault();

		this.newPos = this.headPos + this.headSize / 2;
		if (this.newPos > this.sliderSize - this.headSize) {
			this.newPos = this.sliderSize - this.headSize;
		}

		this.updatePosition(this.newPos);
    
	},

	sliderClicked: function (e) {
		e.preventDefault();
		if (e.target.className != 'generic-slider-slider') {
			// The slider head caught the event.
			return;
		}

		var $target = $(e.target);
  	var target_offset = $target.offset();

		// Position the slider's middle to the clicked point.
		if (this.orientation == 'horizontal') {

			if (e.offsetX){
				var clickPos = e.offsetX;
			}
			else{
				var clickPos = e.pageX - target_offset.left;
			} 
			
	  }
	  else {
	  	if (e.offsetY){
				var clickPos = e.offsetY;
			}
			else{
				var clickPos = e.pageY - target_offset.top;
			}			
		}

		var headPos = clickPos - (this.headSize / 2);

		if (headPos < 0) {
			headPos = 0;
		}
		if (headPos > this.sliderSize - this.headSize) {
			headPos = this.sliderSize - this.headSize;
		}

		this.updatePosition(headPos);
	},

	updatePositionToContent: function (coord) {
		// Scrolls to a given pixel coordinate in the container.

		if (coord < 0) {
			coord = 0;
		}
		if (coord > this.contentSize - this.containerSize) {
			coord = this.contentSize - this.containerSize;
		}

		var coordPercentage = coord / (this.contentSize - this.containerSize)
		var headPos = (coordPercentage * (this.sliderSize - this.headSize));

		this.updatePosition(headPos);
	},

	updateSlider: function () {
		if (this.hidden) {
			this.$el.show();
			// Slider needs to be visible; otherwise .width() and .hight() do not work.
		}

		if (this.orientation == 'horizontal') {
			this.containerSize = this.containerElement.width();
			this.contentSize = this.containerElement.find('.slider-content').width();
		}
		else {
			this.containerSize = this.containerElement.height();
			this.contentSize = this.containerElement.find('.slider-content').height();
		}

		if (!this.containerSize) {
			// The slider elements are not yet visible
			return;
		}

		//this.sliderSize = this.containerSize - 2 * this.buttonSize - 4; // -4 accounts for border.
		if (this.orientation == 'horizontal') {
			this.sliderSize = this.$el.find('.generic-slider-slider').width();
		}
		else {
			this.sliderSize = this.$el.find('.generic-slider-slider').height();
		}
		this.headSize = Math.floor((this.containerSize / this.contentSize) * (this.sliderSize)); 

		if (this.headSize > this.sliderSize) {
			// Content fits the container.
			this.headSize = 0;
		}
		
		cssSliderSize =  this.sliderSize + 2; // Border

		if (this.orientation == 'horizontal') {
			// this.$el.find('.generic-slider-slider').css('width', cssSliderSize + 'px');
			this.$el.find('.generic-slider-slider .head').css('width', this.headSize + 'px');
		}
		else {
			// this.$el.find('.generic-slider-slider').css('height', cssSliderSize + 'px');
			this.$el.find('.generic-slider-slider .head').css('height', this.headSize + 'px');
		}

		this.updatePosition(0);
		this.delegateEvents();
	},

	updatePosition: function (headPos) {
		if (this.hidden) {
			this.$el.show();
		}

		if (this.contentSize <= this.containerSize || this.sliderSize == this.headSize) {
			
			this.contentPos = 0;
		}
		else {
		  this.headPos = Math.floor(headPos);

		  var headPercentage = headPos / (this.sliderSize - this.headSize)
		  this.contentPos = (headPercentage * (this.contentSize - this.containerSize));
	  }

		if (this.orientation == 'horizontal') {

			this.$el.find('.generic-slider-slider .head').css('left', this.headPos + 'px');
			this.containerElement.find('.slider-content').css('left', '-' + Math.floor(this.contentPos) + 'px');
		}
		else {

			this.$el.find('.generic-slider-slider .head').css('top', this.headPos + 'px');
			this.containerElement.find('.slider-content').css('top', '-' + Math.floor(this.contentPos) + 'px');
		}

		if (this.hidden) {
			this.$el.hide();
		}
	},

	doubleClicked: function (e) {
		// Prevent the browser from selecting content when double clicking on the slider.
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } 
    else if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
    }

    e.stopPropagation();
		e.preventDefault();
	},

  startDrag: function (e) {
		// e.stopPropagation();
		// e.preventDefault();		

		if (typeof e !== 'undefined'){
			target = $(e.target);
			target.addClass("drag-active");
		}

	},

  endDrag: function (e) {
		// e.stopPropagation();
		// e.preventDefault();		

		if (typeof e !== 'undefined'){
			target = $(e.target);
			target.removeClass("drag-active");
		}
		else{
			$('.generic-slider-slider .head').removeClass("drag-active");
		}
	}

});