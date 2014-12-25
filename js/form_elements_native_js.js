/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/
 
(function(){
	
	var range = document.body.querySelectorAll('.range'),
	ranges_count = range.length;
	
	var drop_down_list_wrapper = document.body.querySelector('.drop_down_list_wrapper'),
	drop_down_list_link = drop_down_list_wrapper.querySelectorAll('.drop_down_list_link'),
	links = drop_down_list_link.length;
	
	var rating = document.body.querySelector('#rating'),
	total_rating_box = rating.querySelector('#total_rating'),
	count_stars = rating.querySelector('.wrapper_stars').children,
	
	stars = [],
	prev_siblings = [] ,
	next_siblings = [],
	
	prev_siblings_len,
	next_siblings_len,
	element = this,
	p_element = this,
	total_rating,	
	
	length = count_stars.length;
	
	var i = 0;
	
	var password_action = document.body.querySelector('#action_password');
	
	//password
	
	password_action.addEventListener( 'click', PasswordAction, false );
	
	function PasswordAction(){
		
		var password_input = this.previousElementSibling;
		
		if(this.classList.contains('icon-eye-blocked')){
			this.classList.remove('icon-eye-blocked');
			password_input.type = 'password';
		}
		else{
			this.classList.add('icon-eye-blocked');
			password_input.type = 'text';		}
	}
	
	//Range
	
	for( i = 0; i < ranges_count; i++){
		range[i].addEventListener( 'change', Set_Value_Range, false );
	}
	
	function Set_Value_Range(){
		var value = this.value;
		this.nextElementSibling.textContent = 'Value: ' + value;
	}
	
	//Rating
	
	for( i = 0; i < length; i++){
		stars.push(count_stars[i]);
	}
	
	for( i = 0; i < length; i++){
		stars[i].addEventListener( 'click', Select_Rating, false );
		stars[i].addEventListener( 'mouseenter', Mousemove_Star, false );
		stars[i].addEventListener( 'mouseleave', Mouseout_Star, false );
	}
	
	function Mousemove_Star(){
	
		this.classList.add('hover_star');
		
		element = this;
		p_element = this;
		
		while(element.nextElementSibling){
			next_siblings.push(element.nextElementSibling);
			element = element.nextElementSibling;
		}	
		
		while(p_element.previousElementSibling){
			prev_siblings.push(p_element.previousElementSibling);
			p_element = p_element.previousElementSibling;
		}
		
		prev_siblings_len = prev_siblings.length;
		next_siblings_len = next_siblings.length;	
		
		for( i = 0; i < prev_siblings_len; i++){
			prev_siblings[i].classList.add('hover_star');
		}
		
		for( i = 0; i < next_siblings_len; i++){
			next_siblings[i].classList.add('no_active_star');
		}
		
		 prev_siblings = [];
		 next_siblings = [];
	}
	
	function Mouseout_Star(){
	
		for( i = 0; i < length; i++){
			stars[i].classList.remove('hover_star');
			stars[i].classList.remove('no_active_star');
		}
	}
	
	function Select_Rating(){
	
		total_rating = 0;
		element = this;
		p_element = this;
		
		while(p_element.previousElementSibling){
			prev_siblings.push(p_element.previousElementSibling);
			p_element = p_element.previousElementSibling;
		}
		
		while(element.nextElementSibling){
			next_siblings.push(element.nextElementSibling);
			element = element.nextElementSibling;
		}
			
		if(this.classList.contains('active_star')){
		
			var next_siblings_len = next_siblings.length;	
			
			if(next_siblings_len > 0){
				
				for( i = 0; i < next_siblings_len; i++){
					next_siblings[i].classList.remove('active_star');
				}
			
			}else{
				this.classList.remove('active_star');
			}
			next_siblings = [];
			
		}else{
		
			prev_siblings_len = prev_siblings.length;
			
			if(prev_siblings_len > 0){
			
				for( i = 0; i < prev_siblings_len; i++){
					prev_siblings[i].classList.add('active_star');
				}
			}
			
			this.classList.add('active_star');
			prev_siblings = [];
		}
		
		for( i = 0; i < length; i++){
			if(count_stars[i].classList.contains('active_star')){
				total_rating = total_rating + 1;
			}
		}
		total_rating_box.value = total_rating;
		rating.querySelector('#total_value').textContent = total_rating;
	}
	
	//Selectbox
	
	
	drop_down_list_wrapper.addEventListener( 'click', Show_List, false );
	
	for( i = 0; i < links; i++){
		drop_down_list_link[i].addEventListener( 'click', Add_Value, false );
	}
	
	function Show_List(){

		var selected = this.children[0],
		list = this.children[1];

		if(selected.classList.contains('checked')){
			selected.classList.remove('checked');
			list.classList.remove('show_block');
		}
		else{
			selected.classList.add('checked');
			list.classList.add('show_block');
		}
	}

	function Add_Value(){
	
		var parents = [],
		selected,
		element = this,
		value = this.textContent;
		
		for( i = 0; i < 2; i++){
			parents.push(element.parentNode);
			element = element.parentNode;
		}
		
		selected = element.previousElementSibling;
		selected.textContent = value;
	}
})();