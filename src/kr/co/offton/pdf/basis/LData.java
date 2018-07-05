package kr.co.offton.pdf.basis;

import java.io.IOException;
import java.io.Reader;

import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.*;
import javax.servlet.http.*;



import kr.co.offton.jdf.basis.*;
import kr.co.offton.jdf.util.*;
import kr.co.offton.jdf.db.*;

/**
 * <pre>
 * PGM_NAME: OFFTON(WISE ���հ� �ý���) LData
 * DESC: �ý��� ���� �?� �wα׷� ���̿��� ������ ó���� ����ϴ� Ŭ�����̴�.
 *       �?� �wα׷� ���� HttpServletRequest ��ü�� ����� FORM �Է� ��; �о��� Key & Value ���·� ����Ǵ� Properties ��ü�� ��Ƶд�.
 *       �ý��� ���: �?� �wα׷��� �����Ͱ� �ʿ��� �� LData Ŭ���� Ÿ���� ��ü�� Parameter�� ��� �޾� �ش� �wμ����� ó���Ѵ�.
 * author: (��)���� Offton Co., Ltd.
 * since: 2005
 * history: version 1.0
 * see:
 * </pre>
 **/

public class LData extends GeneralObject
{
    Properties formInput = null;
    String seperate = ",";

    /**
     * <pre>
     * ���� - Properties ��ü�� ���� �� �� ������ formInput ���� �Ҵ��Ѵ�.
     * </pre>
     */
    public LData()
    {
        formInput = new Properties();
    }

    /**
     * <pre>
     * ���� - �?��wα׷��� HttpServletRequest ��ü�� �Ű������ ��޹޾�,
     *         ��ü�� ����� ��; �о�帮�� populate() �޼ҵ带 ȣ���Ѵ�.
     * @param  req
     * </pre>
     */
    public LData(HttpServletRequest req)
    {
    	formInput = new Properties();
        populate(req);
    }
    
    /**
     * ���� - �?��wα׷��� HttpServletRequest ��ü�� �Ű������ ��޹޾�,
     *         ��ü�� ����� ��; �о�帮�� populate() �޼ҵ带 ȣ���Ѵ�.
     *         �����ڵ� ��d���ش�.
     * @param req
     * @param seperate
     */
    public LData(HttpServletRequest req, String seperate)
    {
    	formInput = new Properties();
    	setSeperate(seperate);
        populate(req);
    }

    /**
     * <pre>
     * ���� - �����ͺ��̽����� ������ ���� ����� RecordModel ��ü�� �Ű������ ��޹޾�,
     *         ��ü�� ����� ��; �о�帮�� populate() �޼ҵ带 ȣ���Ѵ�.
     * @param  rm
     * @throws kr.co.offton.jdf.db.RecordModelException
     * </pre>
     */
    public LData(RecordModel rm) throws RecordModelException
    {
        populate(rm);
    }
    
    /**
     * FORM�� �Էµ� array��; String8�� ��ȯ�� �� ���� �� ���̿� �־��� �����ڸ� setting ��.
     * @param seperate
     * @param req
     */
    public void setSeperate(String seperate)
    {
    	this.seperate = seperate;
    }

    /**
     * <pre>
     * FORM�� �Էµ� array��; String8�� ��ȯ�� �� ���� �� ���̿� �־��� �����ڸ� �����Ѵ�.
     * </pre>
     */
    public String getSeperate()
    {
        return this.seperate;
    }

    /**
     * <pre>
     * ���� ����� Properties Ŭ������ ��ü�� formInput ���� �ʱ�ȭ�Ѵ�.
     * </pre>
     */
    public void clear()
    {
        formInput.clear();
    }

