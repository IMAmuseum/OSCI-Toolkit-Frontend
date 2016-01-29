OsciTk.views.Toc = OsciTk.views.BaseView.extend({
	className: 'toc-view',
	template: OsciTk.templateManager.get('toc'),
	events: {
		'click li a': 'itemClick',
		'click #dismiss': 'closeOverlay',
	},
	initialize: function() {
		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});
	},
	render: function() {
		this.$el.html(this.template({
			items: app.collections.navigationItems.where({depth: 0})
		}));

        // Remove overlay if there is a click outside it
        // $('html').one() wrapper that rebinds until success
        var that = this;
        var selfbound = function(e) {
            $target = $(e.target);
            $exclude = that.$el.find('.panel');
            // If the two DOM elements are not the same...
            if( $target.get(0) !== $exclude.get(0) ) {
                // If the target is not a descendant of the panel...
                if( $exclude.find($target).length < 1  ) {
                	that.closeOverlay();
                }else{
                    $('html').one('click', selfbound );
                }
            }
        };

        $('html').one('click', selfbound );
		
		return this;
	},
	itemClick: function(event) {
		event.preventDefault();

		var sectionId = $(event.currentTarget).attr('data-section-id');
		$('li.tocView-toolbar-item>a').removeClass('active');
		Backbone.trigger("toolbarRemoveViews");
		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});
	},
	closeOverlay: function() {
		Backbone.trigger("toolbarRemoveViews");
	}
});
