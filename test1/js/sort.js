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

        // 获取分类页面购物车数量对应的节点
        this.sortCartNum=document.querySelector('#sortCartNum')
        // console.log(this.sortCartNum);
        // 获取 购物车对应的下拉列表
        this.cartMenu=document.querySelector('.cart-menu')
        // console.log(this.cartMenu);

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

        // 调用函数获取购物车数量
        this.getCartNum()
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
    // _page当前页码，_limit一个页面需要获取的数据条数
    async showPhoneData(currentPage=1,len=8) {
        let {
            data
        } = await axios.get('http://localhost:3000/data?_page='+currentPage+'&_limit='+len)
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
            <div class="phoneCart"><a href="./cart.html" onclick="Tab.addCart(${ele.id},1)">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.phoneData.innerHTML = html
    }


    // 把家电对应数据渲染到页面上
    async showEleData(currentPage=2,len=8) {
        let {
            data
        } = await axios.get('http://localhost:3000/data?_page='+currentPage+'&_limit='+len)
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
            <div class="phoneCart"><a href="./cart.html" onclick="Tab.addCart(${ele.id},1)">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.eleData.innerHTML = html
    }

    // 把智能数据渲染到页面
    async showMasterData(currentPage=3,len=8) {
        let {
            data
        } = await axios.get('http://localhost:3000/data?_page='+currentPage+'&_limit='+len)
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
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
            <div class="phoneCart"><a href="./cart.html" onclick="Tab.addCart(${ele.id},1)">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.masterData.innerHTML = html
    }

    // 把搭配数据渲染到页面
    async showColData(currentPage=4,len=8) {
        let {
            data
        } = await axios.get('http://localhost:3000/data?_page='+currentPage+'&_limit='+len)
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
            <div class="phoneCart"><a href="./cart.html" onclick="Tab.addCart(${ele.id},1)">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.colData.innerHTML = html
    }


    // 把配件数据渲染到页面
    async showPartsData(currentPage=5,len=8) {
        let {
            data
        } = await axios.get('http://localhost:3000/data?_page='+currentPage+'&_limit='+len)
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
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
            <div class="phoneCart"><a href="./cart.html" onclick="Tab.addCart(${ele.id},1)">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.partsData.innerHTML = html
    }


    // 把周边数据渲染到页面
    async showOthersData(currentPage=6,len=8) {
        let {
            data
        } = await axios.get('http://localhost:3000/data?_page='+currentPage+'&_limit='+len)
        // console.log(data); //结果为数组中有8条数据

        // 定义一个变量用于拼接内容
        let html = ''

        // 循环这个数组
        data.forEach(ele => {
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
            <div class="phoneCart"><a href="./cart.html" onclick="Tab.addCart(${ele.id},1)">加入购物车</a></div>
        </li>`
        });
        // 把循环得到的数据，添加到页面中
        this.otherData.innerHTML = html
    }

    // 加入购物车回调函数
    static addCart(gId,num){
        // console.log(gId,num);

        // 先获取local中cart这个数据
        let cartGoods=localStorage.getItem('cart')

        // 判断数据是否存在
        if(cartGoods){//如果有
            // 先把json格式转化为js对象
            cartGoods=JSON.parse(cartGoods)
            // console.log(cartGoods);

            // 循环这个对象，判断id是否存在，存在则数量加1修改local的数量，不存在则添加到local中
            for(let attr in cartGoods){
                // console.log(attr);
                if(attr==gId){
                    // 把数量加1
                    num+=cartGoods[gId]
                }
            }
            // 把获取更改后的数量赋值给cartGoods[gid],id所对应的值
            // 存在则修改，不存在则添加
            cartGoods[gId]=num

            // 把cartGoods的值存在local中
            localStorage.setItem('cart',JSON.stringify(cartGoods))

        }else{//如果没有
            // 以id为键，num为值，定义一个对象
             cartGoods={[gId]:num}
            // local中不能直接存对象，需要转化为json字符串
            localStorage.setItem('cart',JSON.stringify(cartGoods))
        }

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
new Tab