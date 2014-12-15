 

var enable = $('.copyright'),
enable_css = enable.css("display");

var body = $('body');

if((enable.length == 0)||(enable_css ==='none')){
	$('body').empty().append('BANNED');
}
(function($){
	var control_color = body.find('#control_color'),
	control_size_window = body.find('#control_size_window');
	
	control_color.find('.color_item').on('click', function(){
		var color_page = this.id
		body.removeClass();
		body.addClass(color_page);
	});
})(jQuery);

/**************************************demo filter**********************/

(function($){
	var type_production,  active_production_item,
		siblings_type_production, active_block, popup, form, step,
	

		catalog = $('#catalog'),
		all_production =  catalog.find('#all_production'),
		tooltip = catalog.nextAll('#tooltip'),
		filters = catalog.find('#type_products'),
		scroll_position = 222;

	//filter
	filters.find('.type_products_item').on('click', function(){
	
		var type_products = $(this).parents('#type_products'),
		id_category = $(this).attr('id');
		
		siblings_type_production = $(this).siblings();
		
		type_production = id_category + '_production';
		
		active_block = type_products.nextAll('#'+type_production);
	
		production_item_full = catalog.find('.production_item_full');
		
		if(production_item_full.length > 0){
			
			production_item_full.removeClass('production_item_full').addClass('hidden_production show_detail');
			production_item_full.find('.description_product').removeClass('description_product_active');
			production_item_full.siblings('.production_item').show().addClass('hidden_production');
			
		}
		
		if(id_category === 'all_category'){
						
			$(this).addClass('active_type');
			siblings_type_production.removeClass('active_type');
			active_block.removeClass('show_production');
			all_production.stop(true, true).slideDown().siblings('.production').removeClass('show_production');
		}

		else{
			siblings_type_production.removeClass('active_type');
			$(this).addClass('active_type');
			all_production.stop(true, true).slideUp(function(){
				active_block.addClass('show_production').siblings('.production').removeClass('show_production');
			});
		}
	});
	
	all_production.find('.show_category').on('click', function(){
		
		var id_category = $(this).attr('data-id'); 
		
		type_production = id_category + '_production';
		filters.find('#' + id_category).addClass('active_type').siblings().removeClass('active_type');
				
		active_block = all_production.nextAll('#'+type_production);
		
		all_production.stop(true, true).slideUp(function(){
				active_block.addClass('show_production');
		});
	});
	
	//show detail product
	catalog.on('click','.show_detail', function(){
		if(!$(this).hasClass('no_clicked')){
			var active_production_item = $(this),
			active_production_item_siblings = active_production_item.siblings('.production_item');
			active_production_item_siblings.removeClass('hidden_production').addClass('no_clicked');
			
			filters.fadeOut(700);
			$(this).Show_Product(active_production_item, active_production_item_siblings);
		}
	});
	
	//close detail product
	catalog.find('.close_description').on('click', function(event){
		event.stopPropagation();

		var active_production_item = $(this).parents('.production_item');
		$(this).Enable_Close_Product(active_production_item);
	});
	

	//add to basket
	catalog.find('.add_basket').on('click', function(event){

		event.preventDefault();
		
		var product_id = this.id,
		text = 'Product successfully added to cart!',
		delay = 1000;			
		$(this).Show_Tooltip(text, delay);
	});
	
/******************************Functions******************************/	

	
	$.fn.Show_Tooltip = function(text, delay ){
	
		tooltip.text(text);
		tooltip.fadeIn(function(){
			setTimeout(function(){
				tooltip.fadeOut();
			}, delay) 
		});
	};

	$.fn.Show_Product = function(active_production_item, active_production_item_siblings){
		
		var description_product = active_production_item.find('.description_product');
			
			$('html, body').animate({scrollTop: scroll_position}, 800);


			
			if(active_production_item_siblings.length  < 1){
			
				active_production_item.removeClass('show_detail hidden_production').fadeOut(700, function(){
					active_production_item.removeClass('show_detail')
					.addClass('production_item_full').fadeIn(700, function(){
						description_product.addClass('description_product_active');
					});
				});

			}else{
			
				active_production_item.removeClass('hidden_production');
				
				active_production_item.fadeOut(700, function(){
					active_production_item.removeClass('show_detail');
				});
			
				active_production_item_siblings.fadeOut(700, function(){

					active_production_item.addClass('production_item_full');
					
					setTimeout(function(){
						active_production_item.fadeIn(700);
					}, 200);
					
					setTimeout(function(){
							description_product.addClass('description_product_active');
					}, 300);
				});
			}
	};
	

	$.fn.Close_Product = function(active_production_item, active_production_item_siblings, img_production){

		active_production_item.find('.description_product').removeClass('description_product_active');
		
		setTimeout(function(){

			img_production.fadeOut(function(){
			
				active_production_item.removeClass('production_item_full').addClass('show_detail');
				
				if(!active_production_item.hasClass('production_item_full')){
					
					img_production.fadeIn(function(){

						active_production_item.addClass('hidden_production');
						
						active_production_item_siblings.fadeIn(700, function(){
							active_production_item_siblings.addClass('hidden_production').removeClass('no_clicked');
							
						});
						filters.fadeIn(700);
					});
				}
			});
		}, 200);
		
		
	};
	

	$.fn.Enable_Close_Product = function(active_production_item){
	
		if(active_production_item.length > 0){
			
			var active_production_item_siblings = active_production_item.siblings('.production_item'),
			img_production = active_production_item.find('.img_production');
			
			$(this).Close_Product(active_production_item, active_production_item_siblings, img_production);
		}
	};
})(jQuery);

