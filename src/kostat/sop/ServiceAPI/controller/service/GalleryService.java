package kostat.sop.ServiceAPI.controller.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.parser.ParseException;

public interface GalleryService {

	/**
	 * @Class Name : GalleryService.java
	 * @Description : GalleryService Class
	 * @
	 * @  수정일      수정자              수정내용
	 * @ ---------   ---------   -------------------------------
	 * @ 2016.08.17           최초생성
	 *
	 * @author SGIS+ 개발팀
	 * @since 2016. 08.17
	 * @version 1.0
	 * @see
	 *
	 *  Copyright (C) by NeighborSystem All right reserved.
	 */
	
	/**
	 * selectGalleryList
	 * 갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryList(Map mapParameter);
	
	/**
	 * selectGalleryListMyGallery
	 * 갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryListMyGallery(Map mapParameter);
	
	
	/**
	 * selectGalleryListResult
	 * (일반)갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryListResult(Map mapParameter);
	
	
	/**
	 * selectGalleryListTotalCnt
	 * 갤러리 목록 개수 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryListTotalCnt(Map mapParameter);
	
	/**
	 * selectMyGalleryListTotalCnt
	 * 수집 갤러리 목록 개수 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectMyGalleryListTotalCnt(Map mapParameter);
	
	
	
	/**
	 * selectGalleryListTotalCntResult
	 * @param Map
	 * @exception Exception 일반 조회 총계
	 */
	public int selectGalleryListTotalCntResult(Map mapParameter);
	/**
	 * selectGallery
	 * 갤러리 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public HashMap<String, String> selectGallery(Map mapParameter);
	
	/**
	 * selectGalleryPollDetailList
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryPollDetailList(Map mapParameter);
	
	/**
	 * selectGalleryImg
	 * 갤러리 이미지 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImg(Map mapParameter);
	
	/**
	 * selectGalleryImgIconList
	 * imgIcon 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	
	/**selectGalleryImgIconListAll
	 * 해당 갤러리의 모든 이이콘 리스트 가져오기
	 * @param String member_id
	 * @exception 
	 */
	public List selectGalleryImgIconListAll(Map mapParameter);
	
	/**
	 * selectGalleryImgIconList
	 * imgIcon 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImgIconList(Map mapParameter);
	
	/**
	 * selectGalleryReplyList
	 * 갤러리 댓글 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryReplyList(Map mapParameter);
	
	/**
	 * selectGalleryReplyNextOrder
	 * 갤러리 댓글 next reply_order 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryReplyNextOrder(Map mapParameter);
	
	/**
	 * insertGalleryReply
	 * 갤러리 댓글 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryReply(Map mapParameter);
	
	/**
	 * insertGalleryLikeInfo
	 * 갤러리 추천 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryLikeInfo(Map mapParameter);
	
	/**
	 * deleteGalleryLikeInfo
	 * 갤러리 추천 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryLikeInfo(Map mapParameter);
	
	/**
	 * deleteGalleryPollVoteInfo
	 * 설문조사 참여자 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollVoteInfo(Map mapParameter);

	/**
	 * deleteGalleryPollDetail
	 * 설문조사 문항 상세 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollDetail(Map mapParameter);

	/**
	 * deleteGalleryPoll
	 * 설문조사 문항 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPoll(Map mapParameter);

	/**
	 * deleteGalleryImgIconList
	 * 이미지 아이콘 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIconList(Map mapParameter);
	
	/**
	 * deleteGalleryImgList
	 * 통계갤러리 이미지 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgList(Map mapParameter);
	
	/**
	 * deleteReply
	 * 댓글 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteReply(Map mapParameter);

	/**
	 * deleteGallery
	 * 통계 갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGallery(Map mapParameter);
	
	/**
	 * deleteGalleryMyGallery
	 * 통계 갤러리 마이갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryMyGallery(Map mapParameter);
		
	
	/**
	 * insertGalleryPollVoteInfo
	 * 갤러리 설문조사 투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryPollVoteInfo(Map mapParameter);
	
	
	/**
	 * updateGalleryPollVoteInfo
	 * 갤러리 설문조사 재투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int updateGalleryPollVoteInfo(Map mapParameter);
	
	
	/**addGallery
	 * 겔러리를 추가 한다.
	 * @param String fileName
	 * @exception 
	 */
	public String addGallery(Map map);
	
