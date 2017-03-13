window.onload=function(){
    var csubmit=document.getElementById('classGet');
    var dialog=document.getElementById("dialog");
    var btn=document.getElementById("btn");
    var btn_son=document.getElementById("btn_son");
    var win_con=document.getElementById("win_con");
    var icon=document.getElementById("icon");
    var list1=document.getElementById("list1");
    var list2=document.getElementById("list2");

    //遮罩层
    function mask(sorf){
        if(sorf===1){
            dialog.style.display="block";
            win_con.innerHTML="绑定成功！";
            icon.style.background="url(../weixinStudentId/images/finish.png)";
            btn.style.display="block";
            btn_son.innerHTML="返回公众号"
        }else if(sorf===2){
            dialog.style.display="block";
             btn.style.display="none";
            win_con.innerHTML="绑定失败！请检查是否选择正确！";
            icon.style.background="url(../weixinStudentId/images/cry.png)";
            setTimeout(function(){dialog.style.display="none";},2000);
        }else{
            dialog.style.display="block";
            win_con.innerHTML="加载中...";
            icon.style.background="url(../weixinStudentId/images/load.gif)";
            btn.style.display="none";
            icon.style.backgroundSize="cover";
        }
    }
    //班级绑定ajax交互
    csubmit.onclick=function(){
    	  mask(3);
          var request = null;
          if (window.ActiveXObject) {//如果是IE

              request = new ActiveXObject("Microsoft.XMLHTTP");
 
           } else if (window.XMLHttpRequest) {
              request = new XMLHttpRequest(); //实例化一个xmlHttpReg
           }
        
            var data="number="+list1.value+"&password="+list2.value;
            request.open("post","http://yeejone",true);
    		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.send(data);   
    		request.onreadystatechange=function(){
    			if (request.readyState===4) {
    				if(request.status===200){
    					var qdata=JSON.parse(request.responseText);
                       // 返回值判断
                        if (qdata.msg==="success") {
                            mask(1);
                        }else{
                        	mask(2);
                        }
    				}else{
    					dialog.style.display="none";
    					alert("后台出了点小问题，稍后再来吧...");
    				}
    			}
    		}
    }


}