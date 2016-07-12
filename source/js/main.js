'use strict';

// Globals

var APP = (function() {

	return {
		getJSON: function(url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.responseType = 'json';
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					callback(null, xhr.response);
				} else {
					callback(status);
				}
			};
			xhr.send();
		},

		compileHandlebars: function(context) {
			// Execute Handlebars rendering
			var template = Handlebars.compile(document.getElementById('page-template').innerHTML);
			var compiled = document.createElement('div');
			compiled.className = 'content-box';
			compiled.innerHTML = template(context);
			document.getElementById('page-content').appendChild(compiled);

			// Init Event Handlers after Handlebars is finished rendering
			this.initEventHandlers();
		},

		renderTemplates: function() {
			this.getJSON('./js/index.json', function(err, data) {
				if (err !== null) {
					if (window.console) { console.log("Something went wrong: " + err); }
				} else {
					APP.compileHandlebars(data);
				}
			});
		},

		initEventHandlers: function() {
			// Add event handlers

			// Mobile Main Nav
			function animateMobileMenu() {
				mobileNavEl.classList.toggle('open');
			}

			var mobileNavIcon = document.getElementById('main-nav-mobile');
			var mobileNavEl = document.getElementById('main-nav');
			mobileNavIcon.addEventListener('click', animateMobileMenu, false);

			// Stop Propagation & Default Behavior on Menu List Items
			var mobileNavLinks = document.getElementsByClassName('nav-item-link');

			for (var i = 0, len = mobileNavLinks.length; i < len; i++) {
				mobileNavLinks[i].addEventListener('click', function(e) {
					e.stopPropagation();
					if (mobileNavEl.classList.contains('open')) {
						animateMobileMenu();
					}
				}, false);
			}
		},

		initialize: function() {
			this.renderTemplates();
		}

	};

})();

APP.initialize();
