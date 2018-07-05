package kostat.sop.ServiceAPI.controller.service.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;


/**
 * @Class Name : GalleryMapper.java
 * @Description : GalleryMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2016.08.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2016.08.17
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("galleryMapper")
public class GalleryMapper extends EgovAbstractMapper {

	/**
	 * selectGalleryList
	 * 갤러리 리스트
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryList(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("gallery.selectGalleryList", mapParameter);
	}
	
	/**
	 * selectGalleryListMyGallery
	 * 갤러리 리스트
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryListMyGallery(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("gallery.selectGalleryListMyGallery", mapParameter);
	}
	
	
	/**
	 * selectGalleryListResult
	 * (일반)갤러리 목록 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryListResult(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("gallery.selectGalleryListResult", mapParameter);
	}
	
	
	
	
	/**
	 * selectGalleryListTotalCnt
	 * 갤러리 카운트
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryListTotalCnt(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectOne("gallery.selectGalleryListTotalCnt", mapParameter);
	}
	
	/**
	 * selectMyGalleryListTotalCnt
	 * 수집 갤러리 목록 개수 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectMyGalleryListTotalCnt(Map mapParameter){
		return selectOne("gallery.selectMyGalleryListTotalCnt",mapParameter);
	}
	
	/**
	 * selectGalleryListTotalCnt
	 * 일반 총계 갤러리 카운트
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryListTotalCntResult(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectOne("gallery.selectGalleryListTotalCntResult", mapParameter);
	}
	
	
	/**
	 * selectGallery
	 * @param Map
	 * @exception Exception
	 */
	public HashMap<String, String> selectGallery(Map mapParameter){
		return selectOne("gallery.selectGallery", mapParameter);
	}
	
	/**
	 * selectGalleryPoll
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryPoll(Map mapParameter){
		return selectOne("gallery.selectGalleryPollCount",mapParameter);
	}
	
	/**
	 * selectGalleryPollDetailCount
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryPollDetailCount(Map mapParameter){
		return selectOne("gallery.selectGalleryPollDetailCount",mapParameter);
	}
	/**
	 * selectGalleryPollDetailList
	 * 설문조사 상세조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryPollDetailList(Map mapParameter){
		return selectList("gallery.selectGalleryPollDetailList", mapParameter);
	}
	
	/**
	 * selectGalleryImgList
	 * 갤러리 이미지 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImg(Map mapParameter){
		return selectList("gallery.selectGalleryImg", mapParameter);
	}
	
	/**
	 * selectGalleryImgIconList
	 * imgIcon 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryImgIconList(Map mapParameter){
		return selectList("gallery.selectGalleryImgIconList", mapParameter);
	}
	
	/**
	 * selectGalleryReplyList
	 * 갤러리 댓글 리스트
	 * @param Map mapParameter
	 * @exception 
	 */
	public List<HashMap<String,Object>> selectGalleryReplyList(Map mapParameter) {
		// TODO Auto-generated method stub
		return selectList("gallery.selectGalleryReplyList", mapParameter);
	}
	
	/**
	 * selectGalleryReplyNextOrder
	 * 갤러리 댓글 next reply_order 조회
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectGalleryReplyNextOrder(Map mapParameter){
		return selectOne("gallery.selectGalleryReplyNextOrder", mapParameter);
	}
	
	/**
	 * insertGalleryReply
	 * 갤러리 댓글 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryReply(Map mapParameter){
		return insert("gallery.insertGalleryReply", mapParameter);
	}
	
	/**
	 * insertGalleryLikeInfo
	 * 갤러리 추천 등록
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryLikeInfo(Map mapParameter){
		return insert("gallery.insertGalleryLikeInfo", mapParameter);
	}
	
	/**
	 * deleteGalleryLikeInfo
	 * 갤러리 추천 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryLikeInfo(Map mapParameter){
		return insert("gallery.deleteGalleryLikeInfo", mapParameter);
	}
	
	/**addMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public void addMyGallery(Map mapParameter){
		// 2016.12.02 시큐어코딩 삭제
		insert("gallery.addMyGallery",mapParameter);
	};
	
	
	/**
	 * deleteGalleryPollVoteInfo
	 * 설문조사 참여자 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollVoteInfo(Map mapParameter){
		return delete("gallery.deleteGalleryPollVoteInfo", mapParameter);
	}

	/**
	 * deleteGalleryPollDetail
	 * 설문조사 문항 상세 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPollDetail(Map mapParameter){
		return delete("gallery.deleteGalleryPollDetail", mapParameter);
	}

	/**
	 * deleteGalleryPoll
	 * 설문조사 문항 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryPoll(Map mapParameter){
		return delete("gallery.deleteGalleryPoll", mapParameter);
	}
	
	/**
	 * deleteGalleryImgIconList
	 * 이미지 아이콘 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIconList(Map mapParameter){
		return delete("gallery.deleteGalleryImgIconList", mapParameter);
	}

	/**
	 * deleteGalleryImgList
	 * 통계갤러리 이미지 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgList(Map mapParameter){
		return delete("gallery.deleteGalleryImgList", mapParameter);
	}
	
	/**
	 * deleteGalleryImg
	 * 통계갤러리 이미지 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImg(Map mapParameter){
		return delete("gallery.deleteGalleryImg", mapParameter);
	}
	/**
	 * deleteGalleryImgIcon
	 * 통계갤러리 이미지 아이콘 (해당이미지) 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIcon(Map mapParameter){
		return delete("gallery.deleteGalleryImgIcon", mapParameter);
	}

	/**
	 * deleteGalleryImgIconOri
	 * 통계갤러리 이미지 아이콘 개별  삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryImgIconOri(Map mapParameter){
		return delete("gallery.deleteGalleryImgIconOri", mapParameter);
	}
	
	
	
	
	/**
	 * deleteReply
	 * 댓글 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteReply(Map mapParameter){
		return delete("gallery.deleteReply", mapParameter);
	}

	/**
	 * deleteGallery
	 * 통계 갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGallery(Map mapParameter){
		return delete("gallery.deleteGallery", mapParameter);
	}
	
	/**
	 * deleteGalleryMyGallery
	 * 통계 갤러리 마이갤러리 데이터 리스트 삭제
	 * @param Map mapParameter
	 * @exception 
	 */
	public int deleteGalleryMyGallery(Map mapParameter){
		return delete("gallery.deleteGalleryMyGallery",mapParameter);
	}
	
	/**
	 * insertGalleryPollVoteInfo
	 * 갤러리 설문조사 투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int insertGalleryPollVoteInfo(Map mapParameter){
		return insert("gallery.insertGalleryPollVoteInfo", mapParameter);
	}
	
	/**
	 * updateGalleryPollVoteInfo
	 * 갤러리 설문조사 재투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public int updateGalleryPollVoteInfo(Map mapParameter){
		return update("gallery.updateGalleryPollVoteInfo", mapParameter);
	}
	
	/**
	 * selectGalleryPollVoteInfo
	 * 갤러리 설문조사 재투표
	 * @param Map mapParameter
	 * @exception 
	 */
	public List selectGalleryPollVoteInfo(Map mapParameter){
		return selectList("gallery.selectGalleryPollVoteInfo", mapParameter);
	}
	
	
	/**
	 * addGallery
	 * 갤러리 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void addGallery(Map map) {
		// TODO Auto-generated method stub
		insert("gallery.addGallery",map);
	}
	
	/**
	 * insertSurveyPoll
	 * 설문조사 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertSurveyPoll(Map map){
		insert("gallery.insertSurveyPoll",map);
	}
	
	/**
	 * insertSurveyPollDetail
	 * 설문조사 상세 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertSurveyPollDetail(Map map){
		insert("gallery.insertSurveyDetail",map);
	}
	
	/**
	 * insertGalleryImg
	 * 이미지 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertGalleryImg(Map map){
		insert("gallery.insertGalleryImg",map);
	}
	/**
	 * insertIcon
	 * 이미지 추가
	 * @param Map mapParameter
	 * @exception 
	 */
	public void insertIconList(Map map){
		insert("gallery.insertIconList",map);
	}
	
	/**
	 * selectBookMarkListCount
	 * 즐겨찾기 개수
	 * @param Map mapParameter
	 * @exception 
	 */
	public int selectBookMarkListCount(Map map){
		int count = 0;
		count = selectOne("gallery.selectBookMarkListCount",map);
		return count;
	}
	/**
	 * selectBookMarkList
	 * 북마크 리스트 가져오기
	 * @param Map map
	 * @exception 
	 */
	public List selectBookMarkList(Map map){
		return selectList("gallery.selectBookMarkList",map);
	}
	
	/**selectGalleryAllCountList
	 * 즐겨찾기, 작성 갤러리 , 수집갤러리 개수
	 * @param String member_id
	 * @exception 
	 */
	public Map selectGalleryAllCountList(String member_id){		
		return selectOne("gallery.selectGalleryAllCountList",member_id);
	}

	/**updateGalleryList
	 * 갤러리 메인 수전
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryList(Map map){
		update("gallery.updateGalleryList",map);
	}
	
	/**updateGalleryPoll
	 * 설문조사 수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryPoll(Map map){
		update("gallery.updateGalleryPoll",map);
	}
	
	/**updateGalleryPollDetail
	 * 설문조사 상세 수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryPollDetail(Map map){ //2017.12.04 [개발팀] 시큐어코딩
		update("gallery.updateGalleryPollDetail",map);
	}
	
	/**updateGalleryImgList
	 * 이미지 수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryImgList(Map map){
		update("gallery.updateGalleryImgList",map);
	}
	
	/**updateGalleryImgIconList
	 * 아이콘 리스트  수정
	 * @param Map map
	 * @exception 
	 */
	public void updateGalleryImgIconList(Map map){
		update("gallery.updateIconList",map);
	}
	/**deleteGalleryPollDetailAns
	 * 설문항목 삭제
	 * @param Map map
	 * @exception 
	 */
	public void deleteGalleryPollDetailAns(Map map){
		delete("gallery.deleteGalleryPollDetailAns",map);
	}

	public void deleteGalleryPollVoteInfoDetail(Map map) {
		// TODO Auto-generated method stub
		delete("gallery.deleteGalleryPollVoteInfoDetail",map);
	}
	
	/**deleteGalleryPollVoteInfoUser
	 * 유저 설문 항목 삭제
	 * @param Map map
	 * @exception 
	 */
	public void deleteGalleryPollVoteInfoUser(Map map){
		delete("gallery.deleteGalleryPollVoteInfoUser",map);
	}
	
	/**deleteGalleryHist
	 * 캡쳐된 통계갤러리 ID와 사진을 삭제 
	 * @param String hist_id
	 * @exception 
	 */
	public void deleteGalleryHist(Map map){
		delete("gallery.deleteGalleryHist",map);
		delete("gallery.deleteStatistcsHistoryParamInfo",map);
	}
	
	
	/**updateGalleryHit
	 * 갤러리 조회수 증가 
	 * @param String data_id
	 * @exception 
	 */
	public void updateGalleryHit(String data_id){
		update("gallery.updateGalleryHit",data_id);
	}
	
	/**existMyGallery
	 * 갤러리 조회수 증가 
	 * @param String mapParameter
	 * @exception 
	 */
	public int existMyGallery(Map mapParameter){
		int count = 0;
		count = selectOne("gallery.existMyGallery",mapParameter);
		return count;
	}
	
	/**deleteGalleryReply
	 * 갤러리 조회수 증가 
	 * @param Map mapParameter
	 * @exception 
	 */
	public void deleteGalleryReply(Map mapParameter){
		delete("gallery.deleteGalleryReply",mapParameter);
	}
	
	/**getMemberMn
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public String getMemberNm(Map mapParameter){
		Map map = selectOne("gallery.getMemberNm",mapParameter);
		String member_nm = map.get("member_nm").toString();
		return member_nm;
	}
	
	/**updateReply
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public void updateReply(Map mapParameter){
		update("gallery.updateReply",mapParameter);
	}
	
	/**selectBookMarkData
	 * 유저 이름 가져오기 
	 * @param Map  mapParameter
	 * @exception 
	 */
	public Map selectBookMarkData(Map mapParameter){
		return selectOne("gallery.selectBookMarkData",mapParameter);
	}

	/**selectAllCountWriteCount
	 * 작성개수 가져오기
	 * @param Map  mapParameter
	 * @exception 
	 */
	public int selectAllCountWriteCount(Map result) {
		// TODO Auto-generated method stub
		return selectOne("gallery.selectAllCountWriteCount",result);
	}
	
	/**selectAllCountCollectCount
	 * 수집개수 가져오기
	 * @param Map  mapParameter
	 * @exception 
	 */
	public int selectAllCountCollectCount(Map result){
		return selectOne("gallery.selectAllCountCollectCount",result);
	}
	
	public int selectAllCountLikeCount(Map result){
		return selectOne("gallery.selectAllCountLikeCount",result);
	}
	
	public int selectAllTempWriteCount(Map result){
		return selectOne("gallery.selectAllTempWriteCount",result);
	}
	
}