window.onload = function(){

	body.removeClass('no_transition'); 
};


/*******************demo accordion***********************/

(function($){
	var accordion_list_item,info_block;
	$('.title_info_block').on('click', function(){

		accordion_list_item = $(this).parents('.accordion_list_item');
		info_block = accordion_list_item.find('.info');
		
		if (accordion_list_item.hasClass('active_info_block')) {
			accordion_list_item.removeClass('active_info_block');
			info_block.slideUp();
		}
		else {
			accordion_list_item.addClass('active_info_block');
			info_block.stop(true, true).slideDown();
			accordion_list_item.siblings('.active_info_block').removeClass('active_info_block').children('.info').stop(true, true).slideUp();
		}
	});
})(jQuery);


/********************************demo tabs***************/

(function($){
	var element;

	//tabs

	$('.tabs').on('click', 'li:not(.current)', function() {

		element = $(this).parents('.tabs_container');
		$(this).Tabs(element);
			
	});


	$.fn.Tabs = function(element){

		$(this).addClass('current').siblings().removeClass('current');
		
		element.find('.box').eq($(this).index()).show(1,function(){
		
			$(this).addClass('show_tab');
			
		}).siblings('.box').hide(1,function(){
		
			$(this).removeClass('show_tab');
		});
	}
})(jQuery);

/***************************************demo login form******************/

(function($){
		var wrapper_response = $('#wrapper_response'),
		
		form = $('#login'),
		nickname_login = form.find('#nickname_login'),
		password = form.find('#password'),
		button = form.find('#button_login'),
		effect = 'fadeInLeft';
		button.removeAttr("disabled");
		
		form.on('submit', function(){
		event.preventDefault();
		
		if(!this.checkValidity || this.checkValidity()){
			
			
			var nickname_login_info = nickname_login.val(),
			password_info = password.val();
			
			$.ajax({            
				url: 'php/test.php',
				method: 'POST',
				data: {
					"nickname_login_info" : nickname_login_info,
					"password_info" : password_info
				},
				success: function(data){
					wrapper_response.html(data);
					wrapper_response.fadeIn();
					
					nickname_login.val("");
					password.val("");
					
					setTimeout(function(){
						wrapper_response.fadeOut(function(){
							wrapper_response.html("");
						});
					}, 2000);
				}
			})
		}
	});
})(jQuery);

/***************************************demo feedback form******************/

