package kr.co.offton.pdf.basis;

import kr.co.offton.jdf.db.*;
import kr.co.offton.jdf.basis.*;

/**
 * <pre>
 * PGM_NAME: OFFTON(WISE 통합관리 시스템) GeneralDAO
 * DESC: DB 관련 로직을 처리하는 class로서 객체의 생성은 GeneralBroker에서 이루어진다.
 *       DbUtil 클래스의 sqlFileLoader 메소드를 이용하여 SQL을 로드하고,
 *       GeneralBroker로 부터 전달 받은 DbManager 객체를 이용하여 업무 관련 로직을 처리한다.
 * author: (주)옵톤 Offton Co., Ltd.
 * since: 2005
 * history: version 1.0
 * see:
 * </pre>
 **/

abstract public class GeneralDAO extends GeneralObject
{
    protected DbManager dbmgr;

    /**
     * <pre>
     * 생성자
     * </pre>
     */
    public GeneralDAO(){ }

    /**
     * <pre>
     * 생성자 - DB와 Connection을 맺는 DbManager 클래스의 객체를 매개변수로 전달받아,
     * 전역으로 선언된 DbManager 클래스의 객체에 할당하는 setDbManager(DbManager)를 호출한다.
     * @param  dbmgr
     * </pre>
     */
    public GeneralDAO(DbManager dbmgr)
    {
        setDbManager(dbmgr);
    }

    /**
     * <pre>
     * 전역으로 선언된 DbManager 클래스의 객체에 매개변수로 전달된 DbManager 객체를 할당한다.
     * @param  dbmgr
     * </pre>
     */
    public void setDbManager(DbManager dbmgr)
    {
        this.dbmgr = dbmgr;
    }

    /**
     * <pre>
     * 전역으로 선언된 DbManager 클래스의 객체를 리턴한다.
     * @return DbManager
     * </pre>
     */
    public DbManager getDbManager()
    {
        return dbmgr;
    }

    /**
     * <pre>
     * 리스트형 조회 SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @return String
     * </pre>
     */
    public String getListSql() { return null; };

    /**
     * <pre>
     * 단순 조회 SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @return String
     * </pre>
     */
    public String getRetrieveSql() { return null; };

    /**
     * <pre>
     * Insert SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @return String
     * </pre>
     */
    public String getInsertSql() { return null; };

    /**
     * <pre>
     * Update SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @return String
     * </pre>
     */
    public String getUpdateSql() { return null; };

    /**
     * <pre>
     * Delete SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @return String
     * </pre>
     */
    public String getDeleteSql() { return null; };

    /**
     * <pre>
     * Update SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @return String
     * </pre>
     */
    public String getUpdateViewCntSql(){ return null; };

    /**
     * <pre>
     * 리스트형 조회 SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * FORM에서 넘어온 데이터를 이용하여 특별한 로직을 수행할 때 사용한다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getListSql(LData lData) { return getListSql(); };

    /**
     * <pre>
     * 단순 조회 SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * FORM에서 넘어온 데이터를 이용하여 특별한 로직을 수행할 때 사용한다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getRetrieveSql(LData lData) { return getRetrieveSql(); };

    /**
     * <pre>
     * Insert SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * FORM에서 넘어온 데이터를 이용하여 특별한 로직을 수행할 때 사용한다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getInsertSql(LData lData) { return getInsertSql(); };

    /**
     * <pre>
     * Update SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * FORM에서 넘어온 데이터를 이용하여 특별한 로직을 수행할 때 사용한다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getUpdateSql(LData lData) { return getUpdateSql(); };

    /**
     * <pre>
     * Delete SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * FORM에서 넘어온 데이터를 이용하여 특별한 로직을 수행할 때 사용한다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getDeleteSql(LData lData) { return getDeleteSql(); };

    /**
     * <pre>
     * 게시판에서 조회수를 업데이트하는 SQL String을 리턴하기 위해서 미리 선언된 메소드이다.
     * 응용프로그램 단에서는 GeneralDAO 클래스를 상속받은 새로운 클래스를 만든 다음
     * 해당 메소드를 Overriding해서 사용한다.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getUpdateViewCntSql(LData lData) { return getUpdateViewCntSql(); };

    /**
     * <pre>
     * 1건의 데이터를 조회할 때 사용한다.
     * 일반적으로 GeneralBroker의 process(int, LData) 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받아 DbManager 클래스의
     * prepareStatement 메소드를 이용하여 데이터를 조회한다.
     * 조회 후 결과 데이터를 매개변수로 전달받은 LData 객체에 담고 완료 카운트를 리턴한다.
     * @param lData
     * @return int
     * @throws Exception
     * </pre>
     */
    public int retrieve(LData lData)  throws Exception
    {
        int retVal = 0;
        dbmgr.prepareStatement(getRetrieveSql(lData), lData);
        RecordModel rm = dbmgr.select();



        if(rm.next())  { lData.populate(rm); retVal = 1; }

        return retVal;
    }

