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
package kostat.sop.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.controller.service.MemberService;
import kostat.sop.ServiceAPI.controller.service.mapper.MemberMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : MemberServiceImpl.java
 * @Description : MemberServiceImpl Implement Class
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

@Service("memberService")
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);

	/** MemberMapperDAO */
	@Resource(name="memberMapper")
	private MemberMapper memberMapper;

	/**
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map sample(Map mapParameter) throws SQLException {
		return memberMapper.sample(mapParameter);
	}
	
	/**
	 * 삭제회원, 휴면회원 관리
	 * @return 0:실패,1:성공,2:삭제계정없음,3:휴면계정없음
	 * @param mapParameter
	 * @exception Exception
	 */
	public int memberMng(Map mapParameter) {
		int result = 1;
		Map member = null;
		
		String usr_id = ( mapParameter.get("usr_id") == null ? null : (String) mapParameter.get("usr_id") );
		String usr_pw = ( mapParameter.get("usr_pw") == null ? null : (String) mapParameter.get("usr_pw") );
		String gubun_cd = ( mapParameter.get("gubun_cd") == null ? null : (String) mapParameter.get("gubun_cd") );
			
		if( usr_id != null && usr_pw != null && gubun_cd != null ){
			try {
				if( "D".equals( gubun_cd ) ){ //일반회원or휴면회원 삭제
					Map cntMap = memberMapper.selectMemberCount( mapParameter );
					
					int cnt1 = (int) cntMap.get("cnt1");
					int cnt2 = (int) cntMap.get("cnt2");
					int cnt3 = (int) cntMap.get("cnt3");
					
					if( cnt1 == 0 && cnt2 == 0 ){
						result = 2; //삭제계정 없음
					} else {
						if( cnt1 > 0 ){ //일반회원삭제
							member = memberMapper.selectMemberInfo( mapParameter );
							
							if( member != null && usr_pw.equals( member.get("pw").toString() ) ){
								if( cnt3 == 0 ){
									cnt3 = memberMapper.insertDelMember( member );
								}
								memberMapper.deleteMember( member );
							}
						}
						
						if( cnt2 > 0 ){ //휴면회원삭제
							member = memberMapper.selectDmntMember( mapParameter );
							
							if( member != null && usr_pw.equals( member.get("pw").toString() ) ){
								if( cnt3 == 0 ){
									memberMapper.insertDelMember( member );
								}
								memberMapper.deleteDmntMember( member );
							} 
						}
					}
				} else if( "H".equals( gubun_cd ) ){ //일반회원 > 휴면회원
					member = memberMapper.selectMemberInfo( mapParameter );
					
					if( member != null && usr_pw.equals( member.get("pw").toString() ) ){
						memberMapper.insertDmntMember( member );
						memberMapper.deleteMember( member );
					}
				} else if( "G".equals( gubun_cd ) ){ //휴면회원 > 일반회원
					member = memberMapper.selectDmntMember( mapParameter );
					
					if( member != null && usr_pw.equals( member.get("pw").toString() ) ){
						memberMapper.insertMember( member );
						memberMapper.deleteDmntMember( member );
					} else {
						result = 3; //휴면계정 없음
					}
				} else {
					result = 0;
				}
				
			} catch (Exception e) {
				result = 0;
			} 
			
		} else {
			result = 0;
		}
		
		return result;
		
	}

}