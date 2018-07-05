package kostat.sop.ServiceAPI.api.technicalBiz;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.technicalBiz.GetSidoEconomy.MustParam;
import kostat.sop.ServiceAPI.api.technicalBiz.GetSidoEconomy.OptionParam;
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

public class GetSigunguClass extends AbsQuery<Map>{

private static final Log logger = LogFactory.getLog(GetSigunguClass.class);
	
	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	enum MustParam {
		m_class_cd,
		sido_cd,
		sgg_cd,
		base_year
	}
	
	enum OptionParam {
		
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100621";
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
			
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
			result.put("sigunguClassList", technicalBizMapService.getSigunguClass(mapParameter));
			
			mapParameter.put("sgg_cd", "undefined");
			
			result.put("sidoClassList", technicalBizMapService.getSigunguClass(mapParameter));
			
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
