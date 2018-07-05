package kostat.sop.ServiceAPI.view;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.util.GeojsonRenderer;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.model.NFData;
import com.neighborsystem.durian.restapi.view.AbsFormat;

public class GeoJsonFormat extends AbsFormat<Object>{
	final Log logger = LogFactory.getLog(GeoJsonFormat.class);
	
	/**
	 * MVC 패턴에 의해 호출되는 기본 함수
	 */
	@Override
	protected void renderMergedOutputModel(Map<String, Object> map, HttpServletRequest req,	HttpServletResponse res) throws IOException {
		Object element = null;
		String sendText = null;
		NFData data = new NFData(map);
		res.setContentType(getContentType());

		if (logger.isDebugEnabled()) {
			logger.debug("ErrorCode[" + data.get(CommonTag.errCd.name()) + "]");
		}

		try {
			element = makeHeader(data);
			sendText = makeResult(map, element);
			//doFormat(data, sbFormat);

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
			data.clear();
			sendText = null;
			data = null;
		}
	}
	
	
	@Override
	public Object makeHeader(NFData resultData) throws AbsException {
		// TODO Auto-generated method stub
		return null;
	}

	public String makeResult(Map resultData, Object jobObj)
			throws AbsException {
		// TODO Auto-generated method stub
//		return toString(resultData);
		return makeGeojson(resultData);
	}
	
	public String makeGeojson(Map renderGeojson)throws AbsException {
		
		String result =GeojsonRenderer.renderGeojson(renderGeojson);
		return result;
	}
	
	

	@Override
	public String makeResult(NFData resultData, Object jobObj)
			throws AbsException {
		// TODO Auto-generated method stub
		return null;
	}

}
