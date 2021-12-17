class Goods1 {
    constructor() {
        // 获取做吸顶效果的元素
        this.xiPro = document.querySelector('.xm-nav')
        // console.log(this.xiPro);

        // 获取关闭元素
        this.close = document.querySelector('#close')
        // console.log(this.close);

        // 给关闭这个a链接绑定事件
        this.close.addEventListener('click', this.closeFn.bind(this))

        // 吸顶效果函数调用
        this.fixed()
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

    // 获取地址栏里面的查询字符串，进行分割得到它对应的id,再根据id去获取json文件里对应的数据渲染到页面
    
}
new Goods1