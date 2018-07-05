/**
 * Created by shkim on 2014-07-16.
 */

/**
 * Durin onm override */
(function() {
    $class("sop.portal.absAPI").extend($d.api.ajaxAPI).define({

        onBlockUIPopup : function(){
            this.blockUI = document.createElement("DIV");
            this.blockUI.style.backgroundColor = "#D3D3D3";
            this.blockUI.style.border = "0px solid black";
            this.blockUI.style.position = "absolute";
            this.blockUI.style.left = '0px';
            this.blockUI.style.top = '0px';
//            console.log(document.body.clientHeight);
//            console.log(document.body.scrollHeight);
//            console.log(document.body.scrollTop);
            if(window.innerHeight == undefined){
            	this.blockUI.style.height = document.body.scrollHeight + 'px';
                this.blockUI.style.width = document.documentElement.clientWidth + 'px';
            }else{
            	this.blockUI.style.height = document.body.scrollHeight + 'px';
            	this.blockUI.style.width = document.documentElement.clientWidth + 'px';
//                this.blockUI.style.width = window.innerWidth + 'px';
            }
            this.blockUI.style.zIndex = "10000";
            this.blockUI.style.filter = "alpha(opacity=0);";
            this.blockUI.style.MozOpacity = 0;
            this.blockUI.style.opacity = 0;
            this.blockUI.style.KhtmlOpacity = 0;
            document.body.appendChild(this.blockUI);

            this.popupUI=document.createElement("DIV");
            /*
            this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
            this.popupUI.style.border = "3px solid rgb(0,0,0)";
            this.popupUI.style.position = "absolute";
            this.popupUI.style.height = '10px';
            this.popupUI.style.lineHeight = '50px';
            this.popupUI.style.paddingBottom='40px';
            this.popupUI.style.width ='400px';
            this.popupUI.style.top ='50%';
            this.popupUI.style.left = '50%';
            this.popupUI.style.zIndex = "11000";
            this.popupUI.style.cursor='wait';
            */
            //var divHeight=this.popupUI.style.height.replace('px','');
            //var divWidth=this.popupUI.style.width.replace('px','');
            //this.popupUI.style.margin='-'+divHeight/2+'px 0 0 -'+divWidth/2+'px';
            //this.popupUI.style.textAlign='center';

            this.popupUI.style.position = "absolute";
            this.popupUI.style.height = '10px';
            this.popupUI.style.lineHeight = '50px';
            this.popupUI.style.paddingBottom='40px';
            this.popupUI.style.width ='400px';
            this.popupUI.style.top ='50%';
            this.popupUI.style.left = '50%';
            this.popupUI.style.zIndex = "11000";
            
            var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
            //var errorMsg = "Please Wait...";
            this.popupUI.innerHTML=errorMsg;
            document.body.appendChild(this.popupUI);
        }
    });
}());

