class Index {
    constructor() {
        // 获取手机详情内容
        this.items = document.querySelector('.items')

        // 获取需要做吸顶效果的元素
        this.loft = document.querySelector('.home-loft')
        // console.log(this.loft);

        // 获取左侧导航栏中所有的li
        this.liList = document.querySelectorAll('.l-list>li')
        // console.log(this.liList);

        //获取顶部中间ul中的所有的li
        this.headerLis=document.querySelectorAll('.h-list>li')
        // console.log(this.headerLis);

        // console.log(this.items);
        this.showData()

        //   吸顶效果实现
        this.fixed()

        // 左侧导航栏div显示与隐藏
        this.showNav()

        // 调用顶部鼠标移入时，所有的div显示、隐藏
        this.headerNav()
    }
    // 发送ajax请求获取数据
    async showData() {
        let data = await axios.get({
            url: './js/phone.json',
            data: {}
        })
        // console.log(data);

        // 定义一个变量
        let html = ''

        // 循环数组
        data.forEach(ele => {
            // console.log(ele.nowPrice);
            html += `<a href="sort.html">
            <li class="item">
                <img src="${ele.src}" class="pic" alt="">
                <h3 class="item-name">${ele.name}</h3>
                <p class="item-info">${ele.info}</p>
                <p class="item-price">
                    <span class="present-price">${ele.nowPrice}</span>
                    <span class="primary-price">${ele.oldPrice}</span>
                </p>
            </li>
        </a>`
        });
        this.items.innerHTML = html
    }

    // 吸顶效果
    fixed() {
        let that = this
        // 绑定滚动事件
        window.onscroll = function () {
            // 获取滚动的距离，兼容写法
            let scrolltop = document.documentElement.scrollTop || document.body.scrollTop

            // 判断滚动的距离
            if (scrolltop >= 800) {
                that.loft.style.display = 'block'
            } else {
                that.loft.style.display = 'none'
            }
        }
    }

    // 左侧导航栏效果
    // 循环遍历所有li,添加鼠标移入，移出事件，内容显示、隐藏
    showNav() {
        let that = this

        // 循环给所有的li绑定鼠标移入事件
        for (let i = 0; i < this.liList.length; i++) {

            this.liList[i].onmouseover = function () {
                // 遍历所有的li,清除样式
                for (let j = 0; j < that.liList.length; j++) {
                    that.liList[j].style.background = ''
                }
                // this指的是当前移入的节点对象，给自己设置样式
                this.style.background = 'rgb(255,103,0)'
                // 获取这个节点里面对应的div让它显示
                this.querySelector('.child-list').style.display = 'block'
            }

            // 给所有的li绑定鼠标移出事件
            this.liList[i].onmouseout = function () {
                // 循环把所有的li的样式清除掉，
                for (let j = 0; j < that.liList.length; j++) {
                    that.liList[j].style.background = ''
                }
                // 让当前这个节点下面的div隐藏起来
                this.querySelector('.child-list').style.display = ''
            }
        }
    }

    headerNav(){
        let that=this
        // 因为只有下标为1-8的li中是有div，鼠标进入才会显示
        for(let i=1;i<=8;i++){
            this.headerLis[i].onmouseover=function(){
                this.querySelector('.down-menu-wrapper').style.display='block'
            }

            // 鼠标移出
            this.headerLis[i].onmouseout=function(){
                this.querySelector('.down-menu-wrapper').style.display='none'
            }
        }
    }

}
new Index