class CartList {
    constructor() {
        this.getCartData()
        // 实现全选
        this.checkAll()

        // 给tbody绑定事件，实现把input的事件委托给父元素tbody
        // 调用函数，并把新函数的this改变为指向类实例化的对象
        this._$('#cartTable tbody').addEventListener('click', this.clickBubbleFn.bind(this))
        // 给删除绑定事件
        this._$('#deleteAll').addEventListener('click', this.deleteAllFn.bind(this))
    }

    // 点击删除，删除所有local中的数据，
    deleteAllFn() {
        let that = this
       
        // 添加一个模态框
        layer.open({
            title: '确认删除全部',
            content: '确定要删除我们吗？',
            // 按钮
            btn: ['再考虑一下', '残忍删除'],
            // 残忍删除这个按钮的回调事件
            btn2: function (index, layero) {
                // console.log(111);
                // 获取tbody
                // console.log(this._$('#cartTable tbody'));
                // 把tbody的值赋值为空
                that._$('#cartTable tbody').innerHTML = ''

                // 清除local中的数据
                localStorage.removeItem('cart')
            }
        });
    }


    // 事件委托判断操作的节点
    clickBubbleFn(event) {
        // console.log(event);
        // 使用event的中的target属性，指向当前节点对象
        let tar = event.target
        // console.log(tar);

        // 判断操作的是单选框节点
        // 使用classList中的contains方法，判断class中是否有这个样式，有则返回true
        if (tar.classList.contains('check-one')) {
            // console.log(111);
            // 调用商品单选框的回调函数
            // 把当前节点对象传递过去
            this.oneCheckFn(tar)
        }

        // 判断操作的是＋号
        tar.classList.contains('add') && this.addClickFn(tar)

        // 判断是否为-号
        tar.classList.contains('reduce') && this.reduceClickFn(tar)

        // 判断点击的是否是删除
        tar.classList.contains('delete') && this.delClickFn(tar)
    }

    // 点击下方删除，删除所有cartGoods中的数据
    // 给删除绑定点击事件




