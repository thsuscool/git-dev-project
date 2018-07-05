package kostat.sop.ServiceAPI.api.figure;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 영역내 국가DB 경계 제공 API
* Boundary 경계내에 포함되는 국가BD 정보 조회
* <pre>
* input : Floor.json/xml
* output : json/xml
* Table : NAT_PT_BD
* </pre>
*
* <pre>
* <b>History:</b>
* 권영구, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 권영구
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Floor extends AbsQuery<Map> {
	
	private static final Log logger = LogFactory.getLog(Floor.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "7001";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map result = new HashMap();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			result.put("theme_nm", session.selectList("figure.floorthemetype", mapParameter));
			result.put("companylist", session.selectList("figure.companylist", mapParameter));
			result.put("facilitylist", session.selectList("figure.facilitylist", mapParameter));
			
			if(result.size()==0){
				throw new NoResultException();
			}

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
		return "figure.floor";
	}
	
	enum MustParam
	{
		sufid,
		flr_no
	}
}
