(function($){
	//����
   var setting={
	  container_idName: 'container',//����������
	  column_space: 10,//�м��
	  cell_selector: '.data',//Ҫ���е�ש���ѡ������contextΪ�����ⲿ����
	  pre_year_selector: '.prev-year',
	  next_year_selector: '.next-year',
	  pre_month_selector: '.prev-month',
	  next_month_selector: '.next-month'
   },
   //
   calendar=$.calendar={},//������Ϣ����
   $container=null;//����
   $date = new Date(); //��ǰ��ʱ�����
   $year = $date.getFullYear();
   $month = $date.getMonth();
   $week = $date.getDay();
   $.fn.extend({
	   calendar:function(opt){
		  opt=opt||{};  
	      setting=$.extend(setting,opt);
		  $container=calendar.$container=$(this);
		  
		  //1��ʼ�����ڵ����
		  _init($('#'+setting.container_idName));
		  //2 ��ҳ���a��ǩע���¼�������
		  $(setting.pre_year_selector).live('click',_handPreYear);
		  
		  $(setting.pre_month_selector).live('click',_handPreMonth);
		  
		  $(setting.next_year_selector).live('click',_handNextYear);
		  
		  $(setting.next_month_selector).live('click',_handNextMonth);
		  
		  // $('.row '+setting.css_selector).live('click',_handClickCell);
		  $('.row '+setting.cell_selector).live('click',_handClickCell);
	
		  //3 ��input���¼�
		  $('#datepicker').bind('focus',_handInputFocus);
		  //$('#datepicker').bind('blur',_handInputBlur);
		  $('#'+setting.container_idName).bind('mouseleave ',_handMouthOutCont);
		   $('#'+setting.container_idName).bind('mouseenter',_handMouthOverCont);
	   }
   });
   
   //��ʼ���������
   function _init(element){
		//������� 
	  	_calcTableContent($year,$month,element);
		
		
   }
   
   function _calcTableContent(year,month,element){
	   var html = '';
		html = ('<div class="opt"><a href="javascript:void(0);" class="prev-year">&lt;&lt;</a><a href="javascript:void(0);" class="prev-month">&lt;</a><a href="javascript:void(0);" class="title">'+year+'��'+(month+1)+'��</a><a href="javascript:void(0);" class="next-month">&gt;</a><a href="javascript:void(0);" class="next-year">&gt;&gt;</a></div>');
		//������� ����
		html += ('<div class="head"><span >��</span><span >һ</span><span >��</span><span >��</span><span >��</span><span >��</span><span >��</span></div>');
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
   function creatColumn(){//������
      waterfall.column_num=calculateColumns();//����
	  //ѭ��������
	  var html='';
	  for(var i=0;i<waterfall.column_num;i++){
	     html+='<div class="'+setting.column_className+'" style="width:'+setting.column_width+'px; display:inline-block; *display:inline;zoom:1; margin-left:'+setting.column_space/2+'px;margin-right:'+setting.column_space/2+'px; vertical-align:top; overflow:hidden"></div>';
	  }
	  $container.prepend(html);//������
	  return $('.'+setting.column_className,$container);//�м���
   }
   
   /**
   *j ����һ�����ж�����
   */
   function _calcDaysForMonth(year,month){
	  var days = (new Date(+(new Date(year, month, 1)) - 86400000)).getDate();
	 
	   return days;
   }
   
   /**
   *��������µĵ�һ����ʾ�ĵ�λ�ã����Ը�����������������
   */
   function _calcFirstDayPosition(year,month){
	   
		return new Date(year, month,1).getDay();
   }
   
   //������һ�������
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
   //������һ���µ�����
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
   
   //������һ�������
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
   
   //������һ���µ�����
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
			//��ȡ������a��ǩ���������
			var $year = $(this).attr('data-year');
			var $month = $(this).attr('data-month');
			var $day = $(this).attr('data-day');
			//�����ꡢ�¡��յ�ֵ
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
		
		//��div������left��top��ԭ��Ҫ��Ȼÿ�ε��input��ʱ��left��top������ԭ���Ļ����ϼ�
		//$('#'+setting.container_idName)[0].style.left = 0;
		//$('#'+setting.container_idName)[0].style.top = 0;
		
	}
	
	function _handMouthOutCont(){
		$('#'+setting.container_idName).hide();
		
		//��div������left��top��ԭ��Ҫ��Ȼÿ�ε��input��ʱ��left��top������ԭ���Ļ����ϼ�
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