    /**
     * <pre>
     * 1건의 데이터를 insert 할 때 사용한다.
     * 일반적으로 GeneralBroker의 process(int, LData) 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받아 DbManager 클래스의
     * prepareStatement 메소드를 이용하여 작업을 처리하고 처리 건수를 리턴한다.
     * @param lData
     * @return int
     * @throws Exception
     * </pre>
     */
    public int insert(LData lData)  throws Exception
    {
        int retVal = 0;
        dbmgr.prepareStatement(getInsertSql(lData), lData);
        retVal = dbmgr.executeUpdate();

        return retVal;
    }

    /**
     * <pre>
     * 1건의 데이터를 update 할 때 사용한다.
     * 일반적으로 GeneralBroker의 process(int, LData) 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받아 DbManager 클래스의
     * prepareStatement 메소드를 이용하여 작업을 처리하고 처리 건수를 리턴한다.
     * @param lData
     * @return int
     * @throws Exception
     * </pre>
     */
    public int update(LData lData)  throws Exception
    {
        int retVal = 0;
        dbmgr.prepareStatement(getUpdateSql(lData), lData);
        retVal = dbmgr.executeUpdate();

        return retVal;
    }

    /**
     * <pre>
     * 1건의 데이터를 delete 할 때 사용한다.
     * 일반적으로 GeneralBroker의 process(int, LData) 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받아 DbManager 클래스의
     * prepareStatement 메소드를 이용하여 작업을 처리하고 처리 건수를 리턴한다.
     * @param lData
     * @return int
     * @throws Exception
     * </pre>
     */
    public int delete(LData lData)  throws Exception
    {
        int retVal = 0;
        dbmgr.prepareStatement(getDeleteSql(lData), lData);
        retVal = dbmgr.executeUpdate();

        return retVal;
    }

    /**
	 * GeneralDAO의 getList(LData lData) 메소드 오버라이딩.
	 * @param param 쿼리 파라메터
	 * @param sql 쿼리 파일
	 * @return
	 * @throws Exception
	 */
	protected RecordModel getList(LData param, String sql) throws Exception {
		sql = DbUtil.sqlFileLoader(sql);
        
		dbmgr.prepareStatement(sql, param);
        return dbmgr.select();
	}
	
	/**
	 * GeneralDAO의 getList(LData lData) 메소드 오버라이딩.
	 * @param param 쿼리 파라메터
	 * @param sql 쿼리 파일
	 * @param args 동적 쿼리
	 * @return
	 * @throws Exception
	 */
	protected RecordModel getList(LData param, String sql, String args) throws Exception {
		sql = DbUtil.sqlFileLoader(sql, args);
        
		dbmgr.prepareStatement(sql, param);
        return dbmgr.select();
	}
	
