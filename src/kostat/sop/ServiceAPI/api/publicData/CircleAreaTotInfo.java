package kostat.sop.ServiceAPI.api.publicData;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.PublicDataService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 임의 영역 반경 내 주요 정보 목록 API
* Boundary 경계내에 포함되는 집계구 경계 정보
* <pre>
* input : circleAreaTotInfo.geojson
* output : geojson
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/11/20 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/11/20 메서드 추가
* @see None
*/

public class CircleAreaTotInfo extends AbsQuery<List>{
	private static final Log logger = LogFactory.getLog(CircleAreaTotInfo.class);
	
	//공공데이터 관련 서비스
	@Resource(name="publicDataService")
	private PublicDataService publicDataService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "11000";
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
		return null;
	}
	
	enum MustParam
	{
		area
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
			
			String area = (String) mapParameter.get("area");		//원형 경계
			String bnd_year = Properties.getDefult_bnd_year();		//조회 년도
			
			area = area.toUpperCase().replace("CIRCLE(", "");
			area = area.replace(")", "");
			
			String circle_list[] = area.split(",");
			
			mapParameter.put("round", circle_list[1]);
			mapParameter.put("area","POINT("+circle_list[0]+")");
			mapParameter.put( "year", bnd_year );
			
			//임의 영역 반경 내 집계구경계
			result = publicDataService.selectCircleAreaTotInfo(mapParameter);
			
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