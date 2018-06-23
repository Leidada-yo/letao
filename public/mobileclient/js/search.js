$(function () {
  //封装获取存储的函数
    // localStorage.setItem("history",'["阿迪","耐克"]');
  function  gethistory() { 
    var result=localStorage.getItem("history") ||"[]";
    result=JSON.parse(result);
    return result;
   };

   
    console.log(gethistory());
    
   function render() { 
     var history=gethistory();
     
     $('.lt_history').html(template('tpl',{rows:history}));
     
    }
    
    render();
     //注册清空事件
    $('.lt_history').on('click','.btn_empty',function () {
      mui.confirm('您确定要清空历史记录吗？','温馨提示',['确定','取消'],function (e) {
       if(e.index===0){
         localStorage.removeItem("history");
         render();
       }
      })
    });

    //注册点击删除事件

    $('.lt_history').on('click','.btn_delete',function () {
       var id=$(this).data('id');
      mui.confirm('您确定要删除此条记录吗？','温馨提示',['确定','取消'],function (e) {
        if(e.index===0){
          var history=gethistory();
          history.splice(id,1);
          localStorage.setItem("history",JSON.stringify(history));
          render();
        }
       })
    });
       //点击添加事件
    $('.lt_search button').on('click',function () {
      var txt=$('.lt_search input').val();
      $('.lt_search input').val('');
      if(txt==''){
        mui.toast("请输入搜索内容");
        return;
      }
      var history=gethistory();
      var index=history.indexOf(txt);
      if(index>-1){
        history.splice(index,1);
      };
      if(history.length>=10){
        history.pop();
      }
      history.unshift(txt);
      localStorage.setItem('history',JSON.stringify(history));
      render();
      location.href="searchList.html?key="+txt;
    })
})