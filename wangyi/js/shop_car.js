var shopCar = (function () {

    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getShopListData();
        },
        event: function () {
            var _this = this;
        },
        // 获取所有商品信息
        getShopListData: function () {
            var _this = this;
            var params = {
                success: function (data) {
                    data = JSON.parse(data);
                    _this.shopList = data.data;
                    _this.getCarList();
                    // _this.insertShopList(data.data);
                }
            }
            sendAjax('json/shop.json', params);
        },
        getCarList: function () {
if(localStorage.shopList){
        console.log(localStorage.shopList);
            this.carList = JSON.parse(localStorage.shopList);  
            for(var i = 0; i <  this.shopList.length; i++) {
                for(var j = 0; j < this.carList.length; j++) {
                    if(this.shopList[i].id == this.carList[j].id) {
                        Object.assign(this.carList[j], this.shopList[i]);
                        break;
                    }
                }
            }
            this.countPrice(this.carList);
            this.insertCarList(this.carList);
        }
        else{
            var arr=[];
            arr.push(`<div  class="nothing">
                        您的购物车空空如也！
                    </div>`);
              this.$ele.innerHTML = arr.join('');
        }
    },
        // 计算总价
        countPrice: function(arr) {
           arr = arr.map(x => {
               return x.countPrice = x.price * x.count;
           })
        },
        // 把购物车数据渲染到页面中
        insertCarList: function (data) {
            var arr = [];
            // var shop;        
            console.log(this.shopList)

            for (var i = 0; i < data.length; i++) {
                arr.push(`<div class='shop_detalis'>
                        <img src="img/b0bd91f68a704542948e4842183d77741520225281202jedqvq8o10237.jpg" id="images">
                          <div class="_shop">商品名称:<span class="shop-name">${data[i].name}</span><br  />
                        数量: <input class="sho_count" type="number" value="${data[i].count}" /><br />
                        价格: <span class="sho_price">${data[i].price}</span><br  />
                        商品总价: <span class="sho_total">${data[i].countPrice}</span><br />
                        商品提示: <span class="shop-tip">${data[i].ps}</span>
                        <button class="btn shop-btn-del" attr-index="${i}">删除</button>
                        <button class="sub pay">确定</button></div>
                    </div>`);

            }
            this.$ele.innerHTML = arr.join('');
            var $shop_detalis=document.querySelector(".shop_detalis");
            var $shop_price=document.querySelector(".sho_price");
            var $btn=document.querySelector('.btn');
            var $sub=document.querySelector('.sub');
            var $shop_total=document.querySelector('.sho_total');
            var $input=document.querySelector(".sho_count");
                    console.log($input.value)
            $btn.onclick=function(){
                $shop_detalis.style.display="none";
                localStorage.clear()
            }    

            $sub.onclick=function(data){
                    var arr=localStorage.shopList;
                    arr=JSON.parse(localStorage.shopList);
                console.log( arr);
             for(var i=0;i<arr.length;i++){
                    for(var j in arr[i]){
                        arr[i].count=$input.value;
                         console.log(arr[i][j]);
                             }
                    }
                localStorage.shopList=JSON.stringify(arr);  
                console.log(_total)
                  var _price=$shop_price.innerHTML;
            // console.log(_price);
            var _total=_price*$input.value;
         $shop_total.innerHTML=_total.toString();

            }
        },
    }
}())