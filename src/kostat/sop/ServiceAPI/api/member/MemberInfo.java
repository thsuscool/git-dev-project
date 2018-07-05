package kostat.sop.ServiceAPI.api.member;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : j.h.Seok, 1.0, 2014/10/01  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : d.h.lee
 * @version 1.0
 * @see
 * <p/>
 */
public class MemberInfo extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(MemberInfo.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2011";
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
		return null;
	}
	
	enum MustParam
	{
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String id = (String)httpSession.getAttribute("member_id");
			
			mapParameter.put("member_id", id);
		
			List memberInfo = (List) session.selectList("member.memberInfo", mapParameter);
			
			for(int i = 0; i < memberInfo.size(); i++) {
				Map tempMap = (Map)memberInfo.get(i);				
				String name = (String)tempMap.get("member_nm");				
				//name = SecureDB.decryptAria256(name);
				String cp_no = (String)tempMap.get("cp_no");
				String email = (String)tempMap.get("email");
				cp_no = SecureDB.decryptAria256(cp_no);
				email = SecureDB.decryptAria256(email);
				tempMap.put("member_nm", name);
				tempMap.put("cp_no", cp_no);
				tempMap.put("email", email);
				memberInfo.set(i, tempMap);
			}
			resultData.put("memberInfo", memberInfo);
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