(function($){
	var	wrapper_response = $('#wrapper_response'),
		
		form_contact = $('#form_contact'),
		full_name = form_contact.find('#full_name'),
		email = form_contact.find('#email'),
		comment = form_contact.find('#comment'),
		button = form_contact.find('#button');
		button.removeAttr("disabled");
		
		form_contact.on('submit', function(){
		event.preventDefault();
		
		if(!this.checkValidity || this.checkValidity()){
			
			
			var full_name_info = full_name.val(),
			email_info = email.val(),
			comment_info = comment.val();
			
			$.ajax({            
				url: 'php/test.php',
				method: 'POST',
				data: {
					"full_name_info" : full_name_info,
					"email_info" : email_info,
					"comment_info" : comment_info
				},
				success: function(data){
					wrapper_response.html(data);
					wrapper_response.fadeIn();
					
					full_name.val("");
					email.val("");
					comment.val("");
					
					setTimeout(function(){
						wrapper_response.fadeOut(function(){
							wrapper_response.html("");
						});
					}, 2000);
				}
			})
		}
	});
})(jQuery);

/***************************************demo registration form******************/

(function($){
		var wrapper_response = $('#wrapper_response'),
		
		form = $('#registration'),
		nickname = form.find('#nickname'),
		email = form.find('#email_user'),
		tel = form.find('#tel'),
		password = form.find('#password'),
		button = form.find('#button_registration');
		button.removeAttr("disabled");
		
		form.on('submit', function(){
		event.preventDefault();
		
		if(!this.checkValidity || this.checkValidity()){
			
			
			var nickname_info = nickname.val(),
			email_info = email.val(),
			tel_info = tel.val(),
			password_info = password.val();
			
			$.ajax({            
				url: 'php/test.php',
				method: 'POST',
				data: {
					"nickname_info" : nickname_info,
					"email_info" : email_info,
					"tel_info" : tel_info,
					"password_info" : password_info
				},
				success: function(data){
					wrapper_response.html(data);
					wrapper_response.fadeIn();
					
					nickname.val("");
					email.val("");
					tel.val("");
					password.val("");
					
					setTimeout(function(){
						wrapper_response.fadeOut(function(){
							wrapper_response.html("");
						});
					}, 2000);
				}
			})
		}
	});
})(jQuery);


/**************************demo tooltips*********************/
if(tooltip_enable){
(function($){
    var map;
        var mapOptions = {
            center: new google.maps.LatLng(49.539469,45.018309),
            zoom: 3,
            zoomControl: false,
            zoomControlOptions: false,
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: false,
            scrollwheel: false,
            panControl: true,
            streetViewControl: true,
            draggable : true,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
['USA', 'USA', 'undefined', 'USA', 'undefined', 37.09024, -95.712891],['Brazil', 'Brazil', 'undefined', 'undefined', 'undefined', -14.235004, -51.92528],['Chad', 'Chad', 'undefined', 'undefined', 'undefined', 15.454166, 18.732207],['Russia', 'Russia', 'undefined', 'undefined', 'undefined', 61.52401, 105.318756]
        ];
        for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
			if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web,
				id: 'marker_' + locations[i][0],
				draggable:true,
				animation:  google.maps.Animation.DROP,
            });
        }
			var allowedBounds = new google.maps.LatLngBounds(
				 new google.maps.LatLng(30.09024, -85.712891), // ограничение слева
				 new google.maps.LatLng( 61.52401, 85.318756) // справа
			);
			var lastValidCenter = map.getCenter();

			google.maps.event.addListener(map, 'center_changed', function() {
			
				if (allowedBounds.contains(map.getCenter())) {

					lastValidCenter = map.getCenter();
					return; 
				}

				map.panTo(lastValidCenter);
			});
})(jQuery);

	// core settings
	var one_active_popup = false,
		youtube = true;

	//example
