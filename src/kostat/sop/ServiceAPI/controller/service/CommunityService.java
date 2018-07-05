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
package kostat.sop.ServiceAPI.controller.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;
/**
 * @Class Name : CommunityService.java
 * @Description : CommunityService Class
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
public interface CommunityService {
	public String poiRegist(HttpServletRequest request) throws Exception,IllegalArgumentException;
	public String memberRegist(HttpServletRequest request) throws Exception,IllegalArgumentException;
	public String getFileDataToHandsontable(HttpServletRequest request) throws Exception,IllegalArgumentException;
	public String getBatchFileDataToHandsontable(HttpServletRequest request) throws Exception,IllegalArgumentException;
	public void getBatchSampleExcel(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException ;
	public void getPoiSHPFile(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException;
	public ModelAndView getForm(HttpServletRequest request,ModelMap model) throws Exception,IllegalArgumentException;
	public ModelAndView view(HttpServletRequest request,ModelMap model) throws Exception,IllegalArgumentException;
	public ModelAndView juso(HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception,IllegalArgumentException;
	public ModelAndView dataUpload(HttpServletRequest request,HttpServletResponse response,ModelMap model) throws Exception,IllegalArgumentException;
	public String checkPassword(HttpServletRequest request) throws Exception,IllegalArgumentException;
	public String insertOrganUser(HttpServletRequest request,HttpServletResponse response) throws Exception,IllegalArgumentException;
	public boolean hasOrgan(String organ) throws Exception,IllegalArgumentException;
	public String base64Decode(String str) throws Exception,IllegalArgumentException;
	public void registCheckDate(HashMap<String,Object> community) throws Exception,IllegalArgumentException;
	public void replaceIdPw(Map<String,Object> mapParameter) throws Exception,IllegalArgumentException;
	public Map<String,Object> dollarQueryReplace(Map<String,Object> mapParameter);
}