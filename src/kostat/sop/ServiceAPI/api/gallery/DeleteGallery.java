package kostat.sop.ServiceAPI.api.gallery;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.gallery.DeleteGalleryLikeInfo.MustParam;
import kostat.sop.ServiceAPI.api.gallery.DeleteGalleryLikeInfo.OptionParam;
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
public class DeleteGallery extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GalleryListAll.class);
	
	@Resource(name="galleryService")
	private GalleryService galleryService;
	
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "13007";
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
		dataIdList
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
			login_id = login_id;
///////////////////////////////			
			if(login_id == null){
				throw new ApiException("로그인한 사용자만 사용할 수 있습니다");
			}
			mapParameter.put("member_id", login_id);
			
			String[] dataIdListArr;
		    // 콜론(,)으로 구분된 문자열 분해
		    String dataIdList = (String) mapParameter.get("dataIdList");
		    dataIdListArr = dataIdList.split(",");
		
			for (String dataId : dataIdListArr) {
				Map mapParam = new HashMap(); 
				mapParam.put("data_id", dataId);
				mapParam.put("member_id", login_id); //2017.03.28
				
				//설문조사 참여자 삭제
				galleryService.deleteGalleryPollVoteInfo(mapParam);
				//설문조사 문항 상세 삭제
				galleryService.deleteGalleryPollDetail(mapParam);
				//설문조사 문항 삭제
				galleryService.deleteGalleryPoll(mapParam);
				//통계갤러리 데이터 추천 회원정보 삭제
				galleryService.deleteGalleryLikeInfo(mapParam);
				//이미지 아이콘 리스트 삭제
				galleryService.deleteGalleryImgIconList(mapParam);
				//통계갤러리 이미지 리스트 삭제
				galleryService.deleteGalleryImgList(mapParam);
				//댓글 리스트 삭제
				galleryService.deleteReply(mapParam);
				//통계 갤러리 데이터 리스트 삭제
				galleryService.deleteGallery(mapParam);
				//수집갤러리 삭제
				//2017.03.28 - 갤러리 삭제 시, 수집갤러리도 삭제
				galleryService.deleteGalleryMyGallery(mapParam);
				
			}
//TODO 결과값 리턴?			
//			resultData.put("resultCnt", resultCnt);
			
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