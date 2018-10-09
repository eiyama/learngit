var swiper = (function(){
    var timer = null;
    return {
        init: function(ele) {
            // 判断ele是否为dom对象,还是类名,如果是类名,就转换为dom对象
            if(typeof ele == 'string') {
                ele = document.querySelector(ele);
            }
            this.$ele = ele;
            // 找到小圆圈的盒子
            this.$tipBox = ele.querySelector('.banner-tip');
            // 获取所有小圆圈
            this.$tipLiAll = this.$tipBox.children;
            this.$preBtn = ele.querySelector('#left_btn');
            this.$nextBtn = ele.querySelector('#right_btn');
            // 获取所有的图片li
            this.$bannerBox = ele.querySelector('.banner-image');
            this.$bannerLiAll = this.$bannerBox.children;
            // 克隆第一张放到最后面,克隆最后一张放到最前面
            var first = this.$bannerLiAll[0];
            var last =  this.$bannerBox.lastElementChild;
            this.$bannerBox.appendChild(first.cloneNode(true));
            this.$bannerBox.insertBefore(last.cloneNode(true), first);
            this.$bannerBox.style.left = '-1920px';
            for(var i = 0; i <  this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].index = i;
            }
            // 当前展示图片的索引
            this.index = 0;
            this.event();
             this.autoPlay();
        },
        event: function() {
            var _this = this;
            this.$tipBox.onclick = function(e) {
                // 利用事件委托,给.banner-tip下面的所有小圆点添加单击事件
                e = e || window.event;
                // 获取目标元素
                var target = e.target || e.srcElement;
                if(target.nodeName == 'LI') {

                    _this.showImage(target.index);
                }
            };
            this.$preBtn.onclick =function() {
                _this.showImage(--_this.index);
            }
            this.$nextBtn.onclick = function() {
               _this.showImage(++_this.index);
            }
        },
        showImage: function(index) {
            var maxIndex = this.$tipLiAll.length - 1;
            if(index > maxIndex) {
                index = 0;
                this.$bannerBox.style.left = 0;
            } else if(index < 0) {
                index = maxIndex;
                this.$bannerBox.style.left = -1920 * (maxIndex + 2) + 'px';
            }
            // 展示哪一张图片,对应的全局索引就变成对应图片的索引
            this.index = index;
            // 移出所有小圆圈的class
           
            for(var i = 0; i < this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].removeAttribute('class');
            }
            // 给对应的小圆圈添加class
            this.$tipLiAll[index].className = 'active';
            move(this.$bannerBox, 'left', -1920 * (index + 1));
        },
        autoPlay(index) {
            clearInterval(timer);
            index = index || 0;
            timer = setInterval(() => {
                index++;
                if(index > 5) {
                    index = 0;
                }
                this.showImage(index);
            }, 2000)
        }
    }
}())