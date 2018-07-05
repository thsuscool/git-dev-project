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

import kostat.sop.ServiceAPI.controller.service.MainService;
import kostat.sop.ServiceAPI.controller.service.mapper.MainMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * @Class Name : MainServiceImpl.java
 * @Description : MainServiceImpl Implement Class
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

@Service("mainService")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MainServiceImpl.class);

	/** MainDAO */
	@Resource(name="mainMapper")
	private MainMapper mainMapper;

	/**
	 * 예시
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map sample(Map mapParameter) throws SQLException {
		return mainMapper.sample(mapParameter);
	}
}