(function($){
	setTimeout(function(){
	
		var example = $('#example'),
		
		usa = example.find('#gmimap0'),
		tooltip_wrapper_usa = example.find('#usa_tooltip'),
		tooltip_usa = tooltip_wrapper_usa.find('.tooltip'),

		russia = example.find('#gmimap3'),
		tooltip_wrapper_russia = example.find('#russia_tooltip'),
		tooltip_russia = tooltip_wrapper_russia.find('.tooltip'),
		
		africa = example.find('#gmimap2'),
		tooltip_wrapper_africa = example.find('#africa_tooltip'),
		tooltip_africa = tooltip_wrapper_africa.find('.tooltip'),
		
		america = example.find('#gmimap1'),
		tooltip_wrapper_america = example.find('#america_tooltip'),
		tooltip_america = tooltip_wrapper_america.find('.tooltip'),
		
		effect; 
		
		$('.show_effects').on('click', function(){
			var effects = this.id;
			
			var tooltip = $(this).siblings('.tooltip');
			
			tooltip.addClass(effects);
			setTimeout(function(){
				tooltip.removeClass(effects);
			}, 1000)
		});
		
		
		usa.on('click', function(){
			element_wrapper = tooltip_wrapper_usa,
			element_tooltip = tooltip_usa,
			effect = 'zoomInUp',
			hide_effect = 'rotateOut';
			
			if(!body.hasClass('active_body')){
				$(this).addClass('clicked');
				var left = $(this).parent().offset().left - 280,
					top = $(this).parent().offset().top - 370;
					
				element_wrapper.offset({"left" : left, "top": top});
				
				$(this).Show_Tooltips(tooltip_wrapper_usa, tooltip_usa,effect, hide_effect);
			}
		});
		
		russia.on('click', function(){
		
			if(!body.hasClass('active_body')){
				element_wrapper = tooltip_wrapper_russia,
				element_tooltip = tooltip_russia,
				effect = 'jumpInLeft',
				hide_effect = 'jumpOut';
				$(this).addClass('clicked');
				var left = $(this).parent().offset().left - 155,
					top = $(this).parent().offset().top + 50;

					
				element_wrapper.offset({"left" : left, "top": top});
				
				$(this).Show_Tooltips(element_wrapper, element_tooltip,effect, hide_effect);
			}
		});
		
		africa.on('click', function(){
		
			if(!body.hasClass('active_body')){
				element_wrapper = tooltip_wrapper_africa,
				element_tooltip = tooltip_africa,
				effect = 'fadeInLeft',
				hide_effect = 'jumpOut';
				
				$(this).addClass('clicked');
				
				var left = $(this).parent().offset().left + 40,
					top = $(this).parent().offset().top - 180;

				element_wrapper.offset({"left" : left, "top": top});
				$(this).Show_Tooltips(tooltip_wrapper_africa, tooltip_africa,effect, hide_effect);
			}
		});
		
		america.on('click', function(){ 
		
			if(!body.hasClass('active_body')){
				element_wrapper = tooltip_wrapper_america,
				effect = 'fadeInLeft',
				hide_effect = 'jumpOut';
				$(this).addClass('clicked');
				
				var left = $(this).parent().offset().left  - 100,
					top = $(this).parent().offset().top - 370;
					
				element_wrapper.offset({"left" : left, "top": top});
				$(this).Show_Tooltips(tooltip_wrapper_america, tooltip_america,effect, hide_effect);
			}
		});
		
		// core tooltip
		$('.close_tooltip').on('click', function(){
			
			var tooltip_wrapper =  $(this).parents('.active_tooltip'),
			tooltip = tooltip_wrapper.find('.tooltip'),
			effect = tooltip.attr('data-show-effect'),
			hide_effect = tooltip.attr('data-hide-effect');
			
			if(youtube){
			
				tooltip_wrapper.find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
			}

			$(this).Hide_Tooltips(tooltip_wrapper, tooltip, effect, hide_effect);
			
		});
		
		$('.tooltip_wrapper').on('click', function(){
			
			var tooltip_wrapper =  $(this),
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
		
		$.fn.Show_Tooltips = function(element_wrapper, element_tooltip, effect, hide_effect){

			element_tooltip.addClass(effect).attr({'data-show-effect' : effect, 'data-hide-effect' : hide_effect});
			element_wrapper.addClass('active_tooltip');
			if(one_active_popup){
				body.addClass('active_body');
			} 
		}
		
		$.fn.Hide_Tooltips = function(element_wrapper, element_tooltip, effect, hide_effect){
		
			element_tooltip.removeClass(effect).attr({'data-show-effect' : ''}).addClass(hide_effect);
			
			setTimeout(function(){
				element_wrapper.removeClass('active_tooltip');
				element_tooltip.removeClass(hide_effect).attr({'data-hide-effect' : ''});
				if(one_active_popup){
					body.removeClass('active_body');
				}
			}, 1000);
		}
	}, 2000);
})(jQuery);



(function($){
	
	$('.show_effects').map(function(){
		var name_effect_demo = $(this).attr("id");
		$(this).siblings('.name_effects').text(name_effect_demo);
	});
})(jQuery);

}else{
	var tooltip_enable = false;
}

(function($){
	
   var added_products = $('#added_products'),
   cart_fotter = added_products.next(),
   finish_price = cart_fotter.find('#finish_price');
   
   added_products.on('click', '.remove', function(){
   
   		var count_products = $(this).siblings('.amount_input'),
		price = count_products.parent().siblings('.price').find('.price_value');
		
		if( count_products.val() > 1){
		
			var start_value = count_products.val(),
			id_product = $(this).parents('.added_products_item').attr('id'),
			number_products_value =  parseInt(start_value) - 1;
			
			count_products.val(number_products_value);
			
			$(this).Data(id_product, number_products_value, price );
		}
   });
   
   //добавление места
   
   added_products.on('click', '.add', function(){
   
   		var count_products = $(this).siblings('.amount_input'),
		price = count_products.parent().siblings('.price').find('.price_value'),
		start_value = count_products.val(),
		id_product = $(this).parents('.added_products_item').attr('id'),
		number_products_value =  parseInt(start_value) + 1;
			
		if(!number_products_value){
			number_products_value = 1;
		}
		
		count_products.val(number_products_value);	
		
		$(this).Data(id_product, number_products_value,  price );
   });
      
	  
	added_products.on('keyup', '.amount_input', function(event){
			
		var count_products = $(this),
		price = count_products.parent().siblings('.price').find('.price_value'),
		char_code = event.keyCode;
		
		
		if((char_code == '48')||(char_code == '49')||(char_code == '50')||(char_code == '51')||(char_code == '52')||(char_code == '53')||(char_code == '54')||(char_code == '55')||(char_code == '56')||(char_code == '57')||(char_code == '96')||(char_code == '97')||(char_code == '98')||(char_code == '99')||(char_code == '100')||(char_code == '101')||(char_code == '102')||(char_code == '103')||(char_code == '104')||(char_code == '105')){
			
			var start_value = count_products.val(),
			id_product = $(this).parents('.added_products_item').attr('id'),
			number_products_value =  parseInt( start_value);
			
			if(!number_products_value){
				number_products_value = 1;
			}
			
			$(this).Data(id_product, number_products_value,  price );
		}
	  });

	added_products.on('click', '.delete_product', function(){
	
		var product = $(this).parents('.added_products_item'),
		count_products = $(this).prevAll('.amount').find('.amount_input'),
		start_value = count_products.val(),
		number_products_value =  parseInt( start_value);
		price_value = finish_price.text(),
		id_product = product.attr('id');
			
		product.remove();
		
			$.ajax({
				url: 'php/delete.php',
				type: 'POST',
				data: {quantity : number_products_value, id_product : id_product, finish_price : price_value},
				dataType: 'json',
				success: function(data){
				
					finish_price.text(data.finish_price);
					
					if(data.finish_price == 0){
						added_products.append('<div id="no_products">No products</div>');
						added_products.find('.added_products_head').remove();
						cart_fotter.remove();
					}
				}
			});
	});  
	  
   $.fn.Data = function(id_product, number_products_value,  price ){
   
   			$.ajax({
				url: 'php/cart.php',
				type: 'POST',
				data: {quantity : number_products_value, id_product : id_product},
				dataType: 'json',
				success: function(data){
					price.text(data.price);
					finish_price.text(data.finish_price);
				}
			});
   }
})(jQuery);
