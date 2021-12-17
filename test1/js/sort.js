// 点击上面的按钮进行切换
class Tab {
    constructor() {
        // 获取变量
        this.aBtn = document.querySelectorAll('.tabBtn>span')
        // console.log(this.aBtn);
        // 获取所有的ul
        this.aUL = document.querySelectorAll('.tabUL>ul')
        // console.log(this.aUL);

        // 获取手机对应的ul
        this.phoneData = document.querySelector('#phone')
        // console.log(this.phoneData);

        //  // 获取家电对应的ul
        this.eleData = document.querySelector('#ele')

        //  // 获取智能对应的ul
        this.masterData = document.querySelector('#master')

        //  // 获取搭配对应的ul
        this.colData = document.querySelector('#col')

        //  // 获取配件对应的ul
        this.partsData = document.querySelector('#parts')

        //  // 获取周边对应的ul
        this.otherData = document.querySelector('#other')

        // 点击进行切换
        this.tab()

        // 渲染手机数据
        this.showPhoneData()

        // 渲染家电数据
        this.showEleData()

        // 渲染智能数据
        this.showMasterData()

        // 渲染搭配数据
        this.showColData()

        // 渲染配件数据
        this.showPartsData()

        // 渲染周边数据
        this.showOthersData()
    }
    tab() {
        // 在有this的地方获取到this赋值给that
        let that = this
        // 先遍历所有的btn,给所有的btn添加绑定事件
        for (let i = 0; i < this.aBtn.length; i++) {
            this.aBtn[i].onclick = function () {
                // 先排他
                for (let j = 0; j < that.aBtn.length; j++) {
                    that.aBtn[j].className = ''
                    that.aUL[j].className = ''
                }

                // 点击当前这个时添加对应的样式
                this.className = 'bg'
                that.aUL[i].className = 'show'
            }
        }
    }

    // 把手机对应数据渲染到页面上
    async showPhoneData() {
        let {
            data
        } = await axios.get('http://localhost:3000/phone')
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
            // console.log(ele);
            html += `<li class="phoneItem">
            <a href="./goods-details.html?id=${ele.id}">
            <img src="${ele.src}" class="phonePic" alt="">
            <h3 class="phoneItem-name">${ele.name}</h3>
            <p class="phoneItem-info">${ele.info}</p>
            <p class="phoneItem-price">
                现价：<span class="newPrice">${ele.nowPrice}</span>
                原价：<span class="oldPrice">${ele.oldPrice}</span>
            </p>
            </a>
            <div class="phoneCart"><a href="#">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.phoneData.innerHTML = html
    }


    // 把家电对应数据渲染到页面上
    async showEleData() {
        let {
            data
        } = await axios.get('http://localhost:3000/equipment')
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
            // console.log(ele);
            html += `<li class="phoneItem">
            <a href="#">
            <img src="${ele.src}" class="phonePic" alt="">
            <h3 class="phoneItem-name">${ele.name}</h3>
            <p class="phoneItem-info">${ele.info}</p>
            <p class="phoneItem-price">
                现价：<span class="newPrice">${ele.nowPrice}</span>
                原价：<span class="oldPrice">${ele.oldPrice}</span>
            </p>
            </a>
            <div class="phoneCart"><a href="#">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.eleData.innerHTML = html
    }

    // 把智能数据渲染到页面
    async showMasterData() {
        let {
            data
        } = await axios.get(' http://localhost:3000/intelligence')
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
            html += `<li class="phoneItem">
            <a href="#">
            <img src="${ele.src}" class="phonePic" alt="">
            <h3 class="phoneItem-name">${ele.name}</h3>
            <p class="phoneItem-info">${ele.info}</p>
            <p class="phoneItem-price">
                现价：<span class="newPrice">${ele.nowPrice}</span>
                原价：<span class="oldPrice">${ele.oldPrice}</span>
            </p>
            </a>
            <div class="phoneCart"><a href="#">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.masterData.innerHTML = html
    }

    // 把搭配数据渲染到页面
    async showColData() {
        let {
            data
        } = await axios.get(' http://localhost:3000/col')
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
            // console.log(ele);
            html += `<li class="phoneItem">
            <a href="#">
            <img src="${ele.src}" class="phonePic" alt="">
            <h3 class="phoneItem-name">${ele.name}</h3>
            <p class="phoneItem-info">${ele.info}</p>
            <p class="phoneItem-price">
                现价：<span class="newPrice">${ele.nowPrice}</span>
                原价：<span class="oldPrice">${ele.oldPrice}</span>
            </p>
            </a>
            <div class="phoneCart"><a href="#">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.colData.innerHTML = html
    }


    // 把配件数据渲染到页面
    async showPartsData() {
        let {
            data
        } = await axios.get('http://localhost:3000/parts')
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
            html += `<li class="phoneItem">
            <a href="#">
            <img src="${ele.src}" class="phonePic" alt="">
            <h3 class="phoneItem-name">${ele.name}</h3>
            <p class="phoneItem-info">${ele.info}</p>
            <p class="phoneItem-price">
                现价：<span class="newPrice">${ele.nowPrice}</span>
                原价：<span class="oldPrice">${ele.oldPrice}</span>
            </p>
            </a>
            <div class="phoneCart"><a href="#">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.partsData.innerHTML = html
    }


    // 把周边数据渲染到页面
    async showOthersData() {
        let {
            data
        } = await axios.get('http://localhost:3000/others')
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
            html += `<li class="phoneItem">
            <a href="#">
            <img src="${ele.src}" class="phonePic" alt="">
            <h3 class="phoneItem-name">${ele.name}</h3>
            <p class="phoneItem-info">${ele.info}</p>
            <p class="phoneItem-price">
                现价：<span class="newPrice">${ele.nowPrice}</span>
                原价：<span class="oldPrice">${ele.oldPrice}</span>
            </p>
            </a>
            <div class="phoneCart"><a href="#">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.otherData.innerHTML = html
    }

}
new Tab