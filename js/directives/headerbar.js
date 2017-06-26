/**
 * 头部导航
 */
define(['jquery', 'app'], function($, app) {
	app.directive('headerbar', ['$timeout', function($timeout) {
		return {
			restrict: 'AE',
			templateUrl: 'js/views/headerbar.html',
			replace: true,
			link: function(scope, ele, attr) {
				scope.menutoggle = function($event) {
					var body = $('body');
					var bodypos = body.css('position');

					if(bodypos != 'relative') {
						if(!body.hasClass('leftpanel-collapsed')) {
							body.addClass('leftpanel-collapsed');
							$('.nav-bracket ul').attr('style', '');

							$($event.target).addClass('menu-collapsed');
						} else {
							body.removeClass('leftpanel-collapsed chat-view');
							$('.nav-bracket li.active ul').css({
								display: 'block'
							});

							$($event.target).removeClass('menu-collapsed');
						}
					} else {
						if(body.hasClass('leftpanel-show')) {
							body.removeClass('leftpanel-show');
						} else {
							body.addClass('leftpanel-show');
						}

						var docHeight = $document.height();
						if(docHeight > $('.mainpanel').height()) {
							$('.mainpanel').height(docHeight);
						}
					}
				}

			}
		};

	}]);

});