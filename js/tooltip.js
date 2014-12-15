/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/


(function($){
	// core settings 
	var one_active_tooltip = false,
		youtube = false;

	var body = $('body'),
	tooltip_wrapper = $('.tooltip_wrapper'),
	tooltip = tooltip_wrapper.find('.tooltip'),
	point = $('.point'),
	effect,
	hide_effect;

	point.on('click', function(){ 
	
		if(!body.hasClass('active_body')){
		
			tooltip_wrapper = $('#' + $(this).attr('data-name-tooltip'));
			tooltip = tooltip_wrapper.find('.tooltip');
			effect = $(this).attr('data-show-effect');
			hide_effect = $(this).attr('data-hide-effect');
			
			$(this).addClass('clicked');
			
			var left = $(this).offset().left,
				top = $(this).offset().top;
				
			tooltip_wrapper.css({"left" : left, "top": top});
			$(this).Show_Tooltips(tooltip_wrapper, tooltip, effect, hide_effect);
		}
	});
	
	
	tooltip_wrapper.find('.close_tooltip').on('click', function(){
		
		var tooltip_wrapper =  $(this).parents('.active_tooltip'),
		tooltip = tooltip_wrapper.find('.tooltip'),
		effect = tooltip.attr('data-show-effect'),
		hide_effect = tooltip.attr('data-hide-effect');
		
		if(youtube){
		
			tooltip_wrapper.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
		}

		$(this).Hide_Tooltips(tooltip_wrapper, tooltip, effect, hide_effect);
		
	});
	
	/*effect - effect show;
	hide_effect - effect hide;
	*/
	
	$.fn.Show_Tooltips = function(element_wrapper, element, effect, hide_effect){
		element.addClass(effect).attr({'data-show-effect' : effect, 'data-hide-effect' : hide_effect});
		element_wrapper.addClass('active_tooltip');
		if(one_active_tooltip){
			body.addClass('active_body');
		}
	};
	
	$.fn.Hide_Tooltips = function(element_wrapper, element, effect, hide_effect){
	
		element.removeClass(effect).attr({'data-show-effect' : ''}).addClass(hide_effect);
		
		setTimeout(function(){
			element_wrapper.removeClass('active_tooltip');
			element.removeClass(hide_effect).attr({'data-hide-effect' : ''});
			if(one_active_tooltip){
				body.removeClass('active_body');
			}
		}, 1000);
	};
})(jQuery);
