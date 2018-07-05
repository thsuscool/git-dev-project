package kostat.sop.ServiceAPI.api.bizStats;

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

import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 업종 밀집도정보 시계열별 데이터 정보 API
* <pre>
* input : PoiCompanyTimeSeries.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/12/02 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/12/02 메서드 추가
* @see None
*/

@SuppressWarnings("rawtypes")
public class PoiCompanyTimeSeries extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(PoiCompanyTimeSeries.class);
	
	//생활업종지도 관련 서비스
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10016";
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
		theme_cd,
		adm_cd,
		year
	}
	
	enum OptionParam
	{
	}
	
	@SuppressWarnings({ "unchecked", "unused" })
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
			
			String bnd_year = (String)mapParameter.get("bnd_year");
			String theme_cd = (String)mapParameter.get("theme_cd");
			String year = (String)mapParameter.get("year");
			int cntSum = 0;

			//경계년도 체크
			if( bnd_year == null || true)
			{
				mapParameter.put("bnd_year", Properties.getDefult_bnd_year());
			}
			else if(!Properties.getBnd_year_list().contains(bnd_year))
			{
				throw new ApiException("경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}

			//동코드
			String adm_cd = (String)mapParameter.get("adm_cd");
			
			if(adm_cd == null)
			{
				throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}

			if( theme_cd == null )
			{
				throw new ApiException( "코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM);
			}
	
			//년도별 사업체 수
			List result = bizStatsMapService.selectPoiCompanyTimeSeries(mapParameter);
			
			//시군구 Depth 조회일 때
			if(adm_cd.length() == 5){
				
				mapParameter.put("sido_cd", adm_cd.substring(0,2));
				mapParameter.put("sgg_cd", adm_cd.substring(2,5));
				resultData.put("emdongList", bizStatsMapService.getEmdongListBySgg(mapParameter));
			}
			
			if(result.size()==0){
				throw new NoResultException();
			}
			
			for(int i = 0; i < result.size(); i ++) {
				Map mapData = (Map) result.get(i);
				String tmpYear = (String)mapData.get("base_year");
				if(tmpYear.equals(year)) {
					cntSum = (int)mapData.get("cnt");
					break;
				}
			}
			
			resultData.put("companyList", result);
			resultData.put("cntSum", cntSum);
			
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