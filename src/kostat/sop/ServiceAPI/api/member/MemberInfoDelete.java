package kostat.sop.ServiceAPI.api.member;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
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
 *     작성자 : l.d.lee, 1.0, 2014/10/02  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : d.h.lee
 * @version 1.0
 * @see
 * <p/>
 */
public class MemberInfoDelete extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(MemberInfoDelete.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "2013";
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
			session.delete("member.memberDelete", mapParameter);
			
			//사용자 북마크 삭제
			List statisticsList = session.selectList("member.StatistcsHistoryListsForUser", mapParameter);
			if (statisticsList.size() > 0) {
				for (int i=0; i<statisticsList.size(); i++) {
					Map mapInfo = (Map)statisticsList.get(i);
					session.delete("member.deleteStatistcsHistory", mapInfo);
					session.delete("member.deleteStatistcsHistoryParamInfo", mapInfo);
				}
			}
			
			//<!-- //2015-09-10 수정 -->
			session.delete("member.deleteBoardInfo", mapParameter);		//게시판 삭제
			session.delete("member.deleteBoardReplyInfo", mapParameter);		//게시판 댓글 삭제
			session.delete("member.deleteUserServiceInfo", mapParameter);		//API 서비스 정보 삭제
			
			resultData.put("memberInfoDelete",0);
			resultData.put("member_id",id);	
			//req.getSession().removeAttribute("sessionId");
			req.getSession().removeAttribute("member_key");
			req.getSession().removeAttribute("member_id");
			req.getSession().removeAttribute("member_nm");
			req.getSession().removeAttribute("member_grade");
			req.getSession().removeAttribute("member_pw");
			req.getSession().removeAttribute("member_sn");
			req.getSession().removeAttribute("login_yn");
			req.getSession().removeAttribute("member_gubun");
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