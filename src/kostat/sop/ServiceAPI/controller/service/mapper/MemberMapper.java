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
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

import org.springframework.stereotype.Repository;

/**
 * @Class Name : MemberMapper.java
 * @Description : MemberMapper DAO Class
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


@Repository("memberMapper")
public class MemberMapper extends EgovAbstractMapper {

	/**
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map sample(Map mapParameter) throws SQLException {
		return selectOne("membermng.selectMemberInfo", mapParameter);
	}
	
	/**
	 * 일반회원,휴면회원 계정 개수 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectMemberCount(Map mapParameter) throws SQLException{
		return selectOne("membermng.selectMemberCount", mapParameter);
	}
	
	/**
	 * 일반회원 상세 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectMemberInfo(Map mapParameter) throws SQLException {
		return selectOne("membermng.selectMemberInfo", mapParameter);
	}

	/**
	 * 휴면회원 상세 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map selectDmntMember(Map mapParameter) throws SQLException {
		return selectOne("membermng.selectDmntMember", mapParameter);
	}

	/**
	 * 삭제회원 정보 등록
	 * @param mapParameter
	 * @return 
	 * @exception Exception
	 */
	public int insertDelMember(Map mapParameter) throws SQLException {
		return insert("membermng.insertDelMember", mapParameter);
	}

	/**
	 * 휴면회원 정보 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public void insertDmntMember(Map mapParameter) throws SQLException {
		insert("membermng.insertDmntMember", mapParameter);
	}

	/**
	 * 일반회원 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public void deleteMember(Map mapParameter) throws SQLException {
		delete("membermng.deleteMember", mapParameter);
	}

	/**
	 * 휴면회원 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public void deleteDmntMember(Map mapParameter) throws SQLException {
		delete("membermng.deleteDmntMember", mapParameter);
	}
	
	/**
	 * 일반회원 정보 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public void insertMember(Map mapParameter) throws SQLException {
		insert("member.insertIntgrMemberInfo", mapParameter);
	}

}