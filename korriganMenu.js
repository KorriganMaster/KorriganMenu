(function($) {
	var current_level = 0;
	
	var settings = {
		'items': []
	}
	
	var methods = {
		init: function(options) {
			
			var html = '<ul class="main_menu_container">';

			if (options) {
				$.extend(settings, options);
			}

			var menuItems = settings.items;
			if (menuItems.length == 0) {
				$.error('Parameter \'items\' can\'t be blank.');
			} else {
				$.each(menuItems, function() {
					html += generateMenu(this, 0);
				});
			}
			html += '</ul>';
			
			this.addClass('menu');
			this.append(html);
			
			$('.main_menu_title').stop(true, true).hover(
				function() {
					$(this).find('.main_menu').slideToggle(100);
					current_level++;
				},
				function() {
					--current_level;
					$(this).find('.main_menu').slideToggle(100);
				}
			);
			
			$('.sub_menu_title').stop(true, true).hover(
				function() {
					var tmp = new Array();
					var i = 0;
					var width = 0;
					$(this).find('.sub_menu_' + current_level).find('li').each(function() {
						tmp[i] = $(this).html();
						if ($(this).attr('class') == 'sub_menu_title') {
							$(this).find('ul').remove('.sub_menu');
							$(this).html($(this).html().replace(/ /g, '_') + '&nbsp;');
						} else {
							$(this).html($(this).html().replace(/ /g, '_'));
						}
						i++;
					});
					width = $(this).find('.sub_menu_' + current_level).width();
					i = 0;
					$(this).find('.sub_menu_' + current_level).find('li').each(function() {
						$(this).html(tmp[i]);
						i++;
					});
					$(this).find('.sub_menu_' + current_level).css('left', $(this).outerWidth(true) + 9);
					$(this).find('.sub_menu_' + current_level).css('top', -10);
					$(this).find('.sub_menu_' + current_level).css('width', width);
					$(this).find('.sub_menu_' + current_level).stop(true, true).show('slide', { direction: 'left' }, 100);
					current_level++;
				},
				function() {
					--current_level;
					$(this).find('.sub_menu_' + current_level).stop(true, true).hide('slide', { direction: 'left' }, 100);				
				}
			);
		}
	}
	
	$.fn.korriganMenu = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method \'' + method + '\' doesn\'t exist on jQuery.korriganMenu.');
		}
	}
	
	function generateMenu(content, level) {
		var titleClass = "";
		var ulClass = "";
		
		if (level == 0) {
			titleClass = 'main_menu_title';
			ulClass = 'main_menu';
		} else {
			titleClass = 'sub_menu_title';
			ulClass = 'sub_menu sub_menu_' + level;
		}
		
		var menu = '<li class="' + titleClass + '">';
		
		if (content.content) {
			menu += '<span>' + content.title;
			(level == 0) ? menu += '</span>' : menu += '<span class="right">&rsaquo;</span></span>';
			menu += '<ul class="' + ulClass + '" style="display: none;">';
			$.each(content.content, function() {	
				if (this.content) {
					menu += generateMenu(this, ++level);
				} else {
					if (this.url) {
						menu += '<li><a href="' + this.url + '">' + this.title + '</a></li>';
					} else {
						menu += '<li>' + this.title + '</li>';
					}
				}
			});
			menu += '</ul>';
		} else {
			menu += content.title;
		}
		menu += '</li>';
		return menu;
	}
})(jQuery);