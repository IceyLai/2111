// 获取注册文本框中的内容，匹配正则表达式，再将数据存放在localstorage中
class register {
    constructor() {
        //   获取手机号
        this.phone = this.getEle('.input-id')
        // console.log(this.phone);
        //获取输入的密码
        this.pwd = this.getEle('.input-psd')
        // 获取确认密码框
        this.surePwd = this.getEle('.input-cpsd')
        // 获取邮箱
        this.email = this.getEle('.eml')
        // console.log(this.pwd,this.surePwd,this.email);

        // 获取注册按钮
        this.btn = this.getEle('.input-sub')
        // console.log(this.btn);

        // 获取form表单下所有的input框
        this.inputList = this.getElements('.mi-form input')
        // console.log(this.inputList);

        // 定义一个空数组
        this.arrInfo = []

        // 给注册按钮绑定监听事件
        this.btn.addEventListener('click', this.registerFn.bind(this))


    }

    // 当点击注册按钮时，获取文本框的值，利用正则进行判断
    registerFn() {
        // console.log(1111);
        // console.log(this);//This指向类实例化对象

        // 获取文本框的值
        let phoneNum = this.phone.value
        let pwd = this.pwd.value
        let surePwd = this.surePwd.value
        let email = this.email.value


        // // 判断是否为空，为空则结束这个函数
        if (!phoneNum || !pwd || !surePwd || !email) {
            alert('手机号，密码，邮箱不能为空')
            return
        }

        // 定义手机号，密码，邮箱的正则表达式
        let phoneReg = /^1[3-9]\d{9}$/
        // 密码是6-18位数字
        let pwdReg = /^[0-9]{6,18}$/
        // qq邮箱
        let emailReg = /[1-9]\d{7,10}@qq\.com/

        // 确保输入的密码和再次输入的密码相等
        // console.log(pwd==surePwd);

        if (phoneReg.test(phoneNum) && pwdReg.test(pwd) && emailReg.test(email) && pwd == surePwd) {
            // console.log(phoneNum,pwd,surePwd,email);
            // 判断手机号或者是邮箱是否注册过
            this.getJsonData(phoneNum, pwd, email)


        } else {
            alert('请检查一下你的手机号，密码，和邮箱格式')
        }

        // 跳转后文本框内容清空
        // 循环前面4个input框，把内容清空
        for (let i = 0; i < this.inputList.length - 1; i++) {
            this.inputList[i].value = ''
        }

    }

    // 把注册的账号保存在创建的json文件中
    addJson(phoneNum, pwd, email) {
        let data = `phone=${phoneNum}&password=${pwd}&email=${email}`;
        // 1.创建ajax对象
        let xhr = new XMLHttpRequest()
        // 2.设置请求 xhr.open('het/post','url',异步/同步)，第三个参数可以不写
        xhr.open('post', 'http://localhost:3000/user')
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        // 3.发送请求  xhr.send()
        xhr.send(data)

    }


    // 使用get方式获取json中的数据，用于判断是否注册过
    async getJsonData(phoneNum, pwd, email) {

        // 这里可以传递一个参数，获取是否有这条数据
        let {
            data
        } = await axios.get(' http://localhost:3000/user?phone=' + phoneNum)
        // console.log(data);
      

        // 如果data有值，就说明已经存在这条数据
        if (data) {
            layer.open({
                content: '账号已经注册请直接登录',
                // 按钮
                btn: ['关闭', '好的'],
                // 好的这个按钮的回调事件
                btn2: function (index, layero) {
                    location.href = './login2.html'
                }
            });
        }else{
            // 没有值就把这条数据添加到json文件中
            this.addJson(phoneNum, pwd, email)
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
new register