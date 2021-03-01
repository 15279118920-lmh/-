$(function () {
    $(':checkbox').click(function () {
        if(!this.checked){
            $('.warn').css('display','block');
        }else {
            $('.warn').css('display','none');
        }
    });
    //随机生成字符串字母
    function randomStr() {
        let str = '';
        for(let i=0;i<4;i++){
            let num = parseInt(Math.random()*(90-65+1)+65);
            str+=String.fromCharCode(num);
        }
        return str
    }
    //设置初始显示字符串
    $('.code').text(randomStr());
    $('.change-code').click(function () {
        let str = randomStr();
        $('.code').text(str);
    });
    let phone_flag = false;//开关判断,电话号码框是否输入正确
    let psd_flag = false;//开关判断,密码框是否输入正确
    let sure_flag = false;//开关判断,确认密码框是否输入正确
    let check_flag = false;//开关判断,确认密码框是否输入正确
//    手机号码
    $('#phone').focus(function () {
        $(this).addClass('focus').removeClass('wrong');
        $(this).siblings('.icon-wrong').removeClass('icon-on icon-right');
        $(this).siblings('.tips').addClass('tips-on').removeClass('wrong-color');
        $(this).siblings('.tips').text('手机号可用于登录、找回密码、接收订单通知等服务');
    });
    $('#phone').blur(function () {
    //    获取表单中输入的内容
        let num = $(this).val();
    //    创建正则表达式
        let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let res = reg.test(num);
        if(res){
            $(this).siblings('.icon-wrong').addClass('icon-right');
            $(this).removeClass('focus');
            $(this).siblings('.tips').removeClass('tips-on');
            phone_flag = true;
        }else if(num.length===0) {
            $(this).removeClass('focus');
            phone_flag = false;
        }else {
            $(this).siblings('.icon-wrong').addClass('icon-on');
            $(this).siblings('.tips').text('手机格式不正确，请重新输入').addClass('wrong-color');
            $(this).addClass('wrong').removeClass('focus');
            phone_flag = false;
        }
    });
//    密码验证框
    $('#password').focus(function () {
        //添加边框样式,设置提醒栏
        $(this).addClass('focus');
        $(this).siblings('.tips').addClass('tips-on').removeClass('wrong-color');
        $(this).siblings('.icon-wrong').removeClass('icon-right icon-on');
        $(this).siblings('.level').removeClass('info-on');
        $(this).removeClass('wrong');
    });
    $('#password').on('input',function () {
        //    获取输入框内容
        let str = $(this).val()
        if(str.length===0){
            $(this).siblings('.tips').addClass('tips-on');
            $(this).siblings('.level').removeClass('info-on');
        }else {
            $(this).siblings('.tips').removeClass('tips-on');
        }
    //    创建正则表达式检查规则匹配
        let reg=/^[0-9]{6,20}$/;    //全是数字或全是字母     6-20个字符
        let reg1=/^[A-Za-z0-9]{6,20}$/;     //数字、26个英文字母      6-20个字符
        let reg2=/^[\w-_*-//+.\\'";:/?><()!`~@#$%^&=]{6,20}$/;           // 由数字、26个英文字母或者下划线组成的字符串    6-20个字符_
    //    开始判断密码难度
        if(reg.test(str)){
        //    当密码强度为简单时
            $(this).siblings('.level-ease').addClass('info-on');
            $(this).siblings('.icon-wrong').addClass('icon-right');
        }else if(reg1.test(str)){
            //    当密码强度为中等
            $(this).siblings('.level-ease').removeClass('info-on');
            $(this).siblings('.level-simple').addClass('info-on');
            $(this).siblings('.icon-wrong').addClass('icon-right');
        }else if(reg2.test(str)){
            //    当密码强度为困难
            $(this).siblings('.level-simple').removeClass('info-on');
            $(this).siblings('.level-diffcult').addClass('info-on');
            $(this).siblings('.icon-wrong').addClass('icon-right');
        }else if(str.length>0&&str.length<=6){
            $(this).siblings('.level-ease').addClass('info-on');
            $(this).siblings('.icon-wrong').removeClass('icon-right');
        }
    })
    $('#password').blur(function () {
        let str = $(this).val();
        $(this).removeClass('focus');
        $(this).siblings('.tips').removeClass('tips-on');
        //    创建正则表达式检查规则匹配
        let reg=/^[0-9]{6,20}$/;    //全是数字或全是字母     6-20个字符
        let reg1=/^[A-Za-z0-9]{6,20}$/;     //数字、26个英文字母      6-20个字符
        let reg2=/^[\w-_*-//+.\\'";:/?><()!`~@#$%^&=]{6,20}$/;           // 由数字、26个英文字母或者下划线组成的字符串    6-20个字符_
        //    开始判断密码难度
        if(reg.test(str)){
            //    当密码强度为简单时
            $(this).siblings('.level-ease').addClass('info-on');
            $(this).siblings('.icon-wrong').addClass('icon-right');
            psd_flag=true;
        }else if(reg1.test(str)){
            //    当密码强度为中等
            $(this).siblings('.level-ease').removeClass('info-on');
            $(this).siblings('.level-simple').addClass('info-on');
            $(this).siblings('.icon-wrong').addClass('icon-right');
            psd_flag=true;
        }else if(reg2.test(str)){
            //    当密码强度为困难
            $(this).siblings('.level-simple').removeClass('info-on');
            $(this).siblings('.level-diffcult').addClass('info-on');
            $(this).siblings('.icon-wrong').addClass('icon-right');
            psd_flag=true;
        }else if(str.length<=6&&str.length>0){
            $(this).siblings('.icon-wrong').addClass('icon-on');
            $(this).addClass('wrong');
            $(this).siblings('.tips').addClass('wrong-color');
            $(this).siblings('.level').removeClass('info-on');
            $(this).siblings('.tips').addClass('tips-on');
        }else if(str.length===0){
            psd_flag=false;
        }
    });
    //确认输入框
    $('#sure').focus(function () {
        $(this).addClass('focus');
        $(this).siblings('.tips').addClass('tips-on').text('请再次输入密码').removeClass('wrong-color');
        $(this).siblings('.icon-wrong').removeClass('icon-right icon-on');
        $(this).removeClass('wrong');
    });
    $('#sure').blur(function () {
        $(this).removeClass('focus');
        $(this).siblings('.tips').removeClass('tips-on');
        //获取密码输入框的内容和确认密码框的内容
        let pas1 = $('#password').val();
        let pas2 = $(this).val();
    //    判断密码是否一致
        if(pas1===pas2&&pas2.length>0){
            $(this).siblings('.icon-wrong').addClass('icon-right');
            $(this).removeClass('focus');
            $(this).siblings('.tips').removeClass('tips-on');
            sure_flag=true;
        }else if(pas2.length>0){
            $(this).siblings('.icon-wrong').addClass('icon-on');
            $(this).siblings('.tips').text('两次输入的密码不一致，请重新输入').addClass('wrong-color tips-on');
            $(this).addClass('wrong');
            sure_flag=false;
        }
    });
    //验证码
    $('#code').focus(function () {
        $(this).addClass('focus');
        $(this).siblings('.tips').addClass('tips-on');
        $(this).siblings('.tips').text('请填写图片的字符，不区分大小写').removeClass('wrong-color');
    });
    $('#code').on('input',function () {
    //    获取输入的字符长度以及验证码
        let str= $(this).val().toUpperCase();
        let code= $('.code').text();
        //    判断输入字符串是否与验证码相等
        if(str.length===4&&code===str){
            $(this).siblings('.icon-wrong').addClass('icon-right');
            $(this).siblings('.tips').removeClass('tips-on');
            check_flag=true;
        }else if(str.length===4){
            $(this).siblings('.icon-wrong').addClass('icon-on');
            $(this).siblings('.tips').text('图形验证码输入错误，请重新输入').addClass('wrong-color');
            $(this).addClass('wrong');
            $(this).siblings('.tips').addClass('tips-on');
            check_flag=false;
        }else {
            $(this).removeClass('wrong');
            $(this).siblings('.icon-wrong').removeClass('icon-on icon-right');
            $(this).siblings('.tips').removeClass('tips-on');
            check_flag=false;
        }
    });
    $('#code').blur(function () {
        $(this).removeClass('focus');
        $(this).siblings('.tips').removeClass('tips-on');
    });
    //提交那妞框
    $('.submit button').click(function () {
        let account = $('#phone').val();
        let psd = $('#password').val();
        let flag = $('.item input').prop('checked');
        if(phone_flag&&psd_flag&&sure_flag&&check_flag&&flag){

            $.ajax({
                url:'../php/registered.php',
                data:`user=${account}&password=${psd}`,
                type:'post',
                success:function () {
                    alert('注册成功');
                    location.href='http://127.0.0.1/dangdang/html/logoin.html';
                }
            })
        }
    })
//    登录按钮
    $('#logo-in').click(function () {
        location.href='../html/logoin.html';
    })
    $('#join').click(function () {
        location.reload();
    })
});