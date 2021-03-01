$(function () {
    let account =getCookie('account');
    if(account){
        $('.logo-in p:eq(1)').addClass('msg').siblings().removeClass('msg');
        let arr = account.split('');
        arr.splice(3,4,'*','*','*','*');
        let str = arr.join('');
        $('.logo-in .msg .user').html(str);
    }else {
        $('.logo-in p:eq(0)').addClass('msg').siblings().removeClass('msg');
    }
    $('#quit').click(function () {
        //    删除cookie中存储的数据
        delCookie('account','/',-1);
        delCookie('psd','/',-1);
        $('.logo-in p:eq(0)').addClass('msg').siblings().removeClass('msg');
    });
//    获取cookie中存储的数据
    let id = getCookie('id');
    (async function () {
        await $.ajax({
            url:`../php/list.php?id=${id}`,
            type:'get',
            success:function (msg) {
                let arr = eval('('+msg+')');
                let str=`<div class="item-banner fl">
            <img src="${arr[0].src}" alt="">
             <div class="move">
            </div>
        </div>
        <div class="big-banner">
            <img src="http://img3m4.ddimg.cn/0/21/1634176764-1_u_2.jpg" alt="">
        </div>
        <div class="item-info fl">
            <h2 class="title">${arr[0].title}</h2>
            <h3 class="info">${arr[0]['msg']}</h3>
            <div class="pinglun">
                <span class="star"></span>
                <span class="num"><a href="javascript:;" id="num">${arr[0].pl}</a>条评论数</span>
            </div>
            <div class="item-msg clearfix">
                <div class="item-price fl">
                    <p class="price-msg">
                        <b>秒杀价</b><span>降价通知</span>
                    </p>
                    <p class="price">
                        <span class="type">￥</span>
                        <span class="money">${arr[0].price}</span>
                        <span class="discount">${arr[0].dis}</span>
                    </p>
                    <p class="brand-price">
                        吊牌价<span class="discount-price">￥${arr[0].money}</span>
                    </p>
                </div>
                <div class="ad-banner fr">
                    <img src="https://img60.ddimg.cn/assets/pc_image/minaAttract-product-price.gif" alt="">
                    <img src="http://img7x9.ddimg.cn/imgother121/53/6/1060882469_1.jpg" alt="" class="code">
                </div>
            </div>
            <div class="cu_xiao">
                <p class="tips clearfix">
                    <span class="fl">领</span>
                    <span class="fr">券</span>
                </p>
                <span class="card">150减30</span>
            </div>
            <div class="send clearfix">
                <p class="tips fl clearfix">
                    <span class="fl">配</span>
                    <span class="fl">送</span>
                    <span class="fl">至</span>
                </p>
                <b class="local fl">江苏苏州市 至北京市顺义区<span>有货</span>免运费</b>
            </div>
            <div class="serve clearfix">
                <p class="tips clearfix fl">
                    <span class="fl">服</span>
                    <span class="fr">务</span>
                </p>
                <span class="msg">由“当当专卖店”发货，并提供售后服务。</span>
            </div>
            <div class="buy clearfix">
                <div class="buy-number">
                    <input type="text" value="1">
                    <a href="javascript:;" class="add">+</a>
                    <a href="javascript:;" class="reduce">-</a>
                </div>
                <div class="join-cart">
                    <span class="icon"></span>
                    <span class="msg">加入购物车</span>
                </div>
                <div class="buy-now">
                    <span class="info">去结算</span>
                </div>
            </div>
        </div>`
                $('.item').eq(1).html(str);
            }
        });
    })()
    $.ajax({
        url:'../php/item-pic.php?id='+id,
        type:'get',
        success:function (msg) {
            let obj = eval('('+msg+')')[0];
            let reg=/src/;
            let str='';
            let step=-1;
            //    放大镜功能
            for(let key in obj){
                step++;
                if(obj[key]==null){
                    return;
                }else {
                    if(reg.test(key)){
                        let src=obj[`src${step}`];
                        str +=`<span class="pic">
                <img src="${src}" alt="">
            </span>`
                    }
                    $('.img').html(str);
                }
            }
        }
    });
    $('.img').delegate('.pic img','mouseenter',function () {
        let src = $(this).attr('src');
        $(this).parents('.pic').addClass('on');
        $(this).parents('.pic').siblings().removeClass('on');
        $('.item-banner img').attr('src',src);
    });
    $('.item').delegate('.item-banner','mouseenter',function (e) {
        let src =  $(this).find('img').attr('src');
        $('.big-banner').find('img').attr('src',src);
        $('.big-banner').css('display','block');
        $('.move').css('display','block');
    });
    $('.item').delegate('.item-banner','mouseleave',function () {
        $('.big-banner').css('display','none');
        $('.move').css('display','none');
    });
    $('.item').delegate('.item-banner','mousemove',function (e) {
        let X=e.clientX-$('.item').offset().left;
        let Y=e.clientY-$('.item').offset().top;
    //    获取放大镜的宽高
        let height = $('.move').height();
        let width = $('.move').width();
        let moveX=X-width/2;
        let moveY=Y-height/2;
    //    获取最大移动距离
        let maxX=$('.item-banner').width()-$('.move').width();
        let minX=0;
        let maxY=$('.item-banner').height()-$('.move').height();
        let minY=0;
    //    安全验证
        moveX=moveX>maxX?maxX:moveX;
        moveX=moveX<minX?minX:moveX;
        moveY=moveY>maxY?maxY:moveY;
        moveY=moveY<minY?minY:moveY;
    //    设置大图显示位置
        let big_X=-2*moveX;
        let big_Y=-2*moveY;
    //    设置放大镜位置
        $('.move').css({
            top:moveY,
            left:moveX,
        });
        $('.big-banner img').css({
            top:big_Y,
            left:big_X,
        });
    });
    let arr = [];
    $('.item').delegate('.join-cart','click',function () {
        //获取商品数量
        let item_num = $('.buy-number input').val();
        $.ajax({
            url:'../php/local.php?id='+id,
            type:'get',
            success:function (msg) {
                // 获取本地存储商品
                let res = localStorage.getItem('item');
                if(res){
                    //将对象转化为数组
                    arr = JSON.parse(res);
                    //    定义开关变量
                    let flag = false;
                    //定义变量记录索引
                    let i = '';
                    arr.forEach(function (value, index) {
                        if(value.id==id){
                            flag = true;
                            i=index;
                        }
                    });
                    //当添加商品存在时
                    if(flag){
                        arr[i].num = parseInt(item_num)+parseInt(arr[i].num);
                        localStorage.setItem('item',JSON.stringify(arr));
                    //    当添加商品部存在时
                    }else {
                        let obj = eval('('+msg+')')[0];
                        obj.num=item_num;
                        arr.push(obj);
                        localStorage.setItem('item',JSON.stringify(arr));
                    }
                //    本地存储没有商品时
                }else {
                    let obj = eval('('+msg+')')[0];
                    obj.num=item_num;
                    arr.push(obj);
                    localStorage.setItem('item',JSON.stringify(arr));
                }
            }
        });
        alert('已经成功加入购物车');
    });
    $('.item').delegate('.buy-now','click',function () {
        let length = localStorage.length;
        if(length==0){
            return;
        }else {
            location.href='../html/cart.html';
        }
    });
    let num = $('.buy-number input').val();//商品初始数量
    $('.item').delegate('.add','click',function () {
        num++;
        $('.buy-number input').val(num);
        if(num!=1){
            $('.reduce').css('opacity',1);
        }
    });
    $('.item').delegate('.reduce','click',function () {
        if(num==1){
            return;
        }else {
            num--;
            $('.buy-number input').val(num);
            if(num==1){
                $('.reduce').css('opacity',0.5);
            }
        }
    });
});