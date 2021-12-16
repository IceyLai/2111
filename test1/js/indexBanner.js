class Swiper {
    constructor() {
        // 获取ul
        this.container = document.querySelector('.banner-img')
        // console.log(this.container);

        // 获取ul下的所有的li
        this.pic = this.container.children
        // console.log(this.pic);
        // 获取左右按钮
        this.prev = document.querySelector('.banner-arr .left')
        this.next = document.querySelector('.banner-arr .right')
        // console.log(this.prev,this.next);

        // 获取小圆圈按钮的ul
        this.circleBtn = document.querySelector('.banner-disc')
        // console.log(this.circleBtn);

        // //声明一个变量作为改变的下标
        this.num = 0
        this.circle = 0
        this.flag = true
        this.timer = null

        //只调用初始化方法init（）即可
        this.init()
        this.onBanner()
    }
    // //初始化方法
    init() {
        this.setBtn()
        this.picSwitching()
        
        this.onprve()
        this.onnext()
    }
    // 设置小圆圈
    setBtn() {
        //遍历创建li，li的个数和图片个数一致
        for (var i = 0; i < this.pic.length; i++) {
            var li = document.createElement('li')
            this.circleBtn.appendChild(li)
        }
        //给第一个小圆圈设置背景
        this.circleBtn.children[0].className = 'active'
        //把第一张图片复制一张给最后面 true表示不仅复制了li标记，还把它里面的图片复制了
        var first = this.pic[0].cloneNode(true)
        this.container.appendChild(first)
    }


    // 点击按钮切换图片
    picSwitching() {
        //点击按钮切换图片并有动画 circleBtn.children表示ol标记下的所有li标记
        for (var i = 0; i < this.circleBtn.children.length; i++) {
            //设置自定义属性
            this.circleBtn.children[i].setAttribute('index', i)
            // 这里that指向类实例化对象
            var that = this
            // 点击小圆按钮，添加事件
            this.circleBtn.children[i].onclick = function () {
                //获取自定义属性
                var index = this.getAttribute('index')
                //当咱们点击按钮的时候，应该把它的下标给到右侧按钮，这样就可以实现了同步操作
                //让下标进行关联操作
                that.num = index
                that.circle = index
                //让按钮背景颜色改变，做排他
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                this.className = 'active'
                //让图片切换 pic[0]表示ul里面第一个li pic[0].offsetWidth表示第一个li的宽度
                //设置负值，元素才会向左边移动
                animation(that.container, -that.pic[0].offsetWidth * index, 'left')
            }
        }
    }


    // 上一张//点击左侧按钮进行切换
    onprve() {
        // that指向实例化对象
        var that = this
        this.prev.onclick = function () {
            if (that.flag) {
                that.flag = false
                if (that.num == 0) {
                    that.num = that.pic.length - 1
                    //一瞬间把它拉回第一张图片
                    that.container.style.left = -that.pic[0].offsetWidth * that.num + 'px'
                }
                that.num--
                animation(that.container, -that.pic[0].offsetWidth * that.num, 'left', function () {
                    that.flag = true
                })
                that.circle--
                if (that.circle < 0) {
                    that.circle = that.circleBtn.children.length - 1
                }
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                that.circleBtn.children[that.circle].className = 'active'
            }
        }

    }


    // 下一张
    onnext() {
        var that = this
        this.next.onclick = function () {
            if (that.flag) {
                that.flag = false
                that.num++
                //问题：最后一次没有执行动画
                //console.log(num)
                //当咱们点击自增到最后一张的时候，条件满足进入判断体直接拉回到第一张了，所以下面的动画是没有执行的
                animation(that.container, -that.pic[0].offsetWidth * that.num, 'left', function () {
                    //把判断条件放在回调函数里面，只有每一次动画执行完毕后再执行条件里面的东西
                    if (that.num == that.pic.length - 1) {
                        that.num = 0
                        //一瞬间把它拉回第一张图片
                        that.container.style.left = 0
                    }
                    that.flag = true
                })
                that.circle++
                if (that.circle > that.circleBtn.children.length - 1) {
                    that.circle = 0
                }
                for (var j = 0; j < that.circleBtn.children.length; j++) {
                    that.circleBtn.children[j].className = ''
                }
                that.circleBtn.children[that.circle].className = 'active'
            }
        }
    }

    onBanner() {
        // console.log('111');
        var that = this
        //自动轮播
        function auto() {
            that.timer = setInterval(function () {
                //怎么调用事件和匿名函数  
                //next.onclick里面保存的就是函数，所以加一个括号就可以直接调用执行
                //让事件自调用，直接加括号就可以
                that.next.onclick = function () {
                    if (that.flag) {
                        that.flag = false
                        that.num++
                        //问题：最后一次没有执行动画
                        //console.log(num)
                        //当咱们点击自增到最后一张的时候，条件满足进入判断体直接拉回到第一张了，所以下面的动画是没有执行的
                        animation(that.container, -that.pic[0].offsetWidth * that.num, 'left',
                            function () {
                                //把判断条件放在回调函数里面，只有每一次动画执行完毕后再执行条件里面的东西
                                if (that.num == that.pic.length - 1) {
                                    that.num = 0
                                    //一瞬间把它拉回第一张图片
                                    that.container.style.left = 0
                                }
                                that.flag = true
                            })
                        that.circle++
                        if (that.circle > that.circleBtn.children.length - 1) {
                            that.circle = 0
                        }
                        for (var j = 0; j < that.circleBtn.children.length; j++) {
                            that.circleBtn.children[j].className = ''
                        }
                        that.circleBtn.children[that.circle].className = 'active'
                    }
                }
                that.next.onclick()
            }, 1000)
        }
        auto()
        //当鼠标移入到swiper容器里面的时候让自动轮播停止
        this.container.parentNode.onmouseover = function () {
            clearInterval(that.timer)
        }
        this.container.parentNode.onmouseout = function () {
            auto()
        }
    }

}
new Swiper()