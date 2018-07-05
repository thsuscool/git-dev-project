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
 * 1. 기능 : 회원 실명인증 정보를 리턴받아 DB에 임시저장<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class NameInfoReg extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(NameInfoReg.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2004";
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
		retInfo
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
			
			// 변수 --------------------------------------------------------------------------------
		    String retInfo		= "";																// 결과정보

			String name			= "";                                                               //성명
			String sex			= "";																//성별
			String birYMD		= "";																//생년월일
			String fgnGbn		= "";																//내외국인 구분값
			
		    String di			= "";																//DI
		    String ci1			= "";																//CI
		    String ci2			= "";																//CI
		    String civersion    = "";                                                               //CI Version
		    
		    String reqNum		= "";                                                               // 본인확인 요청번호
		    String result		= "";                                                               // 본인확인결과 (Y/N)
		    String certDate		= "";                                                               // 검증시간
		    String certGb		= "";                                                               // 인증수단
			String cellNo		= "";																// 핸드폰 번호
			String cellCorp		= "";																// 이동통신사
			String addVar		= "";

			//복화화용 변수
			String encPara		= "";
			String encMsg		= "";
			String msgChk       = "N";  
		    //-----------------------------------------------------------------------------------------------------------------
			
			retInfo = mapParameter.get(MustParam.retInfo.name()).toString();
			
			String reqNumSS = (String)httpSession.getAttribute("reqNum");
			if(reqNumSS == null) {
				throw new ApiException("요청번호가 잘못되었습니다.", COMM_ERR_CODE.ERR_PARAM);
			}
			httpSession.removeAttribute("reqNum");
			
			// 1. 암호화 모듈 (jar) Loading
			SciSecuManager sciSecuMg = new SciSecuManager();
			//쿠키에서 생성한 값을 Key로 생성 한다.
			retInfo = sciSecuMg.getDec(retInfo, reqNumSS);
			
			// 2.1차 파싱---------------------------------------------------------------
	        String[] aRetInfo1 = retInfo.split("\\^");
	        
	        encPara  = aRetInfo1[0];         //암호화된 통합 파라미터
	        encMsg   = aRetInfo1[1];    //암호화된 통합 파라미터의 Hash값
	        
	        String  encMsg2   = sciSecuMg.getMsg(encPara);
			// 3.위/변조 검증 ---------------------------------------------------------------
	        if(encMsg2.equals(encMsg)){
	            msgChk="Y";
	        }
	        
	        if(msgChk.equals("N")){
	        	throw new ApiException("비정상적인 접근입니다.!!"+msgChk, COMM_ERR_CODE.ERR_PARAM);
	        }
	        
	        // 복호화 및 위/변조 검증 ---------------------------------------------------------------
			retInfo  = sciSecuMg.getDec(encPara, reqNumSS);

	        String[] aRetInfo = retInfo.split("\\^");
			
	        name		= aRetInfo[0];
			birYMD		= aRetInfo[1];
	        sex			= aRetInfo[2];        
	        fgnGbn		= aRetInfo[3];
	        di			= aRetInfo[4];
	        ci1			= aRetInfo[5];
	        ci2			= aRetInfo[6];
	        civersion	= aRetInfo[7];
	        reqNum		= aRetInfo[8];
	        result		= aRetInfo[9];
	        certGb		= aRetInfo[10];
			cellNo		= aRetInfo[11];
			cellCorp	= aRetInfo[12];
	        certDate	= aRetInfo[13];
			addVar		= aRetInfo[14];
			
			Map parameter = new HashMap();
			parameter.put("member_key", di);
			parameter.put("nm", SecureDB.encryptAria256(name));
			parameter.put("birth", birYMD);
			parameter.put("gender", sex);
			parameter.put("native_foreign_div", fgnGbn);
			parameter.put("info_link_1", ci1);
			parameter.put("info_link_2", ci2);
			parameter.put("info_link_ver", civersion);
			parameter.put("req_no", reqNum);
			parameter.put("auth_succ_yn", result);
			parameter.put("auth_div", certGb);
			parameter.put("cp_no", SecureDB.encryptAria256(cellNo));
			parameter.put("telecom", cellCorp);
			parameter.put("req_time", certDate);
			parameter.put("add_param", addVar);
			
			if(addVar.equals("JOIN")) {
				int memCnt = (Integer) session.selectOne("member.getMemberOverlapCheck", parameter);
				if(memCnt > 0) {
					throw new ApiException("이미 가입된 회원입니다.!!", COMM_ERR_CODE.ERR_PARAM);
				}	
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
			httpSession.setAttribute("member_key", di);
			
			httpSession.setAttribute("nm", name);
			httpSession.setAttribute("birth", birYMD);
			httpSession.setAttribute("gender", sex);
			
			resultData.put("member_key", di);
			
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