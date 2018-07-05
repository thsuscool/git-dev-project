package kostat.sop.ServiceAPI.admdrcd;

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
import kostat.sop.ServiceAPI.common.util.CaptchaServiceSingleton;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class admdrcd extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(admdrcd.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10701";
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
	
	enum MustParam
	{
		code
	}
	
	enum OptionParam
	{
		
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
			
			Map admdrcd;
			
			String code = mapParameter.get("code").toString();
			
			if(code.length()==2){
				System.out.println("1111");
				admdrcd = session.selectOne("admdrcd.admdrcd1", mapParameter);
			}else if(code.length()==5){
				System.out.println("2222");
				admdrcd = session.selectOne("admdrcd.admdrcd2", mapParameter);
			}else if(code.length()==7){
				System.out.println("3333");
				admdrcd = session.selectOne("admdrcd.admdrcd3", mapParameter);
			}else{
				admdrcd = session.selectOne("admdrcd.admdrcd4", mapParameter);
			}
			
			result.put("resultdata", admdrcd);
				
			
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
