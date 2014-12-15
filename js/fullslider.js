/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/

(function(){ 

var startX,
	endX,
	prev_width,
	current_width,
	pos_last_slide,
	num_slide,
	id_active_slide,
	id_prev_slide,
	num_next_slide, 
	num_prev_slide,
	slide,
	prev_slide,
	totalX,
	intermediate_coordinate,
	carusel_interval, 
	
	speed = '0.5s',
	carusel = true,
	autoplay = true,
	time = 4000,
	path,
	src = 'images/',
	format = '.jpg',
	
	slideshow = document.querySelector('#slideshow'),
	slides_сontainer = slideshow.querySelector('#slidesContainer'),
	left_arrow = slideshow.querySelector('#leftControl'),
	right_arrow = slideshow.querySelector('#rightControl'),
	slides = slides_сontainer.querySelector('#slideInner'),
	
	slide_width = window.outerWidth,
	interval = slide_width,
	number_of_slides = slides.children.length,
	left_offset = 0,
	
	first_slide = document.querySelector('.slide'),
	last_slide = document.body.querySelector('#slide' + number_of_slides),
	finite_coordinate = (-slide_width * (number_of_slides)) + "px";
	
	var timerId_0 = false;
	
	var slides_item = slides_сontainer.querySelectorAll('.slide'),
	slide_length = slides_item.length;
	
	slides_сontainer.style.width = slide_width + "px";
	Path(interval);
	
	for(var i = 0; i < slide_length; i++){
		slides_item[i].style.width = slide_width + "px";
			slides_item[i].style.background = "url('" + src + path + slides_item[i].id + format + "') no-repeat scroll center top / cover";
	}

	slides.style.width = slide_width * number_of_slides + "px";
	
	if(autoplay){
		Autoplay_Slide();
	}

	if(!carusel){
		left_arrow.style.display = 'none';
		finite_coordinate = (-slide_width * (number_of_slides - 1)) + "px";
	}

function Autoplay_Slide(){
	carusel_interval = setInterval(Next_Slide, time);
}

function Responsive(){

	clearTimeout(timerId_0);
	timerId_0 = setTimeout(function () {
	
		prev_width = slides.offsetWidth;
		slide_width = window.outerWidth;
		interval = slide_width;	
		slides_сontainer.style.width = slide_width + "px";

		Path(interval);
		
		for(var i = 0; i < slide_length; i++){
			slides_item[i].style.width = slide_width + "px";
			slides_item[i].style.background = "url('" + src + path + '/' + slides_item[i].id + format + "') no-repeat scroll center top / cover";
		}
		
		current_width = slide_width * number_of_slides;
 		//slides.style.width = current_width + "px";debugger;
		
		if(carusel){
			pos_last_slide = slide_width * (number_of_slides);
			slides.style.width = slide_width * (number_of_slides) + 'px';
			
		}else{
			pos_last_slide = slide_width * (number_of_slides-1);
			slides.style.width = slide_width * (number_of_slides - 1) + 'px';
		}
		
		finite_coordinate = (-pos_last_slide) + "px"; 
		num_slide =  (100 * left_offset) / prev_width; 

		
		if(left_offset === 0){
			left_offset =  0;
		}
		
		else if (left_offset >= pos_last_slide) {
		
			left_offset = current_width - slide_width;
			if(!carusel){
				right_arrow.style.display = 'none';
			}
		}
		
		else{
			left_offset = Math.round((current_width * num_slide) / 100);
		}
		
		slides.style.webkitTransform  = 'translateX(-' + left_offset + 'px) translateZ(0)';
		slides.style.transform = 'translateX(-' + left_offset + 'px) translateZ(0)';
		
		if(autoplay){
			clearInterval(carusel_interval);
			Autoplay_Slide();
		}
	},10);
}	

function Path(interval){

	if((interval < 2000)&&(interval > 901)){
	
		path = '';
		
	}
	
	else  if((interval < 901)&&(interval > 801)){
	
		path = '900/';
		
	} else if((interval < 801)&&(interval > 769)){
	
		path = '800/';
	
	} else if((interval < 769)&&(interval > 641)){
	
		path = '768/';
		
	}
	 else if((interval < 641)&&(interval > 481)){
	 
		path = '640/';
	 
	} else if((interval < 481)&&(interval > 321)){
	
		path = '480/';
	
	}
	 else {
	 
		path = '320/';
		
	}
}

function Next_Slide () {

		num_next_slide = Math.round(left_offset / interval + 2);
		num_prev_slide = Math.round(left_offset / interval + 1);

		id_active_slide = '#'+'slide' + num_next_slide;
		id_prev_slide = '#'+'slide' + num_prev_slide;
		
		slide = slides_сontainer.querySelector(id_active_slide);
		prev_slide = slides_сontainer.querySelector(id_prev_slide);
		
		if(slide){
			slide.classList.add('active_slide');
			prev_slide.classList.remove('active_slide');
		
			Left_Offset();
			slide_width = interval;
			Draw_Next_Slide();
		}else{

			if((carusel) || (autoplay)){
			
				first_slide.classList.add('active_slide');
				prev_slide.classList.remove('active_slide');
				
				slide_width = interval;
				Draw_Next_Slide();
			}
		}
		
		if(autoplay){
			clearInterval(carusel_interval);
			Autoplay_Slide();
		}
}

function Draw_Next_Slide() { 

	left_offset = slide_width + left_offset;
	intermediate_coordinate = '-' + left_offset + 'px';

	if((carusel) || (autoplay)){
		if(finite_coordinate == intermediate_coordinate){
			left_offset = 0;
		} 
		
	}else{
	
		if(finite_coordinate == intermediate_coordinate){
			right_arrow.style.display = 'none';
		} 
		else {
			right_arrow.style.display = 'block';
			left_arrow.style.display = 'block';
		}
	}
	
	slides.style.webkitTransform = 'translateX(-' + left_offset + 'px) translateZ(0)';
	slides.style.transform  = 'translateX(-' + left_offset + 'px) translateZ(0)';
	slides.style.transition = 'transform 0.5s linear';
	slides.style['-webkit-transition-duration'] = speed; 
}

function Draw_Prev_Slide() { 

	left_offset =  slide_width;
	
	if(carusel){
	
		if ((left_offset === 0) && (prev_slide.id == first_slide.id) ){
			left_offset = interval * (number_of_slides - 1);
		}
		
	}else{

		if (left_offset === 0) {
			left_arrow.style.display = 'none';
			right_arrow.style.display = 'block';
		}
		else {
			right_arrow.style.display = 'block';
			left_arrow.style.display = 'block';
		}
	}
	
	slides.style.webkitTransform  = 'translateX(-' + left_offset + 'px) translateZ(0)';
	slides.style.transform  = 'translateX(-' + left_offset + 'px) translateZ(0)';
	slides.style.transition = 'transform 0.5s linear';
	slides.style['-webkit-transition-duration'] = speed; 
}

function Prev_Slide () {

	num_next_slide = Math.round(left_offset / interval);
	num_prev_slide = Math.round(left_offset / interval + 1);

	id_active_slide = '#'+'slide' + num_next_slide;
	id_prev_slide = '#'+'slide' + num_prev_slide;

	slide = slides_сontainer.querySelector(id_active_slide);
	prev_slide = slides_сontainer.querySelector(id_prev_slide);
	
	if(slide){
		slide.classList.add('active_slide');
		prev_slide.classList.remove('active_slide');
	
		Left_Offset();
		slide_width =  left_offset - interval;
		Draw_Prev_Slide();
		
	}else{
		if((carusel) || (autoplay)){
			last_slide.classList.add('active_slide');
			first_slide.classList.remove('active_slide');
			
			slide_width = 0;
			Draw_Prev_Slide();
		}
	}

	if(autoplay){
		clearInterval(carusel_interval);
		Autoplay_Slide();
	}
}

function Left_Offset(){

	if (slides.style.transform === undefined){
		left_offset = slides.style.webkitTransform; 
	}
	else{
		left_offset = slides.style.transform; 
	}
	
	left_offset = left_offset.replace(/\D+/g,"");
	left_offset = left_offset.substring(0, left_offset.length - 1);
	left_offset = Number(left_offset);
}


function Mouse_Down( event ) {
	event.preventDefault();
	startX = event.clientX;
	slides_сontainer.addEventListener( 'mouseup', Mouse_Up, false );
} 

function Mouse_Up( event ) {

	endX = event.clientX;
	totalX = startX - endX;
	
	if(totalX !== 0){
		if(totalX < 0){
			Prev_Slide();
		}else{
			Next_Slide();
		}
	}
}

function Touch_Start( event ) {
	
	var touch = event.changedTouches [ 0 ];
	startX = touch.screenX;
	event.preventDefault();
}

function Touch_End( event ) {

	var touch = event.changedTouches [ 0 ];
	endX = touch.screenX;
	totalX = startX - endX;
	
	if(totalX < 0){
		Prev_Slide();
	}else{
		Next_Slide();
	}
	event.preventDefault();
}

	if ("ontouchstart" in document.documentElement){
		
		slides_сontainer.addEventListener( 'touchstart', Touch_Start,false );
		slides_сontainer.addEventListener('touchend', Touch_End, false );
	}
	else{
		slides_сontainer.addEventListener( 'mousedown', Mouse_Down, false );
	} 
		window.addEventListener( 'resize', Responsive, false );
		left_arrow.addEventListener( 'click', Prev_Slide, false );
		right_arrow.addEventListener( 'click', Next_Slide, false );

})();
