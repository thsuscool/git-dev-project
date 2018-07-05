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

public class GetThemaMapData extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetThemaStatsInfo.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "9034";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.GET;
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
		thema_map_data_id
	}
	
	enum OptionParam
	{
		stat_data_base_year,
		databoard_adm_cd,
		adm_cd,
		area_type
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map mapParameter= getParameterMap(req);
		
		_checkNullParameterValue(mapParameter);
		
		Map resultData = new HashMap();

		List detailInfo = new ArrayList();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			String areaType = (String) mapParameter.get(OptionParam.area_type.name());
			String admCd = (String) mapParameter.get(OptionParam.adm_cd.name());
			String databoardAdmCd = (String) mapParameter.get(OptionParam.databoard_adm_cd.name());
			
			if(areaType != null && areaType.equals("auto")) {
				if(admCd != null && admCd.equals("00")) {
					mapParameter.put("adm_cd_length", "0");
				} else {
					mapParameter.put("adm_cd_length", String.valueOf(admCd.length()));
				}
				detailInfo = (List) session.selectList("thematicMap.select.getThemaMapData", mapParameter);
			} else if(databoardAdmCd != null && databoardAdmCd.length() > 1) {
				detailInfo = (List) session.selectList("thematicMap.select.getThemaMapData", mapParameter);
			} else {
				detailInfo = (List) session.selectList("thematicMap.select.getThemaMapDataAll", mapParameter);
			}
			
			resultData.put("detailInfo", detailInfo);
			
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