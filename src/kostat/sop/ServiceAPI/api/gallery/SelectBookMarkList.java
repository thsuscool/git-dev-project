package kostat.sop.ServiceAPI.api.gallery;

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
import kostat.sop.ServiceAPI.controller.service.GalleryService;

public class SelectBookMarkList extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(SelectBookMarkList.class);
	
	@Resource(name = "galleryService")
	private GalleryService galleryService;
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13008";
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
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		// 2016.12.02 시큐어코딩 삭제
		httpSession = req.getSession();
		List resultList = new ArrayList();
		Map result = new HashMap();
		
		try{
			// 2016.12.02 시큐어코딩 삭제
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			mapParameter.put("member_id",(String)httpSession.getAttribute("member_id"));
			int count = galleryService.selectBookMarkListCount(mapParameter);
			//즐겨찾기 개수 카운트 
			if(mapParameter.get("page_num") != null){
				if(!mapParameter.get("page_num").toString().equals("")){
					int pageNum = Integer.parseInt(mapParameter.get("page_num").toString());
					int pageSize = 9;
					
					int pageCount = (int)Math.ceil((double)count/(double)5);
					int startPage = (pageNum-1)/pageSize * pageSize + 1;
					int endPage = startPage + pageSize -1;
					if(endPage > pageCount){
						endPage = pageCount;
					}
					int startRow = ((pageNum -1) * pageSize)+1;
					int endRow = startRow + pageSize -1;
					
					mapParameter.put("startRow", Integer.toString(startRow));
					mapParameter.put("endRow", Integer.toString(endRow));
				}
			}
			
			
			
			resultList = galleryService.selectBookMarkList(mapParameter);
			result.put("resultList", resultList);
			result.put("totalCount", count);
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{}
	enum OptionParam{
		page_num,
		searchWord,
	}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
