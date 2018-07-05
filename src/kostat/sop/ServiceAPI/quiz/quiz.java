package kostat.sop.ServiceAPI.quiz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class quiz extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(quiz.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "919100";
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
		// TODO Auto-generated method stub
		return null;
	}
	
	enum MustParam
	{
		ox_one,
		ox_two,
		ox_three,
		ox_four,
		ox_five,
		ox_gender,
		ox_name,
		ox_phone,
		ox_memo
	}
	
	enum OptionParam
	{
		bigo
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, 
			String trId) throws AbsException {
		// TODO Auto-generated method stub


	httpSession = req.getSession();
		
		Map result = new HashMap();
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			_checkNullParameterValue(mapParameter);
			
			session.insert("quiz.insertQuiz", mapParameter);
			
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
}
