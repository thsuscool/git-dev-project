package kostat.sop.ServiceAPI.common.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.common.util.TimeUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.ServerInternalException;


public abstract class AbsAuthAPI<T> extends AbsQuery<T> {
	private static final Log logger = LogFactory.getLog( AbsAuthAPI.class );

	protected HttpSession httpSession = null;

	
	/**
	 *  Class 에서 파라미터 가공 및 최적화 위한 함수
	 */
	abstract protected void optimizeParameterMap(Map mapParameter)
			throws ApiException; 

	@Override
	public void checkAuth(HttpServletRequest req, HttpServletResponse res)
			throws AbsException {
		
		// TODO Auto-generated method stub
		String accessToken = req.getHeader("accessToken");
		if(accessToken==null||accessToken.equals("")){
			throw new ApiException("Header accessToken check", COMM_ERR_CODE.AUTH_FAILE);
		}
		
		Map accessTokendata = new HashMap();
		accessTokendata.put("accessToken", accessToken);
		
		String regdate = (String) session.selectOne("auth.getAccessTokenData",accessTokendata);
		
		if(regdate==null||regdate.equals("")){
			throw new ApiException("인증 정보가 존재하지 않습니다", COMM_ERR_CODE.AUTH_FAILE);
		}
		
		long dbinserttime = 0; 
		dbinserttime = TimeUtil.getDateTime(regdate);
		long currentauthtime = System.currentTimeMillis();
		if((currentauthtime-dbinserttime)>600000){
			logger.debug((currentauthtime-dbinserttime)+" time out");
			session.delete("auth.deleteAccessToken", accessTokendata);
			throw new ApiException("커넥션 타임이 만료되었습니다. 다시 인증해 주세요.", COMM_ERR_CODE.TOKEN_TIME_OUT);
		}else{
			//accesstoken 만료기간 연장
			try {
				accessTokendata.put("regdate", TimeUtil.getTokenTimeStamp(currentauthtime));
			} catch (NullPointerException e) {
				// TODO Auto-generated catch block
				throw new ServerInternalException("server error");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new ServerInternalException("server error");
			}
			session.update("auth.updateAccessTokentime",accessTokendata);
		}
	}


	public void _checkNullParameterValue(Map mRequestMap) throws AbsException {
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
			try {
				value = (String) mRequestMap.get(key);
				len = value.length();
				if (len == 0) {
					removeKeyList.add(key);
				}
			} catch(AbsAPIException e) {
				// 2015-12-03 시큐어코딩
				logger.error(e);
				
				if(set != null) {
					set = null;
				}
				
				if(itr != null) {
					itr = null;
				}
			} catch (Exception e) {
				// parameter가 String 아니라면 예외가 발생 될 수도 있다.
				// 서비스엔 영향이 없으므로 예외만 찍고 넘어간다.
				// 2015-12-03 시큐어코딩
				logger.error(e);
				set = null;
				itr = null;
			}
		}

		int idx = removeKeyList.size();
		for (int i = 0; i < idx; i++) {
			mRequestMap.remove(removeKeyList.get(i));
		}
	}
	
}
