var os_ver = window.navigator.appVersion;
var APPNAME = window.navigator.appName;
var PAGEACL = "00000000";  //�ҽ�����, ����, ����, �μ�, �μ� ��ŷ, ȭ��ĸ��, ���¹� hide ����, ����Ʈ API �����н� �ɼ�
var PAGEOPTION = "00000";

if(os_ver.indexOf("Win64")>0){
	document.write('<OBJECT ID="WebSecurer" CLASSID="CLSID:6687DEFA-B8AB-4895-B3BD-68DBEEF569DC" codebase=/softcamp/SCWCS2015.cab#version=2,0,1,5 height=0 Width=0 ID="WebSecurer">');
	document.write('<PARAM NAME="PageAcl" VALUE="' + PAGEACL + '">');
	document.write('<PARAM NAME="pageoption" VALUE="' + PAGEOPTION + '">');
	document.write('</OBJECT>');
}else{
	document.write('<OBJECT ID="WebSecurer" CLASSID="CLSID:6687DEFA-B8AB-4895-B3BD-68DBEEF569DC" codebase=/softcamp/SCWCS101819.cab#version=1,0,18,19 height=0 Width=0 ID="WebSecurer">');
	document.write('<PARAM NAME="PageAcl" VALUE="' + PAGEACL + '">');
	document.write('<PARAM NAME="pageoption" VALUE="' + PAGEOPTION + '">');
	document.write('</OBJECT>');
	
}
	


	VERSION = "";
	INSTALLPAGE = "/softcamp/plugin/installplugin.html";
	INSTALLEXE = "/softcamp/plugin/SCWCSAMulBrInstaller_x32.msi";
	//ERRORPAGE = "/softcamp/error.html";
	//INSTALLFF = "/softcamp/extension/installffext.html";
	//alert(os_ver);
	if(os_ver.indexOf("Win64")>0 || os_ver.indexOf("WOW64")>0){
		INSTALLEXE = "/softcamp/plugin/SCWCSAMulBrInstaller_x64.msi";
	}
	
	OS_VER = window.navigator.userAgent;//window.navigator.appVersion;
	//alert(OS_VER);
	bINSTALL = false;
	
	if(OS_VER.indexOf("Windows") >0)
	{
		bINSTALL=true;
	}
	if ( OS_VER.indexOf("WOW64") > 0 )
	{
		bINSTALL = true;	
	}
	
	if(bINSTALL==true)
	{
		///*
		bINSTALL = false;
		//netscape�� Firefox�� ������. ���� ���� üũ.
		if(OS_VER.indexOf("Navigator")>=0)
		{
			bINSTALL=false;
		}
		else if(OS_VER.indexOf("Firefox")>=0)
		{
			bINSTALL=true;
		}
		//chrome�� safari�� ������. ���� chrome ���� üũ.
		else if(OS_VER.indexOf("Chrome")>=0)
		{
			bINSTALL=true;
		}
		else if(OS_VER.indexOf("Safari")>=0)
		{
			bINSTALL=true;
		}
		else if(OS_VER.indexOf("Opera")>=0)
		{
			bINSTALL=true;
		}
	}
	
	
	function VersionCheck(embed)
	{
	
		var firever = embed.Version();
		var verCurrent = VERSION;
	
		var temparr = firever.split(".");
		var temparr2 = verCurrent.split(".");
		for(i=0; i<4; i++)
		{
			var itemp=temparr[i];
			var itemp2=temparr2[i];
			if(itemp<itemp2)
				return false;
		}
	
		return true;
	}
	

	if(bINSTALL==false)
	{
		//alert(OS_VER);
		//alert("�������� �ʴ� ȯ���Դϴ�.");
		//window.location.replace(ERRORPAGE);
	}
	else
	{
		document.write("<embed id='websecu' type='application/npwebsaxul' pluginspage='"+INSTALLEXE+"' width=0 height=0>");
	
		try
		{
			var embed1 = document.getElementById('websecu');
			if(!VersionCheck(embed1))
			{
				
				window.location.replace(INSTALLPAGE);
			}
			var state = embed1.STATE();
			if(state!=0)
			{

//				alert(state);
			}
		}
		catch(e)
		{
			
			window.location.replace(INSTALLPAGE);
		}

	
		embed1.PageAcl('000000');
		embed1.PageOption('00000');
		//embed1.PageOption('00110');
		embed1.PermitDeniedUrl('http://google.com');
		embed1.Init();

	
	}


