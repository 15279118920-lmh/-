(function () {
    //获取可视区域宽高
    function getScreen() {
        let width, height;
        if(window.innerWidth){
            width = window.innerWidth;
            height = window.innerHeight;
        }else if(document.compatMode === "BackCompat"){
            width = document.body.clientWidth;
            height = document.body.clientHeight;
        }else{
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        }
        return {
            width: width,
            height: height
        }
    }
    //获取页面滚动距离
    function getPageScroll() {
        let x, y;
        if(window.pageXOffset){
            x = window.pageXOffset;
            y = window.pageYOffset;
        }else if(document.compatMode === "BackCompat"){
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        }else{
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return {
            x: x,
            y: y
        }
    }
    function addEvent(ele, name, fn) {
        if(ele.attachEvent){
            ele.attachEvent("on"+name, fn);
        }else{
            ele.addEventListener(name, fn);
        }
    }
    function getStyleAttr(obj, name) {
        if(obj.currentStyle){
            return obj.currentStyle[name];
        }else{
            return getComputedStyle(obj)[name];
        }
    }
    //函数防抖
    function debounce(fn, delay) { // fn = test
        let timerId = null;
        return function () {
            let self = this;
            let args = arguments;
            timerId && clearTimeout(timerId);
            timerId = setTimeout(function () {
                fn.apply(self, args);
            }, delay || 1000);
        }
    }
    //函数节流
    function throttle(fn, delay) { // fn = test
        let timerId = null;
        let flag = true;
        return function () {
            if(!flag) return;
            flag = false;
            let self = this;
            let args = arguments;
            timerId && clearTimeout(timerId);
            timerId = setTimeout(function () {
                flag = true;
                fn.apply(self, args);
            }, delay || 1000);
        }
    }
    //透明度匀速运动
    function linearOpacity(ele,target) {
        clearInterval(timer);
        let begin = getComputedStyle(ele).opacity*100;
        let step = target-begin>0?2:-2;
        timer = setInterval(function () {
            begin += step;
            if(Math.abs(target-begin)<=Math.abs(step)){
                begin = target;
                clearInterval(timer);
            }
            box.style.opacity = begin/100;
        },100)
    }
    //透明度缓动运动
    function easeOpacity(ele,target) {
        clearInterval(ele.timer);
        let begin = getComputedStyle(ele).opacity*100;
        let step = (target-begin)*0.3;
        ele.timer = setInterval(function () {
            begin += step;
            if(Math.abs(Math.floor(target-begin))<=Math.abs(step)){
                begin = target;
                clearInterval(ele.timer);
            }
            box.style.opacity = begin/100;
        },100)
    }
    //计算时间差;
    function getDifferTime(remDate,curDate = new Date()) {
        // 1.得到两个时间之间的差值(毫秒)
        let differTime = remDate - curDate;
        // 2.得到两个时间之间的差值(秒)
        let differSecond = differTime / 1000;
        // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
        let day = Math.floor(differSecond / (60 * 60 * 24));
        day = day >= 10 ? day : "0" + day;
        // 4.利用相差的总秒数 / 小时 % 24;
        let hour = Math.floor(differSecond / (60 * 60) % 24);
        hour = hour >= 10 ? hour : "0" + hour;
        // 5.利用相差的总秒数 / 分钟 % 60;
        let minute = Math.floor(differSecond / 60 % 60);
        minute = minute >= 10 ? minute : "0" + minute;
        // 6.利用相差的总秒数 % 秒数
        let second = Math.floor(differSecond % 60);
        second = second >= 10 ? second : "0" + second;
        return {
            day:day,
            hour:hour,
            minute:minute,
            second:second,
        }
    }
    //时间格式化
    function dateFormart(fmt, date) {
        // 1.处理年
        // 1.1找到yyyy
        // +在正则表达式中表示匹配1个或多个连续的指定字符
        // let reg = /y+/;
        let yearStr = fmt.match(/y+/);
        if(yearStr){
            yearStr = yearStr[0];
            // 1.2获取到当前的年
            let yearNum = date.getFullYear() + ""; // 2019
            yearNum = yearNum.substr(4 - yearStr.length)
            // 1.3利用当前的年替换掉yyyy
            fmt = fmt.replace(yearStr, yearNum);
        }
        // 2.处理其他的时间
        let obj = {
            "M+" : date.getMonth() + 1,
            "d+" : date.getDate(),
            "h+" : date.getHours(),
            "m+" : date.getMinutes(),
            "s+" : date.getSeconds()
        };
        // 2.1遍历取出所有的时间
        for(let key in obj){
            // let reg = new RegExp("M+");
            let reg = new RegExp(`${key}`);
            // 取出格式化字符串中对应的格式字符 MM dd hh mm ss
            let fmtStr = fmt.match(reg);
            if(fmtStr){
                fmtStr = fmtStr[0];
                // 单独处理一位或者两位的时间
                if(fmtStr.length === 1){
                    // 一位
                    fmt = fmt.replace(fmtStr, obj[key]);
                }else{
                    // 两位
                    let numStr = "00" + obj[key];
                    //"00" + 4 = "004"
                    //"00" + 23 = "0023"
                    numStr = numStr.substr((obj[key] + "").length);
                    fmt = fmt.replace(fmtStr, numStr);
                }
            }
        }
        // 3.将格式化之后的字符串返回
        return fmt;
    }
    //tab选项卡
    class Tab{
        //传递tab选项元素,content选项元素,tab类名,content类名
        constructor(nav,content,tab_class,content_class) {
            //获取TAB选项卡中所有的选项
            this.items = nav.querySelectorAll("li");
            //获取选项卡对应的选项
            this.content = content.querySelectorAll("li");
            //调用tab切换方法
            this.change();
            //保存传递的tab选项类名
            this.tab_class = tab_class;
            this.content_class = content_class;
        }
        change(){
            //保存初始样式
            let pre_nav = this.items[0];
            let pre_content = this.content[0];
            console.log(pre_nav, pre_content);
            for(let i=0;i<this.items.length;i++){
                this.items[i].onclick = ()=>{
                    //清除之前样式
                    pre_nav.className = "";
                    pre_content.className = "";
                    //给现在点击的添加样式
                    this.items[i].className = this.tab_class;
                    this.content[i].className = this.content_class;
                    //保存现在点击的对象
                    pre_nav = this.items[i];
                    pre_content = this.content[i];
                }
            }
        }
    }
    //添加cookie
    function addCookie(key, value, day, path, domain) {
        // //1.处理默认保存的路径
        // if(!path){
        //     var index = window.location.pathname.lastIndexOf("/")
        //     var currentPath = window.location.pathname.slice(0, index);
        //     path = currentPath;
        // }
        let index = window.location.pathname.lastIndexOf("/")
        let currentPath = window.location.pathname.slice(0, index);
        path = path || currentPath;
        // 2.处理默认保存的domain
        domain = domain || document.domain;
        // 3.处理默认的过期时间
        if(!day){
            document.cookie = key+"="+value+";path="+path+";domain="+domain+";";
        }else{
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key+"="+value+";expires="+date.toGMTString()+";path="+path+";domain="+domain+";";
        }
    }
    //获取cookie
    function getCookie(key) {
        // console.log(document.cookie);
        let res = document.cookie.split(";");
        for(let i = 0; i < res.length; i++){
            let temp = res[i].split("=");
            if(temp[0].trim() === key){
                return temp[1];
            }
        }
    }
    //移除cookie
    function delCookie(key, path) {
        addCookie(key, getCookie(key), -1, path);
    }
    window.addCookie = addCookie;
    window.getCookie = getCookie;
    window.delCookie = delCookie;
    window.dateFormart = dateFormart;
    window.getDifferTime = getDifferTime;
    window.easeOpacity = easeOpacity;
    window.linearOpacity = linearOpacity;
    window.getScreen = getScreen;
    window.getPageScroll = getPageScroll;
    window.addEvent = addEvent;
    window.getStyleAttr = getStyleAttr;
    window.debounce = debounce;
    window.throttle = throttle;
})();