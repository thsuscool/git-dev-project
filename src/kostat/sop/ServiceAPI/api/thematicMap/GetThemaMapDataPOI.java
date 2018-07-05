package kostat.sop.ServiceAPI.api.thematicMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetThemaMapDataPOI extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetThemaMapDataPOI.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9045";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
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
		, year
		, bnd_year
		, pagenum
		, resultcount
	}
	
	enum OptionParam
	{
		corp_class_cd
		, theme_cd
		, adm_cd
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter= getParameterMap(req);
		
		_checkNullParameterValue(mapParameter);
		
		Map resultData = new HashMap();
		Map param = new HashMap();
		List detailInfo = new ArrayList<>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			if(mapParameter.containsKey("theme_cd")) {
				String[] themeCdArr = ((String) mapParameter.get("theme_cd")).split(",");
				mapParameter.put( OptionParam.theme_cd.name(), themeCdArr );
			}
			
			if(mapParameter.containsKey("corp_class_cd")) {
				String[] corpClassCdArr = ((String) mapParameter.get("corp_class_cd")).split(",");
				mapParameter.put( OptionParam.corp_class_cd.name(), corpClassCdArr );
			}
			
			String pagenum = (String) mapParameter.get( "pagenum" );
			String resultcount = (String) mapParameter.get( "resultcount" );
			
			int int_page = Integer.parseInt( pagenum );
			int int_count = Integer.parseInt( resultcount );
			int srt_idx = ( int_page * int_count ) + 1;
			
			mapParameter.put( "srt_idx", srt_idx );
			
			
			List getCountResult = (List) session.selectList("thematicMap.selectPOICount", mapParameter);
			List getResult = (List) session.selectList("thematicMap.selectPOI", mapParameter);

			resultData.put("list_count", getCountResult);
			resultData.put("company_list", getResult);
		
			
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
		return resultData;
	}
}