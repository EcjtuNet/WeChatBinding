window.onload=function(){
	var aInput=document.getElementsByTagName('input');
	var s_num=aInput[0];
	var s_pwd=aInput[1];
	var e_tip=document.getElementById('msg1');
	var s_tip=document.getElementById('success');
	var asubmit=document.getElementById('get');
    var csubmit=document.getElementById('classGet');
	var e_tip1=document.getElementById('msg2');
    var dialog=document.getElementById("dialog");
    var btn=document.getElementById("btn");
    var btn_son=document.getElementById("btn_son");
    var win_con=document.getElementById("win_con");
    var icon=document.getElementById("icon");
    var aform=document.getElementById("form");
    var f_page=document.getElementById("f_page");

    //遮罩层
    function mask(sorf){
        if(sorf===1){
          aform.style.display="none";
          f_page.style.display="block";
        }else if(sorf===2){
            dialog.style.display="block";
            win_con.innerHTML="绑定失败！用户名或密码错误！";
            icon.style.background="url(../weixinStudentId/images/cry.png)";
            setTimeout(function(){dialog.style.display="none";},2000);
        }else{
            dialog.style.display="block";
            win_con.innerHTML="加载中...";
            icon.style.background="url(../weixinStudentId/images/load.gif)";
            icon.style.backgroundSize="cover";
        }
    }

    //正则判断
    s_num.onblur=function(){
        //非法字符
        var re=/[^\d]/g;
        if(re.test(this.value)){
        	e_tip.innerHTML='请填写正确的格式！';
        	e_tip.style.display='block';
        	s_tip.style.visibility='hidden';
        }else if(this.value==""){
        	e_tip.innerHTML='不能为空！';
        	e_tip.style.display='block';
        	s_tip.style.visibility='hidden';
        }else if(this.value.length<14){
        	e_tip.innerHTML='请填写正确的格式！';
        	e_tip.style.display='block';
        	s_tip.style.visibility='hidden';
        }else{
        	e_tip.style.display='none';
        	s_tip.style.visibility='visible';
        }

    }

    s_pwd.onblur=function(){
    	if (this.value=="") {
    		e_tip1.innerHTML='不能为空！';
    	}else{
    		e_tip1.innerHTML='智慧交大密码（6位）';
    	}
    }


    //学号绑定ajax交互
    asubmit.onclick=function(){
          mask(3);
          var request = null;
          if (window.ActiveXObject) {//如果是IE

              request = new ActiveXObject("Microsoft.XMLHTTP");
 
           } else if (window.XMLHttpRequest) {
              request = new XMLHttpRequest(); //实例化一个xmlHttpReg
           }
        
            var data="number="+s_num.value+"&password="+s_pwd.value;
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