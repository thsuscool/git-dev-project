package kostat.sop.ServiceAPI.common.controller;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSessionFactory;

public class Properties {
	private static final Log logger = LogFactory.getLog(Properties.class);
	
	public static List area_type_list = null;
	public static List low_search_list = null;
	public static List year_list = null;
	public static List bnd_year_list = null;
	public static List odoor_crop_cd_list = null;
	public static List fac_crop_cd_list = null;
	public static List fishery_type_list = null;
	public static List oga_div_list = null;
	public static List forestry_type_code_list = null;
	public static List forestry_type_det_collection_list = null;
	public static List forestry_type_det_cultivation_list = null;
	public static List house_type_list = null;
	public static List const_year_list = null;
	public static List gender_list = null;
	public static List edu_level_list = null;
	public static List study_level_list = null;
	public static List household_type_list = null;
	public static List company_year_list = null;
	public static List bnd_cd_list = null;
	public static SqlSessionFactory sqlSessionFactory = null;
	public static String defult_bnd_year = null;
	public static String java_script_file_path = null;
	
	// 9월 서비스
	public static List house_area_cd_list = null;
	public static List house_use_prid_cd_list = null;
	
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory를 설정한다. 
	 */
	public static void setSqlSessionFactory(SqlSessionFactory factory) {
		sqlSessionFactory = factory;
	}
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory 를 얻는다.
	 * 
	 * @return sqlSessionFactory DB 세션을 위한 Factory Object
	 */
	public static synchronized SqlSessionFactory getSqlSessionFactory() {
		return sqlSessionFactory;
	}
	
	
	public static String getJava_script_file_path() {
		return java_script_file_path;
	}
	public static void setJava_script_file_path(String java_script_file_path) {
		Properties.java_script_file_path = java_script_file_path;
	}
	public static List getHousehold_type_list() {
		return household_type_list;
	}
	public static void setHousehold_type_list(List household_type_list) {
		Properties.household_type_list = household_type_list;
	}
	public static String getDefult_bnd_year() {
		return defult_bnd_year;
	}
	public static List getCompany_year_list() {
		return company_year_list;
	}
	public static void setCompany_year_list(List company_year_list) {
		Properties.company_year_list = company_year_list;
	}
	public static void setDefult_bnd_year(String defult_bnd_year) {
		Properties.defult_bnd_year = defult_bnd_year;
	}
	public static List getArea_type_list() {
		return area_type_list;
	}
	public static void setArea_type_list(List area_type_list) {
		Properties.area_type_list = area_type_list;
	}
	public static List getLow_search_list() {
		return low_search_list;
	}
	public static void setLow_search_list(List low_search_list) {
		Properties.low_search_list = low_search_list;
	}
	public static List getYear_list() {
		return year_list;
	}
	public static void setYear_list(List year_list) {
		Properties.year_list = year_list;
	}
	public static List getBnd_year_list() {
		return bnd_year_list;
	}
	public static void setBnd_year_list(List bnd_year_list) {
		Properties.bnd_year_list = bnd_year_list;
	}
	public static List getOdoor_crop_cd_list() {
		return odoor_crop_cd_list;
	}
	public static void setOdoor_crop_cd_list(List odoor_crop_cd_list) {
		Properties.odoor_crop_cd_list = odoor_crop_cd_list;
	}
	public static List getFac_crop_cd_list() {
		return fac_crop_cd_list;
	}
	public static void setFac_crop_cd_list(List fac_crop_cd_list) {
		Properties.fac_crop_cd_list = fac_crop_cd_list;
	}
	public static List getFishery_type_list() {
		return fishery_type_list;
	}
	public static void setFishery_type_list(List fishery_type_list) {
		Properties.fishery_type_list = fishery_type_list;
	}
	public static List getOga_div_list() {
		return oga_div_list;
	}
	public static void setOga_div_list(List oga_div_list) {
		Properties.oga_div_list = oga_div_list;
	}
	public static List getForestry_type_code_list() {
		return forestry_type_code_list;
	}
	public static void setForestry_type_code_list(List forestry_type_code_list) {
		Properties.forestry_type_code_list = forestry_type_code_list;
	}
	public static List getForestry_type_det_collection_list() {
		return forestry_type_det_collection_list;
	}
	public static void setForestry_type_det_collection_list(
			List forestry_type_det_collection_list) {
		Properties.forestry_type_det_collection_list = forestry_type_det_collection_list;
	}
	public static List getForestry_type_det_cultivation_list() {
		return forestry_type_det_cultivation_list;
	}
	public static void setForestry_type_det_cultivation_list(
			List forestry_type_det_cultivation_list) {
		Properties.forestry_type_det_cultivation_list = forestry_type_det_cultivation_list;
	}
	public static List getHouse_type_list() {
		return house_type_list;
	}
	public static void setHouse_type_list(List house_type_list) {
		Properties.house_type_list = house_type_list;
	}
	public static List getConst_year_list() {
		return const_year_list;
	}
	public static void setConst_year_list(List const_year_list) {
		Properties.const_year_list = const_year_list;
	}
	public static List getGender_list() {
		return gender_list;
	}
	public static void setGender_list(List gender_list) {
		Properties.gender_list = gender_list;
	}
	public static List getEdu_level_list() {
		return edu_level_list;
	}
	public static void setEdu_level_list(List edu_level_list) {
		Properties.edu_level_list = edu_level_list;
	}
	public static List getStudy_level_list() {
		return study_level_list;
	}
	public static void setStudy_level_list(List study_level_list) {
		Properties.study_level_list = study_level_list;
	}
	public static List getBnd_cd_list() {
		return bnd_cd_list;
	}
	public static void setBnd_cd_list(List bnd_cd_list) {
		Properties.bnd_cd_list = bnd_cd_list;
	}
	
	// 9월 서비스
	public static List getHouse_area_cd_list() {
		return house_area_cd_list;
	}
	public static void setHouse_area_cd_list(List house_area_cd_list) {
		Properties.house_area_cd_list = house_area_cd_list;
	}
	public static List getHouse_use_prid_cd_list() {
		return house_use_prid_cd_list;
	}
	public static void setHouse_use_prid_cd_list(List house_use_prid_cd_list) {
		Properties.house_use_prid_cd_list = house_use_prid_cd_list;
	}
	
}
