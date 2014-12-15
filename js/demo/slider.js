/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/

(function(){ 
	/* 
		1 - very slow
		5 - slow
		10 - middle
		20 - fast
		25 - very fast
	*/
var speed = 10,
	responsive = true,

	startX,
	endX,
	
	slideshow = document.querySelector('#slideshow'),
	slides_сontainer = slideshow.querySelector('#slidesContainer'),
	left_arrow = slideshow.querySelector('#leftControl'),
	right_arrow = slideshow.querySelector('#rightControl'),
	slides = slides_сontainer.querySelector('#slideInner'),
	
	slide_width = slides_сontainer.offsetWidth,
	interval = slide_width,
	number_of_slides = slides.children.length,
	left_offset = slides.style.marginLeft,
	
	initial_coordinate = 0 + "px",
	finite_coordinate = (-slide_width * (number_of_slides-1)) + "px";
	
	var timerId_0 = false;
	
	left_arrow.style.display = 'none';
	slides.style.width = slide_width * number_of_slides + "px";
	
function Resize(){
	clearTimeout(timerId_0);
	timerId_0 = setTimeout(function () {
	
		prev_width = slides.offsetWidth;
		slide_width = slides_сontainer.offsetWidth;
		interval = slide_width;
		
		current_width = slide_width * number_of_slides;
 		slides.style.width = current_width + "px";
		
		last_slide = slide_width * (number_of_slides-1);
		finite_coordinate = (-last_slide) + "px"; 
		
		//Left_Offset();
		num_slide =  (100 * left_offset) / prev_width; 

		if(left_offset == 0){
			left_offset =  0;
		}
		
		else if ( (left_offset > 0) && (left_offset < last_slide ) ) {
			left_offset = (current_width * num_slide) / 100;
		}
		
		else{
			left_offset = slide_width * (number_of_slides - 1);
			right_arrow.style.display = 'none';
		}

			slides.style.marginLeft = (-left_offset) + "px";
	},10)
}	

function Next_Slide () {

	var id_active_slide,id_prev_slide, num_next_slide, num_prev_slide;
		
		num_next_slide = left_offset / interval + 2;
		num_prev_slide = left_offset / interval + 1;

		id_active_slide = '#'+'slide' + num_next_slide;
		id_prev_slide = '#'+'slide' + num_prev_slide;
		
		slide = slides_сontainer.querySelector(id_active_slide),
		prev_slide = slides_сontainer.querySelector(id_prev_slide);
		
		if(slide){

			Left_Offset();
			slide_width = interval + left_offset;
			
			function Draw_Slider() { 
			
				if (left_offset < slide_width) {
					left_offset = left_offset + speed;
					slides.style.marginLeft = (-left_offset) + 'px';

				}else{
					Stop(timer);
					
					slide.classList.add('active_slide');
					prev_slide.classList.remove('active_slide');
					
					if(finite_coordinate == intermediate_coordinate){
						right_arrow.style.display = 'none';
					} 
					else {
							right_arrow.style.display = 'block';
							left_arrow.style.display = 'block';
					}
				}
			}
			var timer = setInterval(Draw_Slider, 1);
		}
}

function Prev_Slide () {

	var id_active_slide,id_prev_slide, num_next_slide, num_prev_slide;

		num_next_slide = left_offset / interval;
		num_prev_slide = left_offset / interval + 1;
		
	
		id_active_slide = '#'+'slide' + num_next_slide;
		id_prev_slide = '#'+'slide' + num_prev_slide;

		slide = slides_сontainer.querySelector(id_active_slide),
		prev_slide = slides_сontainer.querySelector(id_prev_slide);
		
		if(slide){
	
			Left_Offset();
			slide_width =  left_offset - interval;
			
			function Draw_Slider() { 
			
				if (left_offset > slide_width) {
					left_offset = left_offset - speed; 
					slides.style.marginLeft = (-left_offset) + 'px';
				}else{
				
					Stop(timer);
					
					slide.classList.add('active_slide');
					prev_slide.classList.remove('active_slide');
					
					if(intermediate_coordinate == initial_coordinate){
						left_arrow.style.display = 'none';
						right_arrow.style.display = 'block';
					}
					else {
						right_arrow.style.display = 'block';
						left_arrow.style.display = 'block';
					}
				}
			}
			var timer = setInterval(Draw_Slider, 1);
		}
}

function Left_Offset(){
	left_offset =slides.style.marginLeft.replace(/px/g, '');
	left_offset = left_offset.replace(/-/g, '');
	left_offset =Number(left_offset)
}

function Stop(timer){
	clearInterval(timer); 
	intermediate_coordinate = slides.style.marginLeft;
}

function Mouse_Down( event ) {
	event.preventDefault();
	startX = event.clientX;
	slides_сontainer.addEventListener( 'mouseup', Mouse_Up, false );
} 

function Mouse_Up( event ) {

	endX = event.clientX;
	totalX = startX - endX;
	
	if(totalX != 0){
		if(totalX < 0){
			Prev_Slide();
		}else{
			Next_Slide();
		}
	}
}

function Touch_Start( event ) {
	
	var touch = event.touches[ 0 ];
	startX = touch.screenX;
}

function Touch_End( event ) {

	var touch = event.touches[ 0 ];
	endX = touch.screenX;
	totalX = startX - endX;
	
	if(totalX != 0){
		if(totalX < 0){
			Prev_Slide();
		}else{
			Next_Slide();
		}
	}
}

if ("ontouchstart" in document.documentElement){
	
	/*slides_сontainer.addEventListener( 'touchstart', Touch_Start,false );
	slides_сontainer.addEventListener('touchmove', Touch_End, false );*/
}
else{
	slides_сontainer.addEventListener( 'mousedown', Mouse_Down, false );
}

if(responsive){ 
	window.addEventListener( 'resize', Resize, false );
}

left_arrow.addEventListener( 'click', Prev_Slide, false );
right_arrow.addEventListener( 'click', Next_Slide, false );


var enable = document.querySelector('#buy'),
	msg = 'BANNED',
	container = document.createElement('div');
	
if(!enable)	{
	document.body.children[0].parentNode.removeChild(document.body.children[0]);
	slideshow.parentNode.removeChild(slideshow);
	document.body.children[0].parentNode.removeChild(document.body.children[0]);
	document.body.appendChild(container);
	container.innerHTML = msg;
}
})();
