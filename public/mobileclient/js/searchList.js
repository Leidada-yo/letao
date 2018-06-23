$(function () { 
  var page=1;
  var pageSize=8;
  //封装获得参数的函数
  function getSearch() { 
    var search=location.search;
    search=decodeURI(search);
    search=search.slice(1);
    var arr=search.split('&')
    var obj={};
    arr.forEach(function (e) { 
      var k=e.split('=')[0];
      var v=e.split('=')[1];
      obj[k]=v;
     });
     return(obj);
   };
   
   //封装ajax函数
   function render() { 
     $('.lt_product').html('<div class="loading"></div>')
     var obj={
       page:page,
       pageSize:pageSize,
       proName:key
     };

     var $a=$('.lt_sort a.now');

     if($a.length>0){
       var type=$a.data('type');
       var value=$a.find('span').hasClass('fa-angle-down')?2:1;
       obj[type]=value;
     }
     
     setTimeout(function () { 
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:obj,
        success:function (info) { 
          console.log(info);
          
           $('.lt_product').html(template('tpl',info))
         }
      })
      },1000)
    };

    var key=getSearch().key;
    
    render();

    //  点击搜索内容
    $('.lt_search button').on('click',function () { 
      key=$('.lt_search input').val();
      $('.lt_search input').val('');
      render();
     });

     //点击切换样式和图标
    $('.lt_sort').on('click','a[data-type]',function () { 
     if(!$(this).hasClass('now')){
      $(this).addClass('now').siblings().removeClass('now');
      $('.lt_sort a span').addClass('fa-angle-down').removeClass('fa-angle-up');
     }else{
       $('.lt_sort a span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
     }
     render();
     })
 })