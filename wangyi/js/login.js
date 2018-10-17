
var login = (function(){
    return { 
        init: function(ele) {
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
             this.$loginBtn=   this.$ele['login-btn'];
   this.$usernameInp = this.$ele['username'];
            this.$passwordInp = this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
           
            // 提交按钮
            this.$loginBtn.onclick = function() {

                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        console.log(data);
                        // data=JSON.stringify(data);
                         data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                sendAjax('php/login.php', params);
            }
         },
         
        loginSuccess: function(data) {
                  // console.log(data);
            if(data.code == 200) {
                // document.cookie = "user-id=" + data.data.id;
                // document.cookie = "token=" + data.data.token;
                //  localStorage.userImg = data.data.ataver;
                  location.href = 'index.html';
            } else {           
                       // console.log(data);
                alert(data.msg);
            }
        }
    }

}())
