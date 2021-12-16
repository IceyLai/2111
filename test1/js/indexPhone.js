class Index {
    constructor() {
        // 获取手机详情内容
        this.items = document.querySelector('.items')

        // 获取nav元素
        this.nav=document.querySelector('.headNav')
        // console.log(this.nav);


        // console.log(this.items);
        this.showData()

        // 调用吸顶函数
        this.fixed()
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
            html += `<a href="#">
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
        this.items.innerHTML=html
    }

    // 吸顶效果实现
    fixed(){
        let that=this
        window.onscroll=function(){
            // 先获取滚动的距离,兼容写法
            let scrolltop=document.documentElement.scrollTop||document.body.scrollTop
            // 在判断，当滚动距离大于header的高度时，
            if(scrolltop>=40){
                that.nav.style.position='fixed'
                that.nav.style.top=0
            }else{
                that.nav.style.position=''
            }
        }
    }

}
new Index