package kostat.sop.ServiceAPI.api.kosis;

import java.util.HashMap;
import java.util.Iterator;
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
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : j.h.Seok, 1.0, 2014/08/20  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : j.h.Seok
 * @version 1.0
 * @see
 * <p/>
 */
public class GetKosisAdmCode extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GetKosisAdmCode.class);
	private Map mKosisMapCode = new HashMap();
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "6005";
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
		org_id,
		tbl_id,
		adm_cd,
		base_year
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
			
			String orgId = (String) mapParameter.get(MustParam.org_id.name());
			String tblId = (String) mapParameter.get(MustParam.tbl_id.name());
			String admCd = (String) mapParameter.get(MustParam.adm_cd.name());
			String kosisDataYear = (String) mapParameter.get(MustParam.base_year.name());
			
			Map tempParam = new HashMap();
			String year = (String) kosisDataYear.substring(0, 4);
			if(Integer.parseInt(year) > 2013){
				year = "2013";
			}
			tempParam.put("gis_se", admCd + "%");
			tempParam.put("tbl_id", tblId);
			tempParam.put("base_year", year);
			tempParam.put("org_id", orgId);
			
			String returnValue = "00";
			List sgisCodes = null;
			if( admCd.length() == 2 ){
				sgisCodes = session.selectList("kosis_menu.getMatchSido", tempParam);
		    } else if( admCd.length() == 5 ) {
		    	sgisCodes = session.selectList("kosis_menu.getMatchSigungu", tempParam);
		    }
			
			if(sgisCodes != null && sgisCodes.size() > 0) {
				Map tempMap = new HashMap();
				tempMap = (Map) sgisCodes.get(0);
				returnValue = (String) tempMap.get("CODE");
			}
			
			Map resultTempMap = new HashMap();
			resultTempMap.put("kosis_adm_cd", returnValue);
			
			resultData.put("kosis_adm_cd", resultTempMap);
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