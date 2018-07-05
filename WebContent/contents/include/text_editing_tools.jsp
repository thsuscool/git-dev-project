<%@ page language="java" contentType="text/html;charset=utf-8"%>
<!-- Editer -->
<!-- Skin CSS file -->
<link type="text/css" rel="stylesheet" href="http://yui.yahooapis.com/2.6.0/build/logger/assets/skins/sam/logger.css" />
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.6.0/build/assets/skins/sam/skin.css" />
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/yahoo-dom-event/yahoo-dom-event.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/logger/logger-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/element/element-beta-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/container/container_core-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/menu/menu-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/button/button-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/editor/editor-min.js"></script>
<script type="text/javascript" src="http://yui.yahooapis.com/2.6.0/build/connection/connection-min.js"></script>
<script type="text/javascript" src="/contents/scripts/yui-image-uploader.js"></script>
<script type="text/javascript">
//<![CDATA[
YAHOO.widget.Logger.enableBrowserConsole();
var myEditor = new YAHOO.widget.Editor('example_editor', {
        height: '300px',
        width: '100%',
        dompath: true,
        animate: true
    });
yuiImgUploader(myEditor, 'example_editor', '/contents/include/fileupload.jsp','image');
myEditor.render();
//]]>
</script>