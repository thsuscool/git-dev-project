package kostat.sop.ServiceAPI.controller.view;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.BoardService;

/**
 * 1. 기능 : 게시판 & 소개화면 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/board")
public class BoardController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(BoardController.class);
	
	@Resource(name="boardService")
	private BoardService boardService;
	
	/**
	 * 알림마당
	 * @param request
	 * @param response
	 * @return board/sopBoardMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sopBoardMain")
	public ModelAndView sopBoardMain(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/sopBoardMain");
	}
	
	/**
	 * SGIS 소개
	 * @param request
	 * @param response
	 * @return board/sopIntro
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sopIntro")
	public ModelAndView sopIntro(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/sopIntro");
	}
	
	/**
	 * 설명과 공지
	 * @param request
	 * @param response
	 * @return board/expAndNotice
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/expAndNotice")
	public ModelAndView expAndNotice(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/expAndNotice");
	}
	
	/**
	 * 설명과 공지 (공지사항)
	 * @param request
	 * @param response
	 * @return board/expAndNotice/notice
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/expAndNotice/notice")
	public ModelAndView notice(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/expAndNotice", "type", "notice");
	}
	
	/**
	 * 설명과 공지 (공지사항-상세)
	 * @param request
	 * @param response
	 * @return board/expAndNoticeView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/expAndNoticeView")
	public ModelAndView noticeView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/expAndNoticeView", "type", "noticeView");
	}
	/**
	 * 설명과 공지 (통계용어 설명)
	 * @param request
	 * @param response
	 * @return board/expAndNotice/explain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/expAndNotice/explain")
	public ModelAndView explain(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/expAndNotice", "type", "explain");
	}
	
	/**
	 * 질문과 개선요청
	 * @param request
	 * @param response
	 * @return board/qnaAndRequest
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaAndRequest")
	public ModelAndView qnaAndRequest(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaAndRequest");
	}
	
	/**
	 * 질문과 개선요청 (FAQ)
	 * @param request
	 * @param response
	 * @return board/qnaAndRequest
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaAndRequest/faq")
	public ModelAndView faq(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaAndRequest", "type", "faq");
	}
	
	/**
	 * 질문과 개선요청 상세 (FAQ)
	 * @param request
	 * @param response
	 * @return board/faqView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/faqView", method=RequestMethod.GET)
	public ModelAndView faqView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/faqView", "type", "faqView");
	}
	/**
	 * 질문과 개선요청 상세 (Q&A)
	 * @param request
	 * @param response
	 * @return board/qnaView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaView", method=RequestMethod.GET)
	public ModelAndView qnaView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaView", "type", "qnaView");
	}
	/**
	 * 질문과 개선요청 작성 (Q&A)
	 * @param request
	 * @param response
	 * @return board/qnaWritet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaWrite", method=RequestMethod.GET)
	public ModelAndView qnaWrite(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaWrite", "type", "qnaWrite");
	}
	/**
	 * 질문과 개선요청 수정 (Q&A)
	 * @param request
	 * @param response
	 * @return board/qnaModify
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaModify", method=RequestMethod.GET)
	public ModelAndView qnaModify(HttpServletRequest request, HttpServletResponse response) {
		
		return new ModelAndView("board/qnaModify", "type", "qnaModify");
	}
	/**
	 * 질문과 개선요청 (QNA)
	 * @param request
	 * @param response
	 * @return board/qnaAndRequest
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaAndRequest/qna")
	public ModelAndView qna(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaAndRequest", "type", "qna");
	}
	
	/**
	 * 질문과 개선요청 (통계주제도 요청)
	 * @param request
	 * @param response
	 * @return board/qnaAndRequest
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaAndRequest/theme")
	public ModelAndView theme(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaAndRequest", "type", "theme");
	}
	/**
	 * 질문과 개선요청 작성 (통계주제도 요청- 글쓰기)
	 * @param request
	 * @param response
	 * @return board/qnaThemaWrite
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaThemaWrite", method=RequestMethod.GET)
	public ModelAndView qnaThemaWrite(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaThemaWrite", "type", "qnaThemaWrite");
	}
	/**
	 * 질문과 개선요청 작성 (통계주제도 요청- 수정)
	 * @param request
	 * @param response
	 * @return board/qnaThemaModify
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaThemaModify", method=RequestMethod.GET)
	public ModelAndView qnaThemaModify(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaThemaModify", "type", "qnaThemaModify");
	}
	/**
	 * 질문과 개선요청 작성 (통계주제도 요청- 상세)
	 * @param request
	 * @param response
	 * @return board/qnaThemaView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaThemaView")
	public ModelAndView qnaThemaView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/qnaThemaView", "type", "qnaThemaView");
	}
	/**
	 * 대화형 통계지도 소개
	 * @param request
	 * @param response
	 * @return board/sopInteractivemap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sopInteractivemap")
	public ModelAndView sopInteractivemap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/sopInteractivemap");
	}
	
	/**
	 * 창업통계맵 소개
	 * @param request
	 * @param response
	 * @return board/sopBizstatsmap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sopBizstatsmap")
	public ModelAndView sopBizstatsmap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/sopBizstatsmap");
	}
	
	/**
	 * 통계주제도 소개
	 * @param request
	 * @param response
	 * @return board/sopThemeticmap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sopThemeticmap")
	public ModelAndView sopThemeticmap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/sopThemeticmap");
	}
	
	/**
	 * 개발자지원 소개
	 * @param request
	 * @param response
	 * @return board/sopDeveloper
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sopDeveloper")
	public ModelAndView sopDeveloper(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/sopDeveloper");
	}
	
	/**
	 * 언론소개자료
	 * @param request
	 * @param response
	 * @return board/expAndNotice
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/mediaIntro")
	public ModelAndView mediaIntro(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/mediaIntro");
	}
	//mng_s 20171123_김건민
	/**
	 * 그리드 개선요청 작성(grid)
	 * @param request
	 * @param response
	 * @return board/gridWrite
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/gridWrite")
	public ModelAndView gridWrite(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("board/gridWrite");
	}
	//mng_e 20171123_김건민
}