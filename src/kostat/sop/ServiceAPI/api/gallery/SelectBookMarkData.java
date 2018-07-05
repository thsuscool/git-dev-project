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

public class SelectBookMarkData extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(SelectBookMarkData.class);
	
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
		Map result = new HashMap();
		
		try{
			// 2016.12.02 시큐어코딩 삭제
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");
			Map mapParameter = getParameterMap(req);
			
			String id = (String)httpSession.getAttribute("member_id");
			
			
			result.put("bookMarkData", galleryService.selectBookMarkData(mapParameter));
			
		}catch(AbsAPIException e){
			logger.error(e);
		}
		return result;
	}
	
	enum MustParam{hist_id}
	enum OptionParam{}
	@Override
	protected String getQueryStr() {
		// TODO Auto-generated method stub
		return null;
	}

}
