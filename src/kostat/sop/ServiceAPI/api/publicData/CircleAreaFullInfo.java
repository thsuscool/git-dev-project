package kostat.sop.ServiceAPI.api.publicData;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
* Boundary 경계내에 포함되는 각종 정보
* <pre>
* input : circleAreaFullInfo.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/11/24 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/11/24 메서드 추가
* @see None
*/

public class CircleAreaFullInfo extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(CircleAreaFullInfo.class);
	
	//공공데이터 관련 서비스
	@Resource(name="publicDataService")
	private PublicDataService publicDataService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "11001";
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
		area,
		tot_list,
		bnd_year
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String area = (String) mapParameter.get("area");		//원형 경계
			area = area.toUpperCase().replace("CIRCLE(", "");
			area = area.replace(")", "");
			
			String circle_list[] = area.split(",");
			
			mapParameter.put("round", circle_list[1]);
			mapParameter.put("area","POINT("+circle_list[0]+")");
			
			//집계구경계 리스트
			String tot_list[] = mapParameter.get( "tot_list" ).toString().split( "," );
			mapParameter.put( "tot_list", tot_list );
			Map themeInfo = publicDataService.getThemeInfo(mapParameter);
			
			//인구, 가구, 주택, 사업체 정보
			//2016.09.06 9월 서비스 
			//mapParameter.put( "year", "2010" );
			String base_year = Collections.max(Properties.getYear_list());
			mapParameter.put("year", base_year);
			Map totalInfo = publicDataService.getTotalInfo(mapParameter);
			
			resultData.put("themeInfo", themeInfo);
			resultData.put("totalInfo", totalInfo);
			
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
		return resultData;
	}
}