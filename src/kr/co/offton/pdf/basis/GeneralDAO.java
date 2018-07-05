package kr.co.offton.pdf.basis;

import kr.co.offton.jdf.db.*;
import kr.co.offton.jdf.basis.*;

/**
 * <pre>
 * PGM_NAME: OFFTON(WISE ���հ��� �ý���) GeneralDAO
 * DESC: DB ���� ������ ó���ϴ� class�μ� ��ü�� ������ GeneralBroker���� �̷������.
 *       DbUtil Ŭ������ sqlFileLoader �޼ҵ带 �̿��Ͽ� SQL�� �ε��ϰ�,
 *       GeneralBroker�� ���� ���� ���� DbManager ��ü�� �̿��Ͽ� ���� ���� ������ ó���Ѵ�.
 * author: (��)���� Offton Co., Ltd.
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
     * ������
     * </pre>
     */
    public GeneralDAO(){ }

    /**
     * <pre>
     * ������ - DB�� Connection�� �δ� DbManager Ŭ������ ��ü�� �Ű������� ���޹޾�,
     * �������� ����� DbManager Ŭ������ ��ü�� �Ҵ��ϴ� setDbManager(DbManager)�� ȣ���Ѵ�.
     * @param  dbmgr
     * </pre>
     */
    public GeneralDAO(DbManager dbmgr)
    {
        setDbManager(dbmgr);
    }

    /**
     * <pre>
     * �������� ����� DbManager Ŭ������ ��ü�� �Ű������� ���޵� DbManager ��ü�� �Ҵ��Ѵ�.
     * @param  dbmgr
     * </pre>
     */
    public void setDbManager(DbManager dbmgr)
    {
        this.dbmgr = dbmgr;
    }

    /**
     * <pre>
     * �������� ����� DbManager Ŭ������ ��ü�� �����Ѵ�.
     * @return DbManager
     * </pre>
     */
    public DbManager getDbManager()
    {
        return dbmgr;
    }

    /**
     * <pre>
     * ����Ʈ�� ��ȸ SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @return String
     * </pre>
     */
    public String getListSql() { return null; };

    /**
     * <pre>
     * �ܼ� ��ȸ SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @return String
     * </pre>
     */
    public String getRetrieveSql() { return null; };

    /**
     * <pre>
     * Insert SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @return String
     * </pre>
     */
    public String getInsertSql() { return null; };

    /**
     * <pre>
     * Update SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @return String
     * </pre>
     */
    public String getUpdateSql() { return null; };

    /**
     * <pre>
     * Delete SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @return String
     * </pre>
     */
    public String getDeleteSql() { return null; };

    /**
     * <pre>
     * Update SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @return String
     * </pre>
     */
    public String getUpdateViewCntSql(){ return null; };

    /**
     * <pre>
     * ����Ʈ�� ��ȸ SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * FORM���� �Ѿ�� �����͸� �̿��Ͽ� Ư���� ������ ������ �� ����Ѵ�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getListSql(LData lData) { return getListSql(); };

    /**
     * <pre>
     * �ܼ� ��ȸ SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * FORM���� �Ѿ�� �����͸� �̿��Ͽ� Ư���� ������ ������ �� ����Ѵ�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getRetrieveSql(LData lData) { return getRetrieveSql(); };

    /**
     * <pre>
     * Insert SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * FORM���� �Ѿ�� �����͸� �̿��Ͽ� Ư���� ������ ������ �� ����Ѵ�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getInsertSql(LData lData) { return getInsertSql(); };

    /**
     * <pre>
     * Update SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * FORM���� �Ѿ�� �����͸� �̿��Ͽ� Ư���� ������ ������ �� ����Ѵ�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getUpdateSql(LData lData) { return getUpdateSql(); };

    /**
     * <pre>
     * Delete SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * FORM���� �Ѿ�� �����͸� �̿��Ͽ� Ư���� ������ ������ �� ����Ѵ�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getDeleteSql(LData lData) { return getDeleteSql(); };

    /**
     * <pre>
     * �Խ��ǿ��� ��ȸ���� ������Ʈ�ϴ� SQL String�� �����ϱ� ���ؼ� �̸� ����� �޼ҵ��̴�.
     * �������α׷� �ܿ����� GeneralDAO Ŭ������ ��ӹ��� ���ο� Ŭ������ ���� ����
     * �ش� �޼ҵ带 Overriding�ؼ� ����Ѵ�.
     * @param  lData
     * @return String
     * </pre>
     */
    public String getUpdateViewCntSql(LData lData) { return getUpdateViewCntSql(); };

    /**
     * <pre>
     * 1���� �����͸� ��ȸ�� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� process(int, LData) �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData�� �Ű������� ���޹޾� DbManager Ŭ������
     * prepareStatement �޼ҵ带 �̿��Ͽ� �����͸� ��ȸ�Ѵ�.
     * ��ȸ �� ��� �����͸� �Ű������� ���޹��� LData ��ü�� ��� �Ϸ� ī��Ʈ�� �����Ѵ�.
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
     * 1���� �����͸� insert �� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� process(int, LData) �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData�� �Ű������� ���޹޾� DbManager Ŭ������
     * prepareStatement �޼ҵ带 �̿��Ͽ� �۾��� ó���ϰ� ó�� �Ǽ��� �����Ѵ�.
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
     * 1���� �����͸� update �� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� process(int, LData) �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData�� �Ű������� ���޹޾� DbManager Ŭ������
     * prepareStatement �޼ҵ带 �̿��Ͽ� �۾��� ó���ϰ� ó�� �Ǽ��� �����Ѵ�.
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
     * 1���� �����͸� delete �� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� process(int, LData) �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData�� �Ű������� ���޹޾� DbManager Ŭ������
     * prepareStatement �޼ҵ带 �̿��Ͽ� �۾��� ó���ϰ� ó�� �Ǽ��� �����Ѵ�.
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
	 * GeneralDAO�� getList(LData lData) �޼ҵ� �������̵�.
	 * @param param ���� �Ķ����
	 * @param sql ���� ����
	 * @return
	 * @throws Exception
	 */
	protected RecordModel getList(LData param, String sql) throws Exception {
		sql = DbUtil.sqlFileLoader(sql);
        
		dbmgr.prepareStatement(sql, param);
        return dbmgr.select();
	}
	
	/**
	 * GeneralDAO�� getList(LData lData) �޼ҵ� �������̵�.
	 * @param param ���� �Ķ����
	 * @param sql ���� ����
	 * @param args ���� ����
	 * @return
	 * @throws Exception
	 */
	protected RecordModel getList(LData param, String sql, String args) throws Exception {
		sql = DbUtil.sqlFileLoader(sql, args);
        
		dbmgr.prepareStatement(sql, param);
        return dbmgr.select();
	}
	
	/**
	 * GeneralDAO�� retrieve(LData lData) �޼ҵ� �������̵�.
	 * @param param ���� �Ķ����
	 * @param sql ���� ����
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
	 * GeneralDAO�� insert(LData lData) �޼ҵ� �������̵�.
	 * @param param ���� �Ķ����
	 * @param sql ���� ����
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
	 * GeneralDAO�� update(LData lData) �޼ҵ� �������̵�.
	 * @param param ���� �Ķ����
	 * @param sql ���� ����
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
	 * GeneralDAO�� delete(LData lData) �޼ҵ� �������̵�.
	 * @param param ���� �Ķ����
	 * @param sql ���� ����
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
     * �Խ��ǿ��� ��ȸ���� ������Ʈ �� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� getUpdateViewCnt(LData) �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData�� �Ű������� ���޹޾� DbManager Ŭ������
     * prepareStatement �޼ҵ带 �̿��Ͽ� �۾��� ó���ϰ� ó�� �Ǽ��� �����Ѵ�.
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
     * ����¡ ó���� ���� ���� �����͸� ��ȸ�� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� getList() �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData, ����������, �� ������ �� �Խù� ���� �Ű������� ���޹޾�
     * DbManager Ŭ������ prepareStatement �޼ҵ带 �̿��Ͽ� �����͸� ��ȸ�ϰ�
     * RecodeModel�� �迭 ��ü�� �����Ѵ�.
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
     * ����¡ ó���� ���� �ʴ� ���� ���� �����͸� ��ȸ�� �� ����Ѵ�.
     * �Ϲ������� GeneralBroker�� getList(LData) �޼ҵ忡�� ȣ��ȴ�.
     * FORM���� �Ѿ�� �����Ͱ� ����� LData�� �Ű������� ���޹޾� DbManager Ŭ������
     * prepareStatement �޼ҵ带 �̿��Ͽ� �����͸� ��ȸ�ϰ� RecodeModel ��ü�� �����Ѵ�.
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
