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

public class GetFindRegionSgg extends AbsQuery<Map>{

	private static final Log logger = LogFactory.getLog(GetFindRegionSgg.class);

	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	/*
	 * techbiz_m_class_cd,lq_base_region 지역찾기시 사용
	 * 
	 * sido_cd,sgg_cd 들어오면 전국 시군구 조회
	 * sido_cd,sgg_cd 없으면 지역찾기  
	 * */
	enum MustParam {
		base_year
		, lq_base_region
	}
	
	enum OptionParam {
		from_corp_lq
		, to_corp_lq
		, from_worker_lq
		, to_worker_lq
		, is_contain_bizfac
		, is_contain_induscom
		, techbiz_class_cd
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100651";
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
			
			String tempTechClassCd = (String) mapParameter.get(OptionParam.techbiz_class_cd.name());
			
			if(tempTechClassCd != null && !tempTechClassCd.isEmpty()) {
				if(tempTechClassCd.length() < 1 || tempTechClassCd.length() > 3) {
					throw new ApiException("기술업종 코드값을 확인해 주세요.");
				} else {
					mapParameter.put("techbiz_cd_div", tempTechClassCd.length());
				}
			}
			
			//2018.01.15 [개발팀] 로직수정	
			String corpLq = (String)mapParameter.get("to_corp_lq");
			String workerLq = (String)mapParameter.get("to_worker_lq");
			
			if (corpLq != null && corpLq.equals("이상")) {
				mapParameter.put("to_corp_lq","over");
			}
			
			if (workerLq != null && workerLq.equals("이상")) {
				mapParameter.put("to_worker_lq","over");
			}
			
			result.put("featureData", technicalBizMapService.selectFindRegionSgg(mapParameter));
			
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
