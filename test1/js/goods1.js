class Goods1 {
    constructor() {
        // 获取做吸顶效果的元素
        this.xiPro = document.querySelector('.xm-nav')
        // console.log(this.xiPro);

        // 获取关闭元素
        this.close = document.querySelector('#close')
        // console.log(this.close);

        // 获取做放大镜效果的元素外面的大盒子用于给页面添加内容
        this.scale = document.querySelector('.imgLeft')
        // console.log(this.scale);

        //获取顶部中间ul中的所有的li
        this.headerLis = document.querySelectorAll('.h-list>li')
        // console.log(this.headerLis);

        // 获取选择版本下的所有的li
        this.editionLis = document.querySelectorAll('#phoneEdition>li')
        // console.log(this.editionLis);
        // 获取手机版本下的input隐藏框
        this.editionInput = document.querySelector('#phoneEdition>input')
        // console.log(this.editionInput);

        // 获取选择颜色下的所有的li
        this.colorLis = document.querySelectorAll('#phoneColor>li')
        //   console.log(this.colorLis);
        // 获取选择颜色下的隐藏框
        this.colorInput = document.querySelector('#phoneColor>input')
        // console.log(this.colorInput);


        // 获取选择套餐下的所有的li
        this.packageLis = document.querySelectorAll('#phonePackage>li')
        // console.log(this.packageLis);
        // 获取选择套餐下的input隐藏域
        this.packageInput = document.querySelector('#phonePackage>input')
        // console.log(this.packageInput);

        // 获取手机版本颜色套餐对应内容存放位置的节点对象
        this.phoneEditionInfo = document.querySelector('#phoneEditionInfo')
        this.phoneColorInfo = document.querySelector('#phoneColorInfo')
        this.phonePackageInfo = document.querySelector('#phonePackageInfo')
        // console.log(this.phoneEditionInfo,this.phoneColorInfo,this.phonePackageInfo);


        // 获取分类页面购物车数量对应的节点
        this.sortCartNum=document.querySelector('#sortCartNum')
        // console.log(this.sortCartNum);
        // 获取 购物车对应的下拉列表
        this.cartMenu=document.querySelector('.cart-menu')
        // console.log(this.cartMenu);

        // 定义版本对应的价格
        this.editionPrice = 0

        // 定义套餐对应的价格
        this.packagePrice = 0

        // 给关闭这个a链接绑定事件
        this.close.addEventListener('click', this.closeFn.bind(this))

        // 吸顶效果函数调用
        this.fixed()

        // 调用通过idd获取的手机的单条数据方法
        this.getPhoneData()

        // 调用顶部鼠标移入时，所有的div显示、隐藏
        this.headerNav()

        // 调用获取选择的版本，颜色，套餐的函数
        this.getEditionInfo()

        //    获取减号和加号
        this.reduceNum = document.querySelector('#reduceNum')
        this.addNum = document.querySelector('#addNum')
        // console.log(this.reduceNum,this.addNum);
        // 给减号绑定事件
        this.reduceNum.addEventListener('click', this.reduceNumFn.bind(this))

        // 给加号绑定事件
        this.addNum.addEventListener('click', this.addNumFn.bind(this))

        // 获取加入购物车按钮，并给它绑定事件
        this.putIn=document.querySelector('.putin')
        this.putIn.addEventListener('click',this.putInFn.bind(this))


        // 调用获取购物车数量的函数
        this.getCartNum()

    }
    fixed() {
        let that = this
        // 绑定一个滚动事件
        window.onscroll = function () {
            // 兼容写法
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop >= 140) {
                that.xiPro.style.position = 'fixed'
                that.xiPro.style.top = 0
            } else {
                that.xiPro.style.position = ''
            }
        }
    }

    closeFn() {
        // console.log(111);
        // 当点击这个关闭按钮时，整个div删除
        // 获取整个div
        let allDetails = document.querySelector('.mi-details')
        // console.log(allDetails);
        // 自己删除自己
        allDetails.remove()
    }

    // 获取地址栏里面的查询字符串，进行分割得到它对应的id,
    // 再根据id去获取json文件里对应的数据渲染到页面
    async getPhoneData() {
        // 打印传递过来的查询字符串
        // console.log(location.search);//?id=1

        let url = location.search
        // 再把查询字符串以等号分割，得到传递过来的id
        let id = url.split('=')[1]
        // console.log(id); 获取到id

        // 通过id查询json里面对应的数据
        let {
            data
        } = await axios.get(' http://localhost:3000/data?id=' + id)
        // console.log(data);

        // 把获取到的数据渲染到页面上
        this.showPhoneData(data)

    }
    // 把获取的数据渲染到页面上的回调函数
    showPhoneData(data) {
        // console.log(data);//[{…}]
        // 定义一个变量用于保存内容
        // console.log(data[0].src);
        let html = ` <div class="smallBox">
        <img src="${data[0].src}" alt="">
        <span></span>
    </div>
    <div class="bigBox">
        <img src="${data[0].src}" alt="">
    </div>`

        // 把内容添加到页面上
        this.scale.innerHTML = html

        // 获取添加到页面中的元素
        let smallBox = document.querySelector('.imgLeft>.smallBox')
        // 获取小盒子里面的span
        let mask = document.querySelector('.smallBox>span')
        //   // 获取大盒子
        let bigBox = document.querySelector('.bigBox')
        //   // 获取大盒子里面的图片
        let pic = document.querySelector('.bigBox>img')
        // console.log(smallBox,mask,bigBox,pic);

        //  鼠标移入小盒子，大盒子出现，移动的小盒子出现 
        this.over(smallBox, mask, bigBox)
        //     // 鼠标移出，大盒子和移动的盒子隐藏
        this.out(smallBox, mask, bigBox)
        // //   当鼠标移动时，对图片进行放大
        this.move(smallBox, mask, bigBox, pic)

    }
    // 鼠标移入回调函数
    over(smallBox, mask, bigBox) {
        // 给小盒子绑定移入事件
        smallBox.onmouseover = function () {
            // console.log(111);
            // 大盒子显示，移动盒子显示
            mask.style.display = 'block'
            // bigBox.style.display = 'block'
        }
    }
    // 鼠标移出回调函数
    out(smallBox, mask, bigBox) {
        smallBox.onmouseout = function () {
            // console.log(111);
            // 大盒子显示，移动盒子显示
            mask.style.display = 'none'
            // bigBox.style.display = 'none'
        }
    }

    // 鼠标移动回调函数
    move(smallBox, mask, bigBox, pic) {
        // 给小盒子绑定鼠标移动事件
        smallBox.onmousemove = function (e) {
            // console.log(e);
            // 兼容写法
            e = e || window.event
        
            // 获取外面大盒子距离左边的距离
            let l=(document.querySelector('.imgLeft')).offsetLeft
            let t=(document.querySelector('.imgLeft')).offsetTop

            // 获取鼠标坐标，并且让鼠标居于移动盒子中间
            let x = e.pageX - l-mask.offsetWidth/2
            let y = e.pageY - t-mask.offsetHeight/2

            // console.log(x);
            //边界值判断
            if (x <= 0) {
                x = 0
            } else if (x >= smallBox.offsetWidth - mask.offsetWidth) {
                x = smallBox.offsetWidth - mask.offsetWidth
            }
            if (y <= 0) {
                y = 0
            } else if (y >= smallBox.offsetHeight - mask.offsetHeight) {
                y = smallBox.offsetHeight - mask.offsetHeight
            }
            //进行赋值
            mask.style.left = x + 'px'
            mask.style.top = y + 'px'

            //计算比例
            let w = x / (smallBox.offsetWidth - mask.offsetWidth)
            let h = y / (smallBox.offsetHeight - mask.offsetHeight)
            //给大图进行赋值操作
            pic.style.left = -w * (pic.offsetWidth - bigBox.offsetWidth) + 'px'
            pic.style.top = -h * (pic.offsetHeight - bigBox.offsetHeight) + 'px'
        }

    }


    // 头部nav显示隐藏
    headerNav() {

        // 因为只有下标为1-8的li中是有div，鼠标进入才会显示
        for (let i = 1; i <= 8; i++) {
            this.headerLis[i].onmouseover = function () {
                this.querySelector('.down-menu-wrapper').style.display = 'block'
            }

            // 鼠标移出
            this.headerLis[i].onmouseout = function () {
                this.querySelector('.down-menu-wrapper').style.display = 'none'
            }
        }
    }


    // 获取购买商品的信息，给小计和总计赋值
    async getEditionInfo() {
        let that = this
        // 循环选择版本下的所有的li
        for (let i = 0; i < this.editionLis.length; i++) {
            this.editionLis[i].onclick = function () {
                // console.log( that.editionLis[i].innerHTML.trim());
                // 拿选中的li的值作为变量去作比较，给对应的价格赋值,需要去除空格
                switch (that.editionLis[i].innerHTML.trim()) {
                    case '64G':
                        that.editionPrice = '64G'
                        break;
                    case '128G':
                        that.editionPrice = '128G'
                        break;
                    case '256G':
                        that.editionPrice = '256G'
                        break;
                    default:
                        break
                }
                //    把获取到的改变的值赋值给下方内容区域
                that.phoneEditionInfo.innerHTML = that.editionPrice
            }
        }


        for (let j = 0; j < this.packageLis.length; j++) {
            this.packageLis[j].onclick = function () {
                // console.log(111);
                // console.log(that.packageLis[j].innerHTML.trim());
                // 标准版价格就是选中的版本价格所以这里赋值为0
                // 豪华版再原来版本的基础上多200元
                switch (that.packageLis[j].innerHTML.trim()) {
                    case '标准版':
                        that.packagePrice = '标准版'
                        break;
                    case '通用豪华版(带充电器)':
                        that.packagePrice = '通用豪华版(带充电器)'
                        break;
                    default:
                        break
                }
                // 把获取到值赋值给隐藏文本域
                that.phonePackageInfo.innerHTML = that.packagePrice
            }
        }


        for (let k = 0; k < this.colorLis.length; k++) {
            this.colorLis[k].onclick = function () {
                //    把获取到的值赋值给隐藏文本域
                that.phoneColorInfo.innerHTML = that.colorLis[k].innerHTML.trim()
            }
        }

    }

    // 减号的回调函数
    reduceNumFn() {
        // console.log(111);
        // console.log(this);指向类实例化对象

        // console.log(this.reduceNum.nextElementSibling);
        // 获取减号的下一个兄弟节点，
        let numObj = this.reduceNum.nextElementSibling
        // console.log(numObj.value);
        // 如果数量为1就禁止点击减号
        if (numObj.value == 1) {
            this.reduceNum.disabled = true
        } else {
            // 获取节点里面的值，并且把值减1
            numObj.value = (numObj.value - 0) - 1
            // console.log(numObj.value);
        }
    }

    // 数量增加的回调函数
    addNumFn() {
        // console.log(111);

        // 获取它的上一个兄弟节点
        let numObj = this.addNum.previousElementSibling
        // console.log(numObj);

        // 获取节点中的值，并把值加1
        numObj.value = numObj.value - 0 + 1
    }

    // 需要传递参数id,和数量
    updateLocal(id, num) {
        // console.log(id,num);//获取到id和数量
        // 1.取出local中的数据
        let cartGoods = localStorage.getItem('cart')
        // console.log(cartGoods);

        //2.判断是否为空
        if (!cartGoods) return

        // 3.不为空则转化为js对象
        cartGoods = JSON.parse(cartGoods)
        // console.log(cartGoods);

        //如果数量为0，就删除local中对应的id
        // 删除对象属性
        if (num == 0) {
            delete cartGoods[id]

        }
        // console.log(cartGoods);

        // 如果不为0就修改local中商品的数量
        num != 0 && (cartGoods[id] = num)
        // console.log(cartGoods);

        // 然后把修改后的值设置到local数据中
        localStorage.setItem('cart', JSON.stringify(cartGoods))

    }

    // 加入购物车的回调函数
    putInFn(){
        // console.log(1111);
        // 当点击加入购物车时，获取所有的版本信息和数量。然后跳转到购物车页面

        // 获取手机版本信息
        let editionRes=this.phoneEditionInfo.innerHTML
        let colorRes=this.phoneColorInfo.innerHTML
        let packageRes=this.phonePackageInfo.innerHTML
        // console.log(editionRes,colorRes,packageRes);

        // 获取数量，和查询字符串中的id

        let numObj=document.querySelector('#cartNum')
        // console.log(numObj.value);

          // 获取查询字符串中的传递的参数
          let str = location.search
          // console.log(str);//?id=2
  
          //再以等号分割取第1个
          let id = str.split('=')[1]
          // console.log(id);
  
          // 把id和数量传递给修改local中数据的函数
          this.updateLocal(id, numObj.value)

        //   获取加入购物车div中的a链接
        let aObj=document.querySelector('.putin>a')
        // console.log(aObj);

        // 给a链接设置链接
        aObj.href='./cart.html'
    }


    // 获取local中对象数据的长度赋值给span的内容
    getCartNum(){
        // 获取local中cart这个对象中数据长度
        let res=localStorage.getItem('cart')
        // console.log(res);//null,有的话res是一个对象
        // 把json数据转化为js对象
        res=JSON.parse(res)

        // 判断购物车是否有数据
        if(!res){//没有数据
            // console.log(111);
            this.sortCartNum.innerHTML='(0)'
            this.cartMenu.innerHTML='购物车中还没有数据，快去下方添加吧'
            this.cartMenu.style.display='block'
        }else{//如果有数据，就计算数据条数
            let len=Object.getOwnPropertyNames(res).length
            // console.log(len);
            this.sortCartNum.innerHTML='('+len+')'
            this.cartMenu.style.display='none'
        }
    }


}
new Goods1