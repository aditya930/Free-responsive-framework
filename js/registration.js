/*
Responsive framework
author: Developed by Stas Melnikov. http://stas-melnikov.ru
*/

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
			});
		}
	});
})(jQuery);