    // 点击删除后的回调函数
    delClickFn(target) {
        let that=this
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
                that.updateLocal(tr.getAttribute('goodsId'))
            }
        });


    }

    // -号回调函数
    reduceClickFn(target) {
        // console.log(target);获取的是点击的哪个减号对应的节点
        // 获取-号这个节点对应的下一个节点，然后就可以改变里面数量的值
        let num = target.nextElementSibling
        // console.log(num);

        // 获取里面的值，并且把数量-1，然后赋值给文本框的值
        num.value = num.value - 0 - 1
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
        let id = tr.getAttribute('goodsId')
        // console.log(id);

        // 当点击减号时改变local中的值，调用函数
        this.updateLocal(id, num.value)


        // 
        if (num.value == 0) {
            tr.remove()
        }

    }



    // +号的回调函数
    addClickFn(target) {
        // console.log(target);//当前点击的+号
        // 获取里面的它上一个节点的数量，然后把它的数量加1
        let num = target.previousElementSibling;
        // console.log(num);

        // 获取里面的值
        // (num.value-0)是进行隐式数据转换，因为input的值默认是字符串类型
        // +1是把数量加1,然后把值赋给input的vlaue
        num.value = num.value - 0 + 1


        // 获取小计这个节点
        let subTotal = target.parentNode.nextElementSibling
        //    获取单价
        let price = target.parentNode.previousElementSibling.innerHTML
        // console.log(subTotal,price);

        // 更改小计这个节点里面的值等于数量*单价
        // 如果价格不为整数，具体处理方式可以使用toFixed(2)按四舍五入的方式，保留两位小数
        // subTotal.innerHTML=(num.value*price).toFixed(2)
        // 价格不为整数还可以有种写法：先把价格转化为整数扩大多少倍，再除以多少倍
        subTotal.innerHTML = ((num.value * price) * 100) / 100

        // 当单选框是选中的时候，就调用计算总价和总的数量的方法
        // 先获取tr
        let tr = target.parentNode.parentNode
        // 通过tr获取到单选框
        // 如果单选框是选中的就调用计算总价和数量的方法
        tr.querySelector('.check-one').checked && this.getTotal()


        //获取tr上添加的自定义属性id
        let id = tr.getAttribute('goodsId')
        // console.log(id);

        // 当点击加号时改变local中的值，调用函数
        this.updateLocal(id, num.value)

    }

    // 商品单选框回调函数
    oneCheckFn(target) {
        // 点击单选框时也调用计算总价和数量的方法
        // 不传递参数使用默认值
        this.getTotal()


        // 获取到当前节点对象
        // console.log(target);
        if (target.checked) {
            let res = Array.from(this.$$('.check-one')).every(item => {
                // console.log(item);
                // console.log(item.checked);
                return (item.checked)

            })
            // 当所有的被选中，res的结果才能是true
            // console.log(res);
            if (res) {
                this.$$('.check-all')[0].checked = true
                this.$$('.check-all')[1].checked = true

            }
        } else {
            this.$$('.check-all')[0].checked = false
            this.$$('.check-all')[1].checked = false
        }


        // 如果没有被选中，或者叫取消了
        // if(!target.checked){
        //     // 就把两个全选框的状态都赋值为false
        //     // 并且终止这个函数的执行
        //     this.$$('.check-all')[0].checked=false
        //     this.$$('.check-all')[1].checked=false
        //     return
        // }

        // // 判断选中商品的数量
        // let count=0
        // // 循环所有的单选框，判断它的状态如果是true就数量加1
        // this.$$('.check-one').forEach(item=>{
        //     // console.log(item);  //5个单选框
        //     // 如果被选中，则为true,就把数量加1
        //     if(item.checked){
        //         count++
        //     }
        // })
        // console.log(count);


        // 如果选中商品的数量和总共的单选框数量相同就说明全部被选中
        // if(count==this.$$('.check-one').length){
        //     // 就把全选框的状态赋值为true
        //     this.$$('.check-all')[0].checked=true
        //     this.$$('.check-all')[1].checked=true
        // }
    }

    // 获取购物车数据
    async getCartData() {
        // 先取出存储在localstorage中的数据
        let cartGoods = localStorage.getItem('cart')

        // console.log(cartGoods); //{"2":1,"5":3,"6":1,"7":1,"8":7}结果为json字符串
        // 判断是否有数据
        // 没有就直接终止函数
        if (!cartGoods) return

        // 如果有就将JSON字符串转化为js对象
        cartGoods = JSON.parse(cartGoods)
        // console.log(cartGoods);//{2: 1, 5: 3, 6: 1, 7: 1, 8: 7}

        // 发送ajax请求，获取json文件中的数据
        let goodsData = await axios.get({
            url: './js/cart.json'
        })
        // console.log(goodsData);  //json文件中的8条数据

        // 遍历从json文件中获取到的数据，是一个数组
        // filter遍历会把满足条件的数据从新返回到一个新数组中
        let exitCartGoods = goodsData.filter(item => {
            // console.log(item);//数组里面的每一个对象
            // 通过item.id可以获取每条数据的id去与购物车中的数据cartGoods中的id作比较
            // console.log(item.id);
            // 如果cartGoods中有这个id就返回这个id对应的数量，数量转化为布尔值为true
            // 没有这个id，返回的是undefind,z转化为布尔值的false
            // console.log(cartGoods[item.id]);
            // filter只会返回为true的
            return cartGoods[item.id]
        })

        // console.log(exitCartGoods); //(5) [{…}, {…}, {…}, {…}, {…}]购物车中存在的数据

        // 然后把购物车中存在的数据渲染到页面中，从新定义一个方法
        // 需要把获取的购物车存在的数据exitCartGoods和local中的数据传递过去
        // 传递cartGoods是为了获取里面的数量
        this.render(exitCartGoods, cartGoods)


    }

    //把数据渲染到页面上
    render(exit, cg) {
        // 定义一个变量,存放tr中的内容
        let template = ''

        // 循环存在购物车中的数据
        // ${cg[ele.id]} 获取local中购物车中存在id对应的数量
        // ${ele.price * cg[ele.id]} 小计：单价*数量
        exit.forEach(ele => {
            // 给每个tr添加一个id
            template += `<tr goodsId='${ele.id}'>
            <td class="checkbox">
              <input class="check-one check" type="checkbox" />
            </td>
            <td class="goods">
              <img src="${ele.src}" alt="" />
              <span>${ele.name}</span>
            </td>
            <td class="price">${ele.price}</td>
            <td class="count">
              <span class="reduce">-</span>
              <input class="count-input" type="text" value="${cg[ele.id]}" />
              <span class="add">+</span>
            </td>
            <td class="subtotal">${ele.price * cg[ele.id]}</td>
            <td class="operation">
              <span class="delete">删除</span>
            </td>
          </tr>`
        });

        // 把拼接后的数据添加到tbody里面
        this._$('#cartTable tbody').innerHTML = template

    }


    // 实现全选,给全选按钮添加事件，再页面加载时就调用，直接写在构造函数中调用
    checkAll() {
        // 先获取所以的全选按钮
        let allObj = this.$$('.check-all')
        // console.log(allObj);//NodeList(2) [input.check-all.check, input.check-all.check]


        // 给所以的全选按钮绑定事件
        // this.allClickFn.bind(this,1) 这里this指的是这个类实例化的对象
        // 先调用这个方法，再改变这个方法里面this的指向为类实例化的对象，传递的1可以和后面后面的全选按钮关联起来
        allObj[0].addEventListener('click', this.allClickFn.bind(this, 1))
        allObj[1].addEventListener('click', this.allClickFn.bind(this, 0)) //传递0和前面的全选按钮关联起来

    }


    // 定义全选事件
    // 当使用Bind传递过来的参数和事件对象event的时候，需要把bind传递的参数写在前面
    allClickFn(index, event) {
        // console.log(this);//指向的是类实例化的对象
        // console.log(index);//当点击第一个全选按钮返回1，点击第二个全选按钮返回0
        // console.log(event); //使用event中的target属性，获取当前点击的对象

        // 获取点击全选按钮的状态
        let status = event.target.checked
        // console.log(status);//选中是true，没有选中是false

        // 设置另一个全选按钮跟随变化
        // this.$$('.check-all')[index]当点击的是第一个全选按钮时index的值为1，就把后面一个全选按钮的状态赋值为当前全选按钮的状态
        this.$$('.check-all')[index].checked = status

        // 接下来根据全选按钮的状态，选中则下面所有的单选框全选中
        // 定义一个函数实现
        // 需要传递全选框按钮的状态
        this.onChecked(status)

        // 点击全选框时调用计算总价和数量的函数
        this.getTotal(status)

    }
    // 根据全选按钮的状态，选中则下面所有的单选框全选中
    onChecked(status) {
        // 循环里面的每一个单选框
        // 先获取单选框
        // console.log(this.$$('.check-one'));  //NodeList(5) [input.check-one.check, input.check-one.check, input.check-one.check, input.check-one.check, input.check-one.check]

        this.$$('.check-one').forEach(one => {
            // console.log(one); 这个5个单选框
            // 把全选框的状态赋值给所有的单选框
            one.checked = status
        })
    }


    // 计算总价和数量
    // 在点击单选框、全选框时调用这个函数 
    // 给状态一个初始值，没有传递状态时就使用初始值
    getTotal(sta = true) {
        // 定义两个变量
        let totalNum = 0
        let totalPrice = 0

        // 根据全选框的状态判断，是true则执行循环单选框获取选中的
        // 全选框状态为false就直接把总的数量和总价赋值为0
        sta && this.$$('.check-one').forEach(ele => {
            // console.log(ele);//每一个单选框
            // 如果单选框被选中
            if (ele.checked) {
                // console.log(ele); 选中的单选框
                // 找到tr,通过tr去查考数量和小计
                let trObj = ele.parentNode.parentNode
                // console.log(trObj);

                // 获取小计和数量
                // console.log((trObj.querySelector('.count input')).value);
                // -0的目的在于进行隐式数据转换，把字符串转为数字
                totalNum += ((trObj.querySelector('.count input')).value - 0)
                // console.log((trObj.querySelector('.subtotal')).innerHTML);
                totalPrice += ((trObj.querySelector('.subtotal')).innerHTML - 0)
            }
        })

        // 再循环外面把总价和数量赋值到页面上
        this._$('#priceTotal').innerHTML = totalPrice
        this._$('#selectedTotal').innerHTML = totalNum

    }


    // 修改loaclstorage中的值
    // 点击加号，点击减号都会修改local中的值
    // 点击删除时，如果数量为0，就删除对应的id
    // 数量不为0则修改数量
    // 需要传递参数id,和数量，数量有默认值为0，调用时不传递num则使用默认值
    updateLocal(id, num = 0) {
        // console.log(tr);
        // console.log(id,num);//获取到id和数量
        // num=Number(num)
        // console.log(num ,'0000');

        // 1.取出local中的数据
        let cartGoods = localStorage.getItem('cart')
        // console.log(cartGoods);

        //2.判断是否为空
        if (!cartGoods) return

        // 3.不为空则转化为js对象
        cartGoods = JSON.parse(cartGoods)
        // console.log(cartGoods);//{2: 1, 5: 3, 6: 1, 7: 1, 8: 7}

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



    // 定义获取单个元素的方法
    _$(ele) {
        return document.querySelector(ele)
    }
    // 定义方法获取多个元素
    $$(ele) {
        return document.querySelectorAll(ele)
    }
}
new CartList