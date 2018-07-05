package	kr.co.offton.pdf.basis;

import java.lang.reflect.*;
import java.util.*;
import java.sql.*;

import org.apache.log4j.Logger;

import kr.co.offton.pdf.*;
import kr.co.offton.jdf.basis.*;
import kr.co.offton.jdf.db.*;

/**
 * <pre>
 * PGM_NAME: OFFTON(WISE 통합관리 시스템) GeneralBroker
 * DESC: VIEW(JSP) 단에서 이루어지는 모든 DB관련 작업의 transaction 처리를 담당하는 CLASS이다.
 *       GeneralBroker 객체 생성은 VIEW에서 이루어지며, DB 관련 로직을 처리하는
 *       GeneralDAO 객체와 DB Connection을 관리하는 DbManager 객체를 생성하고 두 객체를 연결한다.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2005
 * history: version 1.0
 * see:
 * </pre>
 **/

public class GeneralBroker extends GeneralObject
{
    String dbPoolName;
    String programId;
    
    static Logger logger = Logger.getRootLogger();

    /**
     * <pre>
     * 생성자 - 내부적으로 setDbPoolName(String) 메소드를 호출하여 DB Pool 이름을 세팅한다.
     * </pre>
     */
    public GeneralBroker()
    {
        setDbPoolName("stic_ims");
    }

    /**
     * <pre>
     * 생성자 - 기본 생성자인 GeneralBroker()를 호출하여 DB Pool 이름을 세팅하고
     *         setProgramId(String)을 호출하여 프로그램 ID를 초기화한다.
     * </pre>
     */
    public GeneralBroker(String programId)
    {
        this();
        setProgramId(programId);
    }

    /**
     * <pre>
     * 전역변수로 선언된 dbPoolName을 리턴한다.
     * @return String
     * </pre>
     */
    public String getDbPoolName()
    {
        return this.dbPoolName;
    }

    /**
     * <pre>
     * 전역변수로 선언된 dbPoolName을 매개변수로 전달받은 커넥션풀 이름으로 세팅한다.
     * @param  dbPoolName
     * </pre>
     */
    public void setDbPoolName(String dbPoolName)
    {
        this.dbPoolName = dbPoolName;
    }

    /**
     * <pre>
     * 전역변수로 선언된 programId를 리턴한다.
     * @return String
     * </pre>
     */
    public String getProgramId()
    {
        return this.programId;
    }

    /**
     * <pre>
     * 전역변수로 선언된 programId를 매개변수로 전달받은 프로그램 ID로 세팅한다.
     * @param  dbPoolName
     * </pre>
     */
    public void setProgramId(String programId)
    {
        this.programId = programId;
    }

    /**
     * <pre>
     * 전역변수로 선언된 programId와 클래스 명명 규칙 문자들을 조합하여,
     * DB 관련 로직을 처리하기 위해 GeneralDAO 클래스를 상속받아서 만든 클래스의 이름을 리턴한다.
     * 리턴하는 문자열은 클래스의 패키지명까지 포함된다.
     * @return String
     * </pre>
     */
    public String getDAOClassName()
    {
        return this.programId.substring(0, 2) + "." + this.programId + "." + this.programId.substring(0,1).toUpperCase()+ this.programId.substring(1) + "DAO";
    }

    /**
     * <pre>
     * DB 관련 로직을 처리하기 위해 GeneralDAO 클래스를 상속받아서 만든 클래스의 객체를 생성하고 리턴한다.
     * 내부적으로 setDbManager(DbManager) 메소드를 호출하여
     * 생성한 클래스 객체에 매개변수로 전달받은 DbManager 객체를 세팅한다.
     * @param dbmgr
     * @return GeneralDAO
     * @throws Exception
     * </pre>
     */
    public GeneralDAO getDAO(DbManager dbmgr) throws Exception
    {
        GeneralDAO dao = null;

        try
        {
            dao = (GeneralDAO) Class.forName(getDAOClassName()).newInstance();
            dao.setDbManager(dbmgr);
        }
        catch (Exception e)
        {
        	e.printStackTrace();
            throw (new Exception("DAO("+getDAOClassName()+") Class Create Error"));
        }

        return dao;
    }

