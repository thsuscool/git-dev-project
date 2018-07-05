package kostat.sop.ServiceAPI.api.honam;

import java.util.ArrayList;
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
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 호남청 담당자가 조사할 주소 조회 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2015/05/19  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class AddressInfoList extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(AddressInfoList.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "90001";
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
		person_id,
		category2
	}
	
	enum OptionParam
	{	
	}
	
	@SuppressWarnings("unchecked")
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
			
			List addressList = new ArrayList();
			//String[] persons = mapParameter.get("person").toString().split(",");
			
			Map<String, Object> params = getParameterMap(req);
			
			//카테고리2로 카테고리1을 조회
			String category1 = (String) session.selectOne("honam.officeToCategory1", mapParameter);
			mapParameter.put("category1", category1);
			
			String person_id = (String) params.get(MustParam.person_id.name());
			mapParameter.put("person_id", person_id);
			List dataList = session.selectList("honam.societyInfoList", mapParameter);
			addressList.add(dataList);
			
			resultData.put(person_id, addressList);
			
			
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