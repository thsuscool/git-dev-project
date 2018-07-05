package kostat.sop.ServiceAPI.view;

import java.io.OutputStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.AbstractView;

public class JsonPView extends AbstractView
{

	@Override
	protected void renderMergedOutputModel( Map< String, Object > map, HttpServletRequest req, HttpServletResponse res ) throws Exception
	{
		Map<String, Object> result = (Map<String, Object>) map.get( "result" );
		String strViewType = (String) result.get( "viewType" );
		String strContentType = (String) result.get( "contentType" );

		res.setContentType( strContentType );
		OutputStream out = res.getOutputStream();
		
		if(strViewType.equals( "base64" ))
		{
			String strB64Data = (String) result.get( "data" );
			String strCallbackName = (String) result.get( "callBackName" );
			StringBuilder sb = new StringBuilder();
			sb.append( strCallbackName );
			sb.append( "(\"" );
			sb.append( "data:" );
			sb.append( strContentType );
			sb.append( ";base64,");
			sb.append( strB64Data );
			sb.append( "\")" );
			out.write( sb.toString().getBytes() );
			out.flush();
			// "data:javascript;base64,"
		}
		else
		{
			out.write( ( byte [] )result.get( "data" ) );
			out.flush();
		}
	}

}