    /**
     * <pre>
     * HttpServletRequest ��ü�� ����� FORM �Է°�; �о�鿩, ��8�� �����
     * Key & Value ���·� ����Ǵ� Properties ��ü�� formInput�� �����Ѵ�.
     * FORM �Է°� �� �Ϲݰ�: String8��, array��: ','�� ���е� String8�� formInput�� �����Ѵ�.
     * @param  req
     * </pre>
     */
    public void populate(HttpServletRequest req)
    {    
        Enumeration fieldNames = req.getParameterNames();

        //DB�ʵ� Ÿ���� Varchar2 4000�� ��� 1000����Ʈ�� �߶� ó���ϸ�,
        //DbManager���� :value_V -> :value_V_1||:value_V_2||:value_V_3||:value_V_4 8�� �ٲٱ� '��
        //���ε� ������ �̸�(:value_V); Ű��8�� �����Ѵ�. ������ �����:  ','8�� �����Ѵ�.
        //���� �Ϸ� �� formInput�� '__BINDVALUES'�� Ű �̸�8�� ���ε� ������� �̸�; �����Ѵ�.
        StringBuffer bindValues = new StringBuffer(1024);

        while (fieldNames.hasMoreElements())
        {
            String paramName  = (String) fieldNames.nextElement();
            String paramValue = "";
            try
            {
                for (int i = 0; i < req.getParameterValues(paramName).length; i++)
                {
                    if (i != 0) paramValue += getSeperate();
                    paramValue += StringUtil.toDB((String) req.getParameterValues(paramName)[i]);
                }
            }
            catch (Exception ex) { paramValue = ""; }

            if(paramName.length() > 2)
            {
                //DataType�� Number�� ����, Form8�� ����ϴ� ������Ʈ�� �̸��� '_N'; �ٿ��� �������� �����Ѵ�.
                if(paramName.substring(paramName.length()-2).equals("_N"))
                {
                    formInput.put(paramName, "");
                    formInput.put(paramName.substring(0,paramName.length()-2), paramValue);
                }
                else if(paramName.substring(paramName.length()-2).equals("_C"))
                {
                	formInput.put(paramName, "");
                    formInput.put(paramName.substring(0,paramName.length()-2), paramValue);
                }
                //preparestment �޼ҵ带 ����Ͽ�  Insert�� Update�� JDBC ���ο��� �ѱ�; �Ľ��ϴ� ����
                //Byte�� 2Byte���� 2~3Byte�� �þ�� ��װ� �߻��Ѵ�.
                //�׷� ���� DB�ʵ� Ÿ���� Varchar2 4000�� ��� �ѱ� 2000��(����4000��)�� �Էµ��� �ʰ� �Ǹ�
                //�̸� �ذ��ϱ� '�� �����͸� 1000����Ʈ �� �ɰ��� ó���ϴµ� �� �۾�; ó���ϱ� '�ؼ�
                //Form8�� ����ϴ� ������Ʈ�� �̸��� '_V'; �ٿ��� �۾�; �����Ѵ�.
                else if(paramName.substring(paramName.length()-2).equals("_V"))
                {
                    formInput.put(paramName, "");

                    //�Ķ���� ����: ��x �̸���(_V����) _1 ~ _4���� �߰��� �̸�8�� �Ѵ�. value_V_1 ,value_V_2 ...
                    //1000����Ʈ�� �ڸ���= �Ķ���� �߰�
                    String var[]    = {"","","",""};
                    byte[] bytes    = paramValue.getBytes();
                    int len         = bytes.length;
                    int startIdx    = 0;
                    int limitLength = 0;

                    for(int i=0; i<4;i++)
                    {
                        limitLength = 1000;

                        //4��°�� ���� ������ ��� ���ڿ�; ����
                        if(i==3)
                        {
                            var[3] = new String(bytes, startIdx, len-startIdx);
                            break;
                        }

                        //������ ��� ���ڿ��� 1000����Ʈ�� �ȵǴ� ��� ������ ��θ� ����
                        if(len<startIdx+limitLength)
                        {
                            var[i] = new String(bytes, startIdx, len-startIdx);
                            break;
                        }

                        //��'�� ���� ���� ������ ����Ʈ �� �ѱ��� �߸� ���ڿ��� �ִ��� �ľ��� �� �ִٸ� limitLength�� 1 ���δ�.
                        int counter = 0;
                        for(int k=startIdx; k<startIdx+limitLength; k++)
                        {
                            if(((int)bytes[k] & 0x80) != 0) counter++;
                        }
                        limitLength -= counter % 2;

                        var[i] = new String(bytes, startIdx, limitLength);
                        startIdx = startIdx+limitLength;
                    }

                    //�Ķ���� ����
                    for(int i=0; i<4;i++)
                    {
                        //System.out.println("=======V"+(i+1)+" : "+var[i]);
                        formInput.put(paramName+"_"+(i+1), var[i]);
                    }

                    bindValues.append(paramName+",");
                }
                else
                {
                    formInput.put(paramName, paramValue);
                }
            }
            else
            {
                formInput.put(paramName, paramValue);
            }
        }

        //'__BINDVALUES'�� Ű �̸�8�� ���ε� ������� �̸�; �����Ѵ�.
        formInput.put("__BINDVALUES", bindValues.toString());
    }

