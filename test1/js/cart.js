class Cart {
    constructor() {
        // 获取购物车初始页面的div
        this.cart = document.querySelector('.s-con>#notLogin')
        // console.log(this.cart);
        // 获取购物车中的table
        this.tab = document.querySelector('.s-con>table')
        // console.log(this.tab);
        // 获取合计的div
        this.total = document.querySelector('.s-con>.cart-bar')

        // 获取thead中全选框
        this.checkBox = this.getEle('#tHead input')
        // console.log(this.checkBox);


        // 获取事件委托的节点对象ul
        this.ul = this.getEle('#ulItem')
        // console.log(this.ul);

        // 获取去结算按钮
        this.pay = this.getEle('.pay')
        // console.log(this.pay);

        // 获取清空购物车按钮
        this.clearCart = this.getEle('#clearCart')
        // console.log(this.clearCart);

        // 获取清空购物车后显示内容的节点对象
        this.clearShow = this.getEle('#clearShow')
        // console.log(this.clearShow);
        // console.log(this.total);
        // 判断登录状态的回调函数调用
        this.getLogStatus()

        // 给获取的全选框绑定事件
        this.checkBox.addEventListener('click', this.checkBoxFn.bind(this))

        // 调用事件委托函数.先获取tbody
        this.getEle('#tab').addEventListener('click', this.clickBubbleFn.bind(this))

        this.getTotal()
        // 调用渲染推荐函数
        this.showRecommend()

        // 给去结算绑定事件
        this.pay.addEventListener('click', this.payClickFn.bind(this))

        // 给清空购物车绑定事件
        this.clearCart.addEventListener('click', this.clearCartFn.bind(this))


    }

    // 清空购物车回调函数
    clearCartFn() {
        // 当点击清空购物车时，清除local中购物车数据，并隐藏table和total两部分，显示提示内容

        // 获取tbody
        this.tbody = this.getEle('#tab')
        // console.log(this.tbody);

        //    并隐藏table和total两部分
        this.tab.style.display = 'none'
        this.total.style.display = 'none'
        // 删除local中cart这个数据,还要cartlength这个值
        localStorage.removeItem('cart')
        localStorage.removeItem('cartLength')

        // 显示提示内容
        this.clearShow.style.display = 'block'

    }

    payClickFn() {
        // console.log(1111);
        location.href = './index1.html'
    }

    // 获取local中登录的状态
    getLogStatus() {
        let res = localStorage.getItem('isLogin')
        //    console.log(res);
        // 把json字符串转化为js
        res = JSON.parse(res)

        // 获取local中购物车数据长度
        let cartLength = localStorage.getItem('cartLength')
        // console.log(res); //登录后会保存一个islogin的值为true,如果没有登录就获取local的值是null

        //如果获取的结果是null，就显示当前页面，如果获取的值为true就显示购物车页面
        if (res) {
            this.cart.style.display = 'none'
            this.tab.style.display = 'block'
            this.total.style.display = 'block'
            // 调用获取购物车数据的函数
            this.getCartData()
        } else {
            this.cart.style.display = 'block'
            this.tab.style.display = 'none'
            this.total.style.display = 'none'
        }
    }

    // 获取local中购物车数据和json文件中的数据
    async getCartData() {
        // 先获取存储在local中的数据
        let cartGoods = localStorage.getItem('cart')
        console.log(cartGoods); //{"1":1,"2":1}

        // 判断是否有数据，没有数据局直接终止函数执行
        if (!cartGoods) {
            return
        }

        // 如果有数据就先转化为js对象
        cartGoods = JSON.parse(cartGoods)
        // console.log(cartGoods);//{1: 1, 2: 1}

        // 发送ajax请求，获取json中的数据
        let {
            data
        } = await axios.get(' http://localhost:3000/data')
        // console.log(data); //json中的48条数据，以数组的方式存储的

        // 判断json文件中存在再local中的数据
        // 使用filter返回结果为true的
        let exitCartGoods = data.filter(ele => {
            // console.log(ele);//数组里面48条数据
            // console.log(ele.id);  //1-48
            // 返回在cartGoods中id对应的值，因为值是数量，不为0则为true
            // 不存在这个id返回的undefined,转化为布尔值的false
            return cartGoods[ele.id]
        });
        // console.log(exitCartGoods);// 返回的是local中存在id的两个数据[{…}, {…}]
        // console.log(exitCartGoods.length); //购物车数据条数
        localStorage.setItem('cartLength', exitCartGoods.length)

        // 把获取到的存在的数据渲染到页面上
        // 把存在的json数据和local中的数据传递过去
        this.render(exitCartGoods, cartGoods)

    }

    // 渲染到页面的回调函数
    render(exit, cg) {
        // console.log(exit,cg);//

        // 定义一个变量
        let html = ''

        // 循环存在的数据exit，拼接内容
        // 给tr添加id方便后面删除
        exit.forEach(ele => {
            html += ` <tr gId="${ele.id}">
            <td class="checkbox">
                <input class="check-one check" type="checkbox" />
            </td>
            <td class="goods">
                <img src="${ele.src}" alt="" />
            </td>
            <td>${ele.name}</td>
            <td class="price">${parseInt(ele.nowPrice)}</td>
            <td class="count">
                <span class="reduce">-</span>
                <input class="count-input" type="text" value="${cg[ele.id]}" />
                <span class="add">+</span>
            </td>
            <td class="subtotal">${parseInt(ele.nowPrice) * cg[ele.id]}</td>
            <td class="operation">
                <span class="delete">删除</span>
            </td>
        </tr>`
        });

        // 把拼接后的数据添加到tbody中
        // console.log(this.getEle('#tab'));
        this.getEle('#tab').innerHTML = html

    }

    // 全选框的回调函数
    checkBoxFn() {
        // console.log(111);

        // 先获取全选框的状态，把它赋值给单选框
        let status = this.checkBox.checked
        // console.log(status);

        // 获取所有的单选框并循环，改变他们的状态
        // console.log(this.getElements('.check-one')); //NodeList(3) [input.check-one.check, input.check-one.check, input.check-one.check]
        this.getElements('.check-one').forEach(function (ele) {
            ele.checked = status
        })

        // 调用计算总价和总数量的函数,把状态传递过去
        this.getTotal(status)

    }

    // 单选框实现反选，可以先把事件委托给父级tbody,数量加减，删除等操作可以绑定
    // 事件委托回调函数,必须结合event对象中target属性
    clickBubbleFn(e) {
        // console.log(1111);
        e = e || window.event
        // console.log(e);
        let tar = e.target || e.srcElement
        // console.log(tar);
        // 通过target属性判断点击的是否是单选框
        if (tar.classList.contains('check-one')) {
            // console.log(111);
            // 点击的是单选框就调用它的回调函数，并且把tar传递
            this.oneCheckedFn(tar)
        }

        // 判断选中的是否是加号
        if (tar.classList.contains('add')) {
            // console.log(1111);
            // 调用数量增加的回调函数
            this.addNumFn(tar)
        }

        // 判断选中的是否是减号
        if (tar.classList.contains('reduce')) {
            // console.log(1111);
            // 调用数量增加的回调函数
            this.reduceNumFn(tar)
        }

        // 判断是否是删除操作
        tar.classList.contains('delete') && this.delClickFn(tar)

    }

    // 删除操作的回调函数
    delClickFn(target) {
        let that = this
        // console.log(target);//当前点击删除的节点对象
        // 当点击删除时弹出layer.js下的模态框
        let tr = target.parentNode.parentNode
        layer.open({
            title: '确认删除',
            content: '确定要删除我吗？',
            // 按钮
            btn: ['再考虑一下', '残忍删除'],
            // 残忍删除这个按钮的回调事件
            btn2: function (index, layero) {
                //    console.log(target);
                // 获取tr删除点前商品这个节点
                tr.remove()

                // 判断删除的节点是否被选中，如果被选中，就调用计算总价和数量的方法，从新计算
                tr.querySelector('.check-one').checked && that.getTotal()
                // console.log(tr.getAttribute('goodsId'));
                // 当点击删除时默认数量为0
                that.updateLocal(tr.getAttribute('gId'))
            }
        });
    }
    // 减号的回调函数
    reduceNumFn(target) {
        // console.log(target);获取的是点击的哪个减号对应的节点
        // 获取-号这个节点对应的下一个节点，然后就可以改变里面数量的值
        let num = target.nextElementSibling
        // console.log(num);

        // 获取里面的值，并且把数量-1，然后赋值给文本框的值
        num.value = (num.value - 0) - 1
        // console.log(num.value);

        // 获取小计这个节点，以及有对应的单价
        // 先获取tr
        let tr = target.parentNode.parentNode
        // console.log(tr);

        // 通过tr获取小计节点。然后对小计节点进行赋值
        let subTotal = target.parentNode.nextElementSibling
        // 获取单价
        let price = target.parentNode.previousElementSibling.innerHTML
        // console.log(subTotal,price);

        subTotal.innerHTML = ((num.value * price) * 100) / 100

        //获取tr上添加的自定义属性id
        let id = tr.getAttribute('gId')
        // console.log(id);

        // 当点击减号时改变local中的值，调用函数
        this.updateLocal(id, Number(num.value))


        // 如果数量为0就把tr删除
        if (num.value == 0) {
            tr.remove()
        }

    }

    // 数量增加的回调函数
    addNumFn(target) {
        // console.log(target); //选中的哪个span
        // 获取span的上一个兄弟节点的input节点
        let num = target.previousElementSibling
        // console.log(num);

        // 把获取节点的值加1
        num.value = (num.value - 0) + 1
        // console.log(num.value);

        // 获取单价和小计这两个节点，更改小计的值
        // 获取小计这个节点
        let subTotal = target.parentNode.nextElementSibling
        //    获取单价
        let price = target.parentNode.previousElementSibling.innerHTML
        // console.log(subTotal,price);

        // 把小计里面的值更改 ：数量*单价
        subTotal.innerHTML = ((num.value * price) * 100) / 100

        // 当单选框是选中的时候，就调用计算总价和总的数量的方法
        // 先获取tr
        let tr = target.parentNode.parentNode
        // 通过tr获取到单选框
        // 如果单选框是选中的就调用计算总价和数量的方法
        tr.querySelector('.check-one').checked && this.getTotal()


        //获取tr上添加的自定义属性id
        let id = tr.getAttribute('gId')
        // console.log(id);

        // 当点击加号时改变local中的值，调用函数
        this.updateLocal(id, Number(num.value))

    }


    // 单选框实现反选的回调函数
    oneCheckedFn(target) {
        // 调用计算总价和数量的函数
        this.getTotal()
        // console.log(target);//点击的哪个单选框对应的节点对象
        // 当点击单选框时
        if (target.checked) {
            // 循环所有的单选框
            // 使用every方法判断是否全部选中，全部满足才会返回true
            let res = Array.from(this.getElements('.check-one')).every(function (item) {
                // 判断条件返回被选中的

                return (item.checked)
            })
            // 只有当所有的被选中，才会返回true
            // console.log(res);

            if (res) {
                this.checkBox.checked = true
            }
        } else { //当没有选中时
            // 把全选框的状态赋值为false
            this.checkBox.checked = false
        }



    }

    // 实现合计,计算总价和数量
    // 当点击单选框，全选框，和删除时，数量加减时都需要调用这个函数
    // 传递一个全选框的状态,先给给默认值为true
    getTotal(sta = true) {
        // 定义两个变量
        let totalNum = 0
        let totalPrice = 0

        // 根据全选框的状态判断，如果为true就执行循环单选框获取选中的
        // 全选框的状态为false就直接把总量和总价赋值为0
        sta && this.getElements('.check-one').forEach(ele => {
            // console.log(ele);//每一个单选框
            // 单选框被选中
            if (ele.checked) {
                // 通过ele去获取整个tr，再通过tr获取里面的数量和小计
                let trObj = ele.parentNode.parentNode
                // console.log(trObj);

                // 统计总的数量和价格
                // -0是进行隐式数据转换
                totalNum += ((trObj.querySelector('.count-input')).value - 0)
                totalPrice += ((trObj.querySelector('.subtotal')).innerHTML - 0)

            }
        })
        // 如果全选框状态为false就直接把0赋值给他们
        this.getEle('.total-money').innerHTML = totalPrice
        this.getEle('.buy-number').innerHTML = totalNum

    }


    // 修改loaclstorage中的值
    // 点击加号，点击减号都会修改local中的值
    // 点击删除时，如果数量为0，就删除对应的id
    // 数量不为0则修改数量
    // 需要传递参数id,和数量，数量有默认值为0，调用时不传递num则使用默认值
    updateLocal(id, num = 0) {
        console.log(id, num); //获取到id和数量
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



    // 渲染为你推荐的内容
    async showRecommend(cp = 1, len = 20) {
        // 发送ajax请求,获取json中最后20条数据
        let {
            data
        } = await axios.get('http://localhost:3000/recommend?_page=' + cp + '&_limit=' + len)
        // console.log(data);//(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

        let html = ''
        // 循环这个数组，拼接内容
        data.forEach(ele => {
            // console.log(ele); //20条数据
            html += `  <li class="item" gId="${ele.id}">
            <img src="${ele.src}" alt="">
            <p class="item-name">${ele.name}</p>
            <p class="item-price">${ele.price}</p>
            <p class="item-praise">${ele.praise}</p>
            <div class="item-btn">
                <a href="#">
                加入购物车
                </a>
            </div>
        </li>`
        })

        // 把拼接号的内容添加到ul中
        this.ul.innerHTML = html

        // 获取ul下所以的li
        let liLis = this.getElements('.item')
        //    console.log(liLis);

        // 获取所有的加入购物车的div
        let addCart = this.getElements('.item-btn')
        //    console.log(addCart);
        // 调用加入购物车显示函数
        this.overFn(liLis, addCart)

        // 调用加入购物车函数
        this.addClickFn(addCart)
    }

    // 循环所有li,绑定鼠标移入事件，把事件委托给ul
    overFn(liList, addCart) {
        // console.log(liList);
        for (let i = 0; i < liList.length; i++) {
            liList[i].onmouseover = function () {
                addCart[i].style.display = 'block'
            }
            liList[i].onmouseout = function () {
                addCart[i].style.display = 'none'
            }
        }

    }

    addClickFn(addCart) {
        let that=this
        // console.log(addCart);
        for (let i = 0; i < addCart.length; i++) {
            addCart[i].onclick = function () {
                //    获取点前点击元素的父节点
                // console.log(addCart[i].parentNode);
                let liObj = addCart[i].parentNode
                let id = liObj.getAttribute('gId')
                // console.log(id);
                that.addCartData(id,1)
            }
        }
    }


    addCartData(gId, num) {
        // 先获取local中cart这个数据
        let cartGoods = localStorage.getItem('cart')

        // 判断数据是否存在
        if (cartGoods) { //如果有
            // 先把json格式转化为js对象
            cartGoods = JSON.parse(cartGoods)
            // console.log(cartGoods);

            // 循环这个对象，判断id是否存在，存在则数量加1修改local的数量，不存在则添加到local中
            for (let attr in cartGoods) {
                // console.log(attr);
                if (attr == gId) {
                    // 把数量加1
                    num += cartGoods[gId]
                }
            }
            // 把获取更改后的数量赋值给cartGoods[gid],id所对应的值
            // 存在则修改，不存在则添加
            cartGoods[gId] = num

            // 把cartGoods的值存在local中
            localStorage.setItem('cart', JSON.stringify(cartGoods))

        } else { //如果没有
            // 以id为键，num为值，定义一个对象
            cartGoods = {
                [gId]: num
            }
            // local中不能直接存对象，需要转化为json字符串
            localStorage.setItem('cart', JSON.stringify(cartGoods))
        }

        this.getCartData()
    }

    getEle(ele) {
        return document.querySelector(ele)
    }
    getElements(ele) {
        return document.querySelectorAll(ele)
    }
}
new Cart