	/**insertSurvey
	 * 설문조사를 추가 한다.
	 * @param String surveyData,String data_id,String surveyDuplication
	 * @exception 
	 */
	public int insertSurvey(String surveyData,String data_id,String surveyDuplication);
	
	
	/**insertImage
	 * USECASE 이미지및 파일을 저장한다.
	 * @param String param,String data_id
	 * @exception 
	 */
	public void insertImage(HttpServletRequest request,String data_id);
	
	/**insertGalleryImage
	 * gallery 이미지및 아이콘 리스트.
	 * @param HttpServletRequest request,String data_id
	 * @exception 
	 */
	public void insertGalleryImage(HttpServletRequest request,String data_id);
	
	
	/**insertUseBoardRegist
	 * USECASE 활용사례등록.
	 * @param String param,String data_id
	 * @exception 
	 */
	public void insertUseBoardRegist(HttpServletRequest request,String data_id);
	
	
	/**selectBookMarkListCount
	 * BookMarkList 이미지및 아이콘 리스트.
	 * @param Map map
	 * @exception 
	 */
	public int selectBookMarkListCount(Map map);
	/**selectBookMarkList
	 * BookMarkList 즐겨찾기 리스트
	 * @param Map map
	 * @exception 
	 */
	public List selectBookMarkList(Map map);
	
	/**selectGalleryAllCountList
	 * 즐겨찾기, 작성 갤러리 , 수집갤러리 개수
	 * @param String member_id
	 * @exception 
	 */
	public Map selectGalleryAllCountList(String member_id);

	/**updateGalleryData
	 * 작성 갤러리 수정
	 * @param Map map
	 * @exception 
	 */
	public Map updateGalleryData(Map map)throws ParseException;
	
	/**useCaseUpdate
	 * 활용사례 수정
	 * @param HttpServletRequest req,String usr_id
	 * @exception 
	 */
	public void useCaseUpdate(HttpServletRequest req,String usr_id)throws ParseException;
	
	
	/**urlMakeBase64
	 * 통계갤러리 화면 캡쳐를 위해 받아온 url을 Base64로 인코딩 
	 * @param HttpServletRequest req,String usr_id
	 * @exception 
	 */
	public String urlMakeBase64(HttpServletRequest req) throws IOException;
	
	/**deleteGalleryHist
	 * 캡쳐된 통계갤러리 ID와 사진을 삭제 
	 * @param String hist_id,String member_id
	 * @exception 
	 */
	public void deleteGalleryHist(String hist_id,String member_id);
	
	/**updateGalleryHit
	 * 갤러리 조회수 증가 
	 * @param String data_id
	 * @exception 
	 */
	public void updateGalleryHit(String data_id);
	
	
	/**existMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public boolean existMyGallery(Map mapParameter);
	
	/**addMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public void addMyGallery(Map mapParameter);
	
	
	/**deleteGalleryReply
	 * 갤러리 리플삭제 
	 * @param String mapParameter
	 * @exception 
	 */
	public void deleteGalleryReply(Map mapParameter);
	
	/**getMemberMn
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public String getMemberNm(Map mapParameter);
	
	/**updateReply
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public void updateReply(Map mapParameter);
	
	/**selectBookMarkData
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public Map selectBookMarkData(Map mapParameter);
	
	/**updateReqCensusData
	 * 자료신청 수정
	 * @param Map  mapParameter
	 * @exception 
	 */
	public void updateReqCensusData(Map mapParameter);
}

