package kostat.sop.ServiceAPI.pyramid;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.bizStats.Houseprice;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
/**
* 피라미드 정보
* <pre>
* input : pyramid.json/xml
* output : json/xml
* Table : 
* </pre>
*
* <pre>
* <b></b>
* 이경현, 1.0, 2015/04/30 초기 작성
* </pre>
* 
* @author 이경현
* @version 1.0, 2015/0
* @see None
*/

public class PyramidInfo2 extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10100";
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
		return "pyramid.pyramid2";
	}
	
	enum MustParam
	{
		years,
		strType,
		gubun,
		code1,
		code2,
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		
		httpSession = req.getSession();
		
		List result = null;
		List result2 = new ArrayList();
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			Map mapParameter = getParameterMap(req);
			
			_checkNullParameterValue(mapParameter);

			if(mapParameter.get("gubun").equals("pyramid")){
				result = session.selectList(getQueryStr(), mapParameter);
				for(int i=0; i<result.size(); i++){
					//System.out.println(((Map)result.get(i)).get("ages")); //2017.12.04 [개발팀] 시큐어코딩
					if("100세이상".equals(((Map)result.get(i)).get("ages"))){
						//System.out.println("in 100세 이상"); //2017.12.04 [개발팀] 시큐어코딩
						result2.add(result.get(i));
						//System.out.println("in error Yn yesyes"); //2017.12.04 [개발팀] 시큐어코딩
					}
				}
				for(int i=0; i<result.size(); i++){
					if(!"100세이상".equals(((Map)result.get(i)).get("ages"))){
						result2.add(result.get(i));
					}
				}
			}else{
				result2 = session.selectList(getQueryStr(), mapParameter);
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
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.");
		}
		return result2;
	}
}

