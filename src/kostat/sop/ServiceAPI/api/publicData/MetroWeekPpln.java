package kostat.sop.ServiceAPI.api.publicData;

import java.util.ArrayList;
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

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.PublicDataService;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
* 지하철 승하차 정보 (요일 평균) API
* <pre>
* input : MetroWeekPpln.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/11/25 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/11/25 메서드 추가
* @see None
*/

public class MetroWeekPpln extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(MetroWeekPpln.class);
	
	//공공데이터 관련 서비스
	@Resource(name="publicDataService")
	private PublicDataService publicDataService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "11004";
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
		subway_no
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
			
			//지하철 승차 인원 (요일 평균)
			mapParameter.put("inout_type", "1");
			List metroWeekOnList = publicDataService.selectMetroWeekPpln(mapParameter);
			
			//지하철 하차 인원 (요일 평균)
			mapParameter.put("inout_type", "2");
			List metroWeekOffList = publicDataService.selectMetroWeekPpln(mapParameter);

			//월~일요일
			List baseWeekList = new ArrayList();
			baseWeekList.add("일요일");
			baseWeekList.add("월요일");
			baseWeekList.add("화요일");
			baseWeekList.add("수요일");
			baseWeekList.add("목요일");
			baseWeekList.add("금요일");
			baseWeekList.add("토요일");
			
			List onList = new ArrayList();		//승차
			List offList = new ArrayList();		//하차
			for(int i = 0; i < baseWeekList.size(); i ++) {
				//승차인원
				String hour_psn_avg_on = "0";
				for(int x = 0; x < metroWeekOnList.size(); x ++) {
					Map weekMap = (Map) metroWeekOnList.get(x);
					
					if(baseWeekList.get(i).equals(weekMap.get("surv_dt"))) {
						hour_psn_avg_on = (String) weekMap.get("hour_psn_avg");
					}
				}
				
				//하차인원
				String hour_psn_avg_off = "0";
				for(int x = 0; x < metroWeekOffList.size(); x ++) {
					Map weekMap = (Map) metroWeekOffList.get(x);
					
					if(baseWeekList.get(i).equals(weekMap.get("surv_dt"))) {
						hour_psn_avg_off = (String) weekMap.get("hour_psn_avg");
					}
				}
				
				//월~일까지 승차 데이터 생성
				Map tmpOnObj = new HashMap();
				tmpOnObj.put("surv_dt", baseWeekList.get(i));
				tmpOnObj.put("hour_psn_avg", hour_psn_avg_on);
				onList.add(tmpOnObj);
				
				//월~일까지 하차 데이터 생성
				Map tmpOffObj = new HashMap();
				tmpOffObj.put("surv_dt", baseWeekList.get(i));
				tmpOffObj.put("hour_psn_avg", hour_psn_avg_off);
				offList.add(tmpOffObj);
			}
			
			resultData.put("weekOnList", onList);
			resultData.put("weekOffList", offList);
			
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