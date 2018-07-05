package kostat.sop.ServiceAPI.api.member;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

import java.util.Random;

/**
 * 1. 기능 : 아이디 찾기 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/12  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class FindID extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(FindID.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2008";
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
		member_key, member_nm, cp_no, gubun
	}
	
	enum OptionParam
	{
	}
	
	@SuppressWarnings({ "unchecked" })
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
			
			String member_nm = (String)mapParameter.get(MustParam.member_nm.name());
			String cp_no = (String)mapParameter.get(MustParam.cp_no.name());
			String member_key = (String)mapParameter.get(MustParam.member_key.name());
			mapParameter.put(MustParam.member_nm.name(), member_nm);
			
			mapParameter.put( MustParam.cp_no.name(), SecureDB.encryptAria256(cp_no));
			
			//아이디 찾기를 통해 검색한 아이디
			String member_id = (String)session.selectOne("member.getFindID", mapParameter);
			String member_id2 = member_id;
			if(member_id == null) {
				throw new ApiException("아이디를 찾을 수 없습니다.", COMM_ERR_CODE.ERR_PARAM);
			}
			
			//양쪽 3자리만 보이고 가운데는 * 표시
			//abcdefghi ===>> abc***ghi
			String asterisk = "";
			for(int i = 0; i < member_id.length()-6; i ++) {
				asterisk = asterisk + "*";
			}
			member_id = member_id.substring(0, 3) + asterisk + member_id.substring(member_id.length()-3, member_id.length());
			
			//임시비밀번호 생성
			String password = "";
			  for(int i = 0; i < 9; i++){
			   //char upperStr = (char)(Math.random() * 26 + 65);
			  // char lowerStr = (char)(Math.random() * 26 + 97);
			   Random r = new Random();
			   char lowerStr = (char)(r.nextInt(26) + 97);
			   if(i%2 == 0){
				   password += (int)(r.nextInt(10));
			   }else{
			    password += lowerStr;
			   }
			  }			  			 
			  			  
			mapParameter.put("pw", SecureDB.encryptSha256(password));
			mapParameter.put("member_id", member_id2);
			
			String gubun =  (String)mapParameter.get(MustParam.gubun.name());
			
			
			if("20100".equals(gubun)){
				session.update("member.passupdate", mapParameter);				
			}
			resultData.put("password", password);
			resultData.put("member_id", member_id);
			
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
		return resultData;
	}
}