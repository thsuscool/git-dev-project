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

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

public class GetTechSggCorpCount extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(GetTechSggCorpCount.class);
	
	@Resource(name = "technicalBizMapService")
	private TechnicalBizMapService technicalBizMapService;

	enum MustParam {
		base_year
	}
	
	enum OptionParam {
		
	}

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "100640";
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
			
			mapParameter.put( "bnd_year", Properties.getDefult_bnd_year() );
			
			result =  technicalBizMapService.selectTechAllSggCorpCnt(mapParameter);
			
			if( result.size() == 0 )
			{
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
	
}
