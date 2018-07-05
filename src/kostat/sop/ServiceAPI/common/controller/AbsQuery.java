package kostat.sop.ServiceAPI.common.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.AbsHttpException;
import com.neighborsystem.durian.exception.DatabaseException;
import com.neighborsystem.durian.restapi.api.AbsAPI;
import com.neighborsystem.durian.restapi.api.CommonTag;
import com.neighborsystem.durian.restapi.api.DurianMV;
import com.neighborsystem.durian.restapi.model.NFData;


public abstract class AbsQuery<T> extends AbsAPI<T> {
	private static final Log logger = LogFactory.getLog( AbsQuery.class );
	
	private static final String perpertyPath = "/globals.properties";
	private static final String[] allowExtension = {
																 "jpg",
																 "jpeg",
																 "bmp",
																 "png",
																 "gif",
																 "zip",
																 "hwp",
																 "xls",
																 "xlsx",
																 "ppt",
																 "pptx",
																 "doc",
																 "docx",
																 "csv",
																 "pdf"
																	};
	
	private SqlSessionFactory sqlSessionFactory = null;
	
	protected HttpSession httpSession = null;
	
	protected SqlSession session;
	
	public void setSqlSession(SqlSession session) {
		this.session = session;
	}
	
	/**
	 * globals.properties의 위치를 얻는다. 
	 * 
	 * @return perpertyPath 를 위한 String
	 */
	public String getPerpertyPath() {
		return perpertyPath;
	}
	
	/**
	 * 허용가능한 확장자를 얻는다. 
	 * 
	 * @return allowExtension 를 위한 String
	 */
	public String[] getAllowExtension() {
		return allowExtension;
	}
	
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory를 설정한다. 
	 */
	public void setSqlSessionFactory(SqlSessionFactory factory) {
		sqlSessionFactory = factory;
	}
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory 를 얻는다.
	 * 
	 * @return sqlSessionFactory DB 세션을 위한 Factory Object
	 */
	public SqlSessionFactory getSqlSessionFactory() {
		return sqlSessionFactory;
	}
	
	abstract protected String getQueryStr(); // 쿼리 ID 를 가져 온다.
	
