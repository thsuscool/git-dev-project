package kostat.sop.ServiceAPI.api.bizStats;

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
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class RegionalSpec extends AbsQuery<Map> {
private static final Log logger = LogFactory.getLog(RegionalSpec.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10010";
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
		adm_cd
		,data_type
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
		List result = null;
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			mapParameter.put("year", Properties.getDefult_bnd_year());
			result = session.selectList("bizStats.regionalSpec", mapParameter);
			
			if(result.size()==0){
				throw new NoResultException();
			}
			
			String data_type = (String) mapParameter.get("data_type");
			if(data_type.equals("10")){
				StringBuffer sb = new StringBuffer();
				sb.append("지역특성 : ");
				for(int i = 0 ;i < result.size(); i++){
					if(i!=0){
						sb.append(", ");
					}
					sb.append(result.get(i));
				}
				sb.append("대 인구비율 상위 5% 지역");
				resultData.put("text", sb.toString());
			}
			else if(data_type.equals("20")){
				StringBuffer sb = new StringBuffer();
				sb.append("지역특성 : ");
				for(int i = 0 ; i < result.size() ; i++){
					if(i != 0){
						sb.append(", ");
					}
					if(result.get(i).equals("A0")){
						sb.append("아파트");
					}else if(result.get(i).equals("A1")){
						sb.append("단독주택");
					}else if(result.get(i).equals("A2")){
						sb.append("연립/다세대");
					}else if(result.get(i).equals("A3")){
						sb.append("오피스텔");
					}else if(result.get(i).equals("A4")){
						sb.append("기숙사");
					}else if(result.get(i).equals("A9")){
						sb.append("기타");
					}
				}
				sb.append(" 비율 상위 5% 지역");
				resultData.put("text", sb.toString());
			}
			else if(data_type.equals("30")){
				StringBuffer sb = new StringBuffer();
				sb.append("지역특성 : ");
				for(int i = 0 ; i < result.size() ; i++){
					if(i != 0){
						sb.append(", ");
					}
					if(result.get(i).equals("B0")){
						sb.append("자가");
					}else if(result.get(i).equals("B1")){
						sb.append("전세");
					}else if(result.get(i).equals("B2")){
						sb.append("월세");
					}
				}
				sb.append(" 비율 상위 5% 지역");
				resultData.put("text", sb.toString());
			}
			else if(data_type.equals("40")){
				StringBuffer sb = new StringBuffer();
				sb.append("지역특성 : ");
				for(int i = 0 ; i < result.size() ; i++){
					if(i != 0){
						sb.append(", ");
					}
					sb.append(result.get(i));
				}
				sb.append(" 비율 상위 3% 지역");
				resultData.put("text", sb.toString());
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
