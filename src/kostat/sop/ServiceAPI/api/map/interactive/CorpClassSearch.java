package kostat.sop.ServiceAPI.api.map.interactive;

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
import kostat.sop.ServiceAPI.controller.service.MapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
 * 1. 기능 : 산업분류 검색 클래스.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2015/12/18  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
@SuppressWarnings("rawtypes")
public class CorpClassSearch extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(CorpClassSearch.class);
	
	//대화형통계지도
	@Resource(name="mapService")
	private MapService mapService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "5002";
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
		searchword, class_deg
	}
	
	enum OptionParam
	{
		pagenum, resultcount, accessToken
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
			
			String resultcount = "5";
			String pagenum = "0";
			
			if( (String) mapParameter.get( "pagenum" ) == null ) {
				mapParameter.put( "pagenum", pagenum );
			} else if( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) < 0 ) {
				throw new ApiException( "페이지 번호를 확인해주세요");
			}
			
			// 최소 1에서 50까지 설정 가능 Default는 5
			if( mapParameter.get( "resultcount" ) == null ) {
				mapParameter.put( "resultcount", resultcount );
			} else if( Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) < 1 || Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) > 50 ) {
				throw new ApiException( "최대 결과수를 확인해주세요" );
			}

			int intStartNum = ( Integer.parseInt( (String) mapParameter.get( "pagenum" ) ) * Integer.parseInt( (String) mapParameter.get( "resultcount" ) ) ) + 1;
			mapParameter.put( "startnum", "" + intStartNum );
			mapParameter.put( "endnum", (String) mapParameter.get( "resultcount" ) );
			
			//산업분류 검색 (페이징)
			List dataList = mapService.selectCorpClassSearch(mapParameter);
			//산업분류 검색 총개수
			int totalcount = mapService.getCorpClassCount(mapParameter);
			
			//검색결과가 없을 경우
			if(dataList.size()==0){
				throw new NoResultException();
			}
			
			resultData.put("dataList", dataList);
			resultData.put("totalcount", totalcount);
			
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