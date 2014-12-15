(function(){
 
	var wrapper_menu = document.body.querySelector('#wrapper_menu'),
	icon_menu = wrapper_menu.querySelector('#icon_menu'),
	background_additional_menu = document.body.querySelector('#background_additional_menu'),
	close_menu = document.body.querySelector('#close_menu'),
	id_body;
	
	if ("ontouchstart" in document.documentElement){
	    document.body.setAttribute('id','touch');
	}
	else{
		document.body.setAttribute('id','no_touch');
	} 
	
	id_body = document.body.id;
	icon_menu.addEventListener( 'click', Show_Menu, false );
	background_additional_menu.addEventListener( 'click', Hide_Menu, false );
	close_menu.addEventListener( 'click', Hide_Menu, false );
	
	function Show_Menu( ) {

		this.classList.add('active_icon');
		
		setTimeout(function(){
			document.body.classList.add('active_menu');
		}, 100);
	}
	 
	function Hide_Menu( ) {

		this.classList.remove('active_icon');
		
		setTimeout(function(){
			document.body.classList.remove('active_menu');
		}, 100);
	}
})();