    /**
     * <pre>
     * '|' 구분자로 조합된 복수 Key와 복수 Value 문자열을 Key & Value로 조합된 LData 객체에 저장한 다음
     * 복수 개의 LData를 Vector에 담아 리턴한다. 여러개의 데이터를 처리할 때 사용한다.
     * @param keyValues
     * @param keyNames
     * @return Vector
     * @throws Exception
     * </pre>
     */
    public Vector getKeys(String keyValues, String keyNames) throws Exception
    {
        Vector keys = new Vector(1024);
        StringTokenizer st = new StringTokenizer(keyValues, ",");

        while(st.hasMoreTokens())
        {
            StringTokenizer subst = new StringTokenizer(st.nextToken(),"|");
            StringTokenizer keyst = new StringTokenizer(keyNames,"|");

            String keyDatas[]  = new String [subst.countTokens()];
            String nameDatas[] = new String [keyst.countTokens()];

            int i = 0;
            while(subst.hasMoreTokens()) keyDatas[i++] = subst.nextToken();

            i = 0;
            while(keyst.hasMoreTokens()) nameDatas[i++] = keyst.nextToken();

            LData lData = new LData();

            String paramName  = "";
            String paramValue = "";

            for(i = 0; i < keyDatas.length; i++)
            {
                if(nameDatas.length > 0)
                {
                    paramName = nameDatas[i];
                }
                else
                {
                    paramName = "key" + Integer.toString(i+1);
                }

                paramValue = keyDatas[i];
                lData.setString(paramName, paramValue);

                if(logger.isDebugEnabled()) logger.debug("getKeys() - setMethod("+paramName+") = value("+paramValue+")");
            }
            keys.addElement(lData);
        }

        keys.trimToSize();

        return keys;
    }

    /**
     * <pre>
     * 일반적인 DB관련 작업(CRUD) 처리를 총괄하는 메소드로 대부분 VIEW(JSP)에서 호출된다.
     * 작업모드에 대한 상태값과 FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받는다.
     * 해당 VIEW와 관련된 DAO 클래스의 객체를 생성한 다음 작업을 완료하고 처리 건수를 리턴한다.
     * @param aT
     * @param lData
     * @return int
     * @throws SQLException
     * @throws Exception
     * </pre>
     */
    public int process(int aT, LData lData) throws SQLException, Exception
    {
        int rtn = 0;
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao  = getDAO(dbmgr);
        dbmgr.setAutoCommit(false);

        System.out.println(aT);
        
        try
        {
            switch(aT)
            {
                case Const.P_RET :
                                    rtn = dao.retrieve(lData);
                                    break;
                case Const.P_INS :
                                    rtn = dao.insert(lData);
                                    break;
                case Const.P_UPD :
                                    rtn = dao.update(lData);
                                    break;
                case Const.P_DEL :
                                    rtn = dao.delete(lData);
                                    break;
                default :
                                    rtn = Const.E_ERROR;
                                    break;
            }

            dbmgr.commit();
        }
        catch (Exception e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }

        return rtn;
    }

    /**
     * <pre>
     * 페이징 처리된 여러 건의 데이터를 조회를 총괄하는 메소드로 대부분 VIEW(JSP)에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData, 시작페이지, 한 페이지 당 게시물 수를 매개변수로 전달받는다.
     * 해당 VIEW와 관련된 DAO 클래스의 객체를 생성한 다음 작업을 완료하고 RecodeModel의 배열 객체를 리턴한다.
     * @param ldata
     * @param pg
     * @param pgSize
     * @return kr.co.offton.jdf.db.RecordModel[]
     * @throws SQLException
     * @throws Exception
     * </pre>
     */
    public RecordModel getList(LData ldata, int pg, int pgSize) throws SQLException, Exception
    {
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao  = getDAO(dbmgr);

        try
        {
            return dao.getList(ldata,pg,pgSize);
        }
        catch (Exception e)
        {
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }
    }

    /**
     * <pre>
     * 페이징 처리를 하지 않는 여러 건의 데이터를 조회를 총괄하는 메소드로 대부분 VIEW(JSP)에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받는다.
     * 해당 VIEW와 관련된 DAO 클래스의 객체를 생성한 다음 작업을 완료하고 RecodeModel 객체를 리턴한다.
     * @param ldata
     * @return kr.co.offton.jdf.db.RecordModel
     * @throws SQLException
     * @throws Exception
     * </pre>
     */
    public RecordModel getList(LData ldata) throws SQLException, Exception
    {
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao  = getDAO(dbmgr);

        try
        {
          logger.debug("getDbPoolName: "+getDbPoolName());
            return dao.getList(ldata);
        }
        catch (Exception e)
        {
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }
    }

