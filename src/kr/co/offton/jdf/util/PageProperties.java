package kr.co.offton.jdf.util;

import java.util.Enumeration;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON PageProperties
 * DESC:  Data single model
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/

public class PageProperties extends GeneralObject {
  Properties formInput = null;
  String seperate = ",";

  public PageProperties() {
    formInput = new Properties();                    //  2003.08.05 ��ȣ�� �߰�
  }

  public PageProperties(HttpServletRequest req) {
    populate(req);
  }

  /**
   * sep �� true�̸� ���ϸ��� �Է� tag�� ���� ','�� �ƴ� ASCII 1 �ڵ�� �����Ѵ�.
   * @param req
   * @param sep
   */
  public PageProperties(HttpServletRequest req, boolean sep) {
    if(sep) this.seperate = String.valueOf('\u0001');
    populate(req);
  }

  /**
   *
   * uml.property name="seperate"
   */
  public String getSeperate() {
    return this.seperate;
  }

  public void clear() {
    formInput = null;
  }

  /**
   * <pre>
   * HttpServletRequest ��ü�� FORM �Է°��� �о���̴� �޽��
   * ����  FORM �Է°��� String����
   * FORM  �Է�array���� ','��  ���е� String���� �о���δ�.
   *
   * ex1)����  FORM �Է°�
   *     (HTML ����)
   *     < FORM NAME="reg" METHOD="post"  ACTION="/usermgr?menu=register"  >
   *     < INPUT  TYPE=text NAME="username" value="" >
   *     (usermgr  �������� ó�����)
   *     Properties  formInput =  getFormInput(req);
   *     String  username = formInput.getProperty("username");
   *
   * ex2)(JSP  ����)
   *     < FORM NAME="reg" METHOD="post"  ACTION="/usermgr?menu=register"  >
   *     < INPUT  TYPE=checkbox NAME="seq" VALUE="1" >
   *     < INPUT  TYPE=checkbox NAME="seq" VALUE="2" >
   *     < INPUT  TYPE=checkbox NAME="seq" VALUE="3" >
   *     (usermgr  �������� ó�����)
   *     Properties  formInput =  getFormInput(req);
   *     String  seq  = formInput.getProperty("seq");
   *     //  seq�� ������ "1,2,3" �̴�.
   * </pre>
   * Properties FORM�Է�name�� key��,  FORM�Է�value��  value��  ����
   * @param req javax.servlet.http.HttpServletRequest
   * @throws java.security.InvalidParameterException ������ �߸��� �Ķ���� �Է½�
   */
  public void populate(HttpServletRequest req) {
    formInput = new Properties();
    Enumeration fieldNames = req.getParameterNames();

    while (fieldNames.hasMoreElements()) {
      String paramName = (String) fieldNames.nextElement();
      String paramValue = "";
      try {
        for (int i = 0; i < req.getParameterValues(paramName).length; i++) {
          if (i != 0) paramValue += seperate;
          paramValue += StringUtil.toDB( (String) req.getParameterValues(paramName)[i]);
        }

        if(logger.isDebugEnabled()) logger.debug(paramName + " -> " + paramValue);
      }
      catch (Exception ex) {
        paramValue = "";
      }
      formInput.put(paramName, paramValue);
    }
  }

  public String getProperty(String key) {
    return formInput.getProperty(key.trim());
  }

  public String[] getPropertyToArray(String key) {
    String value = formInput.getProperty(key.trim());

    //if(logger.isDebugEnabled()) logger.debug("Value = " + value);

    if(value == null) return null;
    if(value.trim().length() == 0) return (new String[] {""});

    //logger.debug("---> StrTokenizer start");

    StringTokenizer st = new StringTokenizer(value, this.seperate);
    int cnt = st.countTokens();

    logger.debug("---> key, cnt : " + key + ", " + cnt);

    String arrValue[] = new String[cnt];
    for(int i = 0; i < cnt; i++) {
      arrValue[i] = st.nextToken();
      if(logger.isDebugEnabled()) logger.debug("arrValue("+i+") = " + arrValue[i]);
    }

    return arrValue;
  }

  public String getProperty(String key, String defaultValue) {
    return formInput.getProperty(key.trim(), defaultValue);
  }

  public Object setProperty(String key, String value) {
    return formInput.setProperty(key.trim(), value);
  }

  final public String getDebugMsg(String title)
  {
    StringBuffer msg = new StringBuffer(1024);
    msg.append("\n---- " + title + " ----\n");


    Enumeration keys = formInput.propertyNames();
    while(keys.hasMoreElements()) {
      String key = (String)keys.nextElement();
      msg.append(key + " = [" + formInput.getProperty(key) +"]\n");
    }
    return msg.toString();
  }
}