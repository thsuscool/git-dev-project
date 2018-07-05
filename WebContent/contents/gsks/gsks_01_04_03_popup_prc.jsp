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

  String savePath = sc_filePath + "/census";			//저장 위치
  int sizeLimit   = fileSizeLimit * 400;	//2기가

  DbManager dmg = null;
  RecordModel rm = null;

  String sgis_census_id = "";
  String sgis_census_data_id = "";
  String sgis_census_name = "";
  String[] sgis_census_stand_year  = null;
  String sgis_census_public_format = "";
  String sgis_census_public_yn = "";
  String sgis_census_location = "";
  String sgis_census_price = "";
  String sgis_census_file = "";
  String aT = "";
  String origin_sgis_census_id = "";
  String origin_sgis_census_data_id = "";
  String inUse[] = null;
  String[] removeYear = null;

  String formName = "";
  String fileName = "";

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

    sgis_census_id = multi.getParameter("sgis_census_id");																	//구분
    sgis_census_name  = multi.getParameter("census_name");											//대상자료명
    sgis_census_stand_year = multi.getParameterValues("census_stand_year");				//기준년도
    sgis_census_public_format = multi.getParameter("census_public_format");	//배포포맷
    sgis_census_public_yn = multi.getParameter("census_public_yn");							//공개여부
    sgis_census_location = multi.getParameter("census_location");									//대상지역
    sgis_census_price = multi.getParameter("census_price");													//가격

    aT = multi.getParameter("aT");																												//처리구분
    removeYear = multi.getParameterValues("removeYear");								//파일삭제년도

    origin_sgis_census_id = multi.getParameter("origin_sgis_census_id");										//이전구분
    origin_sgis_census_data_id = multi.getParameter("origin_sgis_census_data_id");					//이전자료id

    inUse = multi.getParameterValues("inUse");				//내부처리구분

    int resultFlag = 0;

    /****************************************/
    /* 등록 */
    /****************************************/

    if(aT.equals("INS")) {

        String msql = " select nvl(max(sgis_census_data_id)+1,0) maxnum from sgis_census_data	";
                msql += "	where sgis_census_id = '"+sgis_census_id+"'";

        dmg.prepareStatement(msql);
        rm = dmg.select();

        if(rm.next()) sgis_census_data_id  = String.valueOf((BigDecimal)rm.get("maxnum"));

              /*************************/
              /* 센서스 자료 */
              /*************************/
              sql += " insert into sgis_census_data	";
              sql += "				( ";
              sql += "							sgis_census_data_id		";
              sql += "					    , sgis_census_name ";
              sql += "					    , sgis_census_id ";
              sql += "					    , sgis_census_public_format ";
              sql += "					    , sgis_census_public_yn ";
              sql += "					    , sgis_census_location ";
              sql += "					    , sgis_census_price ";
              sql += "					) ";
              sql += "					values ";
              sql += "					( ";
              sql += "						'"+sgis_census_data_id+"'	";
              sql += "					, '"+sgis_census_name+"'		";
              sql += "					, '"+sgis_census_id+"'";
              sql += "					, '"+sgis_census_public_format+"'";
              sql += "					, '"+sgis_census_public_yn+"'";
              sql += "					, '"+sgis_census_location+"'";
              sql += "					, '"+sgis_census_price+"'";
              sql += "					)";

              dmg.prepareStatement(sql);
              resultFlag = dmg.executeUpdate();

            /*************************/
            /* 센서스 기준년도 */
            /*************************/
            int i=0;

            while(formNames.hasMoreElements()) {
              formName = (String)formNames.nextElement();														//file tag명
              fileName = multi.getFilesystemName(formName);													//file tag내의 file명

              //파일순서가 뒤바뀌므로 데이터도  바꾸어서 처리
              int num = Integer.parseInt(formName.substring(16)) - 1;
              //out.print(sgis_census_stand_year[num] + " = " + formName + " = " + fileName + "<br>");

              String isql = " insert into sgis_census_year_code ";
                      isql += "	( ";
                      isql += "		sgis_census_id		";
                      isql += "		, sgis_census_data_id	";
                      isql += "		, sgis_census_year	";
                      isql += "		, sgis_census_file ";
                      isql += "	) ";
                      isql += "	values ";
                      isql += "	( ";
                      isql += "	'"+sgis_census_id+"'	";
                      isql += "	, '"+sgis_census_data_id+"'	";
                      isql += "	, '"+sgis_census_stand_year[num]+"'	";
                      isql += "	, '"+fileName+"'	";
                      isql += "	) ";

                      dmg.prepareStatement(isql);
                      dmg.executeUpdate();

                i++;
            }

    } else if(aT.equals("UPD")){

    /****************************************/
    /* 수정 */
    /****************************************/

            sql += " update sgis_census_data	";
            sql += " 				set		";
            sql += "							sgis_census_name = '"+sgis_census_name+"' ";
            sql += "							, sgis_census_public_format = '"+sgis_census_public_format+"' ";
            sql += "							, sgis_census_public_yn = '"+sgis_census_public_yn+"' ";
            sql += "							, sgis_census_location = '"+sgis_census_location+"' ";
            sql += "							, sgis_census_price = '"+sgis_census_price+"' ";
            sql += "		where sgis_census_id = '"+origin_sgis_census_id+"'		";
            sql += "							and sgis_census_data_id = '"+origin_sgis_census_data_id+"'		";
                        try{
                          System.out.println("origin_sgis_census_id : " + origin_sgis_census_id);
                          System.out.println("origin_sgis_census_data_id : " + origin_sgis_census_data_id);
            dmg.prepareStatement(sql);
            resultFlag = dmg.executeUpdate();
                      }catch(Exception e) {
                        System.out.print("sgisWebError : ");
	                      //2015-12-03 시큐어코딩
	                      //e.printStackTrace();
	                      logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
                        }

            /********************************/
            /* 센서스 기준년도 삭제 */
            /* 삭제 체크된 경우만 */
            /********************************/
            if(removeYear != null) {
              for(int k=0; k < removeYear.length; k++) {

                String dsql1 = " delete from sgis_census_req_year_code ";
                        dsql1 += "	where sgis_census_id = '"+origin_sgis_census_id+"' ";
                        dsql1 += "					and sgis_census_data_id = '"+origin_sgis_census_data_id+"' ";
                        dsql1 += "					and sgis_census_req_year = '"+removeYear[k]+"' ";

                        dmg.prepareStatement(dsql1);
                        dmg.executeUpdate();

                String dsql = " delete from sgis_census_year_code	";
                        dsql += "		where sgis_census_id = '"+origin_sgis_census_id+"'	";
                        dsql += "						and sgis_census_data_id = '"+origin_sgis_census_data_id+"' ";
                        dsql += "						and sgis_census_year = '"+removeYear[k]+"' ";

                        dmg.prepareStatement(dsql);
                        dmg.executeUpdate();
              }
            }

            int i=0;

            while(formNames.hasMoreElements()) {
              formName = (String)formNames.nextElement();														//file tag명
              fileName = multi.getFilesystemName(formName);													//file tag내의 file명

              //파일순서가 뒤바뀌므로 데이터도  바꾸어서 처리
              int num = Integer.parseInt(formName.substring(16)) - 1;	//census_year_file1(16자리)

              //저장된 년도 수정
              if(inUse[num].equals("U")) {
                if(fileName != null) {	//파일이 있을경우만
                String usql = " update sgis_census_year_code set	";
                          usql += "	sgis_census_file = '"+fileName+"' ";
                          usql += " where sgis_census_id = '"+origin_sgis_census_id+"'";
                          usql += " 				and sgis_census_data_id = '"+origin_sgis_census_data_id+"'";
                          usql += "					and sgis_census_year = '"+sgis_census_stand_year[num]+"' ";

                        dmg.prepareStatement(usql);
                        dmg.executeUpdate();
                }
              //신규년도 등록
              } else {
              //out.print(sgis_census_stand_year[num] + " = " + formName + " = " + fileName + "<br>");

                String isql = " insert into sgis_census_year_code ";
                        isql += "	( ";
                        isql += "		sgis_census_id		";
                        isql += "		, sgis_census_data_id	";
                        isql += "		, sgis_census_year	";
                        isql += "		, sgis_census_file ";
                        isql += "	) ";
                        isql += "	values ";
                        isql += "	( ";
                        isql += "	'"+origin_sgis_census_id+"'	";
                        isql += "	, '"+origin_sgis_census_data_id+"'	";
                        isql += "	, '"+sgis_census_stand_year[num]+"'	";
                        isql += "	, '"+fileName+"'	";
                        isql += "	) ";

                        dmg.prepareStatement(isql);
                        dmg.executeUpdate();
              }

                i++;
            }

    } else if(aT.equals("DEL")) {

      /****************************************/
      /* 삭제 */
      /****************************************/

          //센서스 기준년도 삭제
          String dsql1 = "	delete from sgis_census_year_code	";
                  dsql1 += "		where sgis_census_id = '"+origin_sgis_census_id+"'";
                  dsql1 += "								and sgis_census_data_id = '"+origin_sgis_census_data_id+"'";

                  dmg.prepareStatement(dsql1);
                  dmg.executeUpdate();

          //센서스 자료신청년도 삭제
          String dsql2 = "	delete from sgis_census_req_year_code	";
                  dsql2 += "		where sgis_census_id = '"+origin_sgis_census_id+"'";
                  dsql2 += "								and sgis_census_data_id = '"+origin_sgis_census_data_id+"'";

                  dmg.prepareStatement(dsql2);
                  dmg.executeUpdate();

          //센서스 자료신청 삭제
          String dsql3 = "	delete from sgis_census_req	";
                  dsql3 += "		where sgis_census_id = '"+origin_sgis_census_id+"'";
                  dsql3 += "								and sgis_census_data_id = '"+origin_sgis_census_data_id+"'";

                  dmg.prepareStatement(dsql3);
                  dmg.executeUpdate();

          //센서스 자료 삭제
          sql += " delete from sgis_census_data	";
          sql += "		where sgis_census_id = '"+origin_sgis_census_id+"'		";
          sql += "							and sgis_census_data_id= '"+origin_sgis_census_data_id+"'		";

          dmg.prepareStatement(sql);
          resultFlag = dmg.executeUpdate();
    }

    if(resultFlag == 1) {
      if(!aT.equals("DEL")) {
      out.print("<script>alert('처리되었습니다.'); opener.location.href='gsks_01_04_03.jsp';</script>");

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
  <form name="fm" method="post" action="gsks_01_04_03_popup.jsp">
    <input type="hidden" name="aT" value="RET">
    <input type="hidden" name="selected_sgis_census_id" value="<%=return_sgis_census_id %>">
    <input type="hidden" name="selected_sgis_census_data_id" value="<%=return_sgis_census_data_id %>">
  </form>
  <script>fm.submit();</script>
<%
      }
    } else {
      out.print("<script>alert('정상적으로 처리되지 않았습니다. 다시한번 시도해 주세요.'); history.back();</script>");
    }

  }catch(Exception e) {
    System.out.print("sgisWebError : ");
	  //2015-12-03 시큐어코딩
	  //e.printStackTrace();
	  logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
  } finally {
    dmg.close();
  }
%>