	protected void sessionRollback(SqlSession sqlsession)
			throws DatabaseException {

		try {
			if (!sqlsession.getConnection().getAutoCommit()) {
				try {
					sqlsession.getConnection().rollback();
				} catch (SQLException e) {
					logger.error(e);
					throw new DatabaseException("Database Rollback Exception.");
				}
			}
		} catch (SQLException e) {
			logger.error(e);
			throw new DatabaseException(e.getMessage());
		}
	}
	public void _checkNullParameterValue(Map mRequestMap) throws ApiException {
		if (mRequestMap == null)
			return;
		Set<String> set = mRequestMap.keySet();
		Iterator<String> itr = set.iterator();

		List removeKeyList = new ArrayList();
		String key = null;
		String value = null;
		int count = 0, len = 0;
		while (itr.hasNext()) {
			key = itr.next();
			value = (String) mRequestMap.get(key);
			len = value.length();
			if (len == 0) {
				removeKeyList.add(key);
			}
//			try {
//				value = (String) mRequestMap.get(key);
//				len = value.length();
//				if (len == 0) {
//					removeKeyList.add(key);
//				}
//			} catch (Exception e) {
//				// parameter가 String 아니라면 예외가 발생 될 수도 있다.
//				// 서비스엔 영향이 없으므로 예외만 찍고 넘어간다.
//				logger.error(e);
//			}
		}

		int idx = removeKeyList.size();
		for (int i = 0; i < idx; i++) {
			mRequestMap.remove(removeKeyList.get(i));
		}
	}
	
	
	/**
	 * 실제 API 구현 로직 담당, serlvet에서 호출시 이 함수를 호출해준다.
	 * @param req 클라이언트 요청 정보를 담은 객체
	 * @param res 서버측의 응답을 담을 객체
	 * @throws Exception 
	 */
	@Override
	public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse res) throws Exception {
		NFData datas = null;
		String strFormat = "json";
		String strTrId = null;
		Map paramsMap = null;
		String headerKey = "";
		
		try {
			datas = new NFData();
			
			datas.put(CommonTag.id.name(), this.getApiId());

			// API 고유번호를 할당한다.
			strTrId = createTrID(req);
			datas.put(CommonTag.trId.name(), strTrId);

			logger.info("START - TrID[" + strTrId + "] API[" + this.getApiId() + "]");
			
			paramsMap = req.getParameterMap();

			// 클라이언트에게 응답할 형식을 찾아낸다.
			strFormat = _getViewType(req, res);

			// http Method를 검사한다.
			checkHttpMethod(req.getMethod());

			// http header 점검한다.
			checkHttpHeader(req, res, datas);

			// 필수 입력 파라미터를 점검한다.
			checkMustParam(paramsMap);

			// 정의되지 않은 파라미터 입력 여부를 점검한다.
			checkUndefineParameter(paramsMap);

			// 입력된 파라미터에 null이 존재하는지 검사한다.
			checkNullParameterValue(paramsMap);

			// 인증 처리 부분을 검사한다.
			checkAuth(req, res);

			// API 공유의 기능을 수행한다.
			prepareExecute(req, res);
			datas.put(CommonTag.errCd.name(), 0);
			datas.put(CommonTag.errMsg.name(), "Success");
			
			//보안 타임스탬프 추가
			datas.put("ts", req.getHeader("ts"));
			
			T resultObj = executeAPI(req, res, strTrId);
			if (resultObj != null) {
				datas.put(CommonTag.result.name(), resultObj);
			}
			
			successExecute(req, res, datas);
		}
		catch (AbsAPIException e) {
			failExecute(req, res, datas);
			makeError(datas, e);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "] [" + e.getErrCode() + "] [" + e.getErrMessage() + "]");
			return new DurianMV(strFormat, datas);
		}
		catch (AbsHttpException e) {
			failExecute(req, res, datas);
			logger.error("ERROR- TrID[" + strTrId + "] [" + datas.get(CommonTag.id.name()) + "] [" + e.getMessage() + "]");
			throw e;
		}
		finally {
			//sha256으로 헤더키를 생성한다.
			headerKey = "timeStamp:" + req.getHeader("ts") + ";errCd:" + datas.get(CommonTag.errCd.name()) + ";trId:" + datas.get(CommonTag.trId.name()) + ";";
			res.setHeader("headerKey", Security.toSHA256(headerKey));
			afterExecute(req, res);
			logger.info("END - TrID[" + strTrId + "] API[" + this.getApiId() + "]");
		}
		// ----------------------------------------------------------

		return new DurianMV(strFormat, datas);
	}

	public void userareackeck(Map mapParameter) throws AbsException {
		String area = (String) mapParameter.get("area");
		if(area == null){
			throw new ApiException("좌표데이터를 입력하세요", COMM_ERR_CODE.ERR_PARAM);
		}
		String area_kind = null;
		String round = null;
		
		
		
		if(area.toUpperCase().contains("CIRCLE")){
//			SqlSession session = Properties.getSqlSessionFactory().openSession();
			area_kind="POINT";
			area = area.toUpperCase().replace("CIRCLE(", "");
			area = area.replace(")", "");
			
			String circle_list[] = area.split(",");
			
			mapParameter.put("round", circle_list[1]);
			mapParameter.put("area","POINT("+circle_list[0]+")");
			
			round = (String) session.selectOne("bizStats.cercleuserareacheck", mapParameter);
//			session.close();
//			logger.info("area size : "+round);
		}else if(area.toUpperCase().contains("RECTANGLE")){
//			SqlSession session = Properties.getSqlSessionFactory().openSession();
			area_kind="RECTANGLE";
			round = (String) session.selectOne("bizStats.rectuserareacheck", mapParameter);
//			session.close();
//			logger.info("area size : "+round);
		}else if(area.toUpperCase().contains("POLYGON")){
//			SqlSession session = Properties.getSqlSessionFactory().openSession();
			area_kind="POLYGON";
			round = (String) session.selectOne("bizStats.polygonuserareacheck", mapParameter);
//			session.close();
//			logger.info("area size : "+round);
		}else if(area.toUpperCase().contains("LINE")){
			
			area_kind="LINE";
			area = area.replace("LINE(", "");
			String circle_list[] = area.split("\\),");
			round="50000";
			if(circle_list.length==2){
				mapParameter.put("area","linestring"+circle_list[0]+")");
				area = circle_list[1].replace(")", "");
			}else{
				throw new ApiException("좌표데이터를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
			circle_list=null;
			circle_list = area.split(",");
			
			if(circle_list.length==2){
				String data_round=circle_list[0];
				String direction=circle_list[1];
				
				if(!StringUtil.NumberChk(data_round)){
					throw new ApiException("round는 1부터 100까지의 정수형만 가능합니다.", COMM_ERR_CODE.ERR_PARAM);
				}
				if(1>Integer.parseInt(data_round)||100<Integer.parseInt(data_round)){
					throw new ApiException("round는 1부터 100까지의 정수형만 가능합니다.", COMM_ERR_CODE.ERR_PARAM);
				}
				if(!(direction.equals("both")||direction.equals("left")||direction.equals("right"))){
					throw new ApiException("방향설정은 left/right/both만 가능합니다.", COMM_ERR_CODE.ERR_PARAM);
				}
				
				mapParameter.put("round", data_round);
				mapParameter.put("direction", direction);
			}else{
				throw new ApiException("좌표데이터를 확인해주세요", COMM_ERR_CODE.ERR_PARAM);
			}
//			logger.info("area size : "+round);
		}else{
			throw new ApiException("좌표데이터를 입력하세요", COMM_ERR_CODE.ERR_PARAM);
		}
		
		if(Double.valueOf(round)>80000000){
			throw new ApiException("영역 사이즈가 기준보다 큽니다", COMM_ERR_CODE.ERR_PARAM);
		}
		
		if(Double.valueOf(round)<20000){
			throw new ApiException("영역 사이즈가 기준보다 작습니다", COMM_ERR_CODE.ERR_PARAM);
		}
		
		mapParameter.put("area_kind", area_kind);
	}

}