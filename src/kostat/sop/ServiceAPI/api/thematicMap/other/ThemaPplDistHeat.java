package kostat.sop.ServiceAPI.api.thematicMap.other;

import java.util.ArrayList;
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

import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.ThemeticMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
* 통계주제도 - 인구분포현황 (전국 집계구 경계 & 인구 수 조회) API
* <pre>
* input : themaPplDistHeat.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2016/01/18 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2016/01/18 메서드 추가
* @see None
*/

@SuppressWarnings("rawtypes")
public class ThemaPplDistHeat extends AbsQuery<List>{
	private static final Log logger = LogFactory.getLog(ThemaPplDistHeat.class);
	
	//통계주제도 관련 서비스
	@Resource(name="themeticMapService")
	private ThemeticMapService themeticMapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9042";
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
		startnum,
		endnum
	}
	
	enum OptionParam
	{
	}
	
	@SuppressWarnings({ "unchecked" })
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		
		List result = new ArrayList();

		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			
			//경계년도
			String base_year = (String)Properties.getDefult_bnd_year();
			mapParameter.put("base_year", base_year);

			result = themeticMapService.selectAllCountryStatsarea(mapParameter);
			
			if( result.size() == 0 )
			{
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