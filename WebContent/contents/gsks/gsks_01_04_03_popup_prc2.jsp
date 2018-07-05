<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@ page import="com.oreilly.servlet.MultipartRequest,
                 com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                 java.util.*" %>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="java.math.BigDecimal"%>
<%@ include file="/contents/include/comVarCoding.jsp" %>
<%@ include file="/contents/include/cacheControl.jsp" %>
<%@ include file="/contents/include/logger.jsp"%>

<%

  String savePath = sc_filePath + "/census/data/";			//저장 위치
  int sizeLimit   = 1024*1024*512;	//512메가
    
  
  DbManager dmg = null;
  RecordModel rm = null;

  String sgis_census_id = "";
  String sgis_census_data_id = "";
  String sgis_census_year = "";
  String sgis_census_sido = "";
  String sgis_census_sigungu = "";
  String sgis_census_name = "";
  String[] sgis_census_stand_year  = null;
  String sgis_census_public_format = "";
  String sgis_census_public_yn = "";
  String sgis_census_location = "";
  String sgis_census_price = "";
  String sgis_census_file = "";
  String sgis_census_dir = "/census/data/";
  String aT = "";
  String origin_sgis_census_id = "";
  String origin_sgis_census_data_id = "";
  String inUse[] = null;
  String[] removeYear = null;

  String formName = "";
  String fileName = "";
  
  String sgis_census_meaning = "";
  String id_nm1 = "";
  String id_nm2 = "";
  String area_nm = "";
  String sido_nm = "";
  String sigungu_nm = "";
  
  String chkFileName = "";

  String sql = "";

  try {

    /**
     * @constructor parameter
     *  	HttpServletRequest req
     *  	String directory
     *  	int maxsize
     *  	String encoding
     *  	FileRenamePolicy policy(파일명중복여부))
     */

    dmg = new DbManager();

    MultipartRequest multi = new MultipartRequest(request, savePath, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
    Enumeration formNames  = multi.getFileNames();

    sgis_census_id 			= multi.getParameter("sgis_census_id");						//구분
    sgis_census_name  		= multi.getParameter("census_name");						//대상자료명
    sgis_census_stand_year 	= multi.getParameterValues("census_stand_year");			//기준년도
    sgis_census_public_format = multi.getParameter("census_public_format");				//배포포맷
    sgis_census_public_yn 	= multi.getParameter("census_public_yn");					//공개여부
    sgis_census_location 	= multi.getParameter("census_location");					//대상지역
    sgis_census_price 		= multi.getParameter("census_price");						//가격
    
    sgis_census_data_id 	= multi.getParameter("sgis_census_data_id");
    sgis_census_year 		= multi.getParameter("sgis_census_year_id");
    sgis_census_sido 		= multi.getParameter("sgis_census_sido_id");
    sgis_census_sido = sgis_census_sido.substring(4);
    sgis_census_sigungu 	= multi.getParameter("sgis_census_sigungu_id");
    sido_nm 	= multi.getParameter("sido_nm");
    sigungu_nm 	= multi.getParameter("sigungu_nm");

    aT = multi.getParameter("aT");														//처리구분
    removeYear = multi.getParameterValues("removeYear");								//파일삭제년도

    origin_sgis_census_id = multi.getParameter("origin_sgis_census_id");				//이전구분
    origin_sgis_census_data_id = multi.getParameter("origin_sgis_census_data_id");		//이전자료id

    inUse = multi.getParameterValues("inUse");				//내부처리구분

    int resultFlag = 0;
    
    
    System.out.println("[prc2.jsp] sgis_census_id[" + sgis_census_id);
    System.out.println("[prc2.jsp] sgis_census_data_id[" + sgis_census_data_id);
    
    //========================================================================================================
    if ( "1".equals(sgis_census_id)) { //통계자료(1), 인구(0)
    	if ( "0".equals(sgis_census_data_id) ) {
    		
    		savePath = savePath + "oa_in";
    		sgis_census_dir = sgis_census_dir +  "oa_in";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "OA";
    		id_nm2 = "IN";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		//chkFileName = "oa_in";
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		//sgis_census_file = "oa_in" + "_" + sgis_census_year + ".zip";
    			//sgis_census_file = multi.getFilesystemName("census_file");
	    		sgis_census_meaning = "통계자료_집계구별통계_인구_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		
	    		chkFileName = "oa_in_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	    		
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계자료_집계구별통계_인구_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		
    	    		chkFileName = "oa_in_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    	    		
    			} else {
    	    		sgis_census_meaning = "통계자료_집계구별통계_인구_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		
    	    		chkFileName = "oa_in_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "1".equals(sgis_census_data_id) ) { //통계자료(1), 가구(1)
    		
    		savePath = savePath + "oa_ga";
    		sgis_census_dir = sgis_census_dir +  "oa_ga";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "OA";
    		id_nm2 = "GA";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계자료_집계구별통계_가구_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "oa_ga_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계자료_집계구별통계_가구_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "oa_ga_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계자료_집계구별통계_가구_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "oa_ga_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "2".equals(sgis_census_data_id) ) { //통계자료(1), 주택(2)
    		
    		savePath = savePath + "oa_ho";
    		sgis_census_dir = sgis_census_dir +  "oa_ho";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "OA";
    		id_nm2 = "HO";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계자료_집계구별통계_주택_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "oa_ho_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계자료_집계구별통계_주택_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "oa_ho_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계자료_집계구별통계_주택_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "oa_ho_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "3".equals(sgis_census_data_id) ) { //통계자료(1), 사업체(3)
    		
    		savePath = savePath + "oa_cp";
    		sgis_census_dir = sgis_census_dir +  "oa_cp";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "OA";
    		id_nm2 = "CP";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계자료_집계구별통계_사업체_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "oa_cp_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계자료_집계구별통계_사업체_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "oa_cp_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계자료_집계구별통계_사업체_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "oa_cp_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	}
    //=====================================================================================================================
    } else if ( "2".equals(sgis_census_id)) { //통계지역경계(2), 전국(0)
    	if ( "0".equals(sgis_census_data_id) ) {
    		
    		savePath = savePath + "bnd_all";
    		sgis_census_dir = sgis_census_dir +  "bnd_all";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "ALL";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_전체_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_all_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_전체_전국_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_all_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_전체_전국_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_all_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "1".equals(sgis_census_data_id) ) { //통계지역경계(2), 시도(1)
    		
    		savePath = savePath + "bnd_sido";
    		sgis_census_dir = sgis_census_dir +  "bnd_sido";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "SIDO";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_시도_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_sido_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_시도_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_sido_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_시도_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_sido_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "2".equals(sgis_census_data_id) ) { //통계지역경계(2), 시군구(2)
    		
    		savePath = savePath + "bnd_sigungu";
    		sgis_census_dir = sgis_census_dir +  "bnd_sigungu";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "SIGUNGU";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_시군구_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_sigungu_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_시군구_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_sigungu_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_시군구_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_sigungu_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "3".equals(sgis_census_data_id) ) { //통계지역경계(2), 읍면동(3)
    		
    		savePath = savePath + "bnd_dong";
    		sgis_census_dir = sgis_census_dir +  "bnd_dong";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "DONG";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_읍면동_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_dong_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_읍면동_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_dong_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_센서스행정구역경계지도_읍면동_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_dong_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "4".equals(sgis_census_data_id) ) { //통계지역경계(2), 도시화지역(4)
    		
    		savePath = savePath + "bnd_ua";
    		sgis_census_dir = sgis_census_dir +  "bnd_ua";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "UA";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_도시화지역_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_ua_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_도시화지역_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_ua_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_도시화지역_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_ua_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "5".equals(sgis_census_data_id) ) { //통계지역경계(2), 도시권경계(5)
    		
    		savePath = savePath + "bnd_ma";
    		sgis_census_dir = sgis_census_dir +  "bnd_ma";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "MA";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_도시권경계_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_ma_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_도시권경계_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_ma_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_도시권경계_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_ma_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	} else if ( "6".equals(sgis_census_data_id) ) { //통계지역경계(2), 집계구경계(6)
    		
    		savePath = savePath + "bnd_oa";
    		sgis_census_dir = sgis_census_dir +  "bnd_oa";
    		sgis_census_file = multi.getFilesystemName("census_file");
    		id_nm1 = "BND";
    		id_nm2 = "OA";
    		area_nm = sido_nm + " " + sigungu_nm;
    		
    		if( "00".equals(sgis_census_sido)) { //전국
	    		sgis_census_meaning = "통계지역경계_집계구경계_전국_" + sgis_census_year;
	    		area_nm = "전국";
	    		chkFileName = "bnd_oa_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    		} else {
    			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
    				
    	    		sgis_census_meaning = "통계지역경계_집계구경계_" + sido_nm + "_" + sgis_census_year;
    	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
    	    		chkFileName = "bnd_oa_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
    			} else {
    	    		sgis_census_meaning = "통계지역경계_집계구경계_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
    	    		chkFileName = "bnd_oa_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
    			}
    		}
    	}
    }
    //=====================================================================================================================
    else if ( "3".equals(sgis_census_id)) { //센서스지도(3), DB설계(0)
	  	if ( "0".equals(sgis_census_data_id) ) {
	  		
	  		savePath = savePath + "db";
	  		sgis_census_dir = sgis_census_dir +  "db";
	  		sgis_census_file = multi.getFilesystemName("census_file");
	  		id_nm1 = "BAS";
	  		id_nm2 = "DB";
	  		area_nm = sido_nm + " " + sigungu_nm;
	  		
	  		if( "00".equals(sgis_census_sido)) { //전국
		    		sgis_census_meaning = "센서스지도_DB설계_" + sgis_census_year;
		    		area_nm = "전국";
		    		chkFileName = "db_schema.hwp";
	  		} else {
	  			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
	  				
	  	    		sgis_census_meaning = "센서스지도_DB설계_" + sido_nm + "_" + sgis_census_year;
	  	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
	  	    		chkFileName = "db_schema.hwp";
	  			} else {
	  	    		sgis_census_meaning = "센서스지도_DB설계_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
	  	    		chkFileName = "db_schema.hwp";
	  			}
	  		}
	  	} else if ( "1".equals(sgis_census_data_id) ) { //센서스지도(3), 하천(1)
	  		
	  		savePath = savePath + "bas_river";
	  		sgis_census_dir = sgis_census_dir +  "bas_river";
	  		sgis_census_file = multi.getFilesystemName("census_file");
	  		id_nm1 = "BAS";
	  		id_nm2 = "RIVER";
	  		area_nm = sido_nm + " " + sigungu_nm;
	  		
	  		if( "00".equals(sgis_census_sido)) { //전국
		    		sgis_census_meaning = "센서스지도_하천_전국_" + sgis_census_year;
		    		area_nm = "전국";
		    		chkFileName = "bas_river_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  		} else {
	  			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
	  				
	  	    		sgis_census_meaning = "센서스지도_하천_" + sido_nm + "_" + sgis_census_year;
	  	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
	  	    		chkFileName = "bas_river_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  			} else {
	  	    		sgis_census_meaning = "센서스지도_하천_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
	  	    		chkFileName = "bas_river_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
	  			}
	  		}
	  	} else if ( "2".equals(sgis_census_data_id) ) { //센서스지도(3), 건물(2)
	  		
	  		savePath = savePath + "bas_bldg";
	  		sgis_census_dir = sgis_census_dir +  "bas_bldg";
	  		sgis_census_file = multi.getFilesystemName("census_file");
	  		id_nm1 = "BAS";
	  		id_nm2 = "BLDG";
	  		area_nm = sido_nm + " " + sigungu_nm;
	  		
	  		if( "00".equals(sgis_census_sido)) { //전국
		    		sgis_census_meaning = "센서스지도_건물_전국_" + sgis_census_year;
		    		area_nm = "전국";
		    		chkFileName = "bas_bldg_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  		} else {
	  			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
	  				
	  	    		sgis_census_meaning = "센서스지도_건물_" + sido_nm + "_" + sgis_census_year;
	  	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
	  	    		chkFileName = "bas_bldg_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  			} else {
	  	    		sgis_census_meaning = "센서스지도_건물_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
	  	    		chkFileName = "bas_bldg_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
	  			}
	  		}
	  	} else if ( "3".equals(sgis_census_data_id) ) { //센서스지도(3), 도로(3)
	  		
	  		savePath = savePath + "bas_road";
	  		sgis_census_dir = sgis_census_dir +  "bas_road";
	  		sgis_census_file = multi.getFilesystemName("census_file");
	  		id_nm1 = "BAS";
	  		id_nm2 = "ROAD";
	  		area_nm = sido_nm + " " + sigungu_nm;
	  		
	  		if( "00".equals(sgis_census_sido)) { //전국
		    		sgis_census_meaning = "센서스지도_도로_전국_" + sgis_census_year;
		    		area_nm = "전국";
		    		chkFileName = "bas_road_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  		} else {
	  			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
	  				
	  	    		sgis_census_meaning = "센서스지도_도로_" + sido_nm + "_" + sgis_census_year;
	  	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
	  	    		chkFileName = "bas_road_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  			} else {
	  	    		sgis_census_meaning = "센서스지도_도로_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
	  	    		chkFileName = "bas_road_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
	  			}
	  		}
	  	} else if ( "4".equals(sgis_census_data_id) ) { //센서스지도(3), 철도(4)
	  		
	  		savePath = savePath + "bas_rail";
	  		sgis_census_dir = sgis_census_dir +  "bas_rail";
	  		sgis_census_file = multi.getFilesystemName("census_file");
	  		id_nm1 = "BAS";
	  		id_nm2 = "RAIL";
	  		area_nm = sido_nm + " " + sigungu_nm;
	  		
	  		if( "00".equals(sgis_census_sido)) { //전국
		    		sgis_census_meaning = "센서스지도_철도_전국_" + sgis_census_year;
		    		area_nm = "전국";
		    		chkFileName = "bas_rail_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  		} else {
	  			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
	  				
	  	    		sgis_census_meaning = "센서스지도_철도_" + sido_nm + "_" + sgis_census_year;
	  	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
	  	    		chkFileName = "bas_rail_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  			} else {
	  	    		sgis_census_meaning = "센서스지도_철도_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
	  	    		chkFileName = "bas_rail_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
	  			}
	  		}
	  	} else if ( "5".equals(sgis_census_data_id) ) { //센서스지도(3), 등고(5)
	  		
	  		savePath = savePath + "bas_cntr";
	  		sgis_census_dir = sgis_census_dir +  "bas_cntr";
	  		sgis_census_file = multi.getFilesystemName("census_file");
	  		id_nm1 = "BAS";
	  		id_nm2 = "CNTR";
	  		area_nm = sido_nm + " " + sigungu_nm;
	  		
	  		if( "00".equals(sgis_census_sido)) { //전국
		    		sgis_census_meaning = "센서스지도_등고_전국_" + sgis_census_year;
		    		area_nm = "전국";
		    		chkFileName = "bas_cntr_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  		} else {
	  			if ( "00000".equals(sgis_census_sigungu) ){ //전체일 경우
	  				
	  	    		sgis_census_meaning = "센서스지도_등고_" + sido_nm + "_" + sgis_census_year;
	  	    		area_nm = sido_nm; //시도 전체일 경우 시도 만 표시
	  	    		chkFileName = "bas_cntr_" + sgis_census_sido + "_" + sgis_census_year + ".zip";
	  			} else {
	  	    		sgis_census_meaning = "센서스지도_등고_" + sido_nm + "_" + sigungu_nm + "_" + sgis_census_year;
	  	    		chkFileName = "bas_cntr_" + sgis_census_sigungu + "_" + sgis_census_year + ".zip";
	  			}
	  		}
	  	}
    
	}
  
    System.out.println("=========================getFilesystemName [" + multi.getFilesystemName("census_file"));
    System.out.println("=========================getFile [" + multi.getFile("census_file"));
    /*
    if ( ! chkFileName.equals(multi.getFilesystemName("census_file")) ) { //선택한정보와 파일명일 틀릴경우
    	out.print("<script>alert('첨부하신 파일명이 명명규칙과 다릅니다. 확인해주세요.\n명명규칙 : " + chkFileName + "\n첨부파일 : " + sgis_census_file + "'); history.back();</script>");
    }
    */
    
    
    Runtime rt = Runtime.getRuntime();
    try {
    	System.out.println("mv " + multi.getFile("census_file") + " " + savePath);
    	
    	rt.exec("mv " + multi.getFile("census_file") + " " + savePath ); //unix
    	
    	
    } catch (Exception e) {
    	
    }
    

    /****************************************/
    /* 등록 ==> sgis_census_sigungu_data 에 있으면 업데이트 없으면 인서트한다. */ 
    /****************************************/


    	
    	 
         /******************************/
         /* 자료구분 */
         /******************************/
		try {                   	 
	        	GeneralBroker broker = null;
	        	RecordModel rm2 = null;
	            broker = new GeneralBroker("ceaa00");
	            lData.setString("PARAM", "SINGLE_UPLOAD_DUP_CHK");
	            
	            lData.setString("sgis_census_id", 		sgis_census_id);
	            lData.setString("sgis_census_data_id", 	sgis_census_data_id);
	            lData.setString("sgis_census_year", 	sgis_census_year);
	            lData.setString("sgis_census_sido", 	sgis_census_sido);
	            lData.setString("sgis_census_sigungu", 	sgis_census_sigungu);
	            	            
	            
	            rm2 = broker.getList(lData);
	            
	            int i=0;

                while(formNames.hasMoreElements()) {
    	              formName = (String)formNames.nextElement();		//file tag명
    	              fileName = multi.getFilesystemName(formName);		//file tag내의 file명
    	
    	              //파일순서가 뒤바뀌므로 데이터도  바꾸어서 처리
    	              //int num = Integer.parseInt(formName.substring(16)) - 1;
    	              //out.print(sgis_census_stand_year[num] + " = " + formName + " = " + fileName + "<br>");
	
		            if(rm2 != null && rm2.next()) { //데이터가 있으면 업데이트한다.
		            	
		            	String 	isql  = " update sgis_census_sigungu_data ";
				        		isql += "		set sgis_census_dir			=	'"	+	sgis_census_dir			+	"'	"; 
				        		isql += "		, sgis_census_file 			=	'"	+	fileName				+	"'	"; 
				        		isql += "		, sgis_census_meaning 		=	'"	+	sgis_census_meaning		+	"'	"; 
				        		isql += "		, id_nm1 					=	'"	+	id_nm1					+	"'	"; 
				        		isql += "		, id_nm2 					=	'"	+	id_nm2					+	"'	"; 
				        		isql += "		, area_nm 					=	'"	+	area_nm					+	"'	"; 
				        		isql += "		, sido_nm 					=	'"	+	sido_nm					+	"'	"; 
				        		isql += "		, sigungu_nm 				=	'"	+	sigungu_nm				+	"'	"; 
				        		isql += "	where 								 ";
				        		isql += "		sgis_census_id		 = '"	+	sgis_census_id			+	"'	";
				        		isql += "	and sgis_census_data_id	 = '"	+	sgis_census_data_id		+	"'	";
				        		isql += "	and sgis_census_year	 = '"	+	sgis_census_year		+	"'	";
				        		isql += "	and sgis_census_sido	 = '"	+	sgis_census_sido		+	"'	";
				        		isql += "	and sgis_census_sigungu	 = '"	+	sgis_census_sigungu		+	"'	";
	                    
	                    System.out.println(isql);
	
	                    dmg.prepareStatement(isql);
	                    resultFlag = dmg.executeUpdate();
		     
		            } else {//데이터가 없으면 인서트한다.
		            	
	    	              String  isql = " insert into sgis_census_sigungu_data ";
	    	                      isql += "	( 								";
	    	                      isql += "		sgis_census_id				";
	    	                      isql += "		, sgis_census_data_id		";
	    	                      isql += "		, sgis_census_year			";
	    	                      isql += "		, sgis_census_sido			";
	    	                      isql += "		, sgis_census_sigungu			";
	    	                      isql += "		, sgis_census_dir			";
	    	                      isql += "		, sgis_census_file 			";
	    	                      isql += "		, sgis_census_meaning 			";
	    	                      isql += "		, id_nm1 			";
	    	                      isql += "		, id_nm2 			";
	    	                      isql += "		, area_nm 			";
	    	                      isql += "		, sido_nm 			";
	    	                      isql += "		, sigungu_nm 			";
	    	                      isql += "	) 								";
	    	                      isql += "	values 							";
	    	                      isql += "	( 								";
	    	                      isql += "	  '"	+	sgis_census_id			+	"'	";
	    	                      isql += "	, '"	+	sgis_census_data_id		+	"'	";
	    	                      isql += "	, '"	+	sgis_census_year		+	"'	";
	    	                      isql += "	, '"	+	sgis_census_sido		+	"'	";
	    	                      isql += "	, '"	+	sgis_census_sigungu		+	"'	";
	    	                      isql += "	, '"	+	sgis_census_dir			+	"'	";
	    	                      isql += "	, '"	+	fileName				+	"'	";
	    	                      isql += "	, '"	+	sgis_census_meaning		+	"'	";
	    	                      isql += "	, '"	+	id_nm1					+	"'	";
	    	                      isql += "	, '"	+	id_nm2					+	"'	";
	    	                      isql += "	, '"	+	area_nm					+	"'	";
	    	                      isql += "	, '"	+	sido_nm					+	"'	";
	    	                      isql += "	, '"	+	sigungu_nm				+	"'	";
	    	                      isql += "	) 											";
	    	                      
	    	                      System.out.println(isql);
	    	
	    	                      dmg.prepareStatement(isql);
	    	                      resultFlag = dmg.executeUpdate();
	                
	            	}
		            
		            i++;
                }
	            
		} catch(Exception e) {
		       	System.out.print("sgisWebError : ");
		      	//2015-12-03 시큐어코딩
		      	//e.printStackTrace();
		      	logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
	     

            



    if(resultFlag == 1) {
      if(!aT.equals("DEL")) {
	      //out.print("<script>alert('처리되었습니다.'); opener.location.href='gsks_01_04_03.jsp';</script>");
	      out.print("<script>alert('처리되었습니다.'); self.close();</script>");
	
	      String return_sgis_census_id = "";
	      String return_sgis_census_data_id = "";

	      if(aT.equals("INS")) {
	        return_sgis_census_id = sgis_census_id;
	        return_sgis_census_data_id = sgis_census_data_id;
	      } else {
	        return_sgis_census_id = origin_sgis_census_id;
	        return_sgis_census_data_id = origin_sgis_census_data_id;
	      }
%>
  <form name="fm" method="post" action="gsks_01_04_03_popup2.jsp">
    <input type="hidden" name="aT" value="RET">
    <input type="hidden" name="selected_sgis_census_id" value="<%=return_sgis_census_id %>">
    <input type="hidden" name="selected_sgis_census_data_id" value="<%=return_sgis_census_data_id %>">
  </form>
  <script>fm.submit();</script>
<%
      }
    } else {
      out.print("<script>alert('정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요.'); document.location.href='gsks_01_04_03_popup2.jsp';</script>");
    }

  }catch(Exception e) {
	  out.print("<script>alert('해당 년도의 데이터는 이미 존재합니다.'); document.location.href='gsks_01_04_03_popup2.jsp';</script>");
    System.out.print("sgisWebError : ");
  	//2015-12-03 시큐어코딩
 	 //e.printStackTrace();
 	 logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  } finally {
    dmg.close();
  }
%>
