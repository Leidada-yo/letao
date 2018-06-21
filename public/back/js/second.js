$(function () { 
  var page=1;
  var pageSize=5;
  render();
  
  //封装ajax函数
  function render() { 
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) { 
        // console.log(info);
        $('tbody').html(template('tpl',info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
       }
    })
   };

   //点击显示模态框

   $('.btn_add').on('click',function () { 
     $('.addmodal').modal('show');

     //获取所有一级分类的数据
     $.ajax({
       type:'get',
       url:'/category/queryTopCategoryPaging',
       data:{
         page:1,
         pageSize:50
       },
       success:function (info) { 
         $('.dropdown-menu').html(template('tplsecond',info));
        }
     })
    });

    $('.dropdown-menu').on('click','a',function () {  
      var txt=$(this).text();
      $('.dropdown-text').text(txt);
      $('[name="categoryId"]').val($(this).data('id'));
      $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

    $("#fileupload").fileupload({
      dataType: 'json', //返回的结果的类型是json
      //e :事件对象
      //data: 上传后的结果
      done: function (e, data) {//图片上传后的回调函数
  
        //修改img_box下的img的src
        $(".img_box img").attr("src", data.result.picAddr);
  
        //给brandLogo赋值
        $("[name='brandLogo']").val(data.result.picAddr);
  
        //让brandLogo校验通过
        $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
    });

    $('form').bootstrapValidator({
      excluded:[],
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryId:{
          validators:{
            notEmpty:{
              message:'请选择一级分类'
            }
          }
        },
        brandName:{
          validators:{
            notEmpty:{
              message:'请输入二级分类的名称'
            }
          }
        },
        brandLogo:{
          validators:{
            notEmpty:{
              message:'请上传二级分类的图片'
            }
          }
        }
      }
    })

    $("form").on("success.form.bv", function(e){
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/category/addSecondCategory',
        data: $("form").serialize(),
        success:function(info) {
          if(info.success) {
            //隐藏模态框
            $(".addModal").modal("hide");
            //重新渲染第一页
            page = 1;
            render();
            //重置表单
            $("form").data("bootstrapValidator").resetForm(true);
            $(".dropdown-text").text("请选择一级分类");
            $(".img_box img").attr("src", "images/none.png");
          }
        }
      });
    });
 });

 