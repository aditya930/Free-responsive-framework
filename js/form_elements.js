(function($){
	
	var range = $('.range');

	var total_rating = 0;
	var rating = $('#rating'),
	total_rating_box = rating.find('#total_rating'),
	stars = rating.find('.icon-star'),
	drop_down_list_wrapper = $('.drop_down_list_wrapper');
	
	//Range
	
	range.on('change', function(){
		var value = this.value;
		$(this).nextAll().text('Value: ' + value);
	});
	
	//Rating
	
	stars.on('mousemove',function(){
		$(this).addClass('hover_star').prevAll('.icon-star').addClass('hover_star');
		$(this).nextAll('.icon-star').addClass('no_active_star');	
	});
	
	stars.mouseout(function(){
		stars.removeClass('hover_star no_active_star');
	});
	
	stars.on('click',function(){
		
	var prev_siblings = $(this).prevAll(),
		next_siblings = $(this).nextAll('.active_star');
		
	
		if($(this).hasClass('active_star')){
				
			if(next_siblings.length > 0){
				next_siblings.removeClass('active_star');
				total_rating = total_rating - next_siblings.length;
			}else{
			
				$(this).removeClass('active_star');
				total_rating = total_rating - 1;
			}
			
		}else{
			$(this).addClass('active_star');
			
			if(prev_siblings.length > 1){
				prev_siblings.addClass('active_star');
				total_rating = prev_siblings.length;
			}
			total_rating = total_rating + 1;
		}
		total_rating_box.val(total_rating);
		rating.find('#total_value').text(total_rating);
	});
	
	//Selectbox
	
	drop_down_list_wrapper.on('click', function(){
	
		var selected = $(this).find('.selected'),
		list = $(this).find('.drop_down_list');
		
		$(this).Open_list(selected, list);
	});
	
	drop_down_list_wrapper.find('.drop_down_list_link').on('click', function(){
	
		var value = $(this).text(),
		list = $(this).parents('.drop_down_list').siblings('.selected');
		
		list.text(value);
	});
	
	$.fn.Open_list = function(selected,  list){

		if(selected.hasClass('checked')){
			selected.removeClass('checked');
			list.hide();
		}
		else{
			selected.addClass('checked');
			list.show();
		}
	};
})(jQuery);