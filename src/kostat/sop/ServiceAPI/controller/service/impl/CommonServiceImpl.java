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

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

import javax.annotation.Resource;

import kostat.sop.ServiceAPI.controller.service.CommonService;
import kostat.sop.ServiceAPI.controller.service.mapper.CommonMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : CommonServiceImpl.java
 * @Description : CommonServiceImpl Implement Class
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

@Service("commonService")
public class CommonServiceImpl extends EgovAbstractServiceImpl implements CommonService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CommonServiceImpl.class);

	/** CommonDAO */
	@Resource(name="commonMapper")
	private CommonMapper commonMapper;

	/**
	 * 페이지 호출통계 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public void insertPageCall(Map mapParameter) throws SQLException {
		commonMapper.insertPageCall(mapParameter);
	}
}