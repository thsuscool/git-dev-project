package kostat.sop.ServiceAPI.controller.service.mapper;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;  // 2017.08.11 [개발팀]

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("policyMapper")
public class PolicyMapper extends EgovAbstractMapper {

	public List<HashMap<String,Object>> selectOpenDataNm(Map mapParameter){
		return selectList("policyStatic.selectOpenDataNm", mapParameter);
	}
	//========== 2017.08.11 [개발팀] START ==========//
	/**
	 * 카테고리 리스트 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List<Map> policyStaticCategoryList(){
		return selectList("policyStatic.policyCategoryList");
	}
	
	/**
	 * 정책통계지도 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public Map getPolicyMap(Map mapParameter) throws SQLException {
		return selectOne("policyStatic.selectPolicyMapInfoByIdxId", mapParameter);
	}
	
	/**
	 * 정책통계지도 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertPolicyMap(Map mapParameter) throws SQLException {
		return insert("policyStatic.insertPolicyMap", mapParameter);
	}
	
	/**
	 * 정책통계지도 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePolicyMap(Map mapParameter) throws SQLException {
		return delete("policyStatic.deletePolicyMap", mapParameter);
	}
	
	/**
	 * 정책통계지도 수정
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateOpenYnPolicyMap(Map mapParameter) throws SQLException {
		return update("policyStatic.updateOpenYnPolicyMap", mapParameter);
	}
	
	/**
	 * 정책통계지도 파라미터정보 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertPolicyParamInfo(Map mapParameter) throws SQLException {
		return insert("policyStatic.insertPolicyParamInfo", mapParameter);
	}
	
	/**
	 * 정책통계지도 파라미터정보 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deletePolicyParamInfo(Map mapParameter) throws SQLException {
		return delete("policyStatic.deletePolicyParamInfo", mapParameter);
	}
	
	/**
	 * 연관정책통계지도 등록
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertRelPolicyMapInfo(Map mapParameter) throws SQLException {
		return insert("policyStatic.insertRelPolicyMapInfo", mapParameter);
	}
	
	/**
	 * 연관정책통계지도 삭제
	 * @param mapParameter
	 * @exception Exception
	 */
	public int deleteRelPolicyMapInfo(Map mapParameter) throws SQLException {
		return delete("policyStatic.deleteRelPolicyMapInfo", mapParameter);
	}
	
	/**
	 * 산업분류코드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getIndustryCode(Map mapParameter) throws SQLException {
		return selectList("policyStatic.selectIndustryCode", mapParameter);
	}
	
	/**
	 * 테마코드 조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getThemeCode(Map mapParameter) throws SQLException {
		return selectList("policyStatic.selectThemeCode", mapParameter);
	}
	
	/**
	 * 산업분류/테마 POI조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getCompanyPoiList(Map mapParameter) throws SQLException {
		return selectList("policyStatic.selectCompanyPoiList", mapParameter);
	}
	
	/**
	 * 산업분류/테마 POI조회
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getLocalGovernmentPoiList(Map mapParameter) throws SQLException {
		return selectList("policyStatic.selectOpenDataPoiList", mapParameter);
	}
	
	/**
	 * LBDMS 데이터 조회 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getLbdmsList(Map mapParameter) throws SQLException {
		return selectList("policyStatic.selectLbdmsList", mapParameter);
	}
	
	/**
	 * LBDMS POI 데이터 조회 
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getLbdmsPoiList(Map mapParameter) throws SQLException {
		return selectList("policyStatic.selectLbdmsPoiList", mapParameter);
	}
	
	//========== 2017.08.11 [개발팀]   END ==========//
}