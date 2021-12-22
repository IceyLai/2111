//获取json文件中的数据，如果存在则登录成功调转到首页
class Login{
    constructor(){
        // 获取所有的input
        this.inputList=this.getElements('.mi-form input')
        // console.log(this.inputList);

        // 给登录按钮绑定事件
        this.inputList[2].addEventListener('click',this.loginFn.bind(this))

     
    }
    // 登录事件回调函数
    async loginFn(){
        // console.log(1111);
        // console.log(this);//指向这个类实例化对象

        // 点击登录按钮时，获取查询字符串
         // console.log(location.search);//?cartLength=2
         let cartLength=location.search
        
         // 再以等号分割
         cartLength=cartLength.split('=')[1]
         // console.log(cartLength);//如果是首页跳转过来没有传递参数，结果为：undefined，如果是购物车页面跳转过来的传递了参数，结果为：购物车数据长度，是一个非0数字

          // 获取手机号码,和密码
        let phoneNum=this.inputList[0].value
        let pwd=this.inputList[1].value
        // console.log(phoneNum,pwd);

        // 点击登录时获取文本的值与json文件的数据匹配，如果有就登录
        // 获取是否存在这个电话号码对应的数据
        let {data}=await axios.get('http://localhost:3000/user?phone='+phoneNum)
        // console.log(data);

        // 如果存在这个号码就判断密码是否正确
        if(data.length!=0){
            // console.log(data[0].password);
            if(data[0].password==pwd){
                // 登录成功再local中保存一个状态，再其它页面也能共享
               localStorage.setItem('isLogin','true')
            //    再cookie中设置一个值，用于清除local中的值,当关闭浏览器时，就会自己清除
            document.cookie="clearLocal=true"
            //    链接跳转到首页，并把购物车长度传递到首页
                location.href='./index1.html?cartLength='+cartLength

            }else{
                alert('密码不正确')
            }
        }

        // 循环把文本框清空
        for(let i=0;i<this.inputList.length-1;i++){
            this.inputList[i].value=''
        }
      
    }


    


     //获取单个元素
     getEle(ele) {
        return document.querySelector(ele)
    }

    // 获取多个元素
    getElements(ele) {
        return document.querySelectorAll(ele)
    }
}
new Login