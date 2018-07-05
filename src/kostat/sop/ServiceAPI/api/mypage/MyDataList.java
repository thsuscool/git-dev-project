package kostat.sop.ServiceAPI.api.mypage;

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
import kostat.sop.ServiceAPI.controller.service.MypageService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.AuthFailedException;
import kostat.sop.ServiceAPI.exception.NoResultException;

@SuppressWarnings("rawtypes")
public class MyDataList extends AbsQuery<Map> {
private static final Log logger = LogFactory.getLog(MyDataList.class);
	
	@Resource(name="mypageService")
	private MypageService mypageService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "12005";
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
	}
	
	enum OptionParam
	{
		pageNum,
		resultCount
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

			String pageNum = "1";
			String resultCount = "5";
			
			if(mapParameter.get("resultCount") == null){
				mapParameter.put("resultCount",resultCount);
			}
			
			if(mapParameter.get("pageNum") == null){
				mapParameter.put("pageNum",pageNum);
			}
			
			String member_id = (String)httpSession.getAttribute("member_id");
			if(member_id == null){
				throw new AuthFailedException();
			}
			mapParameter.put("usr_id", member_id);
			
			//나의 데이터 총 개수
			int totalcount = mypageService.myDataTotalCount(mapParameter);
			resultData.put("totalcount", totalcount);
			
			String index = (String) mapParameter.get( "pageNum" );
			int page = Integer.parseInt(index);
			int count = totalcount;
			int pageCount = (int) Math.ceil((double)count/(double)5);
			int startPage = (page-1)/5 * 5+1;
			int endPage = startPage + 5 -1;
			
			if(endPage > pageCount){
				endPage = pageCount;
			}
			
			int startRow = ((page -1) *5)+1;
			int endRow = startRow + 5 -1;
			
			mapParameter.put("startRow", Integer.toString(startRow));
			mapParameter.put("endRow", Integer.toString(endRow));
			
			//나의 데이터 리스트
			List list = mypageService.selectMyDataList(mapParameter);
			resultData.put("list", list);
			
			if(list.size()==0){
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