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

        // 给关闭这个a链接绑定事件
        this.close.addEventListener('click', this.closeFn.bind(this))

        // 吸顶效果函数调用
        this.fixed()

        // 调用通过idd获取的手机的单条数据方法
        this.getPhoneData()

        // 调用顶部鼠标移入时，所有的div显示、隐藏
        this.headerNav()

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
        } = await axios.get('http://localhost:3000/phone?id=' + id)
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
        // console.log(smallBox,mask,bigBox);
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

            // 获取鼠标坐标，并且让鼠标居于移动盒子中间
            let x = e.clientX - smallBox.offsetParent.offsetLeft - mask.offsetWidth / 2
            let y = e.clientY - smallBox.offsetParent.offsetTop - mask.offsetHeight / 2

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
}
new Goods1