// 发送请求获取数据
$(function () {
    (function () {
          $.ajax({
            url:"../php/items.php",
            dataType:'json',
            success:function (msg) {
                let str = '';
                $('.page').pagination({
                    pageCount:msg.length/10,
                    totalData:msg.length,
                    showData:10,
                    current:1,
                    coping:true,
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                    jump: true,
                },function (api) {
                    //设置初始显示页面
                    let arr = msg.slice(0,10);
                    for(let value of arr){
                        str+=`<li class="list">
                <div class="box fl">
                    <a href="javascript:;" class="show">
                        <img src="${value.src}" alt="">
                    </a>
                </div>
                <div class="item-info">
                    <a href="javascript:;" class="title">
                        ${value.title}
                    </a>
                    <p class="price">
                        秒杀价：¥
                        <span class="num">${value.price}</span>
                    </p>
                    <div class="progress-bar">
                        <span style="width:${value.buy.slice(4)}";></span>
                    </div>
                    <p class="progress-text">${value.buy}</p>
                    <div class="icon-buy">
                        <a href="javascript:;" class="shop" data-num="${value.id}"></a>
                    </div>
                </div>
            </li>`
                    }
                    $('.sale').html(str);
                })
                $('.page').on('click',function () {
                    let page = $('.page').find('.active').html();
                    $.ajax({
                        url:"../php/items.php",
                        dataType:'json',
                        success:function (msg) {
                            let str = '';
                            let arr = msg.slice((page - 1)* 10, page * 10);
                            for(let value of arr){
                                str+=`<li class="list">
                <div class="box fl">
                    <a href="javascript:;" class="show">
                        <img src="${value.src}" alt="">
                    </a>
                </div>
                <div class="item-info">
                    <a href="javascript:;" class="title">
                        ${value.title}
                    </a>
                    <p class="price">
                        秒杀价：¥
                        <span class="num">${value.price}</span>
                    </p>
                    <div class="progress-bar">
                        <span style="width:${value.buy.slice(4)}";></span>
                    </div>
                    <p class="progress-text">${value.buy}</p>
                    <div class="icon-buy">
                        <a href="javascript:;" class="shop" data-num="${value.id}"></a>
                    </div>
                </div>
            </li>`
                            }
                            $('.sale').html(str);
                        }
                    })
                })
            }
        });
    })();
//    获取元素
    $('.time-in li').click(function () {
        $(this).addClass('current').siblings().removeClass('current');
        $(this).find('.msg').text('已经开始');
        $(this).siblings().find('.msg').text('即将开始');
    })
//倒计时模块
    function time() {
        let date= new Date();
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1;
        let day = new Date().getDate()+1;
        return new Date(`${year}-${month}-${day} 0:0:0`);
    }
    let differTime = time();
    setTime();
    function setTime(){
        let obj = getDifferTime(differTime, new Date());
        $('#hours').text(obj.hour);
        $('#minutes').text(obj.minute);
        $('#seconds').text(obj.second);
    }
    setInterval(setTime,1000);
    $('.join').click(function () {
        location.href='../html/logoin.html';
    });
    let account = getCookie('account');
    $('.sale').delegate('.shop','click',function () {
       // 获取点击按钮的data-num值
        let num = $(this).attr('data-num');
        //发送请求去服务器查询数据，
        $.ajax({
           url:`../php/des.php?id=${num}`,
           type:'get',
           success:function (msg) {
               if(msg==0){
                   alert('该商品暂时没有详情页');
               }else {
                   addCookie('id',num,1,'/');
                   window.open('../html/des.html');
               }
           }
       })
    });
    if(account){
        $('.logo-in p:eq(1)').addClass('on').siblings().removeClass('on');
        let arr = account.split('');
        arr.splice(3,4,'*','*','*','*');
        let str = arr.join('');
        $('.logo-in .on .user').html(str);
    }else {
        $('.logo-in p:eq(0)').addClass('on').siblings().removeClass('on');
    }
    $('#quit').click(function () {
        //    删除cookie中存储的数据
        delCookie('account','/',-1);
        delCookie('psd','/',-1);
        $('.logo-in p:eq(0)').addClass('on').siblings().removeClass('on');
    });
});

