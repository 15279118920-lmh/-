$(function () {
//    安全体系区域
    $(window).on("scroll",function () {
    //    获取移动距离
        let scrollHeight = $('html,body').scrollTop();
    //    设置蒙涨层移动距离
        $('.masks').css("top",scrollHeight);
    });
//    监听按钮点击
    $('.close').click(function () {
        //移除自身
        $(this).parents('.safe-info').remove();
    //    移除蒙涨层
       $('.masks').remove();
    })
//    登录框区域
    //    获取表单元素内容
    let $value = $('#account').val();
    $('#account').focus(function () {
    //获取焦点清空提示输入信息，且下方显示信息显示
        $(this).val('');
        //设置边框CSS样式
        $(this).css('border-color',"#969696");
        $('.user-msg').css('display','block');
        //    设置文字和图片样式为正常
        $(this).removeClass('error');
        $('.user-msg').removeClass('text-error');
        $('.icon-user').removeClass('icon-position1');
    });
    $('#account').on('input',function () {
        //    判断输入框是否有内容
        if($(this).val().length>0){
            $('.remove').css("display","block");
        }else {
            $('.remove').css("display","none");
        }

        //    删除内容按钮绑定点击事件
        $('.remove').click(function (e) {
            //    清除输入框内容
            $('#account').val('');
            //设置删除按钮隐藏
            $(this).css("display","none");
        //    设置输入框默认提示内容
            $('#account').val($value);
        //    阻止默认行为
            e.preventDefault();
        });
    });
    $('input:password').focus(function () {
        //获取焦点清空提示输入信息，且下方显示信息显示
        $('.password').html('');
        $('.user-psd').css('display','block');
        $(this).css('border-color',"#969696");
    //    设置文字和图片样式为正常
        $(this).removeClass('error');
        $('.user-psd').removeClass('text-error');
        $('.icon-password').removeClass('icon-position');
    });
//  表单元素失去焦点
    $('#account').blur(function () {
    //    获取表单失去焦点时内容,
        let $text = $(this).val();
        //    判断失去焦点时内容是否为空
        if($text.length>0){
            $(this).val($text);
        }else {
            $(this).val($value);
        }
    //    设置显示信息影藏
        $('.user-msg').css('display','none');
        //设置边框CSS样式
        $(this).css('border-color',"#e6e6e6");
    });
    //获取密码输入框中内容
    let $value1 = $('.password').html();
    $('input:password').blur(function () {
        //    获取表单失去焦点时内容,
        let $text = $(this).val();
        //    判断失去焦点时内容是否为空
        if($text.length>0){
            $(this).val($text);
        }else {
            $('.password').html($value1);
        }
        //    设置显示信息影藏
        $('.user-psd').css('display','none');
        //设置边框CSS样式
        $(this).css('border-color',"#e6e6e6");
    });
//    登录按钮点击事件
    $('#logo-in-btn').click(function () {
        //判断内容账号密码是否为空
       let account = $('#account').val();
       let password = $('.password').html();
        if(account==$value&&password==$value1){
            //设置提醒样式
            $('#account').addClass('error');
            $(':password').addClass('error');
            $('.user-msg').addClass('text-error');
            $('.user-psd').addClass('text-error');
            $('.icon-user').addClass('icon-position1');
            $('.icon-password').addClass('icon-position');
        }else if(account==$value){
            $('#account').addClass('error');
            $('.user-msg').addClass('text-error');
            $('.icon-user').addClass('icon-position1');
        }else if(password==$value1){
            $(':password').addClass('error');
            $('.user-psd').addClass('text-error');
            $('.icon-password').addClass('icon-position');
        }
    //    检查
    });
//    发送短信按钮
//    定义变量接收信息验证码
    let num = null;
    let phoneNumber = null;
    $('.number').on('input',function () {
        phoneNumber = this.value;
    });
    $('.send').click(function () {
        let number = parseInt(Math.random()*(10000-1000)+1000);
        //    判断电话号码是否符合格式要求
        let reg =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let res= reg.test(phoneNumber);
        if(res){
            $.ajax({
                url:'../php/check.php',
                data:'phone='+number,
                type:'post',
                success:function (msg) {
                    alert(msg);
                    num = msg;
                }
            });
        }else {
            alert('请输入正确的手机号码');
        }
    });
    let SMS_value = $('.SMS-code').val();
    $('.SMS-code').focus(function () {
       $(this).val('');
       $(this).css('borderColor','#969696');
    });
    $('.SMS-code').blur(function () {
        $(this).css('borderColor','#e6e6e6');
    });
    let number = $('.number').val();
    $('.number').focus(function () {
        $(this).val('');
        $(this).css('borderColor','#969696');
    });
    $('.number').blur(function () {
        $(this).css('borderColor','#e6e6e6');
    });
//    登录按钮验证
    $('#logo-in-btn').click(function () {
    //    获取表单中的信息
        let account = $('#account').val();
        let psd = $(':password').val();
    //    创建正则表达式
        let reg1=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let reg2=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let reg3 =/^[a-zA-Z]\w{5,17}$/;
        let res1 = reg1.test(account);
        let res2 = reg2.test(account);
        let res3 = reg3.test(psd);
        //获取短信验证码框中的内容
        let checkCode =$('.SMS-code').val();
        if((res1||res2)&&res3&&num===checkCode){
            $.ajax({
                url:'../php/account.php',
                data:"account="+account+"&"+"psd="+psd,
                type:'post',
                dataType:'json',
                success:function (msg) {
                    if(msg===1){
                        location.href='../html/index1.html';
                    }else {
                        alert('账号密码有误');
                    }
                }
            })
        }else {
            if(!(res1||res2)){
                $('#account').addClass('error');
                $('.user-msg').addClass('text-error');
                $('.icon-user').addClass('icon-position1');
            }else if(!res3){
                $(':password').addClass('error');
                $('.user-psd').addClass('text-error');
                $('.icon-password').addClass('icon-position');
            }else if(num!==checkCode){
                alert('请输入正确的验证码');
            }
        }
    //    七天自动登录按钮是否勾选
        let checked=$('.logo-in-check input').prop('checked');
        if(checked){
            addCookie("account",account,7,'/');
            addCookie("psd",psd,7,'/');
        };
    });
//    注册按钮跳转
    $('.register').click(function () {
        location.href='../html/index_registered';
    });
});