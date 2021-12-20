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
               localStorage.setItem('isLogin',JSON.stringify('true'))
                location.href='./index1.html'

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