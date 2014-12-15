/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/

(function(){
	var accordion_list, accordion_list_item,info_block, cache_element, length,
	title_info_block =  document.body.querySelectorAll('.title_info_block'),
	count_accordions = title_info_block.length;
	
	for(var i = 0; i < count_accordions; i++){
		title_info_block[i].addEventListener( 'click', Accordion, false );
	}
	
	function Accordion(){
		accordion_list_item = this.parentNode;
		accordion_list = accordion_list_item.parentNode;
		info_block = accordion_list_item.children[1];
		
		if (accordion_list_item.classList.contains('active_info_block')) {
		
			accordion_list_item.classList.remove('active_info_block');
			info_block.classList.remove('show');
			info_block.style.height = 0;
		}
		else {
		
			cache_element = accordion_list.children;
			length = cache_element.length;
			info_block.style.height = 0;
			
			for(var i = 0; i < length; i++){
			
				if(cache_element[i].classList.contains('active_info_block')){
					var cache_element_item = cache_element[i].children[1];
					cache_element[i].classList.remove('active_info_block');
					cache_element_item.classList.remove('show');
					cache_element_item.style.height = 0;
				}
			}
			
			accordion_list_item.classList.add('active_info_block');
			info_block.classList.add('show');
			setTimeout(function(){
				
				var items = info_block.children,
				length_items = items.length,
				margin_bottom, 
				height_items = 0;
				
				for(var i = 0; i < length_items; i++){
					margin_bottom = items[i].currentStyle || window.getComputedStyle(items[i]);
					height_items = items[i].offsetHeight + parseInt(margin_bottom.marginBottom) + height_items;
				}

				info_block.style.height = height_items + 'px';
			}, 1);	
		}
	}
})();

/*
(function(){
	var accordion_list, accordion_list_item,info_block, cache_element, length,
	title_info_block =  document.body.querySelectorAll('.title_info_block'),
	count_accordions = title_info_block.length;
	
	for(var i = 0; i < count_accordions; i++){
		title_info_block[i].addEventListener( 'click', Accordion, false );
	}
	
	function Accordion(){
		accordion_list_item = this.parentNode;
		accordion_list = accordion_list_item.parentNode;
		info_block = accordion_list_item.children[1];
		
		if (accordion_list_item.classList.contains('active_info_block')) {
		
			accordion_list_item.classList.remove('active_info_block');
			info_block.classList.remove('show');
		}
		else {
		
			cache_element = accordion_list.children;
			length = cache_element.length;
			
			for(var i = 0; i < length; i++){
			
				if(cache_element[i].classList.contains('active_info_block')){
					cache_element[i].classList.remove('active_info_block');
				}
			}
			
			accordion_list_item.classList.add('active_info_block');
			info_block.classList.add('show');
		}
	}
})();
*/