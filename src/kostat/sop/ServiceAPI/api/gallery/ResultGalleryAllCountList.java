package kostat.sop.ServiceAPI.api.gallery;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.GalleryService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

@SuppressWarnings("rawtypes")
public class ResultGalleryAllCountList extends AbsQuery<Map> {
private static final Log logger = LogFactory.getLog(ResultGalleryAllCountList.class);
	
	@Resource(name="galleryService")
	private GalleryService galleryService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13012";
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
		page_num
	}
	
	enum OptionParam
	{
		srv_type,
		searchType,
		searchWord,
		orderType
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
			
			//갤러리 리스트 총 개수
			int totalCount = galleryService.selectGalleryListTotalCntResult(mapParameter);
			resultData.put("totalCount", totalCount);
			String index = (String) mapParameter.get( "page_num" );
			int pageSize = 9;
			int pageNum = Integer.parseInt(index);
			int count = totalCount;
			int pageCount = (int) Math.ceil((double)count/(double)5);
			int startPage = (pageNum-1)/pageSize * pageSize+1;
			int endPage = startPage + pageSize -1;
			
			if(endPage > pageCount){
				endPage = pageCount;
			}
			
			int startRow = ((pageNum -1) * pageSize)+1;
			int endRow = startRow + pageSize -1;
			
			mapParameter.put("startRow", Integer.toString(startRow));
			mapParameter.put("endRow", Integer.toString(endRow));
			
			
			List list = galleryService.selectGalleryListResult(mapParameter);
			resultData.put("list", list);
			if(list.size()==0){
				throw new NoResultException();
			}
			
			//갤러리 리스트
			/*List list = galleryService.selectGalleryList(mapParameter);
			resultData.put("list", list);*/
			
			//사용자 명
			/*String member_nm = httpSession.getAttribute("member_nm")==null?null:httpSession.getAttribute("member_nm").toString();
			resultData.put("memberNm", member_nm);*/
			
			/*if(list.size()==0){
				throw new NoResultException();
			}*/
			
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