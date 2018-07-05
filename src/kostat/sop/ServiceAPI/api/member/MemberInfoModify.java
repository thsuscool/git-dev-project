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
import kostat.sop.ServiceAPI.common.security.Security;

/**
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : l.d.lee, 1.0, 2014/10/02  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : d.h.lee
 * @version 1.0
 * @see
 * <p/>
 */
public class MemberInfoModify extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(MemberInfoModify.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2012";
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
		member_pw,pw,cp_no,email
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
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
		
				String pw = (String)tempMap.get("pw");
				String member_id = (String)tempMap.get("member_id");	
				String birth = (String)tempMap.get("birth");
				
				//input 비밀번호
				String member_pw = (String)mapParameter.get("member_pw");
				String ch_pw = (String)mapParameter.get("pw");							
				String ch_cp_no = (String)mapParameter.get("cp_no");
				String email = (String)mapParameter.get("email");
				
				ch_cp_no = Security.sqlInjectionCheck(ch_cp_no);
				email = Security.sqlInjectionCheck(email);
				
				//암호화된 비밀번호 비교후 일치시 회원정보 변경
				if(SecureDB.encryptSha256(member_pw).equals(pw)){																							
					mapParameter.put("ch_pw", SecureDB.encryptSha256(ch_pw));
					mapParameter.put("ch_cp_no", SecureDB.encryptAria256(ch_cp_no));							
					mapParameter.put("member_id", member_id);
					mapParameter.put("email", SecureDB.encryptAria256(email));
					session.update("member.memberInfoModify", mapParameter);
					resultData.put("memberInfoModify",0);
				
					//통합회원쪽으로 넘겨줄 사용자정보
					int count = (Integer)session.selectOne("member.selectAuthKeyListCnt", mapParameter);
					if (count > 0) {
						tempMap.put("openapi_yn", "Y");
					}else {
						tempMap.put("openapi_yn", "N");
					}
					tempMap.put("ch_pw", SecureDB.encryptSha256(ch_pw));
					tempMap.put("ch_cp_no", ch_cp_no);							
					tempMap.put("email", email);
					tempMap.put("ch_birth", SecureDB.decryptAria256(birth));
					resultData.put("memberInfo", memberInfo);
												
				}else {							
					//비밀번호 비교후 틀릴경우
					resultData.put("memberInfoModify",1);							
				}	
				
				
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
		return resultData;
	}
}