$(document).ready(function(){
    
    
   
    // на месяц раньше ставить
    //$actionDate = new Date(2013, 10, 20);
    $actionDate = new Date();
    $actionDate.setDate($actionDate.getDate()+1);
    $actionDate.setHours(0);
    $actionDate.setMinutes(0);
    $actionDate.setSeconds(0);
   
    function update_time(){
        $today = new Date();
        $balance = $actionDate - $today;
        if ($balance<0) {
            $('#time_val_day1').html(0);
            $('#time_val_day2').html(0);
            $('#time_val_hour1').html(0);
            $('#time_val_hour2').html(0);
            $('#time_val_minute1').html(0);
            $('#time_val_minute2').html(0);
            return false;
        }
        
        $day = String(parseInt($balance/(1000*60*60*24)));
        $hour = String(parseInt(($balance-$day*1000*60*60*24)/(1000*60*60)));
        $minute = String(parseInt(($balance-$hour*1000*60*60-$day*1000*60*60*24)/(1000*60)));
        $second = String(parseInt(($balance-$minute*1000*60-$hour*1000*60*60-$day*1000*60*60*24)/(1000)));
        
        $hour = String(parseInt(($balance-$day*1000*60*60*24)/(1000*60*60)+$day*24));
        
        if($day.length==2){
            $day_arr=$day.split('');
            $('#time_val_day1').html($day_arr[0]);
            $('#time_val_day2').html($day_arr[1]);
        }
        else{
            $('#time_val_day2').html($day);
        }
        
        if($hour.length==2){
            $hour_arr=$hour.split('');
            $('#time_val_hour1').html($hour_arr[0]);
            $('#time_val_hour2').html($hour_arr[1]);
        }
        else{
            $('#time_val_hour1').html(0);
            $('#time_val_hour2').html($hour);
        }
        
        if($minute.length==2){
            $minute_arr=$minute.split('');
            $('#time_val_minute1').html($minute_arr[0]);
            $('#time_val_minute2').html($minute_arr[1]);
        }
        else{
            $('#time_val_minute1').html(0);
            $('#time_val_minute2').html($minute);
        }
        
        if($second.length==2){
            $second_arr=$second.split('');
            $('#time_val_second1').html($second_arr[0]);
            $('#time_val_second2').html($second_arr[1]);
        }
        else{
            $('#time_val_second1').html(0);
            $('#time_val_second2').html($second);
        }
    }
    setInterval( function() {
        update_time();
    } , 1000) 
    
    $('#cnt_otziv').html($('.otziv figure').length-2);
    $('#show_all_otziv').click(function(){
        //$('.otziv figure').removeClass('hide');
        //$(this).remove();
        $('#for_text').html($('.otziv').html());
        $('#for_text a').remove();
        $('#for_text *').removeClass('hide');
        $('#for_text').prepend('<h1 class="pts full_descr_h1">Все отзывы</h1>');
        $('body').css({'overflow':'hidden'});
        $('#overlay').show();
        return false;
    });
    
    $(".orderPhone").mask("+7 (999) 999-99-99");
    var checkPhone = function(){
		var orderPhone = $('#orderPhone');
		if(!strpos(orderPhone.val(),'_') && orderPhone.val())
		{
			orderPhone.removeClass('warning');
			orderPhone.addClass('done');
			return true;
		}
		else {
			orderPhone.removeClass('done');
			orderPhone.addClass('warning');
			return false;
		}
	};
    
    // show hidden block
    $('#close_btn, .order_now').click(function(){
        $('#overlay').hide(); $('body').css({'overflow-y':'scroll'});
        $('#hidden_block').removeClass('hidden_block_phone');
    })
    $('.btn_in_descr').live('click', function(){
        $('#overlay').hide(); $('body').css({'overflow-y':'scroll'});
        $('body, html').animate({
            scrollTop: 10000
        }, 800);
        return false;
    })
    $('.show_text').click(function(){
        $('#for_text').html($(this).parents('.figure_text').find('.hidden_text').html());
        $('body').css({'overflow':'hidden'});
        $('#overlay').show();
        return false;
    });
    
    $('.products figure .for_img img').click(function(){
        $('#for_text').html($(this).parents('figure').find('.hidden_text').html());
        $('body').css({'overflow':'hidden'});
        $('#overlay').show();
        return false;
    }); 
   
    $('#mail').keypress(function(){
        if($('#mail').val()!=''){
            $('#order_ajax').removeClass('pointer_events_none');
        }
        else{
            $('#order_ajax').addClass('pointer_events_none');
        }
    })
   
    $('#order_ajax').click(function(){
       if($('#mail').val()==''){
            alert('Заполните Email'); return false;
       }
       $pdoducts = $('#product_order').val();
        $('.js_goods').each(function($key){
            $pdoducts += ', ' + $(this).val();
        });
       $.ajax({ 
            type: "POST", 
            url: "/mail.php", 
            data:{'name':$('#name').val(),
                  'fname':$('#fname').val(),
                  'oname':$('#oname').val(),
                  'product_order':$pdoducts,
                  'phone':$('#orderPhone').val(),
                  'mail':$('#mail').val()
                  },
            dataType: "text", 
            success: function(data){
                alert('Ваш заказ принят, в ближайшее время с Вами свяжется наш менеджер.');
                
            }
        }); 
        return false;
    });
    
   $('.go_top span').live('click', function () {
        $('#overlay').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

   $('#order_call').click(function(){
        $('#hidden_block').addClass('hidden_block_phone');
        $('#for_text').html($('#hidden_phone_form').html());
        $('body').css({'overflow':'hidden'});
        $('#overlay').show();
        $(".orderPhone").mask("+7 (999) 999-99-99");
        return false
   });

   $('#for_text #order_phone_name, #for_text #order_phone_phone, #for_text .review_name, #for_text .textarea').live('keypress', function(){
       if(($('#for_text #order_phone_name').val()!='' && $('#for_text #order_phone_name').val()!='Введите свое имя') && $('#for_text #order_phone_phone').val()!='' && $('#for_text .textarea').val()!=''){
           $('#for_text .btn_order_call').removeClass('pointer_events_none');
       }
       else{
           $('#for_text .btn_order_call').addClass('pointer_events_none');
       }
   })

   $('#for_text #btn_order_call').live('click', function(){
       if($('#for_text #order_phone_name').val()=='' || $('#for_text #order_phone_name').val()=='Введите свое имя'){
           alert('Введите свое имя'); return false;
       }
       if($('#for_text #order_phone_phone').val()==''){
           alert('Введите свой телефон'); return false;
       }
       $.ajax({
           type: "POST",
           url: "/order_call.php",
           data:{'name':$('#for_text #order_phone_name').val(),
                 'phone':$('#for_text #order_phone_phone').val()
           },
           dataType: "text",
           success: function(data){
               alert('Заказ на звонок принят, в ближайшее время с Вами свяжется наш менеджер.');
               $('#close_btn').click();
           }
       });
       return false;
   });

   $('#write_review').click(function(){
       $('#hidden_block').addClass('hidden_block_phone');
       $('#for_text').html($('#hidden_review_form').html());
       $('body').css({'overflow':'hidden'});
       $('#overlay').show();
       return false;
   });

   $('#for_text #btn_add_review').live('click', function(){
       if($('#for_text #order_phone_name').val()=='' || $('#for_text #order_phone_name').val()=='Введите свое имя'){
           alert('Введите свое имя'); return false;
       }
       if($('#for_text #review_textarea').val()==''){
           alert('Введите ваш отзыв'); return false;
       }
       if($('#for_text #review_textarea').val().length>200){
           alert('Отзыв не должен быть длинее 200 символов'); return false;
       }
       $.ajax({
           type: "POST",
           url: "/add_review.php",
           data:{'name':$('#for_text #order_phone_name').val(),
               'review':$('#for_text #review_textarea').val()
           },
           dataType: "text",
           success: function(data){
               alert('Ваш отзыв отправлен.');
               $('#close_btn').click();
           }
       });
       return false;
   })

   $('#add_goods').click(function(){
        $('#add_goods_tr').before('\
            <tr class="goods">\
               <td colspan="2"></td>\
               <td colspan="2">\
                   <span class="remove_goods fr">&nbsp;</span>\
                   <label class="select_wrap">\
                       <select class="js_goods">\
                           <option value="Блок-хауз">Блок-хауз</option>\
                           <option value="Брус">Брус</option>\
                           <option value="Евровагонка">Евровагонка</option>\
                           <option value="Половая доска">Половая доска</option>\
                           <option value="Имитация бруса">Имитация бруса</option>\
                           <option value="Тес">Тес</option>\
                           <option value="Топливные брикеты">Топливные брикеты</option>\
                           <option value="Изделия из липы">Изделия из липы</option>\
                           <option value="Изделия из сибирской лиственницы">Изделия из сибирской лиственницы</option>\
                           <option value="Бруски">Бруски</option>\
                           <option value="Наличник">Наличник</option>\
                           <option value="Плинтус">Плинтус</option>\
                           <option value="Другое">Другое</option>\
                       </select>\
                   </label>\
               </td>\
            </tr> \
        ');
   })

   $('.remove_goods').live('click', function(){
       $(this).parents('.goods').remove();
   })

    $(document).click(function(e){
        if ($(e.target).closest("#hidden_block").length) return;
        $('#overlay').hide(); $('body').css({'overflow-y':'scroll'});
        $('#hidden_block').removeClass('hidden_block_phone');
        return;
    })

})