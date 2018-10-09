			var $login_form2=document.querySelector('#login_form2');
			var $password_login=document.getElementById('password_login_a');
			var $login_form1=document.querySelector('#login_form1');
			var $login_main=document.querySelector('.login_main');
			var $login_form3=document.querySelector('#login_form3');
			var $head2=document.querySelector('#head2')
				var $head1=document.querySelector('#head1')
			$head2.onclick=function(){
				console.log(1)
				$login_form1.style.display="none";
				$login_form3.style.display="block"
				$login_form2.style.display="none";
			}
			$head1.onclick=function(){
				$login_form1.style.display="block";
				$login_form2.style.display="none";
				$login_form3.style.display="none";
			}
			$password_login.onclick=function(){
				console.log(1)
				$login_form1.style.display="none";
				$login_form2.style.display="block";
				$login_form3.style.display="none";
			}
			