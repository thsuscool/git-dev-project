package kostat.sop.ServiceAPI.api.bizStats;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 영역내 지하철승하차 정보제공 API
* Boundary 경계내에 포함되는 지하철승하차 정보조회
* <pre>
* input : poietcmetroppln.json/xml
* output : json/xml
* Table : SOD_SUBWAY_INOUT_INFO
* </pre>
*
* <pre>
* <b>History:</b>
* 나재웅, 1.0, 2015/01/20 초기 작성
* </pre>
* 
* @author 나재웅
* @version 1.0, 2015/01/20 메서드 추가
* @see None
*/

public class PoiEtcMetroPpln extends AbsQuery<List> {
	private static final Log logger = LogFactory.getLog(Houseprice.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10014";
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
		return "bizStats.poietcmetroppln";
	}
	
	enum MustParam
	{
		minx,
		miny,
		maxx,
		maxy
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		List result = new ArrayList<>();
		List resultdata = null;
		List resultarray =null;
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			//지역 지하철 이름 정보 리스트
			resultarray = session.selectList("bizStats.poietcmetrolist", mapParameter);
			//지역 지하철 승하차 정보 리스트
			resultdata = session.selectList(getQueryStr(), mapParameter);
			
			//지하철 이름갯수만큼 돈다
			for(int i = 0 ; i< resultarray.size() ; i++){
				//지하철 이름 갯수를 하나 빼온다 ex)왕십리
				String station_nm =(String) resultarray.get(i);
				//해당 역 정보가 들어갈 list를 하나 만든다 이때 리스트는 무조건 2개가 필요하다
				List resultlist = new ArrayList<>(); 
				for(int j = 0 ; j< resultdata.size() ; j++){
					//지하철 승하차 정보 리스트를 하나씩 가져와 조회한다
					Map resultdatamap = (Map) resultdata.get(j);
					//그 와중에 이름이 같은 정보가 있으면 list에 저장한다.
					//여기서 리스트가 하나일 때 문제 발생!!
					if(station_nm.equals((String)resultdatamap.get("station_nm"))){
						resultlist.add(resultdatamap);
					}
				}
				
				//만약 지하철 역정보의 리스트가 하나이면?
				if(resultlist.size()==1){
					//없는 승하차 역정보에 필요한 데이타를 하나씩 때려 박고 숫자도 1이나 2로 바꿔주고 0넣고 리턴!
					Map metroinfo = (Map) resultlist.get(0);
					
					//역정보를 하나 더 저장할 Map을 하나 더 만든다
					Map temp_metroinfo = new HashMap();
					
					Iterator<String> keys = metroinfo.keySet().iterator();
					while(keys.hasNext()){
						
						String key = keys.next();
						if(key.equals("sido_nm")||key.equals("station_nm")||key.equals("x")||key.equals("y")){
							temp_metroinfo.put(key, metroinfo.get(key));
							
						}else if(key.equals("inout_type")){
							if(metroinfo.get(key).equals("1")){
								temp_metroinfo.put(key, "2");
							}else{
								temp_metroinfo.put(key, "1");
							}
						}else{
							temp_metroinfo.put(key, "0");
						}
					}
					resultlist.add(temp_metroinfo);
				}
				
				result.add(resultlist);
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
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}
}
