(function($){
	//参数
   var setting={
	  container_idName: 'container',//容器的类名
	  column_space: 10,//列间距
	  cell_selector: '.data',//要排列的砖块的选择器，context为整个外部容器
	  pre_year_selector: '.prev-year',
	  next_year_selector: '.next-year',
	  pre_month_selector: '.prev-month',
	  next_month_selector: '.next-month'
   },
   //
   calendar=$.calendar={},//对外信息对象
   $container=null;//容器
   $date = new Date(); //当前的时间对象
   $year = $date.getFullYear();
   $month = $date.getMonth();
   $week = $date.getDay();
   $.fn.extend({
	   calendar:function(opt){
		  opt=opt||{};  
	      setting=$.extend(setting,opt);
		  $container=calendar.$container=$(this);
		  
		  //1初始化日期的输出
		  _init($('#'+setting.container_idName));
		  //2 给页面的a标签注册事件处理函数
		  $(setting.pre_year_selector).live('click',_handPreYear);
		  
		  $(setting.pre_month_selector).live('click',_handPreMonth);
		  
		  $(setting.next_year_selector).live('click',_handNextYear);
		  
		  $(setting.next_month_selector).live('click',_handNextMonth);
		  
		  // $('.row '+setting.css_selector).live('click',_handClickCell);
		  $('.row '+setting.cell_selector).live('click',_handClickCell);
	
		  //3 给input绑定事件
		  $('#datepicker').bind('focus',_handInputFocus);
		  //$('#datepicker').bind('blur',_handInputBlur);
		  $('#'+setting.container_idName).bind('mouseleave ',_handMouthOutCont);
		   $('#'+setting.container_idName).bind('mouseenter',_handMouthOverCont);
	   }
   });
   
   //初始化表格的输出
   function _init(element){
		//输出操作 
	  	_calcTableContent($year,$month,element);
		
		
   }
   
   function _calcTableContent(year,month,element){
	   var html = '';
		html = ('<div class="opt"><a href="javascript:void(0);" class="prev-year">&lt;&lt;</a><a href="javascript:void(0);" class="prev-month">&lt;</a><a href="javascript:void(0);" class="title">'+year+'年'+(month+1)+'月</a><a href="javascript:void(0);" class="next-month">&gt;</a><a href="javascript:void(0);" class="next-year">&gt;&gt;</a></div>');
		//输出星期 标题
		html += ('<div class="head"><span >天</span><span >一</span><span >二</span><span >三</span><span >四</span><span >五</span><span >六</span></div>');
		//debugger;
		var daysOfMonth = _calcDaysForMonth(year,month+1);
		var firstDayOfMonth = _calcFirstDayPosition(year,month);
		var count = 1;
		outer:
		for(var i=1;i<7;i++){
			html += ('<div class="row">');
			
			for(var j=0;j<7;j++){
				if(j<firstDayOfMonth && i==1){
					html += ('<a href="###" class="cell"></a>');
				}else{
					
					if($date.getDate()===count && $month===month){
						html += ('<a href="###" class="cell data highlight" data-year="'+year+'" data-month="'+month+'" data-day="'+(count)+'">'+(count)+'</a>');	
					}else{
						html += ('<a href="###" class="cell data" data-year="'+year+'" data-month="'+month+'" data-day="'+(count)+'">'+(count)+'</a>');
					}
					
					count++;
					if(count>daysOfMonth){
						break outer;	
					}
					

				}
				
				
			}
			
			html += ('<div style="clear:both;"></div>');
			html += ('</div>');
			
			
		}
		//alert(alert(element[0].tagName));
		element.html(html);
   }
   function creatColumn(){//创建列
      waterfall.column_num=calculateColumns();//列数
	  //循环创建列
	  var html='';
	  for(var i=0;i<waterfall.column_num;i++){
	     html+='<div class="'+setting.column_className+'" style="width:'+setting.column_width+'px; display:inline-block; *display:inline;zoom:1; margin-left:'+setting.column_space/2+'px;margin-right:'+setting.column_space/2+'px; vertical-align:top; overflow:hidden"></div>';
	  }
	  $container.prepend(html);//插入列
	  return $('.'+setting.column_className,$container);//列集合
   }
   
   /**
   *j 计算一个月有多少天
   */
   function _calcDaysForMonth(year,month){
	  var days = (new Date(+(new Date(year, month, 1)) - 86400000)).getDate();
	 
	   return days;
   }
   
   /**
   *计算这个月的第一天显示的的位置，可以根据它的星期来计算
   */
   function _calcFirstDayPosition(year,month){
	   
		return new Date(year, month,1).getDay();
   }
   
   //返回上一年的数据
   function _handPreYear(){
	   console.log(1);
	   var element = $('#'+setting.container_idName);
	   var year = $('body').data('year');
	   var month = $('body').data('month');
	   //debugger;
	   if(year){
		   year = year-1;
		   
	   }else{
		   year = parseInt($year)-1;
		   
	   }
	   if(!month && month!=0){
		   month = $month;
	   }
	   $('body').data('year',year);
	   
	   
	   _calcTableContent(year,month,element);
   }
   //返回上一个月的数据
   function _handPreMonth(){
	    console.log(2);
		var element = $('#'+setting.container_idName);
		var year = $('body').data('year');
	   var month = $('body').data('month');
	   if(month || month==0){
		   month = month-1;
		   if(month<0){
				month =0;  
				return;
		   }
	   }else{
		   month = parseInt($month)-1;
		   
	   }
	    if(!year){
		   year = $year;
	   }
	   
	   $('body').data('month',month);
	   _calcTableContent(year,month,element);
   }
   
   //返回下一年的数据
   function _handNextYear(){
	    console.log(3);
		 var element = $('#'+setting.container_idName);
	   var year = $('body').data('year');
	    var month = $('body').data('month');
	   //debugger;
	   if(year){
		   year = year+1;
		   
	   }else{
		   year = parseInt($year)+1;
		   
	   }
	   
	    if(!month && month!=0){
		   month = $month;
	   }
	   $('body').data('year',year);
	   _calcTableContent(year,month,element);
   }
   
   //返回下一个月的数据
   function _handNextMonth(){
	    console.log(4);
				var element = $('#'+setting.container_idName);
				var year = $('body').data('year');
	   var month = $('body').data('month');
	   //debugger;
	   if(month || month==0){
		   month = month+1;
		    if(month>11){
				month = 11;
				return; 
		   }
		   
	   }else{
		   month = parseInt($month)+1;
		   
	   }
	   
	    if(!year){
		   year = $year;
	   }
	   $('body').data('month',month);
	   _calcTableContent(year,month,element);

   }

	function _operator(t){

/**
		switch(t){
			case:'pre-year'
			
			break;
			caese 'pre-month'
			
			break;
			
			case: 'next-year'
			
			break;
			
			case: 'next-month'
			
			break;
			default:
		}
		*/
	}
	
	function _handClickCell(){
		
		//$('.row '+setting.cell_selector).each(function(index, element) {
            $('.row '+setting.cell_selector).removeClass('highlight');
			$(this).addClass('highlight');
			//获取保存在a标签里面的数据
			var $year = $(this).attr('data-year');
			var $month = $(this).attr('data-month');
			var $day = $(this).attr('data-day');
			//设置年、月、日的值
			console.log($year+'-'+$month+'-'+$day);
			$('#datepicker').val($year+'-'+(new Number($month)+1)+'-'+$day);
			
     //   });
	}
	
	function _handInputFocus(){
		var datapicker = $('#datepicker')[0];
		var position = getElementPos(datapicker);
		
		
		position.left -= 12;
		position.top += 32;
		//alert(position.left+'-'+position.top);
		$('#'+setting.container_idName).offset({left:0,top:0});
		$('#'+setting.container_idName).offset(position);
		$('#'+setting.container_idName).show('fast');
		

	}
	
	
	function _handInputBlur(){
		//$('#'+setting.container_idName).hide();
		
		//让div容器的left，top还原，要不然每次点击input的时候left，top都会在原来的基础上加
		//$('#'+setting.container_idName)[0].style.left = 0;
		//$('#'+setting.container_idName)[0].style.top = 0;
		
	}
	
	function _handMouthOutCont(){
		$('#'+setting.container_idName).hide();
		
		//让div容器的left，top还原，要不然每次点击input的时候left，top都会在原来的基础上加
		$('#'+setting.container_idName)[0].style.left = 0;
		$('#'+setting.container_idName)[0].style.top = 0;
	}
	
	function _handMouthOverCont(){
		_handInputFocus();
	}
	function getElementPos(elt){
		
		var x=0,y=0;
		while(elt!=null){
			x += elt.offsetLeft;
			y += elt.offsetTop;
			elt = elt.offsetParent;	
		}
		return {top:x,left:y};
	}

})(jQuery);