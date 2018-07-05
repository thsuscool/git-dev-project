package kostat.sop.ServiceAPI.pyramid;

import java.util.List;

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

public class PyramidSidoData extends AbsQuery<List> {
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
		return "pyramid.pyramidSidoData";
	}
	
	enum MustParam
	{
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
		try {
			
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			
			result = session.selectList(getQueryStr());
			
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
		return result;
	}
}

