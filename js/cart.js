$(function () {
    let account =getCookie('account');
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
    $('.logo-in .join').click(function () {
        location.href='../html/logoin.html';
    });
    //获取本地local中数据
    function data() {
            let str = localStorage.getItem('item');
            let arr=eval('('+str+')');
            let str1='';
            let all_price='';
            let step = 0;
            for(let value of arr){
                all_price = value.num*value.price;
                str1 += `<div class="list clearfix">
                <div class="check-item">
                    <input type="checkbox" data-id="${step}">
                </div>
                <div class="item-img">
                    <img src="${value.src}" alt="">
                </div>
                <div class="item-info">
                    <p class="title">${value.title}</p>
                </div>
                <div class="item-price">
                    <p class="price">￥<span>${value.price}</span></p>
                </div>
                <div class="item-num">
                    <span class="amount clearfix">
                        <a href="javascript:;" class="reduce fl" data-id="${step}">-</a>
                        <input type="text" class="fl" value="${value.num}" data-id="${step}">
                        <a href="javascript:;" class="add fl" data-id="${step}">+</a>
                    </span>
                </div>
                <div class="all-price">
                    <p>￥<span class="money">${all_price}</span></p>
                </div>
                <div class="item-tool">
                    <a href="javascript:;" class="collect" data-id="${step}">移入收藏</a>
                    <a href="javascript:;" class="delete" data-id="${step}">删除</a>
                </div>
                <div class="remove-item">
                    <p class="msg">您确定要删除商品吗？</p>
                    <span class="sure">确定</span>
                    <span class="no">取消</span>
                </div>
                <div class="item-line"></div>
            </div>`
                step++;
            }
            $('.item-list').html(str1);
            getSum();
    };
    data();
    test();
    function test() {
        let length = $('.item-list .list').length
        if(length==0){
            $(".empty").css('display','block');
            $(".item").css('display','none');
        }else {
            $(".item").css('display','block');
            $(".empty").css('display','none');
        }
    };
    //获取商品长度
    function item_length() {
      $('.item-list').last().css('border-bottom','none');
    };
    item_length();
//    计算总价
    function getSum() {
        let el = $('.money');
        let mon=0;
        $.each(el,function (index,value) {
            let num = (parseFloat(value.innerHTML)*1000)/1000;
            mon+= num;
        });
        $('.shop-money').html(mon);
    }
    //添加商品按钮
    $('.item-list').delegate('.add ','click',function () {
        //获取输入框中内容
        let num = $(this).siblings('input').val();
        num++;
        $(this).siblings('input').val(num);
        let price =  $(this).parents('.item-num').siblings('.item-price').find('span').html();
        let allPrice = num*price;
        $(this).parents('.item-num').siblings('.all-price').find('.money').html(allPrice);
        //获取该商品在本地存储的数量
        let id =$(this).attr('data-id');
        let res = localStorage.getItem('item');
        let arr=JSON.parse(res);
        arr[id].num++;
        //重新设置本地储存
        arr.splice(id,1,arr[id]);
        localStorage.setItem('item',JSON.stringify(arr));
        getSum();
    });
    //减少商品按钮
    $('.item-list').delegate('.reduce ','click',function () {
        //获取输入框的商品数量
        let num=$(this).siblings('input').val();
        if(num==1){
            return;
        }
        num--;
        $(this).siblings('input').val(num);
        let price =  $(this).parents('.item-num').siblings('.item-price').find('span').html();
        let allPrice = num*price;
        $(this).parents('.item-num').siblings('.all-price').find('.money').html(allPrice);
        $(this).siblings('input').val(num);
            //获取该商品在本地存储的数量
        let id =$(this).attr('data-id');
        let res = localStorage.getItem('item');
        let arr=JSON.parse(res);
        arr[id].num--;
        //重新设置本地储存
        arr.splice(id,1,arr[id]);
        localStorage.setItem('item',JSON.stringify(arr));
        getSum();
    });
    //删除按钮
    $('.item-list').delegate('.delete ','click',function () {
        $(this).parent().siblings('.remove-item').css('display','block');
        //确定按钮
        $('.sure').click(function () {
            $(this).parents('.list').remove();
            //获取商品ID
            let id = $(this).parent().siblings('.item-tool').find('.delete').attr('data-id');
            let str=localStorage.getItem('item');
            let arr=JSON.parse(str);
            arr.splice(id,1);
            localStorage.setItem('item',JSON.stringify(arr));
            getSum();
            let bool = $('.list').length;
            if(bool==1){
                $(".empty").css('display','block');
                $(".item").css('display','none');
            }
        });
        //取消按钮
        $('.no').click(function () {
            $(this).parent().css('display','none');
        })
    });
//    表单输入按钮
    $('.item-list').delegate('.amount input','click',function () {
        $(this).on('blur',function () {
            let num1 = parseInt($(this).val());
        //    获取商品单价
            let price =  $(this).parents('.item-num').siblings('.item-price').find('span').html();
            let allPrice = num1*price;
            $(this).parents('.item-num').siblings('.all-price').find('.money').html(allPrice);
            //获取该商品在本地存储的数量
            let id =$(this).attr('data-id');
            let res = localStorage.getItem('item');
            let arr=JSON.parse(res);
            arr[id].num=num1;
            //重新设置本地储存
            arr.splice(id,1,arr[id]);
            localStorage.setItem('item',JSON.stringify(arr));
            getSum();
        });
    });
//    全选按钮
    $('#quan').click(function () {
        let res = $(this).prop('checked');
        $('.check-item input').prop('checked',res);
        $('.shop-logo input').prop('checked',res);
    });
    $('.shop-logo input').click(function () {
        let res = $(this).prop('checked');
        $('.check-item input').prop('checked',res);
        $('#quan').prop('checked',res);
    });
//    取消全选按钮
    $('.item-list').delegate('.check-item input','click',function () {
    //    获取所有按钮
        let arr = $('.check-item input');
    //    定义开关变量
        let flag = false;
    //    判断按钮选中状态
        arr.each(function (index,value) {
            let bol = value.checked;
            if(!bol){
                flag=true;
            }
        })
        if(flag){
            $('#quan').prop('checked',false);
            $('.shop-logo input').prop('checked',false);
        }else {
            $('#quan').prop('checked',true);
            $('.shop-logo input').prop('checked',true);
        };
    });
//    全选按钮
    $('#quanxuan').click(function () {
        let bol = $(this).prop('checked');
        $('.check-item input').prop('checked',bol);
    })
    $('.item-list').delegate('.check-item input','click',function () {
        //    获取所有按钮
        let arr = $('.check-item input');
        //    定义开关变量
        let flag = false;
        arr.each(function (index,value) {
            let bol = value.checked;
            if(!bol){
                flag=true;
            }
        });
        if(flag){
            $('#quanxuan').prop('checked',false);
        }
    });
//全选按钮
    $('#quanxuan').click(function () {
        if(this.checked){
            let num = $('.item-list .list').length;
            $('.num-item').html(num);
            let money = $('.shop-money').html();
            $('.totle-money span').html(`￥${money}`);
        }else {
            $('.num-item').html(0);
            $('.totle-money span').html(`￥0.00`)
        }
    });
//    商品选择按钮
    $('.item').delegate('.check-item input','click',function () {
        let el=$('.check-item input');
        let money = 0;
        let step = 0;
        el.each(function (index,value) {
           if(value.checked){
               step++;
               money+= parseInt($(value).parent().siblings('.all-price').find('.money').html());
           }
        });
        $('.totle-money span').html(`￥${money}`);
        $('.num-item').html(step);
    });
//    批量删除
    $('.remove-checked').click(function () {
        let el = $('.check-item input');
        console.log(el.length);
        el.each(function (index,value){
            if(value.checked){
                let id = $(value).attr('data-id');
                $(value).parents('.item-list .list').remove();
                let str=localStorage.getItem('item');
                let arr=JSON.parse(str);
                arr.splice(id,1);
                localStorage.setItem('item',JSON.stringify(arr));
                let bool = $('.list').length;
                if(bool==1){
                    $(".empty").css('display','block');
                    $(".item").css('display','none');
                }
                getSum();
            };
        });
        $('.totle-money span').html(`￥0.00`);
        $('.num-item').html(0);
    });
    function test() {
        let res = parseInt(Math.random()*5000)+5000;
        return res;
    }
//    推荐商品模块
//    获取数据
    (async function () {
        let dt='';
        dt = await $.ajax({
            url:'../php/cart.php',
            data:'id1=30&id2=50',
            type:'get',
        });
        let arr = JSON.parse(dt);
        let str = ``;
        let id = 30;
        $.each(arr,function (index,value) {
            id ++;
            str+=`
                <li class="list-item" data-name="${id}">
                <img src="${value.src}" alt="">
                <p class="info"><span>${value.title}</span></p>
                <p class="item-price">￥${value.price}</p>
                <p class="pinglun"><span class="icon fl"></span>已有<span class="people">${test()}</span>位用户评价</p>
                <span class="add-cart">加入购物车</span>
                <span class="mask">已成功加入购物车</span>
            </li>
            `
            if(index+1>9){
                let res = (index+1)/10;
                if(parseInt(res)==res){
                    let el1 =$('<ul class="shop-item clearfix"></ul>');
                    el1.html(str);
                    str='';
                    $('#item-box').append(el1);
                //    创建SPAN元素
                    if(res>1){
                        let el=$('<span class="item-tab "></span>');
                        $('.shop-msg .btn').append(el);
                    }
                }
            }
        });
    })();
    $('#item-box').delegate('.add-cart','click',function () {
        let id = $(this).parents('.list-item').attr('data-name');
    //    发送请求去服务器获取商品信息
        $.ajax({
            url:'../php/cart1.php?id='+id,
            type:'get',
            dataType:'json',
            success:function (msg) {
                console.log(msg);
            }
        })
    })
});