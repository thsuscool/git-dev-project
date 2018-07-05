package kostat.sop.ServiceAPI.api.technicalBiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.TechnicalBizMapService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class SearchAdmNm extends AbsQuery<List>{

	private static final Log logger = LogFactory.getLog(SearchAdmNm.class);

	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	/*
	 * techbiz_m_class_cd,lq_base_region 지역찾기시 사용
	 * 
	 * sido_cd,sgg_cd 들어오면 전국 시군구 조회
	 * sido_cd,sgg_cd 없으면 지역찾기  
	 * */
	enum MustParam {
		admCodeArray,
	}
	
	enum OptionParam {
		
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100659";
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
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String arg2) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		/*HashMap<String,Object> result =  new HashMap<String,Object>();*/
		List returnList = new ArrayList();
	
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			String [] amdCdArray = ((String)mapParameter.get("admCodeArray")).split(",");
			
			Map paramMap = new HashMap();
			paramMap.put("base_year", Properties.getDefult_bnd_year());
			
			//selectFilterSerch
			for(int i = 0; i < amdCdArray.length ; i++){
				String adm_cd = amdCdArray[i];
				paramMap.put("adm_cd",adm_cd);
				returnList.add(technicalBizMapService.searchAdmNm(paramMap));
				
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
		return returnList;
	}
	
}
