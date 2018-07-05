package kostat.sop.ServiceAPI.api.map.interactive;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 영역내 국가DB 경계 제공 API
* Boundary 경계내에 포함되는 국가BD 정보 조회
* <pre>
* input : Bdarea.json/xml
* output : json/xml
* Table : NAT_PT_BD
* </pre>
*
* <pre>
* <b>History:</b>
* 나재웅, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 나재웅
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Bdarea extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(Bdarea.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "5001";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		List result = null;

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String strFormat =_getViewType(req,res);
			
			result = session.selectList("interactive.bdarea", mapParameter);

			logger.info("END Query - TXID[" + getApiId() + "] ");

			if (logger.isDebugEnabled()) {
				logger.debug("[ result = " + result + " ]");
			}
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return result;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "boundary.bdarea";
	}
	
	enum MustParam
	{
		minx,
		miny,
		maxx,
		maxy
	}
	
}
