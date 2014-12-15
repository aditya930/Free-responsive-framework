/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/

(function($){
		var wrapper_response = $('#wrapper_response'),
		
		form = $('#login'),
		nickname_login = form.find('#nickname_login'),
		password = form.find('#password'),
		button = form.find('#button_login');
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
			});
		}
	});
})(jQuery);