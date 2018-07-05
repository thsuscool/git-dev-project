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

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.api.technicalBiz.GetSigunguRank.MustParam;
import kostat.sop.ServiceAPI.api.technicalBiz.GetSigunguRank.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

public class GetDensityCombined extends AbsQuery<Map>{

	private static final Log logger = LogFactory.getLog(GetDensityCombined.class);

	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	enum MustParam {
		adm_cd,
		m_class_cd,
		s_class_cd
	}
	
	enum OptionParam {
		base_year
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100631";
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
			
			
			List<Map<String,Object>> selectAreaInfo = technicalBizMapService.getDensityCombined(mapParameter);
			
			/*mapParameter.put("s_class_cd", "undefined"); 
			
			List<Map<String,Object>> totalAreaInfo = technicalBizMapService.getDensityCombined(mapParameter);
			
			List<Map<String,Object>> percentInfo = new ArrayList<Map<String,Object>>();
			
			for(int i=selectAreaInfo.size()-1; i>=selectAreaInfo.size()-10; i--){
				try{
					Map<String, Object> sel = selectAreaInfo.get(i);
					
					for(Map<String, Object> tot : totalAreaInfo){
						if(!sel.get("base_year").equals(tot.get("base_year"))) continue;
						float corp_per = 
								(Float.parseFloat(String.valueOf(sel.get("corp_cnt")))
										/ Float.parseFloat(String.valueOf(tot.get("corp_cnt"))) ) * 100;
						
						sel.put("corp_per", String.format("%.2f", corp_per));
						sel.put("corp_cnt_tot", tot.get("corp_cnt"));
					}
					
					percentInfo.add(sel);
				}catch(IndexOutOfBoundsException e){
					continue;
				}
			}*/
			result.put("densityCombined", selectAreaInfo);
			
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
