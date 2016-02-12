OsciTk.views.Account = OsciTk.views.BaseView.extend({
	
	events: {
		'click button.login': 'login',
		'click button.register': 'register',
		'click a.register': 'showRegistrationForm',
		'click a.login': 'showLoginForm',
		'click a.logout': 'logout'
	},

	className: 'account-view',

    templateModal: OsciTk.templateManager.get('toolbar-modal'),
    templateLogin: OsciTk.templateManager.get('toolbar-account-login'),
    templateProfile: OsciTk.templateManager.get('toolbar-account-profile'),
    templateRegister: OsciTk.templateManager.get('toolbar-account-register'),
	
	initialize: function() {

		this.$modals = {};
		var active = 'login';

		// For accountReady, see ../../../models/AccountModel.js
		// We will trigger accountStateChanged below, e.g. on logout
		this.listenTo(Backbone, 'accountReady accountStateChanged', function( error ) {

			this.$modals = {
				login : this.prepareLogin( error ),
				profile : this.prepareProfile( error ),
				register : this.prepareRegister( error )
			};

			if( app.account.get('id') > 0 ) {
				active = 'profile';
			} else {
				active = 'login';
			}

		});

		this.listenTo(Backbone, "toolbarItemClicked", function(e) {

			console.log('hey');

			if( e.item.text === "toolbar-account" ) {

				console.log('yes');
				this.showForm( active );
			}

		});

		
	},

	modalBindings: function( $modal ) {

	},

	showForm: function( form ) {
		this.$modals[form].clone(true).modal().on('hidden.bs.modal', function() {
			$(this).data('bs.modal', null).remove();
		});

	},

	prepareLogin: function( error ) {

		var form = this.templateLogin(); 
		var modal = this.templateModal({
			title: "Login",
			body: form
		});

		var $modal = $(modal);

		if( error ) {
			$modal.find('div.form-error').html(error);
		}

		var that = this;
		$modal.find('.login').on('click', function(e) {

			// get user/pass from form
			var $form = $(this).parents('#account-form');
			var username = $form.find('#username').val();
			var password = $form.find('#password').val();

			$(this).parents('.modal').modal('hide');
			that.login( username, password );

		});

		$modal.find('.register').on('click', function(e) {

			$(this).parents('.modal').modal('hide');
			Backbone.trigger("accountStateChanged");
			that.showForm( 'register' );

		});

		// Save it for showing later
		return $modal;

	},

	prepareRegister: function( error ) {

		var form = this.templateRegister();
		var modal = this.templateModal({
			title: "Register",
			body: form
		});

		var $modal = $(modal);

		if( error ) {
			$modal.find('div.form-error').html(error);
		}

		var that = this;
		$modal.find('.register').on('click', function(e) {

			// get user/pass from form
			var $form = $(this).parents('#account-form');
			var username = $form.find('#username').val();
			var password = $form.find('#password').val();
			var email = $form.find('#email').val();

			$(this).parents('.modal').modal('hide');
			that.register( username, password, email );

		});

		$modal.find('.login').on('click', function(e) {

			$(this).parents('.modal').modal('hide');
			Backbone.trigger("accountStateChanged");
			that.showForm( 'login' );

		});

		// Save it for showing later
		return $modal;

	},

	prepareProfile: function( error ) {

		var profile = this.templateProfile({
			username: app.account.get('username'),
			email: app.account.get('email')
		});

		var modal = this.templateModal({
			title: "User Profile",
			body: profile
		});

		var $modal = $(modal);

		if( error ) {
			$modal.find('div.form-error').html(error);
		}

		var that = this;
		$modal.find('.logout').on('click', function(e) {

			$(this).parents('.modal').modal('hide');
			that.logout();

		});

		// Save it for showing later
		return $modal;

	},

	login: function( username, password ) {

		// alias this for use in ajax callbacks
		var that = this;

		// send login request
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'login', username: username, password: password},
			type: 'POST',
			dataType: 'json',
			success: function(data) {

				if (data.success === true) {

					// user was logged in, set the returned user data
					app.account.set({
						'id' : data.user.id,
						'username' : data.user.username,
						'email' : data.user.email,
					});

					Backbone.trigger("accountStateChanged");
					that.showForm('profile');

				} else {

					Backbone.trigger("accountStateChanged", data.error);
					that.showForm('login');

				}

			}
		});
		
	},

	logout: function( ) {

		// alias this for use in ajax callback
		var that = this;

		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'logout'},
			type: 'POST',
			dataType: 'json',
			success: function(data) {

				if( data.success === true ) {

					app.account.set( {
						'id' : 0,
						'username' : 'anonymous',
						'email' : null
					});

					Backbone.trigger("accountStateChanged");
					that.showForm('login');

				} else {

					Backbone.trigger("accountStateChanged", data.error);
					that.showForm('profile');

				}

			}
		});

	},

	register: function( username, password, email ) {

		// alias for callbacks
		var that = this;

		// send registration request
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'register', username: username, password: password, email: email},
			type: 'POST',
			dataType: 'json',
			success: function(data) {

				// user was logged in, set the returned user data
				if (data.success === true) {

					app.account.set( data.user );

					Backbone.trigger("accountStateChanged");
					that.showForm('profile');

				}else{

					Backbone.trigger("accountStateChanged", data.error);
					that.showForm('register');

				}

			}
		});

	},


});