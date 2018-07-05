package kostat.sop.ServiceAPI.edu;

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

public class eduMain extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(eduMain.class);

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10600";
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
		gubun
	}
	
	enum OptionParam
	{
		board_no ,
		board_rep_no ,
		board_cd ,
		post_title, 
		post_content,
		nowPage,
		listSize,
		selectGb,
		boanCode,
		ref_file,
		real_file_name,
		tel_no,
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
			
			
			
			//에듀 게시판 리스트
			if(mapParameter.get("gubun").equals("getEduBoardList")){
				
				
				
				//paging처리 start
				int startPageNum = 0;
				int endPageNum = 0;
				int nowPage = Integer.parseInt((String) mapParameter.get("nowPage"));
				int listSize = Integer.parseInt((String) mapParameter.get("listSize"));
				startPageNum = (nowPage-1)*listSize+1;
				endPageNum = (nowPage*listSize);
				
				mapParameter.put("startPageNum", startPageNum);
				mapParameter.put("endPageNum", endPageNum);
				
				
				//paging 처리 end
				
				
				
				List eduList = null;
				String eduListCnt = null;
				eduList = session.selectList("edu.getEduBoardList", mapParameter);
				
				for(int i=0; i< eduList.size(); i++){
					Map rowMap = new HashMap(); 
					rowMap = (Map) eduList.get(i);
					
					String id = (String)rowMap.get("reg_member_id");
					String changeId = id.substring(0,1);
					for(int j=1; j<id.length()-1; j++){
						changeId += "*";
					}
					changeId += id.substring(id.length()-1,id.length());
					
					rowMap.put("reg_member_id", changeId);
					
					eduList.set(i, rowMap);
				}
				
				eduListCnt = session.selectOne("edu.getEduBoardListCnt", mapParameter);
				
				//System.out.println(eduList.size()); //2017.12.04 [개발팀] 시큐어코딩
				result.put("eduList", eduList);
				result.put("eduListCnt", eduListCnt);
				
			//에듀 게시판 등록
			}else if(mapParameter.get("gubun").equals("eduRegBoard")){
			//	session.insert("edu.eduBoardReg", mapParameter);
				
				String captchaId = httpSession.getId();
				String response = (String) mapParameter.get("boanCode");
				
				Boolean isResponseCorrect = false;
				
				isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
				
				result.put("isResponseCorrect", isResponseCorrect);
				if (!isResponseCorrect) {
					return result;
				}else{
					
					String userId = (String)req.getSession().getAttribute("member_id");
					
					if(userId == null){
						userId = "guest";
					}
					
					
					mapParameter.put("reg_member_id",userId);
					
					
				/*	if(null == mapParameter.get("ref_file")){
						mapParameter.put("ref_file" , "");
						mapParameter.put("real_file_name" , "");
					}*/
					
					
					String contentStr = (String)mapParameter.get("post_content");
					contentStr = contentStr.replaceAll("\n" , "<br />");
					
					mapParameter.put("post_content", contentStr);
					
					session.insert("edu.eduBoardReg", mapParameter);
				
				}
				
			//에듀 게시판 상세조회
			}else if(mapParameter.get("gubun").equals("getEduBoardView")){
				
				Map getEduBoardView = new HashMap();
				
				session.update("edu.eduPageViewHit", mapParameter);
				
				getEduBoardView = session.selectOne("edu.getEduBoardView", mapParameter);
				
				String id = (String)getEduBoardView.get("reg_member_id");
				String changeId = id.substring(0,1);
				for(int j=1; j<id.length()-1; j++){
					changeId += "*";
				}
				changeId += id.substring(id.length()-1,id.length());
				
				getEduBoardView.put("reg_member_id", changeId);
				getEduBoardView.put("reg_member_id2", id);
				
				
				
				
				
				result.put("getEduBoardView", getEduBoardView);
				result.put("selfId", id);
				//에듀 게시판 수정 조회
			}else if(mapParameter.get("gubun").equals("getEduBoardModView")){
				
				Map getEduBoardView = new HashMap();
				
				//session.update("edu.eduPageViewHit", mapParameter);
				
				getEduBoardView = session.selectOne("edu.getEduBoardView", mapParameter);
				
				String id = (String)getEduBoardView.get("reg_member_id");

				String userId = (String)req.getSession().getAttribute("member_id");
				
				
				//보인 or 관리자 확인
				if(id.equals(userId)){
					result.put("getEduBoardView", getEduBoardView);
				}else{
					result.put("getEduBoardView", getEduBoardView);
				}
				
				
				
			}else if(mapParameter.get("gubun").equals("getEduBoardUpdate")){
				
				String captchaId = httpSession.getId();
				String response = (String) mapParameter.get("boanCode");
				
				Boolean isResponseCorrect = false;
				
				isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
				
				result.put("isResponseCorrect", isResponseCorrect);
				if (!isResponseCorrect) {
					return result;
				}else{
					
					
					Map getEduBoardView = new HashMap();
					
					//보인 or 관리자 확인
					getEduBoardView = session.selectOne("edu.getEduBoardView", mapParameter);
					String id = (String)getEduBoardView.get("reg_member_id");
					String userId = (String)req.getSession().getAttribute("member_id");
					
					
					String contentStr = (String)mapParameter.get("post_content");
					contentStr = contentStr.replaceAll("\n" , "<br />");
					mapParameter.put("post_content", contentStr);
					
					
					
					
					if(id.equals(userId)){
						session.update("edu.getEduBoardUpdate", mapParameter);
					}else{
						session.update("edu.getEduBoardUpdate", mapParameter);
					}
					
				}
				
				
				
			}else if(mapParameter.get("gubun").equals("getEduBoardReply")){
				
				String captchaId = httpSession.getId();
				String response = (String) mapParameter.get("boanCode");
				
				Boolean isResponseCorrect = false;
				
				isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response);
				
				result.put("isResponseCorrect", isResponseCorrect);
				if (!isResponseCorrect) {
					return result;
				}else{
					
					String userId = (String)req.getSession().getAttribute("member_id");
					
					if(userId == null){
						userId = "guest";
					}
					
					
					mapParameter.put("reg_member_id",userId);
					
					if(null == mapParameter.get("ref_file")){
						mapParameter.put("ref_file" , "");
						mapParameter.put("real_file_name" , "");
					}
					
					
					String contentStr = (String)mapParameter.get("post_content");
					contentStr = contentStr.replaceAll("\n" , "<br />");
					
					mapParameter.put("post_content", contentStr);
					
					session.insert("edu.eduBoardReply", mapParameter);
				}
				
				
				
			}else if(mapParameter.get("gubun").equals("getEduBoardDelete")){
			
				
				String userId = (String)req.getSession().getAttribute("member_id");
				
				mapParameter.put("reg_member_id",userId);
				
				int resultVal = session.update("edu.getEduBoardDelete", mapParameter);
				
				result.put("resultVal", resultVal);
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
