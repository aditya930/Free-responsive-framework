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
		number_products_value =  parseInt( start_value),
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
					
					if(data.finish_price === 0){
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
   };
})(jQuery);