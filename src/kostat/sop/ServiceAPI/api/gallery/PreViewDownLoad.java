package kostat.sop.ServiceAPI.api.gallery;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.GalleryService;
import kostat.sop.ServiceAPI.exception.ApiException;


@SuppressWarnings("rawtypes")
public class PreViewDownLoad extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(PreViewDownLoad.class);
	@Resource(name="galleryService")
	private GalleryService galleryService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13000";
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
		preViewDownLoad
	}
	
	enum OptionParam
	{
		
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
			//System.out.println(mapParameter); //2017.12.04 [개발팀] 시큐어코딩
			String data = mapParameter.get("preViewDownLoad").toString();

			
			data = data.replaceAll("data:image/png;base64,", "");
	        byte[] file = Base64.decodeBase64(data);
	        ByteArrayInputStream is = new ByteArrayInputStream(file);
	       // System.out.println("문제없음"); //2017.12.04 [개발팀] 시큐어코딩
	        res.setContentType("image/png");      
	        res.setHeader("Content-Disposition", "attachment; filename=data.png"); 
	        IOUtils.copy(is, res.getOutputStream());
	        res.flushBuffer();
	        
	        /*OutputStream out = res.getOutputStream();
	        out.write(file);
	        out.flush();
	        out.close();*/
	        
	        
	       /* String str = data;
	        byte decode[] = Base64.decodeBase64(str);
			res.setContentType("application/file; charset=UTF-8");
			res.setHeader("Content-Disposition", "attachment; filename=\"" + "save.png" + "\";");
	        res.setHeader("Content-Transfer-Encoding", "binary");       
	            
			OutputStream out = res.getOutputStream();
	        out.write(decode);
	        out.flush();
	        out.close();*/
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
