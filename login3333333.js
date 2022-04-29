class Login {
  constructor() {

    this.$('.login-w .over').addEventListener('click', this.clickFn.bind(this))
  }


  clickFn() {
    let forms = document.forms[0].elements;
    let username = forms.uname.value;
    let password = forms.password.value
    console.log(username, password);
    //自己设置报错
    if (!username.trim() || !password.trim())
      throw new Error('不能为空');





    //通过axios请求服务器


    //设置请求头
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //对传递的参数编码
    let data = `username=${username}&password=${password}`;




    //查出服务器接口 
    //查axios文档axios.post(url[, data[, config]])
    axios.post('http://localhost:8888/users/login', data).then(res => {
      let {
        status,
        data
      } = res;
      console.log(data);
      //判定是否状态参数
      if (status == 200) {
        if (data.code == 1) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user_id', data.user.id);




          //从哪里来,滚回哪里去
          location.assign(location.search.split('=')[1])


          //登录失败的的,,,有提示框,,,,下载插件layer
        } else {

          //引入插件特效
          (function func5() {
            //墨绿深蓝风
            layer.alert('您输入的账户密码有误', {
              skin: 'layui-layer-molv' //样式类名
                ,
              closeBtn: 0
            }, function () {
              layer.alert('小伙子,,,认真填写!!!', {
                skin: 'layui-layer-lan',
                closeBtn: 0,
                shift: 4 //动画类型
              });
            });
          })();
        }
      }
    })
  }

  //获取节点的方法
  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }

}



new Login;