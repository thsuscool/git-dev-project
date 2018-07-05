package kostat.sop.ServiceAPI.api.bizStats;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
* 영역내 중소기업상권 경계 제공 API
* Boundary 경계내에 포함되는 중소기업상권 정보 조회
* <pre>
* input : Tradearea.json/xml
* output : json/xml
* Table : SRV_DT_BUSCOMMER
* </pre>
*
* <pre>
* <b>History:</b>
* 나재웅, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 나재웅
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Tradearea extends AbsQuery<List> {
	
	private static final Log logger = LogFactory.getLog(Tradearea.class);
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10007";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
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
			
			String strFormat =_getViewType(req,res);
			
			String minx = (String) mapParameter.get("minx");
			String miny = (String) mapParameter.get("miny");
			String maxx = (String) mapParameter.get("maxx");
			String maxy = (String) mapParameter.get("maxy");
			
			if(!(strFormat.equals("geojson")||strFormat.equals("kml"))){
				throw new ApiException("Not Support Format[" + strFormat + "]");
			}
			
			String area="rectangle("+minx+" "+miny+", "+maxx+" "+maxy+")";
			mapParameter.put("area", area);
			result = session.selectList("bizStats.tradearea", mapParameter);
			if(result.size()==0){
				throw new NoResultException();
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");

			if (logger.isDebugEnabled()) {
				logger.debug("[ result = " + result + " ]");
			}
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

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return "boundary.tradearea";
	}
	
	enum MustParam
	{
		minx,
		miny,
		maxx,
		maxy
	}
}