    /**
     * <pre>
     * �����ͺ��̽����� ������ ���� ����� RecordModel ��ü�� �����͸� �о���,
     * ��8�� ����� Key & Value ���·� ����Ǵ� Properties ��ü�� formInput�� �����Ѵ�.
     * @param  rm
     * @throws kr.co.offton.jdf.db.RecordModelException
     * </pre>
     */
    public void populate(RecordModel rm) throws RecordModelException
    {
        Vector vt = rm.getColumnNames();

        for(int i=0; i<vt.size(); i++)
        {
            String paramName = ((String)vt.get(i)).toLowerCase();

            if(logger.isDebugEnabled()) logger.info("LDATAK(" + i + "):" + paramName);

            String paramValue = "";

            try
            {
                paramValue = (String)rm.get(paramName);

                if(logger.isDebugEnabled()) logger.info("LDATAV(" + i + "):" + paramValue);
            }
            catch(Exception er)
            {
                try
                {
                    paramValue = ((BigDecimal)rm.get(paramName)).toString();
                }
                catch(Exception er2)
                {
                    try
                    {
                        paramValue = ((Timestamp)rm.get(paramName)).toString();
                    }
                    catch(Exception er3)
                    {
                    	try
                    	{
                    		  StringBuffer data = new StringBuffer();
                    		  Clob clob = (Clob)rm.get(paramName); 
                    		  Reader reader = clob.getCharacterStream();
                    		  
                    	      char[] buf = new char[1024];
                    	      int cnt = 0;
                    	      if (null != reader) {
                    	          while ( (cnt = reader.read(buf)) != -1) {
                    	              data.append(buf, 0, cnt);
                    	          }
                    	      }	  
                    		  paramValue = data.toString();
                    	}
                    	catch(Exception er4)
                    	{
                    		paramValue = "";
                    		throw new RecordModelException("populate : �� �� ��� �÷����Դϴ�." + paramName);
                    	}
                    }
                }
            }
            formInput.put(paramName, StringUtil.verify(paramValue));
        }
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� Key & Value ��; ���ڿ��� �����Ѵ�.
     * ���� �뵵�� ����Ѵ�.
     * @param title
     * @return String
     * </pre>
     */
    final public String getDebugMsg(String title)
    {
        StringBuffer msg = new StringBuffer(200);
        msg.append("---- " + title + " ----\n");

        try
        {
            for(Enumeration e = formInput.keys(); e.hasMoreElements();)
            {
                String paramName  = (String)e.nextElement();
                String paramValue = getString(paramName);
                msg.append(paramName+" = [" + paramValue +"]\n");
            }
        }catch (Exception e){
        	// 2015-12-03 시큐어코딩
        	logger.error(e);
        	
        	if(msg != null) {
        		msg = null;
        	}
        }

        return msg.toString();
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� Key ����; �����Ѵ�.
     * @return Enumeration
     * </pre>
     */
    public Enumeration keys()
    {
        return formInput.keys();
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� Value ����; �����Ѵ�.
     * @return Enumeration
     * </pre>
     */
    public Enumeration elements()
    {
        return formInput.elements();
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� Key�� ���� �����Ѵ�.
     * @return Enumeration
     * </pre>
     */
    public int getSize()
    {
        return formInput.size();
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� �ش� Ű ���� �ִ��� üũ�Ѵ�.
     * @param key
     * @return boolean
     * </pre>
     */
    public boolean containsKey(String key)
    {
        return formInput.containsKey(key);
    }

    /**
    * <pre>
    * ��8�� ����� Properties ��ü�� formInput�� ����� ���� ��,
    * �Ѱ��� Key���� mapping�ϴ� ��; String��8�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
    * @param key
    * @return String
    * </pre>
    */
    public String getString(String key)
    {
        return StringUtil.verify(formInput.getProperty(key.trim()));
    }

    public String getString_s(String key)
    {
        return StringUtil.verify_s(formInput.getProperty(key.trim()));
    }

    /**
     * <pre>
     * getString() �޼ҵ带 �����ϰ� ����ϱ� '�� �޼ҵ�� getString(String) �޼ҵ带 ȣ���Ѵ�.
     * @param key
     * @return String
     * </pre>
     */
    public String get(String key)
    {
        return getString(key);
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� Key ���� �̿� mapping�ϴ� Value ��; �߰��Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void setString(String key, String value)
    {
        formInput.put(key, StringUtil.toDB(value));
    }

    /**
     * <pre>
     * setString() �޼ҵ带 �����ϰ� ����ϱ� '�� �޼ҵ�� setString(String, String) �޼ҵ带 ȣ���Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void set(String key, String value)
    {
        setString(key, value);
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� Key ���� �̿� mapping�ϴ� Value ��; �߰��Ѵ�.
     * BigDecimal���� Value ��; String ��8�� ��ȯ�Ͽ� set(String, String) �޼ҵ带 ȣ���Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void set(String key, BigDecimal value)
    {
        set(key, value.toString());
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� Key ���� �̿� mapping�ϴ� Value ��; �߰��Ѵ�.
     * ��޹�: Key�� �̸��� ������ ���� Ÿ���� Key "***_N" �� ��; �� ���ڿ� ��8�� ��ü�Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void setNumber(String key, String value)
    {
        formInput.put(key+"_N", "");
        formInput.put(key, value);
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� Key ���� �̿� mapping�ϴ� Value ��; �߰��Ѵ�.
     * int ���� Value ��; String ��8�� ��ȯ�Ͽ� setNumber(String, String) �޼ҵ带 ȣ���Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void setNumber(String key, int value)
    {
        setNumber(key, Integer.toString(value));
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� Key ���� �̿� mapping�ϴ� Value ��; �߰��Ѵ�.
     * BigDecimal ���� Value ��; String ��8�� ��ȯ�Ͽ� setNumber(String, String) �޼ҵ带 ȣ���Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void setNumber(String key, BigDecimal value)
    {
        setNumber(key, value.toString());
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� Key ���� �̿� mapping�ϴ� Value ��; �߰��Ѵ�.
     * double ���� Value ��; String ��8�� ��ȯ�Ͽ� setNumber(String, String) �޼ҵ带 ȣ���Ѵ�.
     * @param key
     * @param value
     * </pre>
     */
    public void setNumber(String key, double value)
    {
        setNumber(key, Double.toString(value));
    }
    
    /**
     * Clob(value)�� ��; String8�� setting.
     * @param key
     * @param value
     */
    public void setClob(String key, Clob value)throws SQLException, IOException
    {
    	StringBuffer data = new StringBuffer();
		Reader reader = value.getCharacterStream();
		  
	    char[] buf = new char[1024];
	    int cnt = 0;
	    if (null != reader) {
	        while ( (cnt = reader.read(buf)) != -1) {
	            data.append(buf, 0, cnt);
	        }
	    }	  
    	formInput.put(key+"_C", "");
        formInput.put(key, data.toString());
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� ���� ��,
     * �Ѱ��� Key���� mapping�ϴ� ��; BigDecimal��8�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
     * @param key
     * @return BigDecimal
     * </pre>
     */
    public BigDecimal getBigDecimal(String key)
    {
        return NumberUtil.verify(formInput.getProperty(key.trim()));
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� ���� ��,
     * �Ѱ��� Key���� mapping�ϴ� ��; Timestamp��8�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
     * @param key
     * @return Timestamp
     * </pre>
     */
    public Timestamp getTimestamp(String key)
    {
        return DateTime.verify(formInput.getProperty(key.trim()));
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� ���� ��,
     * �Ѱ��� Key���� mapping�ϴ� ��; double��8�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
     * @param key
     * @return double
     * </pre>
     */
    public double getDouble(String key)
    {
        double rtn =0;
        try
        {
            rtn = NumberUtil.verify(formInput.getProperty(key.trim()).replaceAll(",","")).doubleValue();
        }
        catch(NullPointerException ex){
        	// 2015-12-03 시큐어코딩
        	logger.error(ex);
        	
        	if(rtn != -1) {
        		rtn = 0;
        	}
        }

        return rtn;
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� ���� ��,
     * �Ѱ��� Key���� mapping�ϴ� ��; Long��8�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
     * @param key
     * @return long
     * </pre>
     */
    public long getLong(String key)
    {
        long rtn = 0;

        try
        {
            rtn = NumberUtil.verify(formInput.getProperty(key.trim())).longValue();
        }
        catch(NullPointerException ex){
        	// 2015-12-03 시큐어코딩
        	logger.error(ex);
        	
        	if(rtn != -1) {
        		rtn = 0;
        	}
        }

        return rtn;
    }

    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� ���� ��,
     * �Ѱ��� Key���� mapping�ϴ� ��; Integer��8�� ��ȯ�Ͽ� ��ȯ�Ѵ�.
     * @param key
     * @return int
     * </pre>
     */
    public int getInt(String key)
    {
        int rtn = 0;

        try
        {
            rtn = NumberUtil.verify(formInput.getProperty(key.trim())).intValue();
        }
        catch(Exception ex){
        	// 2015-12-03 시큐어코딩
        	logger.error(ex);
        	
        	if(rtn != -1) {
        		rtn = 0;
        	}
        }

        return rtn;
    }
    
    /**
     * <pre>
     * clone LData ��ü�� ���� �� �����Ѵ�.
     * @return LData
     * </pre>
     */
    public LData getClone() {
        LData cloneData  = new LData();
        try {
            for (Enumeration e = formInput.keys(); e.hasMoreElements();) {
                String paramName  = (String)e.nextElement();
                String paramValue = getString(paramName);
                cloneData.set(paramName, paramValue);
            }
        } catch (Exception e){
        	// 2015-12-03 시큐어코딩
        	logger.error(e);
        	
        	if(cloneData != null) {
        		cloneData = null;
        	}
        }
        return cloneData;
    }
    
    /**
     * <pre>
     * ��8�� ����� Properties ��ü�� formInput�� ����� Key & Value ��; �ٸ� LData ��ü�� �����Ѵ�.
     * @param toLData ������ ����� LData ��ü
     * @return String
     * </pre>
     */
    public void copyData(LData toLData) {
    	String paramName = null;
    	String paramValue = null;
    	
        try {
            for (Enumeration e = formInput.keys(); e.hasMoreElements();) {
                paramName  = (String)e.nextElement();
                paramValue = getString(paramName);
                toLData.set(paramName, paramValue);
            }
        } catch (Exception e){
        	// 2015-12-03 시큐어코딩
        	logger.error(e);
        	
        	if(paramName != null) {
        		paramName = null;
        	}
        	
        	if(paramValue != null) {
        		paramValue = null;
        	}
        }
    }
}