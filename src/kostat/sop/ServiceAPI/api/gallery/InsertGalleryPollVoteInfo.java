package kostat.sop.ServiceAPI.api.gallery;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.gallery.InsertGalleryLikeInfo.MustParam;
import kostat.sop.ServiceAPI.api.gallery.InsertGalleryLikeInfo.OptionParam;
import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.GalleryService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

@SuppressWarnings("rawtypes")
public class InsertGalleryPollVoteInfo extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GalleryListAll.class);
	
	@Resource(name="galleryService")
	private GalleryService galleryService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13005";
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
		survey_surv_id,
		data_id,
		ans_serial
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
				
		
			String login_id = httpSession.getAttribute("member_id")==null?null:httpSession.getAttribute("member_id").toString();
//TODO login_id 고정값 삭제
			
///////////////////////////////			
			if(login_id == null){
				throw new ApiException("로그인한 사용자만 사용할 수 있습니다");
			}
			mapParameter.put("member_id", login_id);
			//설문조사 투표
			int resultCnt = galleryService.insertGalleryPollVoteInfo(mapParameter);
			
			resultData.put("resultCnt", resultCnt);
			
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