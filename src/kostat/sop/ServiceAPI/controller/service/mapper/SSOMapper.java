/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

import org.springframework.stereotype.Repository;

/**
 * @Class Name : SSOMapper.java
 * @Description : SSOMapper DAO Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.21
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */


@Repository("ssoMapper")
public class SSOMapper extends EgovAbstractMapper {

	/**
	 * 회원가입이 되어 있는지 체크
	 * @param mapParameter - 조회할 정보가 담긴 Map
	 * @exception Exception	
	 */
	public Integer getIntgrMemberCheckCnt(Map mapParameter) throws SQLException {
		return selectOne("member.getIntgrMemberCheckCnt", mapParameter);
	}
	
	/**
	 * 회원상세정보
	 * @param mapParameter - 조회할 정보가 담긴 Map
	 * @exception Exception
	 */
	public Map memberInfo(Map mapParameter) throws SQLException {
		return selectOne("member.memberInfo", mapParameter);
	}
	
	/**
	 * 회원정보삭제
	 * @param mapParameter - 조회할 정보가 담긴 Map
	 * @exception Exception
	 */
	public void memberDelete(Map mapParameter) throws SQLException {
		delete("member.memberDelete", mapParameter);
	}
	
	/**
	 * 통계히스토리 회원아이디 변경
	 * @param mapParameter - 수정할 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateHistChangeMemberId(Map mapParameter) throws SQLException {
		update("member.updateHistChangeMemberId", mapParameter);
	}
	
	/**
	 * 개발자 인증키 회원아이디 변경
	 * @param mapParameter - 수정할 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateSrvChagneMemberId(Map mapParameter) throws SQLException {
		update("member.updateSrvChagneMemberId", mapParameter);
	}
	
	/**
	 * 게시판 회원아이디 변경
	 * @param mapParameter - 수정할 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateBoardChagneMemberId(Map mapParameter) throws SQLException {
		update("member.updateBoardChagneMemberId", mapParameter);
	}
	
	/**
	 * 게시판 댓글 회원아이디 변경
	 * @param mapParameter - 수정할 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateBoardReplyChagneMemberId(Map mapParameter) throws SQLException {
		update("member.updateBoardReplyChagneMemberId", mapParameter);
	}
	
	/**
	 * 통합회원정보 등록
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void insertIntgrMemberInfo(Map mapParameter) throws SQLException {
		insert("member.insertIntgrMemberInfo", mapParameter);
	}
	
	/**
	 * 통합회원정보 업데이트
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateIntgrMemberInfo(Map mapParameter) throws SQLException {
		update("member.updateIntgrMemberInfo", mapParameter);
	}
	
	/**
	 * 통합회원 로그아웃 시간 업데이트
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateIntgrLastConn(Map mapParameter) throws SQLException {
		update("member.updateIntgrLastConn", mapParameter);
	}
	
	/**
	 * 통합로그인 여부 업데이트
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void updateIntgrLoginInfo(Map mapParameter) throws SQLException {
		update("member.updateIntgrLoginInfo", mapParameter);
	}
	
	/**
	 * 기존회원찾기
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public Map selectOriginMember(Map mapParameter) throws SQLException {
		return selectOne("member.selectOriginMember", mapParameter);
	}
	
	/**
	 * 해당 사용자에 대한 통계조회 히스토리 조회
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public List StatistcsHistoryListsForUser(Map mapParameter) throws SQLException {
		return selectList("member.StatistcsHistoryListsForUser", mapParameter);
	}
	
	/**
	 * 통계조회 히스토리 목록 삭제
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void deleteStatistcsHistory(Map mapParameter) throws SQLException {
		delete("member.deleteStatistcsHistory", mapParameter);
	}
	
	/**
	 * 통계히스토리 파라미터정보 삭제
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void deleteStatistcsHistoryParamInfo(Map mapParameter) throws SQLException {
		delete("member.deleteStatistcsHistoryParamInfo", mapParameter);
	}
	
	/**
	 * 게시판 정보 삭제
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void deleteBoardInfo(Map mapParameter) throws SQLException {
		delete("member.deleteBoardInfo", mapParameter);
	}
	
	/**
	 * 게시판 댓글 정보 삭제
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void deleteBoardReplyInfo(Map mapParameter) throws SQLException {
		delete("member.deleteBoardReplyInfo", mapParameter);
	}
	
	/**
	 * API 사용 서비스 정보 삭제
	 * @param mapParameter - 정보가 담긴 Map
	 * @exception Exception
	 */
	public void deleteUserServiceInfo(Map mapParameter) throws SQLException {
		delete("member.deleteUserServiceInfo", mapParameter);
	}
}