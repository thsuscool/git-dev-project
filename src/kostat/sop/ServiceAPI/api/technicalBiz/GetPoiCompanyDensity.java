package kostat.sop.ServiceAPI.api.technicalBiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetPoiCompanyDensity extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetPoiCompanyDensity.class);
	
	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	enum MustParam {
		theme_cd,
		year,
		data_type
	}
	
	enum OptionParam {
		adm_cd,
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100650";
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
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		httpSession = req.getSession();
		List result = null;
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String year = (String)mapParameter.get("year");
			String adm_length = "7";
			String bnd_year = (String)mapParameter.get("bnd_year");
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
				throw new ApiException("년도 정보를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}

			// 년도 - > 차수 변환
			mapParameter.put("corp_num", convertYearToNumber(year));


			if( theme_cd == null )
			{
				throw new ApiException( "코드 값을 다시입력하세요", COMM_ERR_CODE.ERR_PARAM);
			}
			
			result = technicalBizMapService.selectPoiCompanyDensity(mapParameter);
			
			if(result.size()==0){
				throw new NoResultException();
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
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
		//2017.12.13 개발팀 수정 매년 마다 년도를 수정 하게 되어 있었음
		
		String strNumber = "9";
		
		if( year == null || year.length() == 0)
		{
			return strNumber;
		}
		
		int intYear = Integer.valueOf( year );
		if(intYear < 2006){
			strNumber = "8";
		}else{
			strNumber = "9";
		}
		return strNumber;
	}
	
}
