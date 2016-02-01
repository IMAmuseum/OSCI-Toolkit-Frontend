OsciTk.views.Account = OsciTk.views.BaseView.extend({
	events: {
		'click button.login': 'login',
		'click button.register': 'register',
		'click a.register': 'showRegistrationForm',
		'click a.login': 'showLoginForm',
		'click a.logout': 'logout'
	},
	className: 'account-view',
	template: null,
	initialize: function() {
		// this.listenTo(Backbone, 'accountReady', function() {

		// });
		this.model = app.account;
		this.render();
		this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
			this.sectionId = sectionModel.get('id');
		});
		
	},
	render: function() {
		// determine if user is logged in.  Show login form or user details
		if (this.model.get('id') > 0) {
			this.showProfile();
		}
		else {
			this.showLoginForm();
		}

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
	login: function() {
		// alias this for use in ajax callbacks
		var accountView = this;
		// get user/pass from form
		var username = this.$el.find('#username').val();
		var password = this.$el.find('#password').val();
		// send login request
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'login', username: username, password: password},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				if (data.success === true) {
					// user was logged in, set the returned user data
					accountView.model.set(data.user);
					accountView.showProfile();
				}
				else {
					// user was not logged in, show error
					accountView.$el.find('div.form-error').html(data.error);
				}
			}
		});
	},
	logout: function() {
		// alias this for use in ajax callback
		var accountView = this;
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'logout'},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				accountView.model.set(data.user);
				accountView.showLoginForm();
				app.account.set({'email': null});
			}
		});
	},
	register: function() {
		// alias for callbacks
		var accountView = this;
		// get user/pass from form
		var username = this.$el.find('#username').val();
		var password = this.$el.find('#password').val();
		var email = this.$el.find('#email').val();
		// send registration request
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'register', username: username, password: password, email: email},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				if (data.success === true) {
					// user was logged in, set the returned user data
					accountView.model.set(data.user);
					accountView.showProfile();
				}
				else {
					// user was not logged in, show error
					accountView.$el.find('div.form-error').html(data.error);
				}
			}
		});
	},
	showRegistrationForm: function() {
		this.template = OsciTk.templateManager.get('account-register');
		this.$el.html(this.template());
	},
	showLoginForm: function() {
		this.template = OsciTk.templateManager.get('account-login');
		this.$el.html(this.template());
	},
	showProfile: function() {
		this.template = OsciTk.templateManager.get('account-profile');
		this.$el.html(this.template(this.model.toJSON()));
	},
	closeOverlay: function() {
		Backbone.trigger("toolbarRemoveViews");
		var section = app.collections.navigationItems.get(this.section_id);
		if (section) {
			this.currentNavigationItem = app.collections.navigationItems.get(section_id);
		} else {
			this.currentNavigationItem = app.collections.navigationItems.first();
		}
		Backbone.trigger('currentNavigationItemChanged', this.currentNavigationItem);
	}
});