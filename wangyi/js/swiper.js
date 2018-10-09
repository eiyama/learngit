var swiper = (function(){
    var timer = null;
    return {
        init: function(ele) {
            if(typeof ele == 'string') {
                ele = document.querySelector(ele);
            }
            
            this.ele = ele;
            this.$tipBox = ele.querySelector('.banner-tip');
            this.$tipLiAll = this.$tipBox.children;
            // 给每一个小圆圈添加索引
            for(var i = 0; i < this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].index = i;
            }
            this.event();
            this.autoPlay();
        },
        event: function() {
            var _this = this;
            _this.$tipBox.onclick =function(ev) {
                ev = ev || window.event;
                // 获取目标元素
                var target = ev.target || ev.srcElement;
                if(target.nodeName == 'LI') {
                    // 直接获取小圆圈的索引
                    // target.index
                    _this.showImage(target.index);
                    _this.autoPlay(target.index);
                }
                
            }
        },
        showImage: function(index) {
            index = index || 0;
            for(var i= 0; i < this.$tipLiAll.length; i++) {
                // this.$tipLiAll[i].className = '';
                // 删除class属性
                this.$tipLiAll[i].removeAttribute('class');
            }
            this.$tipLiAll[index].className = 'active';
            move('.banner-image', 'left', -670 * index);
            // move('.banner-image', {left: -670 * index}, 500);
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