    /**
     * <pre>
     * 일반적인 DB관련 멀티 삭제 처리를 총괄하는 메소드로 대부분 VIEW(JSP)에서 호출된다.
     * 멀티 삭제에 필요한 여러개의 Key와 Value가 저장된 문자열을 매개변수로 전달받는다.
     * 해당 VIEW와 관련된 DAO 클래스의 객체를 생성한 다음 작업을 완료하고 처리 건수를 리턴한다.
     * @param keyValues
     * @param keyNames
     * @return int
     * @throws SQLException
     * @throws Exception
     * </pre>
     */
    public int delSelections(String keyValues, String keyNames) throws SQLException, Exception
    {
        int rtn = 0;
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao = getDAO(dbmgr);
        LData lData = null;
        dbmgr.setAutoCommit(false);

        try
        {
            for (Enumeration e = getKeys(keyValues, keyNames).elements() ; e.hasMoreElements() ;)
            {
                lData = (LData)e.nextElement();
                rtn += dao.delete(lData);
            }
            dbmgr.commit();
        }
        catch (Exception e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }

        return rtn;
    }

    /**
     * <pre>
     * 게시판에서 게시물 조회수를 업데이트 할 때 사용하는 메소드로 대부분 VIEW(JSP)에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받는다.
     * 해당 VIEW와 관련된 DAO 클래스의 객체를 생성한 다음 작업을 완료하고 처리 건수를 리턴한다.
     * @param ldata
     * @return int
     * @throws SQLException
     * @throws Exception
     * </pre>
     */
    public int getUpdateViewCnt(LData ldata) throws SQLException, Exception
    {
        int rtn = 0;
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao = getDAO(dbmgr);

        dbmgr.setAutoCommit(false);

        try
        {
            rtn = dao.updateViewCnt(ldata);
            dbmgr.commit();
        }
        catch (Exception e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }

        return rtn;
    }

    /**
    * <pre>
    * DAO 클래스에 선언된 사용자 정의 함수를 호출하기 위한 메소드이다.
    * DAO 클래스의 호출하고자 하는 메소드 이름과 호출시 필요한 파라메터를 매개변수로 받는다.
    * GeneralDAO에 클래스에 선언된 메소드가 아닌, 특별한 작업 처리를 위해서 사용자가 직접 만든 메소드는
    * 반드시 methodCall(String, Object[]) 메소드를 이용해서 호출되어야 한다.
    * 호출 되는 메소드의 작업이 완료된 후 처리 건수를 리턴한다.
    * @param  methodName
    * @param  objs
    * @return Object   Object 결과값을 받는다.
    * @throws SQLException
    * @throws Exception
    * </pre>
    */
    public Object methodCall(String methodName, Object[] objs) throws SQLException, Exception
    {
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao = getDAO(dbmgr);
        Object rtn = null;
        Class[] paramTypes = new Class[] { objs.getClass() };
        Object paramObjs[] = new Object[] { objs };
        dbmgr.setAutoCommit(false);

        try
        {
            rtn = dao.getClass().getMethod(methodName, paramTypes).invoke(dao, paramObjs);
            dbmgr.commit();
            return rtn;
        }
        catch (InvocationTargetException e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw (Exception)e.getTargetException();
        }
        catch (Exception e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }
    }

    /**
     * methodCall(String, LData)
     * <pre>[ex]
     * int exeCount = ((Integer) broker.methodCall("insertMulti", lData)).intValue();
     * added by KIM HYEONG SEOP @ 2008-05-09
     * </pre>
     *
     * @param methodName
     * @param lData
     * @return
     * @throws SQLException
     * @throws Exception
     */
    public Object methodCall(String methodName, LData lData) throws SQLException, Exception
    {
        DbManager dbmgr = new DbManager(getDbPoolName());
        GeneralDAO dao = getDAO(dbmgr);
        Object rtn = null;
        dbmgr.setAutoCommit(false);

        try
        {
            Method m = dao.getClass().getMethod(methodName, new Class[] { LData.class });
            rtn = m.invoke(dao, new Object[] { lData });
            dbmgr.commit();
            return rtn;
        }
        catch (InvocationTargetException e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw (Exception)e.getTargetException();
        }
        catch (Exception e)
        {
            dbmgr.rollback();
            logger.error(this, e);
            throw e;
        }
        finally
        {
          if(dbmgr != null)
            dbmgr.close();
        }
    }
}