class List {
  constructor() {
    this.getData();
    this.$('.sk_bd ul').addEventListener('click', this.addCartFn.bind(this))

  }

  //获取响应体
  // async getData() {
  // let res = await axios.get('http://localhost:8888/goods/list?current=1')
  // console.log(res);


  //获取动态渲染页面
  async getData() {
    let {
      data,
      status
    } = await axios.get('http://localhost:8888/goods/list?current=1')
    if (status == 200) {
      let html = '';
      data.list.forEach(goods => {
        html += `<li class="sk_goods" data-id="${goods.goods_id}">
          <a href="detail.html"><img src="${goods.img_big_logo}" alt=""></a>
          <h5 class="sk_goods_title">${goods.title}</h5>
          <p class="sk_goods_price"><em>¥${goods.current_price}</em> <del>￥${goods.price}</del></p>
          <div class="sk_goods_progress">
              已售<i>${goods.sale_type}</i>
              <div class="bar">
                  <div class="bar_in"></div>
              </div>
              剩余<em>${goods.goods_number}</em>件
          </div>
          <a href="#none" class="sk_goods_buy">立即抢购</a>
      </li>`;
      });
      this.$('.sk_bd ul').innerHTML = html;
    }
  }




  //链接购物车
  async addCartFn(eve) {
    // console.log(this);
    // console.log(eve.target);
    let token = localStorage.getItem('token')
    if (!token) location.assign('/login.html?ReturnUrl=/list.html')


    //获取两个Id
    if (eve.target.classList.contains('sk_goods_buy')) {

      let lisObj = eve.target.parentNode;
      let goodsId = lisObj.dataset.id
      console.log(goodsId);
      let userId = localStorage.getItem('user_id');

      if (!userId || !goodsId) throw new Error('商品或者用户Id有问题');



      //post请求头
      axios.defaults.headers.common['authorization'] = token;
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';


      //post参数设置
      let param = `id=${userId}&goodsId=${goodsId}`;


      // 获取数据
      let {
        data,
        status
      } = await axios.post('http://localhost:8888/cart/add', param);
      // console.log(data);


      //code简单验证
      if (status == 200 && data.code == 1) {

        //layer插件
        layer.open({
          content: '加入购物成功',
          btn: ['去购物车结算', '留在当前页面'],
          yes: function (index, layero) {
            // 按钮【按钮一】的回调
            location.assign('./cart.html')
          },
          btn2: function (index, layero) {
            //按钮【按钮二】的回调
            //return false 开启该代码可禁止点击该按钮关闭
          }
        })
      }




    }

  }






  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }


}
new List()