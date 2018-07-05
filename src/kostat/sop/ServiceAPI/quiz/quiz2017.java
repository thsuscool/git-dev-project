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

public class quiz2017 extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(quiz2017.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "919100";
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
		gubun,
		name,
		tel_no
	}
	
	enum OptionParam
	{
		survay1, survay2, survay3, survay4,  survay5, survay7, survay8, survay9, survay10, 
		survay11, survay12, survay13, survay14, etc1, etc2, etc3, etc4, etc5, etc6, etc7, etc9, etc10,
		ox_1, ox_2, ox_3, ox_4, ox_5, bigo1, sex
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
			System.out.println(mapParameter.get("gubun"));
			if(mapParameter.get("gubun").equals("survey")){
				//설문조사
				int resultCnt = session.selectOne("quiz.selectSurveyEvent", mapParameter);
				result.put("resultCnt", resultCnt);
				
				if(resultCnt <= 0 )
					session.insert("quiz.insertSurvey", mapParameter);
				
			} else {
				_checkNullParameterValue(mapParameter);
				
				if(mapParameter.get("gubun").equals("sel")){
					int resultCnt = session.selectOne("quiz.selectQuiz2017", mapParameter);
					
					result.put("resultCnt", resultCnt);
					
				}else if(mapParameter.get("gubun").equals("reg")){
					session.insert("quiz.insertQuiz2017", mapParameter);
					
				}else if(mapParameter.get("gubun").equals("regEvent")){
					// 2017 웹게임 이벤트
					int resultCnt = session.selectOne("quiz.selectQuizEvent", mapParameter);
					result.put("resultCnt", resultCnt);
					
					if(resultCnt <= 0 )
						session.insert("quiz.insertQuizEvent", mapParameter);
					
				}else if(mapParameter.get("gubun").equals("mod")){
					session.insert("quiz.updateQuiz2017", mapParameter);
					
				}
			}
				
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
