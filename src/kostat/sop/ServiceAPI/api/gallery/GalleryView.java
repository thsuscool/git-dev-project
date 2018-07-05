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
public class GalleryView extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(GalleryListAll.class);
		
		@Resource(name="galleryService")
		private GalleryService galleryService;
		
		@Override
		public String getApiId() {
			// TODO Auto-generated method stub
			return "13001";
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
			data_id
		}
		
		enum OptionParam
		{
			viewPlus
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
				
				//2017.08.31 member_id null값일때 빈값
				String login_id = httpSession.getAttribute("member_id")==null?" ":httpSession.getAttribute("member_id").toString();
//TODO login_id 고정값 삭제
			
///////////////////////////////			
//				if(login_id == null){
//					throw new ApiException("로그인한 사용자만 사용할 수 있습니다");
//				}
				mapParameter.put("member_id", login_id);
				//viewPlus가 ture일 경우
				//갤러리 조회수 hit 증가
				if(req.getParameter("viewPlus") !=null){
					galleryService.updateGalleryHit(req.getParameter("data_id"));
				}
				//갤러리 이미지 조회
				List galleryImgList = galleryService.selectGalleryImg(mapParameter);
				resultData.put("galleryImgList", galleryImgList);
				
				//설문조사 상세조회
				List galleryPollDetailList = galleryService.selectGalleryPollDetailList(mapParameter);
				resultData.put("galleryPollDetailList", galleryPollDetailList);
				
				//갤러리 조회
				HashMap<String, String> gallery = galleryService.selectGallery(mapParameter);
				resultData.put("gallery", gallery);
				
				//갤러리 댓글 리스트
				List galleryReplyList = galleryService.selectGalleryReplyList(mapParameter);
				resultData.put("galleryReplyList", galleryReplyList);
				//System.out.println("login_id = " + login_id); //2017.12.04 [개발팀] 시큐어코딩
				if(login_id != null ){
					resultData.put("viewMember", login_id);
				}else{
					resultData.put("viewMember", "");
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
