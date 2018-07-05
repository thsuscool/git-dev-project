package kr.co.offton.jdf.db;

import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;
import java.io.StringReader;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Hashtable;

import kr.co.offton.jdf.util.StringUtil;
import kr.co.offton.jdf.cfg.*;
import kr.co.offton.jdf.basis.GeneralObject;
import kr.co.offton.pdf.basis.LData;

/**
 * <pre>
 * PGM_NAME: OFFTON DbUtil
 * DESC: sql을 관리하는 클래스
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public final class DbUtil extends GeneralObject {

  private static Hashtable sqlTable = new Hashtable();

  /**
   * <pre>
   * param hashtable에  name을 key로 하는 query 저장
   * @param name
   * @param query
   * </pre>
   */
  public static void setSql(String name, String query){
    if(logger.isDebugEnabled()) logger.debug("set("+name+") query");

    sqlTable.put(name ,query );
  }

  /**
   * <pre>
   * param hashtable에서  name에 해당하는 sql을 가져온다.
   * @param name
   * @return String
   * </pre>
   */
  public static String getSql(String name){
    if(logger.isDebugEnabled()) logger.debug("get("+name+") query");
    return (String)sqlTable.get(name);
  }

  /**
   * <pre>
   * param Object obj 에 맞는 SQL Data type 확인.
   * @param obj
   * @return int
   * @throws java.sql.SQLException
   * </pre>
   */
  public static int getSqlType(Object obj) throws SQLException {
    if(obj instanceof java.lang.String)
      return java.sql.Types.VARCHAR;
    else if(obj instanceof java.sql.Timestamp)
      return java.sql.Types.TIMESTAMP;
    else if(obj instanceof java.math.BigDecimal)
      return java.sql.Types.NUMERIC;
    else {
      SQLException se = new SQLException("Data("+obj+") Type Error");
      throw se;
    }
  }

  /**
   * <pre>
   * param String fieldType 에 맞는 SQL Data type 확인.
   * @param fieldType
   * @return int
   * @throws java.sql.SQLException
   * </pre>
   */
  public static int getSqlType(String fieldType) throws SQLException {
    if(fieldType.equalsIgnoreCase("java.lang.String"))
      return java.sql.Types.VARCHAR;
    else if(fieldType.equalsIgnoreCase("java.sql.Timestamp"))
      return java.sql.Types.TIMESTAMP;
    else if(fieldType.equalsIgnoreCase("java.math.BigDecimal"))
      return java.sql.Types.NUMERIC;
    else {
      SQLException se = new SQLException("Data("+fieldType+") Type Error");
      throw se;
    }
  }

 /**
  * <pre>
  * sql문에서 주석문과 쿼리문을 분리시킨다.
  * @param   qry  sql문
  * @return  String[] sql - sql[0]: commnet, sql[1]: query
  * @throws
  * </pre>
  **/
  public static String[] sqlCommentReader(String qry){
    String[] sql = new String[2];
    String line  = "";

    StringBuffer comment = new StringBuffer();
    StringBuffer query   = new StringBuffer();
    LineNumberReader rd  = null;

    try{
      rd = new LineNumberReader (new StringReader(qry));

      while( (line = rd.readLine() ) != null) {
        if(line.indexOf("--") > -1 && line.trim().indexOf("--")==0)
          comment.append(line).append("\n");
        else
          query.append(line).append("\n");
      }
      rd.close();
    }catch(IOException e){
    	// 2015-12-03 시큐어코딩
        logger.error(e);
        
        if(comment != null) {
        	comment = null;
        }
        
        if(query!= null) {
        	query = null;
        }
        
        if(rd != null) {
        	rd = null;
        }
    }

    sql[0] = comment.toString(); //for log
    sql[1] = query.toString();

    return sql;
  }

 /**
  * <pre>
  * sql file을 지정된 경로에서 load 시킨다.
  * @param   sqlFilePath  sql문이 있는 파일위치
  * @return  sql
  * @throws
  * </pre>
  **/
  public static String sqlFileLoader(String sqlFilePath){
    //hashTable에 이미 저장이 되어있으면 저장된 sql 사용
    if(sqlTable.containsKey(sqlFilePath) && !ConfigManager.getInstance().getSqlReload()) return DbUtil.getSql(sqlFilePath);

    String line = "";
    StringBuffer query = new StringBuffer();
    LineNumberReader rd = null;

    try{
      rd = new LineNumberReader (new FileReader(ConfigManager.getInstance().getSqlPath() + sqlFilePath));

      while( (line = rd.readLine() ) != null) {
          query.append(line).append("\n");
      }
    }catch(IOException e){
    	// 2015-12-03 시큐어코딩
        logger.error(e);
        
        line = null;
        query = null;
        rd = null;
    }finally{
      try{
        if(rd!=null) rd.close();
      }catch(IOException e){
    	// 2015-12-03 시큐어코딩
    	  logger.error(e);
    	  
    	  line = null;
    	  query = null;
    	  rd = null;
      }
    }

    DbUtil.setSql(sqlFilePath,query.toString());//해당 sql문 hashtable에 저장

    return query.toString();
  }
  


 /**
  * <pre>
  * 기존에 사용되던 sqlFileLoader(String sqlFilePath, int num)를 재정의했다.
  * @param   sqlFilePath  sql문이 있는 파일위치
  * @param   num          sql문에서 포한하고자 하는 조건들
  * @return  String       조건처리된 sql문을 리턴한다.
  * @throws
  * </pre>
  **/
  public static String sqlFileLoader(String sqlFilePath, int num){
    return sqlFileLoader(sqlFilePath, Integer.toString(num));
  }

 /**
  * <pre>
  * * @param  token에 해당하는 조건을 처리한 후 sql에 있는
  * name에 name을 Ldata에서 찾은후 해당하는 value를 쿼리에 치환
  * @param   sqlFilePath  sql문이 있는 파일위치
  * @param   token        sql문에서 포한하고자 하는 조건들  ex)"abc,add"
  * @param   lData        sql문에서 대체하고자 하는 값을 포함하고 있다
  * @return  String       조건처리된 sql문을 리턴한다.
  * @throws
  * </pre>
  **/
  public static String sqlFileLoader(String sqlFilePath, String token, LData lData){
    String[] sql = new String[2];
    String query   =  sqlFileLoader(sqlFilePath, token);
    String sqlToken = "";
    sql = sqlCommentReader(query);

    if(lData == null){lData = new LData();}

    do{
      sqlToken=getToken(sql[1],"@");
      if(sqlToken.equals("")) return sql[0]+sql[1];
      sql[1] = sql[1].replaceAll("@"+sqlToken,lData.get(sqlToken));
    }while(!sqlToken.equals(""));

    return sql[0]+sql[1];
  }
  
  /**
   * <pre>
   * * @param  token에 해당하는 조건을 처리한 후 sql에 있는
   * name에 name을 Ldata에서 찾은후 해당하는 value를 쿼리에 치환
   * @param   sqlFilePath  sql문이 있는 파일위치
   * @param   token        sql문에서 포한하고자 하는 조건들  ex)"abc,add"
   * @param   lData        sql문에서 대체하고자 하는 값을 포함하고 있다
   * @return  String       조건처리된 sql문을 리턴한다.
   * @throws
   * </pre>
   **/
   public static String sqlStringLoader(String sqlString, String token, LData lData){
     String[] sql = new String[2];
     String query   =  sqlStringLoader(sqlString, token);
     String sqlToken = "";
     sql = sqlCommentReader(query);

     if(lData == null){lData = new LData();}

     do{
       sqlToken=getToken(sql[1],"@");
       if(sqlToken.equals("")) return sql[0]+sql[1];
       sql[1] = sql[1].replaceAll("@"+sqlToken,lData.get(sqlToken));
     }while(!sqlToken.equals(""));

     return sql[0]+sql[1];
   }

 /**
  * <pre>
  * * @param  @name에 name을 Ldata에서 찾은후 해당하는 value를 쿼리에 치환
  * @param   sqlFilePath  sql문이 있는 파일위치
  * @param   lData        sql문에서 대체하고자 하는 값을 포함하고 있다
  * @return  String       조건치환된 sql문을 리턴한다.
  * @throws
  * </pre>
  **/
  public static String sqlFileLoader(String sqlFilePath, LData lData){
    return sqlFileLoader(sqlFilePath, "", lData);
  }

 /**
  * <pre>
  * 넘겨받은 경로에 있는 sql문을 가져온후 해당 sql문의 조건을 처리(include,exclude)한다.
  * @param   sqlFilePath  sql문이 있는 파일위치
  * @param   token        sql문에서 #넘버 로 분기 하고자 하는 조건들  ex)"1,2"
  * @return  String       조건처리된 sql문을 리턴한다.
  * @throws
  * </pre>
  **/
  public static String sqlFileLoader(String sqlFilePath, String token){
    String[] sql = new String[2];
    String query = sqlFileLoader(sqlFilePath);
    sql = sqlCommentReader(query);

    String[] tokens = token.replaceAll(" ","").split(",");
    StringBuffer qry = new StringBuffer();
    String sqlToken="";

    do{
      sqlToken=getToken(sql[1],"#");
      if(sqlToken.equals("")) return sql[0]+sql[1];

      String sqlTokens[] = sqlToken.split(","); // #a,b 조건내에 여러이름인 경우
      boolean isExist = false;
            Arrays.sort(tokens);
      for(int i=0; i<sqlTokens.length; i++ ){
        if(Arrays.binarySearch(tokens,sqlTokens[i])>-1){
          isExist = true;
          break;
        }
      }
      if(isExist){
        //include condition
      if(logger.isDebugEnabled())
          logger.debug("성공====>" + sqlToken);

        sql[1] = sql[1].replaceAll("#"+sqlToken,StringUtil.space(sqlToken.length()+1)); //replace "#abc" --> "    "
      }else{
        //exclude condition
        if(logger.isDebugEnabled())
            logger.debug("실패====>" + sqlToken);

        qry.setLength(0);
        qry.append(sql[1]);
        qry.replace(sql[1].indexOf("#"+sqlToken),sql[1].lastIndexOf("#"+sqlToken)+sqlToken.length()+1,"");
        sql[1] = qry.toString();
      }
    }while(!sqlToken.equals(""));

    return sql[0]+sql[1];
  }

  /**
   * <pre>
   * 넘겨받은 경로에 있는 sql문을 가져온후 해당 sql문의 조건을 처리(include,exclude)한다.
   * @param   sqlFilePath  sql문이 있는 파일위치
   * @param   token        sql문에서 #넘버 로 분기 하고자 하는 조건들  ex)"1,2"
   * @return  String       조건처리된 sql문을 리턴한다.
   * @throws
   * </pre>
   **/
   public static String sqlStringLoader(String sqlStringPath, String token){
     String[] sql = new String[2];
     
     DbUtil.setSql("queryString", sqlStringPath);
     String query = sqlStringPath;
     sql = sqlCommentReader(query);

     String[] tokens = token.replaceAll(" ","").split(",");
     StringBuffer qry = new StringBuffer();
     String sqlToken="";

     do{
       sqlToken=getToken(sql[1],"#");
       if(sqlToken.equals("")) return sql[0]+sql[1];

       String sqlTokens[] = sqlToken.split(","); // #a,b 조건내에 여러이름인 경우
       boolean isExist = false;
             Arrays.sort(tokens);
       for(int i=0; i<sqlTokens.length; i++ ){
         if(Arrays.binarySearch(tokens,sqlTokens[i])>-1){
           isExist = true;
           break;
         }
       }
       if(isExist){
         //include condition
       if(logger.isDebugEnabled())
           logger.debug("성공====>" + sqlToken);

         sql[1] = sql[1].replaceAll("#"+sqlToken,StringUtil.space(sqlToken.length()+1)); //replace "#abc" --> "    "
       }else{
         //exclude condition
         if(logger.isDebugEnabled())
             logger.debug("실패====>" + sqlToken);

         qry.setLength(0);
         qry.append(sql[1]);
         qry.replace(sql[1].indexOf("#"+sqlToken),sql[1].lastIndexOf("#"+sqlToken)+sqlToken.length()+1,"");
         sql[1] = qry.toString();
       }
     }while(!sqlToken.equals(""));

     return sql[0]+sql[1];
   }
 /**
  * <pre>
  * * @param  chr를 포함하는 문자를 찾아서 반환한다.
  * @param   sql          sql문
  * @param   chr          sql문에서 찾고자 하는 기호  ex)"#":sql 조건, "@":sql에서 대체
  * @return  String       조건처리된 sql문을 리턴한다.
  * @throws
  * </pre>
  **/
  private static String getToken(String sql, String chr){
    String rtn = "";
    int index = sql.indexOf(chr);

    if(index > -1){
      for(int i=index+1; i<sql.length(); i++){
        if(sql.substring(i,i+1).matches("\\s")) break;
        rtn += sql.substring(i,i+1);
      }
    }
    return rtn;
  }
}