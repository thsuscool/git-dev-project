package kostat.sop.ServiceAPI.api.publicData;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.PublicDataService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 시군구 평균 학생 정보 API
* <pre>
* input : sggSchoolAvg.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/11/24 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/11/24 메서드 추가
* @see None
*/

public class SggSchoolAvg extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(SggSchoolAvg.class);
	
	//공공데이터 관련 서비스
	@Resource(name="publicDataService")
	private PublicDataService publicDataService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "11002";
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
		tot_reg_cd,
		data_year,
		bnd_year,
		elsm
	}
	
	enum OptionParam
	{
	}
	
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
			
			//시군구 평균 학생,교사
			Map sggAvg = publicDataService.getSggSchoolAvg(mapParameter);
			resultData.put("sggAvg", sggAvg);
			
			//시군구 학교별 평균 학생,교사
			List sggGroupAvg = publicDataService.getSggSchoolGroupAvg(mapParameter);
			resultData.put("sggGroupAvg", sggGroupAvg);
			
			if(sggAvg == null || sggGroupAvg.size()==0){
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
		return resultData;
	}
}