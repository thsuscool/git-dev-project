package kostat.sop.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.Map;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.ModelMap;

public interface PolicyWriteService {
	public String policyStaticMapLeftMenu(HttpServletRequest request,ModelMap model) throws SQLException;
	public String policyWriteMapRightMenu(HttpServletRequest request,ModelMap model) throws SQLException;
	public String mydataList(HttpServletRequest request) throws SQLException;
	
	//=========================== 2017.09.06 [개발팀] START ========================//
	
	/**
	 * 정책통계지도 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getPolicyMap(Map mapParameter) throws SQLException;
	
	/**
	 * 정책통계지도 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertPolicyMap(Map mapParameter) throws SQLException;
	
	/**
	 * 정책통계지도 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePolicyMap(Map mapParameter) throws SQLException;
	
	/**
	 * 정책통계지도 수정
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateOpenYnPolicyMap(Map mapParameter) throws SQLException;
	
	/**
	 * 정책통계지도 파라미터정보 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertPolicyParamInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 정책통계지도 파라미터정보 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePolicyParamInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 연관정책통계지도 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertRelPolicyMapInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 연관정책통계지도 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteRelPolicyMapInfo(Map mapParameter) throws SQLException;
	
	/**
	 * 산업분류코드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getIndustryCode(Map mapParameter) throws SQLException;
	
	/**
	 * 테마코드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getThemeCode(Map mapParameter) throws SQLException;
	
	/**
	 * 산업분류/테마 POI조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCompanyPoiList(Map mapParameter) throws SQLException;
	
	/**
	 * 협업형데이터 POI조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getLocalGovernmentPoiList(Map mapParameter) throws SQLException;
	
	/**
	 * LBDMS POI조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getLbdmsPoiList(Map mapParameter) throws SQLException;
	//=========================== 2017.09.06 [개발팀] END ========================//
}