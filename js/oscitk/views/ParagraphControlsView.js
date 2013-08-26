OsciTk.views.ParagraphControlsView = OsciTk.views.BaseView.extend({
    className: 'paragraph-controls',

    initialize: function(options) {
        this.options = options;
        this.options.paragraphNumber = this.options.content.data("paragraph_number");
        this.options.contentIdentifier = this.options.content.data("osci_content_id");
        this.options.linkItems = app.config.get('paragraphControls');

        if (this.options.linkItems) {
            this.render();

            this.listenTo(Backbone, "paragraphClicked", function(data) {
                var pNum = data.paragraphNumber;
                if (this.options.paragraphNumber === pNum) {
                    var tip = this.$el.qtip("api");
                    if (tip.rendered === false) {
                        tip.show();
                    } else {
                        tip.toggle();
                    }
                }
            });
        }
    },
    events: {
        'click a': 'clicked'
    },
    clicked: function(e) {
        e.preventDefault();
        var evt = $(e.target).data('event');
        Backbone.trigger(evt, {contentId: this.options.contentIdentifier});
    },
    render: function() {
        var contentPosition = this.options.content.position();

        this.$el.attr('data-osci_content_id', this.options.contentIdentifier);
        this.$el.attr('data-paragraph_identifier', this.options.paragraphNumber);
        this.$el.html('<span class="paragraph-identifier paragraph-identifier-' + this.options.paragraphNumber + '">' + (this.options.paragraphNumber) + '</span>');
        this.$el.css(this.options.position);

        //remove qtip if already present
        if(this.$el.data("qtip")) {
            this.$el.qtip("destroy", "true");
        }

        var tipContent = '';
        for(var i in this.options.linkItems) {
            var text = this.options.linkItems[i];
            tipContent += '<a href="' + i + '" data-event="' + i + '" class="' + i +'">' + text + '</a> ';
        }

        this.$el.qtip({
            position: {
                my: "left center",
                at: "right center",
                target: this.$el,
                container: this.$el,
                adjust: {
                    y: -10
                }
            },
            show: {
                'event': 'click',
                ready: false,
                solo: true
            },
            hide: {
                'event': 'unfocus click',
                fixed: true,
                delay: 500
            },
            style: {
                def: false
            },
            overwrite: false,
            content: tipContent
        });

        return this;
    }
});