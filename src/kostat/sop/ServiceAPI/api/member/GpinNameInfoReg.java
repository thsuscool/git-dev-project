package kostat.sop.ServiceAPI.api.member;

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
import com.sci.v2.pcc.secu.SciSecuManager;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.SecureDB;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

/**
 * 1. 기능 : 회원 실명인증 정보(G-PIN)를 리턴받아 DB에 임시저장<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 이동형, 1.0, 2014/10/14  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 이동형
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class GpinNameInfoReg extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GpinNameInfoReg.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2017";
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
			
			// G-PIN 본인확인 결과 수신값 --------------------------------------------------------------------------------
		    //retInfo(중복확인코드)
		    //virtualNo(개인 식별번호)
			//virtualNo(개인 식별번호)
			//realName(이름)
			//sex(성별 : 1남자 ,2 여자)
			//age(나이~ < 9 : (0),~ < 12 : (1),~ < 14 : (2),~ < 15 : (3),~ < 18 : (4),~ < 19 : (5),~ < 20 : (6),~ >= 20 : (7))
			//birthDate(생년월일)
			//nationalInfo(국적)
			//authInfo(본인인증방법)
			// G-PIN 본인확인 결과 수신값 --------------------------------------------------------------------------------
			
			String retInfo = (String)httpSession.getAttribute("retInfo");	
			Map parameter = new HashMap();
			parameter.put("member_key", httpSession.getAttribute("retInfo"));
			parameter.put("nm", SecureDB.encryptAria256((String)httpSession.getAttribute("realName")));
			parameter.put("birth", httpSession.getAttribute("birthDate"));
			parameter.put("gender", httpSession.getAttribute("sex"));
			parameter.put("native_foreign_div", "");
			parameter.put("info_link_1", "");
			parameter.put("info_link_2", "");
			parameter.put("info_link_ver", "");
			parameter.put("req_no", "");
			parameter.put("auth_succ_yn", "");
			parameter.put("auth_div", "I");
			parameter.put("cp_no", "");
			parameter.put("telecom", "");
			parameter.put("req_time", "");
			parameter.put("add_param", "");
			
			int memCnt = (Integer) session.selectOne("member.getMemberOverlapCheck", parameter);
			if(memCnt > 0) {
				throw new ApiException("이미 가입된 회원입니다.!!", COMM_ERR_CODE.ERR_PARAM);
			}	
						
			
			//실명인증 정보저장
			List infoList = session.selectList("member.getNameInfoList", parameter);
			if(infoList.size() == 0) {
				//실명인증 정보 저장
				session.insert("member.insertNameInfo", parameter);	
			} else {
				//실명인증 정보 수정
				session.update("member.updateNameInfo", parameter);
			}
			
			//중복가입정보를 세션에 담는다.
			httpSession.setAttribute("member_key", httpSession.getAttribute("retInfo"));
			
			resultData.put("member_key", httpSession.getAttribute("retInfo"));
			
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