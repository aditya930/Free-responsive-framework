(function(){
if(colors){
	
		var control_color = document.body.querySelector('#control_color'),
		color_items = control_color.children,
		length_color_items = color_items.length,
		
		control_size_window = document.body.querySelector('#control_size_window');
	
		for(var i = 1; i < length_color_items; i++){
			color_items[i].addEventListener( 'click', Select_color, false );
		}
	}	
		function Select_color(){
			var color_page = this.id;
			
			document.body.removeAttribute('class');
			document.body.classList.add(color_page);
		}
	
	
	if(effects){
		var select_effect = document.body.querySelector('#select_effect'),
		select_effect_item = select_effect.children,
		length = select_effect_item.length;
		
	
		for(var i = 1; i < length; i++){
			select_effect_item[i].addEventListener( 'click', Select_effect, false );
		}
		
	}
	
		function Select_effect(){
			var effect = this.getAttribute('data-id'),
			additional_menu = document.body.querySelector('.full_menu') || document.body.querySelector('.additional_menu');
			additional_menu.id = effect;
		}
	
	if(zoom){
	
		var select_effect = document.body.querySelector('#select_effect'),
		scale = document.body.querySelector('#scale'),
		additional_menu = document.body.querySelector('.additional_menu');
		scale_item = scale.children;
	
		for(var i = 1; i < 3; i++){
			scale_item[i].addEventListener( 'click', Select_scale, false );
		}
	}	
		function Select_scale(){
			var effect = this.getAttribute('data-id');
			container = scale.parentNode;
			
			if(effect === 'yes'){
				container.id = 'scale_container';
			}else{
				container.id = '';
			}
		}
})();

var enable = document.body.querySelector('.copyright') || 0;

if(enable == 0){
	var enable_css = enable_css = 'none';
}else{
	enable_css = enable.style.display;
}


if((enable.length == 0)||(enable_css ==='none')){
	var body = document.body;
	
	while (body.firstChild) {
		body.removeChild(body.firstChild);
	}
	
	var container = document.createElement('div');
	container.innerHTML = "BANNED";
	body.appendChild(container);
}