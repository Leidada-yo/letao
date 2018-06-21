$(function () { 
  var page=1;
  var pageSize=3;
  var img=[];//用来代替做图片的表单校验；
  render();

  function render() { 
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) { 
        // console.log(info);
        $('tbody').html(template('tpl',info));
        //开启分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          size:'small',
          itemTexts:function (type,page) { 
            switch(type){
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return page
            }
           },
           tooltipTitles:function (type,page) { 
            switch(type){
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return 'page'
            }
          },
          useBootstrapTooltip:true,
          bootstrapTooltipOptions:{
            placement:'bottom'
          },
          onPageClicked:function (a,b,c,p) { 
            page=p;
            render();
           }
        })
       }
    })
   };

   $('.btn_add').on('click',function () { 
     $('.addmodal').modal('show');
      console.log(img);
      
     $.ajax({
       type:'get',
       url:'/category/querySecondCategoryPaging',
       data:{
         page:1,
         pageSize:100
       },
       success:function (info) {
         $('.dropdown-menu').html(template('tplsecond',info));
       }
     })
    });

    //注册委托事件
    $('.dropdown-menu').on('click','a',function () {
      var txt=$(this).text();
      var id=$(this).data('id');
      $('.dropdown-text').text(txt);
      $("[name='brandId']").val(id);
      //手动通过校验
      $('form').data('bootstrapValidator').updateStatus('brandId','VALID');
    });


    //获取图片
    $('#fileupload').fileupload({
      dataType:'json',
      done:function (e,data) { 
        
        if(img.length>3){
          return;
        };
        img.push(data.result);
        $('.img_box').append("<img src='"+data.result.picAddr+"' width='100' alt=''>");
        if(img.length==3){
          $('form').data('bootstrapValidator').updateStatus('image','VALID');
        }else{
          $('form').data('bootstrapValidator').updateStatus('image','INVALID');
        }
       }
    });

    //表单校验
    $('form').bootstrapValidator({
      excluded:[],
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        brandId:{
          validators:{
            notEmpty:{
              message:'请选择二级分类'
            }
          }
        },

        proName:{
          validators:{
            notEmpty:{
              message:'请输入商品名称'
            }
          }
        },

        proDesc:{
          validators:{
            notEmpty:{
              message:'请输入商品描述'
            }
          }
        },

        num:{
          validators:{
            notEmpty:{
              message:'请输入商品库存'
            },
            regexp:{
              regexp:/^[1-9]\d{0,4}$/,
              message:'请输入正确的库存(1-99999)'
            }
          }
        },

        size:{
          validators:{
            notEmpty:{
              message:'请输入商品尺码'
            },
            regexp:{
              regexp:/^\d{2}-\d{2}$/,
              message:'请输入争取的尺码范围(30-50)'
            }
          }
        },

        oldPrice:{
          validators:{
            notEmpty:{
              message:'请输入商品原价'
            }
          }
        },

        price:{
          validators:{
            notEmpty:{
              message:'请输入商品现价'
            }
          }
        },

        image:{
          validators:{
            notEmpty:{
              message:'请上传三张图片'
            }
          }
        },
      }
    });

    $('form').on('success.form.bv',function (e) { 
      e.preventDefault();
      //参数拼串
      var parameter=$('form').serialize();
      parameter+="&picName1="+img[0].picName+"&picAddr1="+img[0].picAddr;
      parameter+="&picName1="+img[1].picName+"&picAddr1="+img[1].picAddr;
      parameter+="&picName1="+img[2].picName+"&picAddr1="+img[2].picAddr;
      $.ajax({
        type:'post',
        url:'/product/addProduct',
        data:parameter,
        success:function (info) { 
          if(info.success){
            $('.addmodal').modal('hide');
            page=1;
            render();
            //清空img数组
            img=[];
            $('form').data('bootstrapValidator').resetForm(true);
            $('dropdown-text').text('请选择二级分类');
            $('.img_box img').remove();
          }
         }
      })
     })
 });

  