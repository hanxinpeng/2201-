class Cart {
    constructor() {
        this.checkLogin();
        this.getCartGoods();
        this.bindEve();
    }
    //绑定事件
    bindEve() {
        //绑定删除
        this.$('.cart-list').addEventListener('click', this.distributeEve.bind(this))
    }

    //进入购物车前,,,必须登录
    async checkLogin() {

        //Auth = Authorization = 授权  
        //Key = Token = 令牌 （验证后服务器返回的令牌，在验证环节保存下来的)
        const TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = TOKEN;


        //服务器文档接口  获取用户详细信息
        let userId = localStorage.getItem('user_id');
        let {
            data,
            status
        } = await axios.get('http://localhost:8888/users/info/' + userId);

        //如果信息不返回登录页面
        if (!TOKEN || data.code == 401) {
            location.assign('./login.html?ReturnUrl=./cart.html')
        }
    }




    //获取数据,,,文档接口
    async getCartGoods() {
        const TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = TOKEN;


        let userId = localStorage.getItem('user_id');
        let {
            data,
            status
        } = await axios.get('http://localhost:8888/cart/list?id=' + userId);
        // console.log(data);


        //非200,,跳转登录
        if (status == 200) {
            if (data.code == 401) location.assign('./login.html?ReturnUrl=./cart.html')


            //接口正确,,,,动态添加数据
            if (data.code == 1) {
                let html = '';
                // console.log(data.cart);
                data.cart.forEach(goods => {
                    html += `<ul data-id="${goods.goods_id}" class="goods-list yui3-g">
                  <li class="yui3-u-3-8 pr">
                      <input type="checkbox" class="good-checkbox">
                      <div class="good-item">
                          <div class="item-img">
                              <img src="${goods.img_small_logo}">
                          </div>
                          <div class="item-msg">${goods.title}</div>
                      </div>
                  </li>
                  <li class="yui3-u-1-8">
                     
                  </li>
                  <li class="yui3-u-1-8">
                      <span class="price">${goods.price}</span>
                  </li>
                  <li class="yui3-u-1-8">
                      <div class="clearfix">
                          <a href="javascript:;" class="increment mins">-</a>
                          <input autocomplete="off" type="text" value="${goods.cart_number}" minnum="1" class="itxt">
                          <a href="javascript:;" class="increment plus">+</a>
                      </div>
                      <div class="youhuo">有货</div>
                  </li>
                  <li class="yui3-u-1-8">
                      <span class="sum">${goods.price * goods.cart_number}</span>
                  </li>
                  <li class="yui3-u-1-8">
                      <div class="del1">
                          <a href="javascript:;">删除</a>
                      </div>
                      <div>移到我的关注</div>
                  </li>
              </ul>`;
                });
                this.$('.cart-list').innerHTML = html;
            }
        }
    }



    //删除条目
    distributeEve({
        target
    }) {
        if (target.parentNode.classList.contains('del1')) {
            //点击删除,,封装函数
            this.delGoods(target);

        }
    }
    //封装函数
    delGoods(target) {
        // console.log(this);

    }




    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}


new Cart();