class Cart {
    constructor() {
        // 获取购物车初始页面的div
        this.cart=document.querySelector('.s-con>.cart')
        // console.log(this.cart);
        // 获取购物车中的table
        this.tab=document.querySelector('.s-con>table')
        // console.log(this.tab);
        // 获取合计的div
        this.total=document.querySelector('.s-con>.cart-bar')
        // console.log(this.total);
        // 
        this.getLogStatus()
    }
    // 获取local中登录的状态
    getLogStatus() {
        let res = localStorage.getItem('isLogin')
        //    console.log(res);
        // 把json字符串转化为js
        res = JSON.parse(res)
        // console.log(res); //登录后会保存一个islogin的值为true,如果没有登录就获取local的值是null

        //如果获取的结果是null，就显示当前页面，如果获取的值为true就显示购物车页面
        if(res){
            this.cart.style.display='none'
            this.tab.style.display='block'
            this.total.style.display='block'
        }else{
            this.cart.style.display='block'
            this.tab.style.display='none'
            this.total.style.display='none'
        }
    }
}
new Cart