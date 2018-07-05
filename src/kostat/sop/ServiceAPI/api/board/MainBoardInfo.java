package kostat.sop.ServiceAPI.api.board;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletOutputStream;

import kostat.sop.ServiceAPI.api.bizStats.Houseprice;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;
import kostat.sop.ServiceAPI.common.security.Security;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import org.json.JSONArray;
import org.json.JSONObject;

/**
* 메인화면 정보
* <pre>
* input : MainBoardInfo.json/xml
* output : json/xml
* Table : 
* </pre>
*
* <pre>
* <b></b>
* 이경현, 1.0, 2015/07/15 초기 작성
* </pre>
* 
* @author 이경현
* @version 1.0, 2015/0
* @see None
*/

public class MainBoardInfo extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10300";
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
		return "board.BoardListView";
	}
	
	enum MustParam
	{
		gubun
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();
		
		String userId = (String)req.getSession().getAttribute("member_id");
		
		List result = null;
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			String gubun = (String)mapParameter.get("gubun");
			gubun = Security.sqlInjectionCheck(gubun);
			
			if(gubun.substring(0,5).equals("BOARD")){
				result = session.selectList(getQueryStr(), mapParameter);
			}else if(gubun.substring(0,5).equals("Share")){
				result = session.selectList("board.Share", mapParameter);
			}else if(gubun.equals("gallery")){
				result = session.selectList("board.gallery", mapParameter);
			}else if(gubun.equals("notice")){
				result = session.selectList("board.notice", mapParameter);
				// 2016.12.02 시큐어코딩 삭제
			}

			if(result.size()==0){
				throw new NoResultException();
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