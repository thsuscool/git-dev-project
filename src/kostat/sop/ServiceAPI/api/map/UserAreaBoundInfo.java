package kostat.sop.ServiceAPI.api.map;

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

import kostat.sop.ServiceAPI.api.map.UserAreaBoundInfo;
import kostat.sop.ServiceAPI.api.map.UserAreaBoundInfo.MustParam;
import kostat.sop.ServiceAPI.api.map.UserAreaBoundInfo.OptionParam;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.controller.service.PublicDataService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class UserAreaBoundInfo extends AbsQuery<List> {
private static final Log logger = LogFactory.getLog(UserAreaBoundInfo.class);
	
	//대화형통계지도
	@Resource(name="mapService")
	private MapService mapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "5201";
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
		area,
		type,
		code
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

			Map mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String area = (String) mapParameter.get("area");		//사용자경계
			String type = (String) mapParameter.get("type");		//사용자경계 타입(circle, rectangle, polygon)
			String code = (String) mapParameter.get("code");		//경계줌레벨 코드(1:전국, 2:시도, 3:시군구, 4:읍면동, 5:집계구)
			String bnd_year = Properties.getDefult_bnd_year();		//조회 년도
			
			if (code.equals("1")) {
				throw new ApiException( "전국레벨에서는 사용자영역을 설정할 수 없습니다.");
			}
			
			if (type.equals("circle")) {
				area = area.toUpperCase().replace("CIRCLE(", "");
				area = area.replace(")", "");
				String circle_list[] = area.split(",");
				// 2017. 02. 27 개발팀 수정요청
				String tempVal = circle_list[1];
				Number roundVal = Float.parseFloat(tempVal);
				mapParameter.put("round", roundVal);
				mapParameter.put("area","POINT("+circle_list[0]+")");
			}
			
			
			mapParameter.put( "year", bnd_year );
			
			//임의 영역 반경 내 집계구경계
			result = mapService.selectUserAreaBoundInfo(mapParameter);
			
			
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
 