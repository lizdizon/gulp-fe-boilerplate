'use strict';

// Globals

var APP = (function() {

	return {

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
			this.initEventHandlers();
		}

	};

})();

APP.initialize();
