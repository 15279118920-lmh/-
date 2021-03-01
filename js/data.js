$(function () {
//   图书商品模块获取数据
    ( function () {
         $.ajax({
            url:'../php/book.php',
            success:function (msg) {
                //将获取的数据转化为对象
                let obj = eval("(" + msg + ")");
                //获取当前需要渲染到页面中的对象
                let currentObj = obj.news;
                $('img[data-name]').each(function (i) {
                    let obj = currentObj["item" +i];
                    //设置当前对象的图片地址;
                    this.src = obj[0].src;
                });
                //设置当前页面中的标题
                $('.title-name').each(function (i) {
                    //获取文本内容
                    let text = currentObj["item" +(i+1)][1]['title'];
                    //设置当前文本内容
                    this.innerHTML = text;
                });
            //    设置当前页面价格
                $('.price .num').each(function (i) {
                    //获取文本内容
                    let price = currentObj["item" +(i+1)][2]['price'];
                    //设置当前文本内容
                    this.innerHTML = price;
                });
                //    设置当前页面折扣价格
                $('.del-price').each(function (i) {
                    //获取文本内容
                    let price = currentObj["item" +(i+1)][3]['del'];
                    //设置当前文本内容
                    this.innerHTML = price;
                });
            },
            error:function (code) {
                console.log(code);
            }
        })
    })();
   //图书商品模块导航栏目鼠标移入事件
    $(".books-msg-nav>li").mouseenter(function () {
        //获取移入元素自定义属性值
        let data = $(this).attr('data-name');
        //获取sign价格显示元素
        $.ajax({
            url:'../php/book.php',
            success:function (msg) {
                //将获取的数据转化为对象
                let obj = eval("(" + msg + ")");
                //获取当前需要渲染到页面中的对象
                let currentObj = obj[data];
                if(data==="literature"){
                    $('img[data-name]').each(function (i) {
                        let obj = currentObj["item" +i];
                        //设置当前对象的图片地址;
                        this.src = obj[0].src;
                        //设置父元素的padding值为0
                        $(this).parent().css("padding",0);
                    });
                }else {
                    $('img[data-name]').each(function (i) {
                        let obj = currentObj["item" +i];
                        //设置当前对象的图片地址;
                        this.src = obj[0].src;
                        $(this).parent().css({
                            "padding-top":7,
                            "padding-left":8,
                            "padding-right":8,
                        });
                        $("img[data-name]").eq(0).parent().css("padding",0);
                    });
                }
                //设置当前页面中的标题
                if(data==="literature"){
                    $('.title-name').each(function (i) {
                        this.innerHTML = "";
                    });
                    //    设置当前页面价格
                    $('.price .num').each(function (i) {
                        this.innerHTML = "";
                    });
                    //    设置当前页面折扣价格
                    $('.del-price').each(function (i) {
                        this.innerHTML = "";
                    });
                    //设置透明度
                    $(".sign").css("opacity",0);
                }else {
                    $('.title-name').each(function (i) {
                        //获取文本内容
                        let text = currentObj["item" +(i+1)][1]['title'];
                        //设置当前文本内容
                        this.innerHTML = text;
                    });
                    //    设置当前页面价格
                    $('.price .num').each(function (i) {
                        //获取文本内容
                        let price = currentObj["item" +(i+1)][2]['price'];
                        //设置当前文本内容
                        this.innerHTML = price;
                    });
                    //    设置当前页面折扣价格
                    $('.del-price').each(function (i) {
                        //获取文本内容
                        let price = currentObj["item" +(i+1)][3]['del'];
                        //设置当前文本内容
                        this.innerHTML = price;
                        //设置透明度
                        $(".sign").css("opacity",1);
                    });
                }
            },
            error:function (code) {
                console.log(code);
            }
        })
    });
//  服装模块获取数据
    (function () {
    //发送ajax请求
        $.ajax({
            url:'../php/book.php',
            success:function (msg) {
            //    将获取的数据转化为JSON对象
                let obj = eval("("+msg+")");
            //    获取对象中的儿童模块属性
                let arr = obj["clothes"];
            //获取服装模块所有的图像
                $('img[data-src]').each(function (i) {
                    //设置图像地址
                    this.src = arr[i].src;
                })
            },
            error:function (code) {
                console.log(code);
            }
        })
    })()
//    服装导航栏绑定移入鼠标移入事件
    $(".clothes-header-nav>li").mouseenter(function () {
    //    获取移入的自定义data-name属性值
        let value = $(this).attr("data-name");
        console.log(value);
        //    发送ajax请求，获取数据
        $.ajax({
            url:'../php/book.php',
            success:function (msg) {
                //    将获取的数据转化为JSON对象
                let obj = eval("("+msg+")");
                //    获取对象中自定义属性值
                let arr = obj[value];
                $('img[data-src]').each(function (i) {
                    //设置图像地址
                    this.src = arr[i].src;
                });
            },
            error:function (code) {
                console.log(code);
            }
        })
    })
//    秒杀栏发送请求获取数据
    $.ajax({
        url:'../php/book.php',
        success:function (msg) {
            //将获取的数据转化为JSON对象
            let obj = eval("("+msg+")");
            //提取对象中HOT-SALE数据
            let data = obj["hot-sale"];
            $.each($('.hot-img'),function (key,value) {
                this.src = data[key].src;
            });
            $.each($('.sale-percent'),function (key,value) {
                this.innerHTML = data[key].num;
            });
            $.each($('.title-sale'),function (key,value) {
                this.innerHTML = data[key].title;
            });
            $.each($('.price-miao'),function (key,value) {
                this.innerHTML = data[key].price;
            });
            $.each($('.price-del'),function (key,value) {
                this.innerHTML = data[key].del;
            })
            $.each($('.progress_bar'),function (key) {
                $(this).css("width",data[key].width);
            })
        }
    });
//    推荐商品
    $.ajax({
        url:'../php/book.php',
        success:function (msg) {
            let obj = eval("("+msg+")");
            let data = obj.recommended;
           $.each($('.recommended-item img'),function (i) {
                this.src = data[i].src;
           });
            $.each($('.recommended-item .name'),function (i) {
                this.innerHTML = data[i].title;
            });
            $.each($('.recommended-item .price span'),function (i) {
                this.innerHTML = data[i].price;
            });
        }
    })
});