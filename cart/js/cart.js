// 定义一个类
class Cart {
    constructor() {
        // 属性赋值和调用方法
        this.cont = document.querySelector('#cont')
        // console.log(cont);
        this.showData()
    }
    // 发送ajax请求获取cart.json中的数据
    // 使用async修饰函数，创建一个异步环境，再使用await把里面转化成同步执行
    // 使用async修饰的函数，返回的是一个promise对象
    // 使用await会暂时停止后面代码执行，等到promise解析完后再一起执行，相当于同步操作
    async showData() {
        // 使用await不用再.then这个回调函数
        let data = await axios.get({
            url: './js/cart.json',
            data: {}
        })
        // 直接打印,就可以获取到json文件中的数据
        // console.log(data); // [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

        // 第一一个变量
        let html = ''
        // 循环数组，把数据添加到cont这个div中
        data.forEach(item => {
            // console.log(item);//结果为：数组里面每一个对象
            html += `<div class="box"><img src="${item.src}" alt=""><p>${item.name}</p><span class="goods_item_price" data-price-id="100004222715" style="">¥${item.price}</span><a href="#none" id="InitCartUrl" class="btn-special1 btn-lg" onclick="Cart.addCart(${item.id},1)">加入购物车</a></div>`;
        });

        //把内容添加到cont这个div中
        this.cont.innerHTML = html
    }

    // 点击加入购物车，判断
    static addCart(id, num) {
        // 先获取localstorage.getItem中cart这个数据
        let cartGoods = localStorage.getItem('cart')

        // 判断是否有这个数据
        if (cartGoods) { //如果有

            // 先把json字符串转为js对象
            cartGoods=JSON.parse(cartGoods)

            // 循环获取的cartGoods这个对象
            for(let attr in cartGoods){
                if(attr==id){
                    num=num+cartGoods[id]
                }
                // 或者写成以下这种的形式
                // attr == id && (num = num + cartGoods[attr]);
            }
            // 存在修改里面 的数量，不存在则添加
            cartGoods[id]=num

             // 设置值
            localStorage.setItem('cart', JSON.stringify(cartGoods))

        } else { //没有
            // 以id为键，数量为值，设置值
            cartGoods = {
                [id]: num
            }
            // 设置值
            localStorage.setItem('cart', JSON.stringify(cartGoods))
        }
    }
    say(){
        console.log('我是远程仓库目录下的2111文件');
    }

    hello(){
        console.log('hello');
    }

}
new Cart