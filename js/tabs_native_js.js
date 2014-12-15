/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/

(function(){
	var tab =  document.body.querySelectorAll('.tab'),
	count_tabs = tab.length,
	tabs_container, tab_id, box, boxs, box_lenght;
	
	for(var i = 0; i < count_tabs; i++){
		tab[i].addEventListener( 'click', Tabs, false );
	}
	
	function Tabs(){
	
		tabs_container = this.parentNode.parentNode;
		tabs_container.querySelector('.current').classList.remove('current');
		this.classList.add('current');
		
		tab_id = this.getAttribute('data-id');
		box = '#' + tab_id +'_box';
		
		boxs = tabs_container.querySelectorAll('.box');
		box_lenght = boxs.length;
		
		for(var i = 0; i < box_lenght; i++){
			boxs[i].classList.remove('visible');
			boxs[i].classList.remove('show_tab');
		}
		
		tabs_container.querySelector(box).classList.add('show_tab');
	}
})();