	/**
	 * GeneralDAO의 retrieve(LData lData) 메소드 오버라이딩.
	 * @param param 쿼리 파라메터
	 * @param sql 쿼리 파일
	 * @return
	 * @throws Exception
	 */
	protected int retrieve(LData param, String sql)  throws Exception {
		sql = DbUtil.sqlFileLoader(sql);
		
        int retVal = 0;
        dbmgr.prepareStatement(sql, param);
        RecordModel rm = dbmgr.select();
        if(rm.next())  { param.populate(rm); retVal = 1; }
        return retVal;
    }
	
	/**
	 * GeneralDAO의 insert(LData lData) 메소드 오버라이딩.
	 * @param param 쿼리 파라메터
	 * @param sql 쿼리 파일
	 * @return
	 * @throws Exception
	 */
	protected int insert(LData lData, String sql)  throws Exception {
		sql = DbUtil.sqlFileLoader(sql);

		int retVal = 0;
        dbmgr.prepareStatement(sql, lData);
        retVal = dbmgr.executeUpdate();
        return retVal;
    }
	
	/**
	 * GeneralDAO의 update(LData lData) 메소드 오버라이딩.
	 * @param param 쿼리 파라메터
	 * @param sql 쿼리 파일
	 * @return
	 * @throws Exception
	 */
	protected int update(LData lData, String sql)  throws Exception {
		sql = DbUtil.sqlFileLoader(sql);
		
		int retVal = 0;
        dbmgr.prepareStatement(sql, lData);
        retVal = dbmgr.executeUpdate();
        return retVal;
    }
	
	/**
	 * GeneralDAO의 delete(LData lData) 메소드 오버라이딩.
	 * @param param 쿼리 파라메터
	 * @param sql 쿼리 파일
	 * @return
	 * @throws Exception
	 */
	protected int delete(LData lData, String sql)  throws Exception {
		sql = DbUtil.sqlFileLoader(sql);
		
		int retVal = 0;
        dbmgr.prepareStatement(sql, lData);
        retVal = dbmgr.executeUpdate();
        return retVal;
    }
	
    /**
     * <pre>
     * 게시판에서 조회수를 업데이트 할 때 사용한다.
     * 일반적으로 GeneralBroker의 getUpdateViewCnt(LData) 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받아 DbManager 클래스의
     * prepareStatement 메소드를 이용하여 작업을 처리하고 처리 건수를 리턴한다.
     * @param lData
     * @return int
     * @throws Exception
     * </pre>
     */
    public int updateViewCnt(LData lData)  throws Exception
    {
        int retVal = 0;
        dbmgr.prepareStatement(getUpdateViewCntSql(lData), lData);
        retVal = dbmgr.executeUpdate();

        return retVal;
    }

    /**
     * <pre>
     * 페이징 처리된 여러 건의 데이터를 조회할 때 사용한다.
     * 일반적으로 GeneralBroker의 getList() 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData, 시작페이지, 한 페이지 당 게시물 수를 매개변수로 전달받아
     * DbManager 클래스의 prepareStatement 메소드를 이용하여 데이터를 조회하고
     * RecodeModel의 배열 객체를 리턴한다.
     * @param lData
     * @param pg
     * @param pgSize
     * @throws Exception
     * </pre>
     */
    public RecordModel getList(LData lData, int pg,int pgSize) throws Exception
    {
        dbmgr.prepareStatement(getListSql(lData), lData);

        return dbmgr.select(pg, pgSize);
    }

    /**
     * <pre>
     * 페이징 처리를 하지 않는 여러 건의 데이터를 조회할 때 사용한다.
     * 일반적으로 GeneralBroker의 getList(LData) 메소드에서 호출된다.
     * FORM에서 넘어온 데이터가 저장된 LData를 매개변수로 전달받아 DbManager 클래스의
     * prepareStatement 메소드를 이용하여 데이터를 조회하고 RecodeModel 객체를 리턴한다.
     * @param lData
     * @return RecordModel
     * @throws Exception
     * </pre>
     */
    public RecordModel getList(LData lData) throws Exception
    {
        dbmgr.prepareStatement(getListSql(lData), lData);

        return dbmgr.select();
    }
}
