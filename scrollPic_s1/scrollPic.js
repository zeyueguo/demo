
        $.fn.scrollPic = function (options) {
            var opts = $.extend({}, $.fn.scrollPic.defaults, options);
            return this.each(function (i) {
                $this = $(this);

                var timerID; //重复执行变量
                var $showBox = $this.find(opts.showBox);
                var $showBox_item = $this.find(opts.showBox_item);
                var $itemBox = $this.find(opts.itemBox);

                var $btn_prev = $this.find(opts.btn_prev);
                var $btn_next = $this.find(opts.btn_next);
                var i_item = $showBox_item.length;
                var now = 0;
                var loaded = false;
                var $itemBox_item = null;

                $btn_prev.bind("click",function(){
                    if(!$showBox.is(":animated")) {
                        autoStop();
                        if(now==0){
                            mm(i_item-1,"prev");
                        } else {
                            mm(now-1,"prev");
                        }
                    }
                });

                $btn_next.bind("click",function(){
                    if(!$showBox.is(":animated")) {
                        autoStop();
                        if(now==(i_item-1)){
                            mm(0,"next");
                        } else {
                            mm(now+1,"next");
                        }
                    }
                });

                //懒加载
               /* function loding(k){
                    var $img = $showBox_item.find(".pic>img").eq(k);
                    var dataImg = $img.attr("data-img");
                    if (dataImg) $img.attr("src",dataImg);
                }*/


                function mm(k,direction){
                    if(!$showBox.is(":animated")) {
                        if (direction=="next"){
                            $showBox_item.css({"left":660+"px","z-index": 0,"display":"none"}); //清理所有
                            $showBox_item.eq(k-1).css({"left":660+"px","z-index": 5,"display":"block"});
                            $showBox_item.eq(k).css({"left":"1320px","z-index": 0,"display": "block"});
                            $showBox.animate({"left" : -1320 + "px"},500,function(){
                                $showBox.css({ "left" : -660 + "px"});
                                $showBox_item.eq(k-1).css({"left":660,"z-index": 0,"display":"none"});
                                $showBox_item.eq(k).css({"left":660,"z-index": 5,"display": "block"});
                            });
                        }
                        if (direction=="prev"){
                            $showBox_item.css({"left":660+"px","z-index": 0,"display":"none"}); //清理所有
                            if (k==5){
                                $showBox_item.eq(0).css({"left":660+"px","z-index": 5,"display":"block"});
                                $showBox_item.eq(5).css({"left":"0px","z-index": 0,"display": "block"});
                            }  else {
                                $showBox_item.eq(k+1).css({"left":660+"px","z-index": 5,"display":"block"});
                                $showBox_item.eq(k).css({"left":"0px","z-index": 0,"display": "block"});
                            }
                            $showBox.animate({"left" : 0 + "px"},500,function(){
                                $showBox.css({ "left" : -660 + "px"});

                                if (k==5){
                                    $showBox_item.eq(0).css({"left":660+"px","z-index": 0,"display":"none"});
                                    $showBox_item.eq(5).css({"left":660,"z-index": 5,"display": "block"});
                                 }  else {
                                    $showBox_item.eq(k+1).css({"left":660+"px","z-index": 0,"display":"none"});
                                    $showBox_item.eq(k).css({"left":660,"z-index": 5,"display": "block"});
                                }


                            });


                        }


                    }
//
                    $itemBox_item.eq(k).addClass(opts.currClass).siblings().removeClass(opts.currClass);
                    now = k;
                }

                $showBox_item.each(function(i){

                    //写入数字点击项目
                    $itemBox.append('<li>' + (i + 1) + '</li>');
                    $itemBox_item = $itemBox.find(opts.itemBox_item);

                    //初始化写入
                  /*  if (i==0){

                    }
*/

                });

                $itemBox_item.eq(0).addClass(opts.currClass);
                $showBox_item.eq(0).css("display","block");

                //点击数字项目
                $itemBox_item.click(function(){
                    autoStop();
                    if(!$showBox.is(":animated")) {
                        var i_index = $itemBox_item.index(this); //索引出当前点击在列表中的位置值

                        if (i_index>now){
                            now = i_index;
                            mm(now,"next");
                        } else {
                            now = i_index;
                            mm(now,"prev");
                        }
                        mm(now,"next");
                    }
                });

                //自动播放
                function autoPlay () {
                    autoStop();
                    timerID = setInterval(autoPic, opts.apTime);
                }
                function autoStop() {
                    clearInterval(timerID);
                }
                function autoPic() {
                    now++; //版面数累加
                    if (now == i_item) {
                        now = 0;
                        mm(0,"next");
                    } else {
                        mm(now,"next");
                    }
                }
                autoPlay();

                $this.eq(0).bind({
                    mouseenter:function(){
                        $btn_prev.show();
                        $btn_next.show();
                        autoStop();
                    },
                    mouseleave:function(){
                        $btn_prev.hide();
                        $btn_next.hide();
                        autoPlay();
                    }
                });

                //分享状态
                $(".share_headline p").mouseenter(function(){
                    $(".share_headline ul").show();
                });
                $(".share_headline").mouseleave(function(){
                    $(".share_headline ul").hide();
                })

            });
        };

        // 插件的defaults
        $.fn.scrollPic.defaults = {
            cur:0,//从第一页开始滚动
            showBox:"#showBox_headline",//绝对定位的DIV
            showBox_item:".item",//绝对定位的DIV子项目
            itemBox:"#num_headline",//子项目盒子
            itemBox_item:"li",//子项目
            btn_prev:"#prev_headline",
            btn_next:"#next_headline",
            currClass:"cur_num",//子项目的当前激活
            moveLen:-660, //动画移动的距离
            apTime:4000, //自动播放时间间隔
            anTime:600 //动画播放时间间隔
        };
