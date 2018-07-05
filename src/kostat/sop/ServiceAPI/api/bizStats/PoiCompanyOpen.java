package kostat.sop.ServiceAPI.api.bizStats;

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

import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 업종별 밀집도 정보 API
* <pre>
* input : poiCompanyDensity.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/11/20 초기 작성
* </pre>
* 
* @author 권차욱
* @version 1.0, 2015/11/20 메서드 추가
* @see None
*/

public class PoiCompanyOpen extends AbsQuery<List>{
	private static final Log logger = LogFactory.getLog(PoiCompanyOpen.class);
	
	//생활업종지도 관련 서비스
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10022";
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
		//adm_cd,
		year,
		data_type
		
	}
	
	enum OptionParam
	{
		adm_cd,
		pagenum,
		resultcount
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
			//_optimizeParameterMap(mapParameter);
			
			String year = (String)mapParameter.get("year");
			String adm_length = "7";
			String bnd_year = (String)mapParameter.get("bnd_year");
			String pagenum = (String)mapParameter.get("pagenum");
			String resultcount = (String)mapParameter.get("resultcount");
			String theme_cd = (String)mapParameter.get("theme_cd");

			//경계년도 체크
			if( bnd_year == null || true)
			{
				mapParameter.put("bnd_year", Properties.getDefult_bnd_year());
			}
			else if(!Properties.getBnd_year_list().contains(bnd_year))
			{
				throw new ApiException("경계데이터 년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}

			//년도 체크
			if(!Properties.getCompany_year_list().contains(year))
			{
				//throw new ApiException("년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
				//지자체에서는 년도가 2015, 2016, 2017이므로 이 로직이 필요없음.
			}

			// 년도 - > 차수 변환
			mapParameter.put("corp_num", convertYearToNumber(year));

			//동코드 분할
			/*String adm_cd = (String)mapParameter.get("adm_cd");
			String sido_cd = null;
			String sgg_cd = null;
			String emdong_cd = null;
			
			if(adm_cd == null)
			{
				throw new ApiException( "행정동 코드를 확인해주세요", COMM_ERR_CODE.ERR_PARAM );
			}*/

			if( theme_cd == null )
			{
				throw new ApiException( "코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM);
			}
			
			if( pagenum == null )
			{
				pagenum = "0";
				mapParameter.put( "pagenum", pagenum );
			}
			
			if( resultcount == null )
			{
				resultcount = "10";
				mapParameter.put( "resultcount", resultcount );
			}
			
			if( !StringUtil.NumberChk( pagenum ) )
			{
				throw new ApiException( "page는 숫자만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}
			
			if( !StringUtil.NumberChk( resultcount ) )
			{
				throw new ApiException( "count는 숫자만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}

			int int_page = Integer.parseInt( pagenum );
			int int_count = Integer.parseInt( resultcount );

			if( int_count < 1 )
			{
				throw new ApiException( "count는 1부터 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}

			if( int_count > 500 )
			{
				throw new ApiException( "결과 수는 500까지만 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}

			if( int_page < 0 )
			{
				throw new ApiException( "page는 1부터 가능합니다", COMM_ERR_CODE.ERR_PARAM );
			}
			
			int srt_idx = ( int_page * int_count ) + 1;
			mapParameter.put( "srt_idx", srt_idx );
			
			//임의 영역 반경 내 집계구경계
			result = bizStatsMapService.selectPoiCompanyOpen(mapParameter);
			
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

	private String convertYearToNumber(String year) {
		String strDefaultNum = "9";
		String strNumber;
		if( year == null || year.length() == 0)
		{
			return strDefaultNum;
		}
		
		int intYear = Integer.valueOf( year );
		
		switch( intYear )
		{
			case 2000:
			case 2001:
			case 2002:
			case 2003:
			case 2004:
			case 2005:
				strNumber = "8";
				break;
			case 2006:
			case 2007:
			case 2008:
			case 2009:
			case 2010:
			case 2011:
			case 2012:
			case 2013:
			case 2014:
				strNumber = "9";
				break;
			default:
				strNumber = strDefaultNum;
		}
		return strNumber;
	}
}