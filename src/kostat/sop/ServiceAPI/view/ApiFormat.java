package kostat.sop.ServiceAPI.view;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.view.AbstractView;

import com.neighborsystem.durian.exception.AbsHttpException;

public class ApiFormat extends AbstractView {
	final Log logger = LogFactory.getLog(ApiFormat.class);
	
	protected void renderMergedOutputModel(Map<String, Object> map, HttpServletRequest req,	HttpServletResponse res) throws IOException  {
		String sendText = null;
		res.setContentType(getContentType());
		//res.addHeader("Access-Control-Allow-Origin", "*");
		try {
			sendText =(String) map.get("msg");

			if (logger.isDebugEnabled()) {
				logger.debug("----------------------------------[RESPONSE]----------------------------------");
				logger.debug(sendText);
				logger.debug("------------------------------------------------------------------------------");
			}
			
			if( sendText != null )
			{
				res.getOutputStream().write(sendText.getBytes());
			}
			
			res.getOutputStream().flush();
		}
		catch (AbsHttpException e) {
			logger.error(e);
			throw e;
		}
		finally {
			sendText = null;
		}
	}
}
