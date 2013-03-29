(function () {
   $(function () {

            function theError() {
                $(this).parents(".item").addClass("error").removeClass("ok");
            }

            function theRight() {
                $(this).parents(".item").addClass("ok").removeClass("error");
            }



           function fin(hrText){
               if ($(this).val() == hrText)  $(this).val("");
           }
           function fout(hrText,vClass){
               var flag = null;
               switch (vClass){
                   case "isChinese":
                       isChinese($(this).val()) ? flag = true : flag = false;
                       break;
                   case "IdCardValidate":
                       IdCardValidate($(this).val()) ? flag = true : flag = false;
                       break;
                   case "isMobile":
                       isMobile($(this).val() == 2) ? flag = true : flag = false;
                       break;
               }
               if ($(this).val() == hrText || $(this).val() == "" || !flag) {
                   theError.call(this);
               } else {
                   theRight.call(this);
               }
           }

            $("#name>.con>input").bind({
                focusin: function(){
                    fin.call(this,"请输入您的中文姓名");
                },
                focusout: function(){
                    fout.call(this,"请输入您的中文姓名","isChinese");
                }
            });

            $("#idCardValidate>.con>input").bind({
                focusin: function(){
                    fin.call(this,"请输入您的身份证");
                },
                focusout: function(){
                    fout.call(this,"请输入您的身份证","IdCardValidate");
                }
            });


            $("#mobile>.con>input").bind({
                focusin: function(){
                    fin.call(this,"请输入您的手机号码");
                },
                focusout: function(){
                    fout.call(this,"请输入您的手机号码","isMobile");
                }
            });





           
            /*$("#f_2869_c_4237_b_1_userfile").bind("change",function(){
                $("#f_2869_c_4237_b_1_userText").html($(this).val());
            });*/

            $("#f_2869_c_4237_b_1_fc_bm").submit(function () {
                $("#f_2869_c_4237_b_1_bid").val("7");//反馈分类id
                $("#f_2869_c_4237_b_1_subjectid").val(subjectid);//反馈专题id
                $("#f_2869_c_4237_b_1_reurl").val(window.location.href);
                $("#f_2869_c_4237_b_1_name,#f_2869_c_4237_b_1_call,#f_2869_c_4237_b_1_idcard,#f_2869_c_4237_b_1_saytext").trigger("change");


                if ($(".f_2869_c_4237_b_1_ok").length < 4) {
                    alert("请检查修改提示红色粗体的项目！");
                    return false;
                }

            });
        });


//检查是否包含中文字符
        function isChinese(name) {
            if (name.length == 0)
                return false;
            for (i = 0; i < name.length; i++) {
                if (name.charCodeAt(i) > 128)
                    return true;
            }
            return false;
        }

//检查手机
    function isMobile(v) {
        var yd = ['134', '135', '136', '137', '138', '139', '150', '151', '152', '157', '158', '159', '187', '188'];
        var lt = ['130', '131', '132', '155', '156', '185', '186'];
        var dx = ['133', '153', '180', '189'];
        var whole = []; whole = whole.concat(yd, lt, dx);
        if (v == '') return 1;
        if (v.length != 11) { return 2; }
        if (isNaN(v)) { return 2; }
        var phone_sect = v.substr(0, 3);
        var find = false;
        var i = 0;
        for (i = 0; (i < whole.length); i++)
        { if (phone_sect == whole[i]) { find = true; break; } }
        if (find) return 0; else return 2;
    }

//检查身份证
    var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
    var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
    
    function IdCardValidate(idCard) {
        idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格

        if (idCard.length == 15) {
            return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
        } else if (idCard.length == 18) {
            var a_idCard = idCard.split("");                // 得到身份证数组
            if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
                return true;
            }else {
                return false;
            }
        } else {
            return false;
        }
    }
    /**
     * 判断身份证号码为18位时最后的验证位是否正确
     * @param a_idCard 身份证号码数组
     * @return
     */
    function isTrueValidateCodeBy18IdCard(a_idCard) {
        var sum = 0;                             // 声明加权求和变量
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
        }
        for ( var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i];            // 加权求和
        }
        valCodePosition = sum % 11;                // 得到验证码所位置
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 验证18位数身份证号码中的生日是否是有效生日
     * @param idCard 18位书身份证字符串
     * @return
     */

    function isValidityBrithBy18IdCard(idCard18){
        var year =  idCard18.substring(6,10);
        var month = idCard18.substring(10,12);
        var day = idCard18.substring(12,14);
        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题
        if(temp_date.getFullYear()!=parseFloat(year)
                ||temp_date.getMonth()!=parseFloat(month)-1
                ||temp_date.getDate()!=parseFloat(day)){
            return false;
        }else{
            return true;
        }
    }
    /**
     * 验证15位数身份证号码中的生日是否是有效生日
     * @param idCard15 15位书身份证字符串
     * @return
     */
    function isValidityBrithBy15IdCard(idCard15){
        var year =  idCard15.substring(6,8);
        var month = idCard15.substring(8,10);
        var day = idCard15.substring(10,12);
        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
        if(temp_date.getYear()!=parseFloat(year)
                ||temp_date.getMonth()!=parseFloat(month)-1
                ||temp_date.getDate()!=parseFloat(day)){
            return false;
        }else{
            return true;
        }
    }

//去掉字符串头尾空格
    function trim(str) {
        return str.replace(/(^s*)|(s*$)/g, "");
    }


    })();