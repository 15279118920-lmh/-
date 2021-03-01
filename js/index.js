$(function () {
    //右侧工具栏
    $('.name').hover(function () {
        $(this).children(0).addClass("show-on").stop().animate({left:-79},200);
    },function () {
        $(this).children(0).removeClass("show-on").stop().animate({left:-0},200);
    });
    //二维码显示隐藏
    $('.code').hover(function () {
        $('.code-img').css("display","block");
    },function () {
        $('.code-img').css("display","none");
    })
    //返回顶部按钮
    $(".to-top").click(function () {
        //网页开始滚动
        $("html,body").stop().animate({scrollTop:0},500);
    })
    //地址显示栏
    $('#location').hover(function () {
        //移入显示地址栏
        $('.city').css('display','block');
    },function () {
        //移除隐藏
        $('.city').css('display','none');
    });
    $('.city').hover(function () {
        $('.city').css('display','block');
    },function () {
        $('.city').css('display','none');
    });
    $('.city').delegate('.city1',"click",function () {
        //获取点击的地址
        let address = $(this).html();
        //添加cookie
        addCookie("address",address,7);
        $('#city').html(getCookie("address"));
    });
    //获取cookie中存储的地址
    $('#city').html(getCookie("address"));
    //顶部二级菜单
    let sub = document.querySelectorAll(".sub");
    for(let i=0;i<sub.length;i++){
        //移入显示
        sub[i].onmouseenter = function () {
            this.children[1].style.display = "block";
        };
        //移出隐藏
        sub[i].onmouseleave = function () {
            this.children[1].style.display = "none";
        }
    }
    //底部广告移除
    $(".close-banner").click(function () {
        $(this).parents('.bottom-banner').remove();
    })
    //搜索框
    let textValue = null;//获取搜索框的内容
    // 搜索框获取焦点
    $('#text').focus(function () {
        //判断搜索框中的内容是否和初始内容相同
        if(textValue==="卡美利亚的哲学世界"){
            $(this).val("");
        }else {
            $(this).val(textValue);
        }
        $('.search .list').css('display','block');
    });
    // 搜索框失去焦点
    $('#text').blur(function () {
        //获取搜索框的内容
        textValue = $(this).val();
        //判断搜索框的内容是否为空
        if(textValue==""){
            $(this).val("卡美利亚的哲学世界");
        }
        $('.search .list').css('display','none');
    });
    //搜索框内容改变
    $('#text').on("input",function () {
        $(".search .list").css("display","block");
        if(this.value===""){
            $(".search .list").css("display","none");
        }
        //发送ajax请求获取数据
        $.ajax({
            url: "https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd=" + this.value,
            dataType:'jsonp',
            success:function (msg) {
                creatEle(msg.g)
            }
        })
    })
    //创建函数生成元素
    //获取搜索框的下拉列表元素
    let $ul =$(".search .list");
    function creatEle(arr) {
        //删除上次显示结果
        $('.search .list li').remove();
        //遍历数组
        arr.forEach(function (value) {
            //生成元素
            let $li = $("<li>"+value.q+"</li>");
            //将生成的元素追加到ul中
            $ul.append($li);
        })
    }
    //轮播图模块
    let mySwiper = new Swiper ('.swiper-container',{
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
            bulletClass:"myswiper-pagination-bullet",
            bulletActiveClass:"my-bullet-active",
        },
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect:"fade",
        autoplay: {
            delay: 2000,
            disableOnInteraction:false,
        },
        allowTouchMove:false,
    })
    $(".swiper-container").mouseenter(function () {
        $('.swiper-button-next').animate({"right":0},200);
        $('.swiper-button-prev').animate({"left":0},200);
    })
    $(".swiper-container").mouseleave(function () {
        $('.swiper-button-next').animate({"right":-44},200);
        $('.swiper-button-prev').animate({"left":-44},200);
    });
    //底部图片切换模块
    //创建定时器自动切花
    let timer = setInterval(function () {
        $('.right-btn').click();
    },2000);
    $('.banner-ad').hover(function () {
        $('.left-btn').stop().animate({'left':"0"},500);
        $('.right-btn').stop().animate({'right':"0"},500);
        clearInterval(timer);
    },function () {
        $('.left-btn').stop().animate({'left':"-40"},500);
        $('.right-btn').stop().animate({'right':"-40"},500);
        timer = setInterval(function () {
            $('.right-btn').click();
        },2000);
    })
    //监听切换按钮点击
    $('.left-btn').click( function (){
        //判断当前显示状态
        if($('.ad-hide').css('opacity')<$('.ad-show').css('opacity')){
            $('.ad-hide').animate({'opacity':'1'},500).css('z-index',10);
            $('.ad-show').animate({'opacity':'0'},500).css('z-index',0);
        }else {
            $('.ad-hide').animate({'opacity':'0'},500).css('z-index',0);
            $('.ad-show').animate({'opacity':'1'},500).css('z-index',10);
        }
    });
    $('.right-btn').click(function(){
        //判断当前显示状态
        if($('.ad-hide').css('opacity')>$('.ad-show').css('opacity')){
            $('.ad-hide').animate({'opacity':'0'},500).css('z-index',0);
            $('.ad-show').animate({'opacity':'1'},500).css('z-index',10);
        }else {
            $('.ad-hide').animate({'opacity':'1'},500).css('z-index',10);
            $('.ad-show').animate({'opacity':'0'},500).css('z-index',0);
        }
    });
    //信息和服务公告区域
    $('.news-title>h3').hover(function () {
        $(this).addClass('title-Current').siblings().removeClass('title-Current');
        //    获取移入的索引
        let $index = $(this).index();
        if($index===0){
            $('.news-show').addClass("news-on").siblings().removeClass("news-on");
        }else if($index===1){
            $('.news-hide').addClass("news-on").siblings().removeClass("news-on");
        };
        clearInterval(timerOn);
    },function () {
        timerOn=setInterval(toggleNews,2000);
    });
    $('.news>ul').hover(function () {
        clearInterval(timerOn);
    },function () {
        timerOn=setInterval(toggleNews,2000);
    });
    function toggleNews(){
        $('.news-title>h3').toggleClass('title-Current');
        $('.news>ul').toggleClass('news-on');
    };
    let timerOn=setInterval(toggleNews,4000);
    //信息区域商品展示模块
    //定义变量记录步长
    let step=0;
    let currentIndex=0;
    let timer1 = null;
    $('.bottom-item').hover(function () {
        clearInterval(timer1);
    },function () {
        timer1 = setInterval(function () {
            $('#btn-banner-right').click();
        },2000);
    })
    $('#circle>li').click(function (e) {
        //获取所点击的元素索引
        currentIndex = $(this).index();
        step = currentIndex;
        //给所点击元素添加样式
        $(this).addClass("current-color").siblings().removeClass("current-color");
        //计算li宽度
        let offsetWidth = $('.bottom-item>ul>li').width();
        //计算图片移动距离
        let $moveWidth = -currentIndex*offsetWidth;
        //ul移动
        $('.msg>.bottom-item>ul').animate({"left":$moveWidth},200);
    });
    //右侧点击按钮
    //克隆第一张图片
    let $li = $('.bottom-item>ul>li:nth-child(1)').clone(true);
    //将克隆的图片插入到ul中;
    $('.bottom-item>ul').append($li);
    $('#btn-banner-left').click(function () {
        currentIndex--;
        //计算li宽度
        let offsetWidth = $('.bottom-item>ul>li').width();
        //判断是否到达最后一张图
        if(step<=0){
            $('.msg>.bottom-item>ul').css({left:-3*offsetWidth});
            step=3;
        }
        step--;
        //计算ul元素移动距离
        let $moveWidth = -step*offsetWidth;
        $('.msg>.bottom-item>ul').animate({"left":$moveWidth},200);
        //设置分页器按钮样式;
        $('#circle>li').eq(currentIndex).addClass('current-color').siblings().removeClass("current-color");
        //判断是否已到最后一张
        if(currentIndex<0){
            currentIndex=2;
        }
        $('#circle>li').eq(currentIndex).addClass('current-color').siblings().removeClass("current-color");
    });
    $('#btn-banner-right').click(function () {
        currentIndex++;
        //计算li宽度
        let offsetWidth = $('.bottom-item>ul>li').width();
        //判断当前是否移动到最后
        if(step===3){
            step=0;
            $('.msg>.bottom-item>ul').css({left:0});
        }
        step++;
        //计算ul元素移动距离
        let $moveWidth = -step*offsetWidth;
        //ul元素开始移动
        $('.msg>.bottom-item>ul').animate({"left":$moveWidth},200);
        if(currentIndex===$('.bottom-item>ul>li').length-1){
            currentIndex=0;
        }
        $('#circle>li').eq(currentIndex).addClass('current-color').siblings().removeClass("current-color");
    });
    timer1 = setInterval(function () {
        $('#btn-banner-right').click();
    },2000);
    // 厂商图片区域
//    获取元素对象绑定事件
    $('.goods-product>span').click(function () {
        //给移入的元素绑定样式属性
        $(this).addClass('goods-current-btn').siblings().removeClass("goods-current-btn");
        //获取移入的元素索引
        let $index = $(this).index();
        if($index===1){
            $('.goods-items-show').addClass('show-on');
            $('.goods-items-hide').removeClass('show-on');
        }else if($index===2){
            $('.goods-items-show').removeClass('show-on')
            $('.goods-items-hide').addClass('show-on');
        }
    });
    function toggleList(){
        $('.goods-product>span').toggleClass('goods-current-btn');
        $('.goods-items1').toggleClass('show-on');
    };
    $('.content-right').hover(function () {
        clearInterval(timerList);
    },function () {
        timerList = setInterval(toggleList,3000);
    })
    let timerList = setInterval(toggleList,3000);
//楼层导航栏
    $('.floor li').hover(function () {
    //    设置对应li样式
        $(this).addClass('width-on');
        //    设置对应span显示隐藏
        $(this).find('span').css('display','block');
        $(this).find('a').addClass('cuttent').removeClass("floor-bg");
    },function () {
        //    设置对应li样式
        $(this).removeClass('width-on');
        //    设置对应span显示隐藏
        $(this).find('span').css('display','none');
        $(this).find('a').removeClass('cuttent').addClass('floor-bg');
    });
//    监听网页滚动
    $(window).scroll(function () {
        //设置楼层导航显示
        //获取网页最低部距离顶部距离
        let bottom_height =$('.footer').offset().top;
        if($('html').scrollTop()===0||$('html').scrollTop()>=bottom_height-$(window).height()){
            $('.fix-floor').stop().animate({'opacity':0},200);
        }else{
            $('.fix-floor').stop().animate({'opacity':1},200);
        }
        //计算内容模块距离网页顶部距离
        let $height = $('.content').get(0).offsetTop;
        //判断网页移动距离是否超过内容距离顶部距离
        if($('html').scrollTop()>$height){
            //当超过顶部距离显示
            $('.hide-search').css({
                "display":'block',
                "top":0,
                'z-index':'1000',
                'position':'fixed',
            })
        }else {
            $('.hide-search').css('display','none');
        }
        //    获取各个导航区域距离网页顶部距离
        let searchHeight = $('.hide-search').height();
        let $bookHeight=$('.book').offset().top-searchHeight;
        let $clothesHeight=$('.clothes').eq(0).offset().top-searchHeight;
        let $foodHeight=$('#food-item').offset().top-searchHeight;
        let $babyHeight=$('.baby-items').offset().top-searchHeight;
        let $recommendedHeight=$('.recommended').offset().top-searchHeight;
        //    监听各个楼层点击
        $('.floor>li').click(function () {
            //    获取点击楼层的索引
            let $index = $(this).index();
            //    判断点击的楼层索引
            if($index===0){
                $('html,body').stop().animate({scrollTop: $bookHeight},500);
            }else if($index===1){
                $('html,body').stop().animate({scrollTop: $clothesHeight},500);
            }else if($index===2){
                $('html,body').stop().animate({scrollTop: $foodHeight},500);
            }else if($index===3){
                $('html,body').stop().animate({scrollTop: $babyHeight},500);
            }else if($index===4){
                $('html,body').stop().animate({scrollTop: $recommendedHeight},500);
            }
        });
        //    获取网页滚动距离,获取可视区域高度
        let scrollHeight = $(this).scrollTop()+$(this).height();
    //    判断网页移动距离
        if(scrollHeight>$bookHeight&&scrollHeight<$clothesHeight){
            $('.floor li a').eq(0).addClass("cuttent");
        }else{
            $('.floor li a').eq(0).removeClass("cuttent");
        };
        if(scrollHeight>$clothesHeight&&scrollHeight<$foodHeight){
            $('.floor li a').eq(1).addClass("cuttent");
        }else{
            $('.floor li a').eq(1).removeClass("cuttent");
        };
        if(scrollHeight>$foodHeight&&scrollHeight<$babyHeight){
            $('.floor li a').eq(2).addClass("cuttent");
        }else{
            $('.floor li a').eq(2).removeClass("cuttent");
        };
        if(scrollHeight>$babyHeight&&scrollHeight<$recommendedHeight){
            $('.floor li a').eq(3).addClass("cuttent");
        }else{
            $('.floor li a').eq(3).removeClass("cuttent");
        };
        if(scrollHeight>$recommendedHeight&&scrollHeight<bottom_height){
            $('.floor li a').eq(4).addClass("cuttent");
        }else{
            $('.floor li a').eq(4).removeClass("cuttent");
        };
    });
    //倒计时模块
    //封装时间函数
    function time(hour) {
        //获取当前时间
        let currentTime = new Date();
        //获取当前时间年月日时分秒
        let year = currentTime.getFullYear();
        let month = currentTime.getMonth()+1;
        //设置时间自动增加一天
        let day = currentTime.getDate();
        let time = 0;
        //判断是否传入时间;
        time = hour?hour:24;
        //设置未来时间
        let differTime = new Date(`${year}-${month}-${day} ${time}:0:0`);
        // 将时间返回
        return differTime;
    };
    // 获取时间插值
    let differTime=time();
    //设置初始显示时间
    setTime();
    //设置时间插值
    function setTime() {
        //计算相差时间
        let obj = getDifferTime(differTime,new Date());
        //将时间设置给显示框
        $('#hours').text(obj.hour);
        $('#minutes').text(obj.minute);
        $('#seconds').text(obj.second);
    };
    //声明变量为定时器ID；
    let timer_Down=null;
    timer_Down=setInterval(setTime,1000);
    //监听时间模块点击
    $('.timer-show>li').click(function () {
        //判断是否点击同一个元素
        if($(this).attr('data-click')){
            return;
        }
        //给点击元素添加属性值
        $(this).attr('data-click','clicked').siblings().removeAttr('data-click');
        //    获取点击框时间
        let str = $(this).find("a").html();
        //    将获取的时间转化为指定格式
        let date = str.slice(0,2);
        // 调用时间函数设置显示时间
        let differTime1 = time(date);
        //获取现在小时,以及倒计时框显示时间
        let hour = new Date().getHours();
        let hour1 = differTime1.getHours();
        //倒计时框显示时间是否大于倒计时框时间
        if(hour1>hour){
            //清除上个定时器
            clearInterval(timer_Down);
            function setTime() {
                //计算相差时间
                let time = new Date();
                let obj = getDifferTime(differTime1,time);
                //将时间设置给显示框
                $('#hours').text(obj.hour);
                $('#minutes').text(obj.minute);
                $('#seconds').text(obj.second);
            //   判断当前时间是否到达20：00
                if(time.getHours()===20){
                    clearInterval(timer_Down);
                };
            };
            //设置新的时间倒计时
            timer_Down=setInterval(setTime,1000);
        }
    });
//    图书排行榜模块
    $('.book-right-header>div').mouseenter(function () {
        $(this).addClass('book-onchange').siblings().removeClass('book-onchange');
        //获取移入的元素索引
        let $index = $(this).index();
        if($index===0){
            $('.book-best-sell').css('display','block').siblings().css('display','none');
        }else if($index===1){
            $('.book-latest').css('display','block').siblings().css('display','none');
        }
    });
    //图书排行榜显示切换
    $('.book-show .book-show-on').mouseenter(function () {
        $(this).addClass('on-close').siblings().removeClass('on-close');
        $(this).next().addClass('on-open').siblings().removeClass('on-open');
    });
//    图书显示导航
    $('.books-msg-nav>li').mouseenter(function () {
        $(this).addClass('tab-nav').siblings().removeClass('tab-nav');
    })
//    服装显示导航
    $('.clothes-header-nav>li').mouseenter(function () {
        //给移入的元素添加类名修改样式，给其他元素删除类名
        $(this).addClass('clothes-header-nav-on').siblings().removeClass('clothes-header-nav-on');
    })
//    服装品牌轮播区域
    let begin = 0;//记录图片初始的位置；;
    // 获取li的宽度

    let timerId = setInterval(move,10);
    //封装移动函数
    function move () {
        let $width = $('.rolling-brand>li').width();
        //判断当移动的长度大于li宽度是,删除该元素
        if(begin>=$width){
            //先克隆该元素
            let $li =$('.rolling-brand li').eq(0).clone(true);
            //在删除该元素
            $('.rolling-brand li').eq(0).remove();
            //将克隆的元素追加到最后
            $('.rolling-brand').append($li);
            //重新给该变量赋值
            begin=0;
        }
        //定义步长
        begin+=1;
        $('.rolling-brand').css('left',-begin);
    }
//    当鼠标悬停在移动轮播栏上停止定时器
    $('.rolling-brand').hover(function () {
        clearInterval(timerId)
    },function () {
        timerId = setInterval(move,10);
    });
//    二级菜单栏
    $('#list-title>li').hover(function () {
        $(this).addClass('change-current');
    //    获取移入的索引
        let index = $(this).index();
        $('.list-book').eq(index).addClass('list-current');
    },function () {
        $(this).removeClass('change-current');
        let index = $(this).index();
        $('.list-book').eq(index).removeClass('list-current');
    });
    $('.list-book').hover(function () {
        $(this).addClass('list-current');
        let index = $(this).index()-1;
        $('#list-title>li').eq(index).addClass('change-current');
    },function () {
        $(this).removeClass('list-current');
        let index = $(this).index()-1;
        $('#list-title>li').eq(index).removeClass('change-current');
    });
//    登录按钮
    $('#logo_in').click(function () {
        location.href='../html/logoin.html';
    });
    let account = getCookie('account');
    let psd = getCookie('psd');
    $.ajax({
        url:'../php/account.php',
        data:`account=${account}&psd=${psd}`,
        type:'post',
        success:function (msg) {
            //如果已经登录修改对应样式
            if(msg==1){
                $('.logo-in p:eq(1)').addClass('on').siblings().removeClass('on');
                let arr = account.split('');
                arr.splice(3,4,'*','*','*','*');
                let str = arr.join('');
                $('.logo-in .on .user').html(str);
            }else {
                $('.logo-in p:eq(0)').addClass('on').siblings().removeClass('on');
            }
        }
    });
    $('#quit').click(function () {
    //    删除cookie中存储的数据
        delCookie('account','/',-1);
        delCookie('psd','/',-1);
        $('.logo-in p:eq(0)').addClass('on').siblings().removeClass('on');
    });
    $('.timer-show li').eq(4).click(function () {
        $(this).find('a').addClass('current-time');
        $(this).siblings().find('a').removeClass('current-time');
        location.href='../html/index_item.html';
    })
});