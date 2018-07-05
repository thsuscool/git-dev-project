// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   RecordModel.java

package kr.co.offton.jdf.db;

import java.io.*;
import java.math.BigDecimal;
import java.sql.*;
import java.util.Enumeration;
import java.util.Vector;
import kr.co.offton.jdf.basis.GeneralObject;
import kr.co.offton.pdf.basis.LData;

// Referenced classes of package kr.co.offton.jdf.db:
//            RecordModelException

public class RecordModel extends GeneralObject
    implements Serializable
{

    public RecordModel()
    {
        isEmpty = true;
        matrix = null;
        realRowCount = 0;
    }

    public RecordModel(ResultSet rs)
        throws SQLException
    {
        isEmpty = true;
        matrix = null;
        realRowCount = 0;
        init(rs);
    }

    public RecordModel(LData lData[])
        throws RecordModelException, SQLException
    {
        isEmpty = true;
        matrix = null;
        realRowCount = 0;
        getLData2RM(lData);
    }

    public int getColumnCount()
    {
        return columnNames.size();
    }

    public int getRowCount()
    {
        return matrix.size();
    }

    public Vector getColumnNames()
    {
        return columnNames;
    }

    public void setColumnNames(String colNames[])
    {
        for(int i = 0; i < colNames.length; i++)
            colNames[i] = colNames[i].toUpperCase();

        columnNames = new Vector();
        columnNames.copyInto(colNames);
    }

    private void getLData2RM(LData lData[])
        throws RecordModelException
    {
        columnNames = new Vector();
        matrix = new Vector();
        int cols = lData[0].getSize();
        if(!isLDataArray(lData))
            throw new RecordModelException("LData[] \uAC01 \uC694\uC18C\uC758 \uD06C\uAE30\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
        for(Enumeration e = lData[0].keys(); e.hasMoreElements(); columnNames.addElement(((String)e.nextElement()).toUpperCase().trim()));
        for(int i = 0; i < lData.length; i++)
        {
            Object row[] = new Object[cols];
            int j = 0;
            for(Enumeration e = lData[i].elements(); e.hasMoreElements();)
            {
                row[j] = e.nextElement();
                j++;
            }

            matrix.addElement(((Object) (row)));
        }

        setIterator();
    }

    private void init(ResultSet rs)
        throws SQLException
    {
        columnNames = new Vector();
        matrix = new Vector();
        try
        {
            if(rs == null)
            {
                isEmpty = true;
            } else
            {
                isEmpty = false;
                ResultSetMetaData meta = rs.getMetaData();
                for(int i = 0; i < meta.getColumnCount(); i++)
                    columnNames.addElement(meta.getColumnLabel(i + 1).toUpperCase());

            }
        }
        catch(SQLException se)
        {
            throw new SQLException(se.getMessage());
        }
    }

    private boolean isLDataArray(LData lData[])
        throws RecordModelException
    {
        boolean rtn = true;
        int cnt = lData[0].getSize();
        for(int i = 1; i < lData.length; i++)
        {
            if(lData[i].getSize() == cnt)
                continue;
            rtn = false;
            break;
        }

        return rtn;
    }

    public void select(ResultSet rs, int pg, int pgSize)
        throws SQLException, RecordModelException
    {
        if(pg < 1)
        {
            RecordModelException rme = new RecordModelException("Position Exception");
            throw rme;
        }
        int pos = (pg - 1) * pgSize;
        for(int i = 0; i < pos; i++)
            rs.next();

        for(; rs.next() && pgSize > 0; pgSize--)
            setRow(rs);

        setIterator();
    }

    public void select(ResultSet rs, int pos)
        throws SQLException
    {
        for(int i = 0; i < pos; i++)
            rs.next();

        for(; rs.next(); setRow(rs));
        setIterator();
    }

    public void select(ResultSet rs)
        throws SQLException
    {
        select(rs, 0);
    }

    private void setRow(ResultSet rs)
        throws SQLException
    {
        int cols = getColumnCount();
        Object row[] = new Object[cols];
        for(int i = 0; i < cols; i++)
            row[i] = rs.getObject(i + 1);

        matrix.addElement(((Object) (row)));
    }

    public void setIterator()
    {
        index = -1;
    }

    public boolean next()
    {
        index++;
        return matrix != null && index < matrix.size();
    }

    public void previous()
        throws RecordModelException
    {
        index--;
        if(index - 1 < 0)
            index = 0;
    }

    public Object get(int columnIndex)
    {
        return ((Object[])matrix.elementAt(index))[columnIndex - 1];
    }

    public Object get(String columnName)
        throws RecordModelException
    {
        int columnIndex = columnNames.indexOf(columnName.toUpperCase().trim());
        if(columnIndex < 0)
        {
            RecordModelException rme = new RecordModelException((new StringBuilder(String.valueOf(columnName))).append(" \uC5F4\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.").toString());
            throw rme;
        } else
        {
            return get(columnIndex + 1);
        }
    }

    public Object get(int rowIndex, int columnIndex)
        throws RecordModelException
    {
        setIndex(rowIndex);
        return get(columnIndex);
    }

    public Object get(int rowIndex, String columnName)
        throws RecordModelException
    {
        setIndex(rowIndex);
        return get(columnName);
    }

    public String getString(int rowIndex, String columnName)
        throws RecordModelException
    {
        return (String)get(rowIndex, columnName);
    }

    public BigDecimal getBigDecimal(int rowIndex, String columnName)
        throws RecordModelException
    {
        return (BigDecimal)get(rowIndex, columnName);
    }

    public double getDouble(int rowIndex, String columnName)
        throws RecordModelException
    {
        BigDecimal b = (BigDecimal)get(rowIndex, columnName);
        if(b == null)
            return 0.0D;
        else
            return b.doubleValue();
    }

    public long getLong(int rowIndex, String columnName)
        throws RecordModelException
    {
        BigDecimal b = (BigDecimal)get(rowIndex, columnName);
        if(b == null)
            return 0L;
        else
            return b.longValue();
    }

    public long getInt(int rowIndex, String columnName)
        throws RecordModelException
    {
        BigDecimal b = (BigDecimal)get(rowIndex, columnName);
        if(b == null)
            return 0L;
        else
            return (long)b.intValue();
    }

    public String getClob(String columnName)
        throws RecordModelException, SQLException, IOException
    {
        StringBuffer data = new StringBuffer();
        Clob clob = (Clob)get(columnName);
        if(clob != null)
        {
            Reader reader = clob.getCharacterStream();
            char buf[] = new char[1024];
            int cnt = 0;
            if(reader != null)
                while((cnt = reader.read(buf)) != -1) 
                    data.append(buf, 0, cnt);
        }
        return data.toString();
    }

    public void setIndex(int index)
        throws RecordModelException
    {
        if(index < 0)
        {
            this.index = -1;
        } else
        {
            if(index > matrix.size())
            {
                RecordModelException rme = new RecordModelException("\uC9C0\uC815\uD589\uC774 \uBC94\uC704\uB97C \uCD08\uACFC\uD569\uB2C8\uB2E4.");
                throw rme;
            }
            this.index = index;
        }
    }

    public void addAll(RecordModel rm)
        throws RecordModelException
    {
        if(getColumnCount() != rm.getColumnCount())
        {
            RecordModelException rme = new RecordModelException("\uB450 RecordModel\uC758 \uC5F4 \uAC2F\uC218\uAC00 \uB2E4\uB985\uB2C8\uB2E4!");
            throw rme;
        } else
        {
            matrix.addAll(rm.matrix);
            setIterator();
            return;
        }
    }

    public void addAll(int index, RecordModel rm)
        throws RecordModelException
    {
        if(getColumnCount() != rm.getColumnCount())
        {
            RecordModelException rme = new RecordModelException("\uB450 RecordModel\uC758 \uC5F4 \uAC2F\uC218\uAC00 \uB2E4\uB985\uB2C8\uB2E4!");
            throw rme;
        } else
        {
            matrix.addAll(index, rm.matrix);
            setIterator();
            return;
        }
    }

    public void add(Object row[])
        throws RecordModelException
    {
        if(row.length != getColumnCount())
        {
            RecordModelException rme = new RecordModelException("\uC5F4 \uAC2F\uC218\uAC00 \uB2E4\uB985\uB2C8\uB2E4!");
            throw rme;
        } else
        {
            matrix.addElement(((Object) (row)));
            return;
        }
    }

    public void add(int index, Object row[])
        throws RecordModelException
    {
        if(row.length != getColumnCount())
        {
            RecordModelException rme = new RecordModelException("\uC5F4 \uAC2F\uC218\uAC00 \uB2E4\uB985\uB2C8\uB2E4!");
            throw rme;
        } else
        {
            matrix.add(index, ((Object) (row)));
            return;
        }
    }

    public void set(int rowIndex, String columnName, Object colData)
        throws RecordModelException
    {
        setIndex(rowIndex);
        set(columnName, colData);
    }

    public void set(int rowIndex, int colIndex, Object colData)
        throws RecordModelException
    {
        setIndex(rowIndex);
        set(colIndex, colData);
    }

    public void set(int columnIndex, Object colData)
        throws RecordModelException
    {
        ((Object[])matrix.elementAt(index))[columnIndex - 1] = colData;
    }

    public void set(String columnName, Object colData)
        throws RecordModelException
    {
        int columnIndex = columnNames.indexOf(columnName.toUpperCase().trim());
        if(columnIndex < 0)
        {
            RecordModelException rme = new RecordModelException((new StringBuilder(String.valueOf(columnName))).append(" \uC5F4\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.").toString());
            throw rme;
        } else
        {
            set(columnIndex + 1, colData);
            return;
        }
    }

    public void setRealRowCount(int rowCount)
    {
        realRowCount = rowCount;
    }

    public int getRealRowCount()
    {
        return realRowCount;
    }
    
    // 2017. 11. 09 [°³¹ßÆÀ] Ãß°¡ START
    public int getCurrentIndex() {
    	return index;
    }
    // 2017. 11. 09 [°³¹ßÆÀ] Ãß°¡ END

    private static final long serialVersionUID = 1L;
    boolean isEmpty;
    Vector columnNames;
    Vector matrix;
    int index;
    int realRowCount;
}
