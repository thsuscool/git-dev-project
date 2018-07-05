package kostat.sop.ServiceAPI.api.bizStats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 영역내 버스정류장 정보제공 API
* Boundary 경계내에 포함되는 버스정류장 정보조회
* <pre>
* input : poietcbusstop.json/xml
* output : json/xml
* Table : SOD_BUSSTOP_INFO
* </pre>
*
* <pre>
* <b>History:</b>
* 나재웅, 1.0, 2015/01/20 초기 작성
* </pre>
* 
* @author 나재웅
* @version 1.0, 2015/01/20 메서드 추가
* @see None
*/

public class PoiEtcBusStop extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10012";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return "bizStats.poietcbusstop";
	}
	
	enum MustParam
	{
		minx,
		miny,
		maxx,
		maxy
	}
	
	enum OptionParam
	{
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
			
			result = session.selectList(getQueryStr(), mapParameter);
			
			if(result.size()==0){
				throw new NoResultException();
			}
			
			logger.info("END Query - TXID[" + getApiId() + "] ");

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
}

