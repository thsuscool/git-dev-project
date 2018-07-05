package kostat.sop.ServiceAPI.api.communityMap;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.InvalidValueException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.neighborsystem.durian.restapi.model.NFData;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;

public class Html2CanvasProxy extends AbsQuery<HashMap<String,Object>>
{
	private static final Log logger = LogFactory.getLog(Html2CanvasProxy.class);
	
	private Pattern callbackPattern = Pattern.compile("[a-zA-Z_$][0-9a-zA-Z_$]*");
	
	private List<ProxyInfo> proxyInfos;
	
	public void setProxyInfo( List<ProxyInfo> infos ) 
	{
		proxyInfos = infos;
	}
	
	public List<ProxyInfo> getProxyInfo() 
	{
		return proxyInfos;
	}
	
	@Override
	public HashMap< String, Object > executeAPI( HttpServletRequest req, HttpServletResponse resp, String txId ) throws AbsException
	{
		//'http://10.175.80.206/SOPOpenAPI
		URL url;
		String strUrl;
		InputStream data;
		String contentType = "";
		byte [] arrReaded = null;
		byte [] arrEncoded = null;

		try
		{
			strUrl = req.getParameter(MustParam.url.name());
			//strUrl = strUrl.replaceAll("https", "http");
			if ( proxyInfos != null ) {
				for( ProxyInfo info : proxyInfos ) {
					if ( strUrl.contains(info.getFromUrl() ) ) {
						strUrl = strUrl.replace( info.getFromUrl(), info.getToUrl() );
						if( logger.isDebugEnabled() ) {
							logger.debug("convert URL : " + strUrl);
						}
						break;
					}
				}
			}
			
			String hostName = InetAddress.getLocalHost().getHostName();
			System.out.println("[Html2CanvasProxy.java] strUrl [" + strUrl);
			if("sgis_dev".equals(hostName)) {
				strUrl = strUrl.replaceAll("https://sgisapi.kostat.go.kr", "http://10.134.2.100:20083");
			}
			
			url = new URL(strUrl);
			System.out.println("[Html2CanvasProxy.java] 111111111111");
			URLConnection connection = url.openConnection();
			System.out.println("[Html2CanvasProxy.java] 22222222222");
			connection.setConnectTimeout(3000);
			data = connection.getInputStream();
			contentType = connection.getContentType();
			arrReaded = IOUtils.toByteArray( data );
			arrEncoded = Base64.encodeBase64( arrReaded );
			
			System.out.println("[Html2CanvasProxy.java] 33333333333");
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		/*
		catch( IOException e )
		{
			throw new InvalidValueException( "URL connection or I/O error. (IOException)" );
		}
		*/
		String strCallbackName = req.getParameter(OptionParam.callback.name());
		
		NFData results = new NFData();

		if (strCallbackName == null) 
		{
			results.put( "contentType", contentType );
			results.put( "viewType", "byte" );
			results.put( "data", arrReaded );
		} 
		else 
		{
			if (!callbackPattern.matcher(strCallbackName).matches()) 
			{
				throw new InvalidValueException( "잘못된 콜백 함수명" );
			}
			
			results.put( "viewType", "base64" );
			results.put( "data", new String(arrEncoded) );
			results.put( "callBackName", strCallbackName );
			results.put( "contentType", "application/javascript");
		}
		return results;
	}

	@Override
	public String getApiId()
	{
		return "10000";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public Class getMustParameter() throws AbsException
	{
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException
	{
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr()
	{
		return null;
	}
	
	private enum MustParam {
		url
	}
	
	private enum OptionParam {
		callback
	}

}
