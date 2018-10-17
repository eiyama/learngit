 var big = (function(){
        
          return {
            init: function() {
              // 获取最大的盒子
              this.$box = document.querySelector('.box');
              // 获取展示图片的盒子
              this.$showImage = this.$box.querySelector('.show-image');
              // 获取放大图片的盒子
              this.$showBigImage = this.$box.querySelector('.show-big-image');
              // 获取小图片的盒子
              this.$ulbox = this.$box.querySelector('.img-box');
              // 获取每一张图片的li集合
              this.$liAll = this.$ulbox.children;
              // 获取移动的小黑块(放大镜)
              this.$filter = this.$showImage.querySelector('.filter');
              // 给每一li添加索引， 方便获取
              for(var i = 0; i < this.$liAll.length; i++) {
                this.$liAll[i].index = i;
              }

              this.event();

            },
            event: function() {
              var _this = this;
              // 利用事件委托，给每一个li添加点击事件
              this.$ulbox.onclick = function(ev) {
                console.log(1)
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                console.log(target.nodeName);
                // 点击时，真正触发的为图片。
                if(target.nodeName === 'IMG') {
                  // 获取li的索引 =》target.parentNode.index
                  // 点击触发更换图片
                  _this.showImage(target.parentNode.index)
                }
              }

              // 这里用onmouseenter： 子元素不触发事件
              this.$showImage.onmouseenter = function() {
                // 放大镜显示
                _this.$filter.style.display = 'block';
                // 展示大图片显示
                _this.$showBigImage.style.display = 'block';
              }
              this.$showImage.onmouseleave = function() {
                _this.$filter.style.display = 'none';
                _this.$showBigImage.style.display = 'none';
              }
              this.$showImage.onmousemove = function(ev) {
                ev = ev || window.event;
                // 计算小方块定点坐标
                var x = ev.clientX - this.offsetLeft - _this.$filter.offsetWidth;
                var y = ev.clientY - this.offsetTop - _this.$filter.offsetHeight*1.5;
                // 获取小方块移动的最大坐标
                var maxL = this.clientWidth -  _this.$filter.offsetWidth,
                maxT = this.clientHeight - _this.$filter.offsetHeight;
                if(x >= maxL) {
                  x = maxL
                } else if(x <=0 ) {
                  x = 0;
                }
                if(y >= maxT) {
                  y = maxT;
                } else if( y <= 0 ) {
                  y = 0;
                }
                _this.$filter.style.left = x + 'px';
                _this.$filter.style.top = y + 'px';

                // 移动大图片的位置， 放大三倍
                var img = _this.$showBigImage.querySelector('img'); 
                img.style.left = -3 * x + 'px';
                img.style.top = -3 * y + 'px';
              }
            },
            showImage: function(index) {
              console.log(index);
              for(var i = 0; i < this.$liAll.length; i++) {
                this.$liAll[i].className = ''
              }
              this.$liAll[index].className = 'active';
              // 修改对应的图片地址
              var src = this.$liAll[index].querySelector('img').getAttribute('src');
              this.$showImage.querySelector('img').src = src.replace('small', 'big');
              this.$showBigImage.querySelector('img').src = src.replace('small', 'largest');
              console.log(src);
            }
          }
          
        }())