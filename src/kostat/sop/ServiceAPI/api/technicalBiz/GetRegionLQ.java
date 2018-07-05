package kostat.sop.ServiceAPI.api.technicalBiz;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetRegionLQ extends AbsQuery<Map>{

	private static final Log logger = LogFactory.getLog(GetRegionLQ.class);

	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	enum MustParam {
		lower_search
	}
	
	enum OptionParam {
		adm_cd
		, techbiz_class_cd
		, base_year
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100654";
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		HashMap<String,Object> result =  new HashMap<String,Object>();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String admCd = (String) mapParameter.get(OptionParam.adm_cd.name());
			String techbizClassCd = (String) mapParameter.get(OptionParam.techbiz_class_cd.name());
			String lowerSearch = (String) mapParameter.get(MustParam.lower_search.name());
			
			if(admCd != null) {
				if(admCd.length() == 2 || admCd.length() == 5 || admCd.length() == 7) {
					if(lowerSearch.equals("0")) {
						switch(admCd.length()) {
						case 2:
							mapParameter.put("region_div", "1");
							break;
						case 5:
							mapParameter.put("region_div", "2");
							break;
						case 7:
							mapParameter.put("region_div", "3");
							break;
						default:
							mapParameter.put("region_div", "1");
							break;
						}
					} else {
						switch(admCd.length()) {
						case 2:
							mapParameter.put("region_div", "2");
							mapParameter.put("lower_adm_cd", admCd + "%");
							break;
						case 5:
							mapParameter.put("region_div", "3");
							mapParameter.put("lower_adm_cd", admCd + "%");
							break;
						default:
							mapParameter.put("region_div", "2");
							mapParameter.put("lower_adm_cd", admCd + "%");
							break;
						}
					}
				} else {
					throw new ApiException("행정구역 코드를 체크 해 주세요");
				}
			} else {
				mapParameter.put("region_div", "1");
			}
			
			if(techbizClassCd != null && !techbizClassCd.isEmpty()) {
				if(techbizClassCd.length() < 1 || techbizClassCd.length() > 3) {
					throw new ApiException("기술업종 코드값을 체크 해 주세요");
				} else {
					mapParameter.put("techbiz_cd_div", techbizClassCd.length());
				}
			} else {
				mapParameter.put("techbiz_cd_div", "2");
			}
			
			result.put("featureData", technicalBizMapService.selectRegionLq(mapParameter));
			
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
	
}
