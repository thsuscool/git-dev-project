package kr.co.offton.jdf.util;

import java.io.UnsupportedEncodingException;  
import kr.co.offton.jdf.basis.GeneralObject;
import kr.co.wdigm.prvscan.PSCheck;
import kr.co.wdigm.prvscan.PSResult;

/**
 * <pre>
 * PGM_NAME: OFFTON StringUtil
 * DESC:  ���ڿ�(java.lang.String ��ü) ó���� '�� Ŭ����
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 **/
public final class StringUtil extends GeneralObject {

  /**
   * <pre>
   * param String input�� null�̾ input.trim().length()�� 0�̸� return true, �ƴϸ� return false;
   * @param  input
   * @return boolean
   * </pre>
   */
  public static boolean isEmpty(String input) {
    if(input == null || input.trim().equals("")) return true;
    return false;
  }

  /**
   * <pre>
   * param String input�� null�̸� return ""; �ƴϸ� return input.trim();
   * @param  input
   * @return String
   * </pre>
   */
  public static String xss_s(String input) {
	  input = input.replaceAll("<","&lt;");
	  input = input.replaceAll(">","&gt;");
	  //input = input.replaceAll("\\n","<br/>");
	  return input;
  }
  
  public static String verify_s(String input) {
	  return verify(input, true);
  }  
  
  public static String verify(String input) {
	return verify_ss((input), true);
  }

  public static String verify_ss(String input, boolean useTrim)
  {
      if(input == null) return "";
      if(useTrim) return xss_s(input.trim());
      else return input;
  }
  
  /**
   * verify (2008-05-14 �����߰�)
   *
   * @param input
   * @param useTrim
   * @return
   */
  public static String verify(String input, boolean useTrim)
  {
      if(input == null) return "";
      if(useTrim) return input.trim();
      else return input;
  }

  /**
   * verify (2008-05-14 �����߰�)
   *
   * @param input
   * @param defaultValue
   * @return
   */
  public static String verify(String input, String defaultValue)
  {
      return verify(input, defaultValue, true);
  }

  /**
   * verify (2008-05-14 �����߰�)
   *
   * @param input
   * @param defaultValue
   * @param useTrim
   * @return
   */
  public static String verify(String input, String defaultValue, boolean useTrim)
  {
      if(isEmpty(input)) return defaultValue;
      if(useTrim) return input.trim();
      else return input;
  }

  /**
   * <pre>
   * param String input�� �����ϰ��ִ� "\r\n"���ڿ�; "<br/>"���ڿ��� ġȯ�Ͽ� ������.
   * @param  input
   * @return String
   * </pre>
   */
  public static String toLine(String input) {
    
    return input.replaceAll("\r\n","<br/>");
  }

  /**
   * <pre>
   * param String input�� ����ִ� ���ڿ��̸� return "", �ƴϸ� ���ڿ��� charset; KSC5601 --> 8859_1��ȯ�Ͽ� ����.<br>
   * �뵵 : DB�� ��; ���ڿ�; ������
   * @param  input
   * @return String
   * </pre>
   */
  public static String toDB(String input) {
    if(isEmpty(input)) return "";

    return input;
  }

  /**
   * <pre>
   * param String input�� ����ִ� ���ڿ��̸� return "", �ƴϸ� return input<br>
   * �뵵 : DB�� ��n�� ���ڿ�; ������
   * @param  input
   * @return String
   * </pre>
   */
  public static String fromDB(String input) {
    if(isEmpty(input)) return "";
    return  input;
  }

  /**
   * <pre>
   * ���� : split("20030516","422","-") --> "2003-05-16", split("ISO88591","341","_") --> "ISO_8859_1"<br>
   * param input�� param size�� ����8�� param delim; �����Ͽ� ����<br>
   * �뵵 : �ڵ强 ���ڿ�; ��� ��κ� DB���� �����ڰ� ���� ����, ���ȭ�鿡���� �����ڷ� ���еǾ� �����ִ� ��찡 ����. �̶� �ַ� �����.
   * param input �� ����ִ� ��� return input;
   * @param input
   * @param size
   * @param delim
   * @return String
   * </pre>
   */
  public static String split(String input,String size,String delim) {

    if(isEmpty(input))
      return input;

    String rtn = "";
    int pos = 0;
    for(int i = 0; i < size.length()-1;i++) {
      int len = Integer.parseInt(String.valueOf(size.charAt(i)));
      if(pos + len <= input.length()) {
        rtn += input.substring(pos,pos+len) + delim;
        pos += len;
      } else {
        break;
      }
    }
    rtn += input.substring(pos);
    return rtn;
  }

  /**
   * <pre>
   * ���ڿ�; ���Ӹ� ���·� ��ȯ�ÿ� ���
   * ��) �Խ��� ����Ʈ���� f��; �����ٶ�, �� f��: �߶� "..."; �ٿ��� �����ִ� ��쿡 ���
   * ������ ���� �̿��Ͽ� ó���ϹǷ� �ѱ۰� ����/������ ��� ������ ���ڼ� ���δ�.
   * @param str �� String
   * @param maxlen �ڸ� ���� ����
   * @return String
   * </pre>
   */
  public static String toShortenString(String str, int maxlen)
  {
    if(str.length() > maxlen) str = str.substring(0, maxlen) + " ...";

    return str;
  }

  /**
   * <pre>
   * ���ڿ�; ���Ӹ� ���·� ��ȯ�ÿ� ���
   * ��) �Խ��� ����Ʈ���� f��; �����ٶ�, �� f��: �߶� "..."; �ٿ��� �����ִ� ��쿡 ���
   * ������ ����Ʈ �� �̿��Ͽ� ó���ϹǷ� �ѱ۰� ����/������ ��� �ٸ� ���ڼ� ���δ�.
   * �ѱ� �� ��� ����Ʈ �� �ʰ�Ǿ�; �� �ʰ�� ���ڸ� ���� ���� �ʴ´�.
   * @param str �� String
   * @param maxlen �ڸ� ����Ʈ ����
   * @return String
   */
  public static String toShortenStringB(String str, int maxlen)
  {
      return toShortenStringB(str,maxlen,'-');
  }

  /**
   * <pre>
   * ���ڿ�; ���Ӹ� ���·� ��ȯ�ÿ� ���
   * ��) �Խ��� ����Ʈ���� f��; �����ٶ�, �� f��: �߶� "..."; �ٿ��� �����ִ� ��쿡 ���
   * ������ ����Ʈ �� �̿��Ͽ� ó���ϹǷ� �ѱ۰� ����/������ ��� �ٸ� ���ڼ� ���δ�.
   * @param str �� String
   * @param maxlen �ڸ� ����Ʈ ����
   * @param char +1 or -1
   * @return String
   */
  public static String toShortenStringB(String str, int maxlen, char type)
  {
      byte[] bytes = str.getBytes();
      int len = bytes.length;
      int counter = 0;

      if(maxlen >= len)
      {
          StringBuffer sb = new StringBuffer();
          sb.append(str);

          for(int i=0; i<maxlen-len; i++) sb.append(' ');
          return sb.toString();
      }

      for(int i=maxlen-1; i>=0; i--)
      {
          if(((int)bytes[i] & 0x80) != 0) counter++;
      }

      String result = null;

      if(type == '+') result = new String(bytes, 0, maxlen + (counter % 2));
      else if(type == '-') result = new String(bytes, 0, maxlen - (counter % 2));
      else result = new String(bytes, 0, maxlen - (counter % 2));

      result = result + " ...";
      return result;
  }

  /**
   * <pre>
   * �6�Ŭ�� LPAD�� ������ ���ӻ�, ����Ʈ�� "0"; len-str.length() ���� �ٿ���.
   * @param  str
   * @param  len
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String lPad(String str, int len) {
    return pad(str,len," ",'l') ;
  }

  /**
   * <pre>
   * �6�Ŭ�� LPAD�� ������ ���ӻ�, plusStr; len-str.length() ���� �ٿ��� �ٿ���.
   * @param  str
   * @param  len
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String lPad(String str, int len, String plusStr) {
    return pad(str,len,plusStr,'l') ;
  }

  /**
   * <pre>
   * �6�Ŭ�� RPAD�� ������ ���ӻ�, ����Ʈ�� "0"; len-str.length() ���� �ٿ���.
   * @param  str
   * @param  len
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String rPad(String str, int len) {
    return pad(str,len," ",'r') ;
  }

  /**
   * <pre>
   * �6�Ŭ�� RPAD�� ������ ���ӻ�, plusStr; len-str.length() ���� �ٿ��� �ٿ���.
   * @param  str
   * @param  len
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String rPad(String str, int len, String plusStr) {
    return pad(str,len,plusStr,'r') ;
  }


  /**
   * <pre>
   * param char lOrr�� ��� param str�� �¿쿡 param plusStr; len-str.length()���� �ٿ��� ������. len-str.length()�� 0���� �۰ų� ��:��
   * param String str ; �׳� ������.<br>
   * param char lOrr �� 'l,r'�� �ƴϸ� param String str; �׳� ������.
   * @param  str
   * @param  len
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String pad(String str, int len, String plusStr, char lOrr){
    StringBuffer sb = new StringBuffer(str);
    if(lOrr == 'l'){
      for(int i=0; i<len-str.length(); i++)
        sb.insert(0,plusStr);
    }else if(lOrr == 'r'){
      for(int i=0; i<len-str.length(); i++)
        sb.append(plusStr);
    }

    return sb.toString();
  }

  /**
   * <pre>
   * �6�Ŭ�� LTRIM�� ������ ���ӻ�, ������ ���; f���Ѵ�.
   * @param  source
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String lTrim(String source) {
      return source.replaceAll("^\\s+", "");
  }

  /**
   * <pre>
   * �6�Ŭ�� LTRIM�� ������ ���ӻ�, �8����� ��� �� �Ѱ��� str; f���Ѵ�.
   * @param  source
   * @param  str
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String lTrim(String source, String str) {
      return source.replaceAll("^\\s+", "").replaceAll("^"+str+"+", "");
  }

  /**
   * <pre>
   * �6�Ŭ�� RTRIM�� ������ ���ӻ�, �8����� ���; f���Ѵ�.
   * @param  source
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String rTrim(String source) {
      return source.replaceAll("\\s+$", "");
  }

  /**
   * <pre>
   * �6�Ŭ�� RTRIM�� ������ ���ӻ�, �8����� ��� �� �Ѱ��� str; f���Ѵ�.
   * @param  source
   * @param  str
   * @return String
   * @throws Exception
   * </pre>
   */
  public static String rTrim(String source, String str) {
      return source.replaceAll("\\s+$", "").replaceAll(str+"+$", "");
  }
  /** 
   * html 형식 제거 
   * @param str
   * @return
   */
  public static String htmlRemove(String str) {
      return str.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
  }
  /**
   * <pre>
   * ��Ʈ��; �߶󳽴�, ���� index�� ��'�� �����, ""��; ����.
   * @param  str
   * @param  start
   * @param  end
   * @return String
   * </pre>
   */
  public static String substring(String str, int start, int end) {
    String retVal = "";
    if(isEmpty(str)) return retVal;

    try {
      retVal = str.substring(start, end);
    }catch(Exception e) {
      retVal = "";
    }

    return retVal;
  }

  /**
   * <pre>
   * param len ����Ʈ�� ũ�⸦ ���� StringBuffer�� ���8�� �ʱ�ȭ �� ��
   * String8�� ��ȯ�Ͽ� ����.
   * @param  len
   * @return String
   * </pre>
   */
  public static String space(int len) {
    StringBuffer retVal = new StringBuffer(len);

    for(int i = 0; i < len; i++) retVal.append(" ");

    return retVal.toString();
  }

  /**
   * <pre>
   * String str�� �8���8�� '0'; len-lengthB(str) ���� �ٿ��� �ٿ���.
   * @param  str
   * @param  len
   * @return String
   * </pre>
   */
  public static String rPadB(String str, int len) {
    return padB(str,len,'0','r') ;
  }

  /**
   * <pre>
   * String str�� ����8�� '0'; len-lengthB(str) ���� �ٿ��� �ٿ���.
   * @param  str
   * @param  len
   * @return String
   * </pre>
   */
  public static String lPadB(String str, int len) {
    return padB(str,len,'0','l') ;
  }

  /**
   * <pre>
   * char IOrr�� ��� String str�� �¿쿡 char plusChar; len-lengthB(str)���� �ٿ��� ������.
   * @param  str
   * @param  len
   * @param  plusChar
   * @param  lOrr
   * @return String
   * </pre>
   */
  public static String padB(String str, int len, char plusChar, char lOrr){
    StringBuffer sb = new StringBuffer(str);
    int lenB = lengthB(str);
    if(lOrr == 'l'){
      for(int i=0; i<len-lenB; i++)
        sb.insert(0,plusChar);
    }else if(lOrr == 'r'){
      for(int i=0; i<len-lenB; i++)
        sb.append(plusChar);
    }
    return sb.toString();
  }

  /**
   * <pre>
   * ���ڿ� str; ����Ʈ �迭�� ��ȯ�Ͽ� �� ���̸� int�� ����.
   * @param  str
   * @return int
   * </pre>
   */
  private static int lengthB (String str){
     return str.getBytes().length;
  }

  /**
   * <pre>
   * ���ϴ� ��Ʈ���迭; "" �� �ʱ�ȭ���Ѽ� �����Ѵ�.
   * @param  size
   * @return String[]
   * </pre>
   */
  public static String[] arrInit(int size){
    String[] arrName=new String[size];
    for(int i=0;i<size;i++){
      arrName[i]="";
    }
    return arrName;
  }

  /**
   * <pre>
   * �迭�� Ưd ���ڿ��� ���ԵǾ��ִ��� v��
   * @param  arr, str
   * @return int
   * </pre>
   */
  public static int existStr(String[] arr, String str)
  {
      for(int i=0; i<arr.length; i++ )
      {
          if(arr[i].equals(str))
          {
              return i;
          }
      }
      return -1;
  }

  /**
   * BASE64 Encoder
   *
   * @author OFFTON, KIM HYEONG SEOP, 2008-04-29
   * @param str
   * @return
   * @throws Exception
   */
  public static final String encodeBASE64(String str)
  {
      String result = "";

      try
      {
          sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder();
          byte[] b1 = str.getBytes("UTF-8");
          result = encoder.encode(b1).replaceAll("[^A-Za-z0-9=/+]", "");
      }
      catch(Exception e)
      {
    	// 2015-12-03 시큐어코딩
    	  logger.error(e);
    	  
    	  if(result != null) {
    		  result = null;
    	  }
      }

      return result;
  }

  /**
   * BASE64 Decoder
   *
   * @author OFFTON, KIM HYEONG SEOP, 2008-04-29
   * @param str
   * @return
   * @throws java.io.IOException
   */
  public static final String decodeBASE64(String str)
  {
      String result = "";

      try
      {
          sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
          byte[] b1 = decoder.decodeBuffer(str);
          result = new String(b1);
      }
      catch (java.io.IOException ex)
      {
    	// 2015-12-03 시큐어코딩
    	  logger.error(ex);
    	  
    	  if(result != null) {
    		  result = null;
    	  }
      }

      return result;
  }
  
	public static String decodeBASE64_2(String str) {
		String result = "";

		try {
			sun.misc.BASE64Decoder decoder = new sun.misc.BASE64Decoder();
			byte[] b1 = decoder.decodeBuffer(str);
			result = new String(b1, "UTF-8");
		} catch (Exception e) {
			// 2015-12-03 시큐어코딩
			logger.error(e);
			
			if(result != null) {
	    		  result = null;
	    	  }
		}
		return result;
	}

  /**
   * String Appender
   *
   * @author OFFTON, KIM HYEONG SEOP, 2008-04-29
   * @param exist
   * @param source
   * @param delimiter
   * @return
   */
  public static final String appendString(String exist, String source, String delimiter)
  {
      String result = "";

      if(StringUtil.isEmpty(exist)) result = source;
      else result = exist + delimiter + source;

      return result;
  }
  
  /**
   * ISO8859_1濡� �씤肄붾뵫�맂 臾몄옄�뿴�쓣 KSC5601濡� 蹂��솚�븳�떎.
   *
   * @param str8859 8859_1濡� encoding�맂 String
   * @return KSC5601濡� 蹂��솚�맂 String
   */
  public static String toKor( String str8859 ) {

    if( str8859 == null ) return null;

    String str5601 = null;

    try {
      str5601 = new String( str8859.getBytes("8859_1"), "KSC5601" );
    } catch( UnsupportedEncodingException e ) {
      str5601 = str8859;
    }

    return str5601;
  }

  /**
   * KSC5601濡� �씤肄붾뵫�맂 臾몄옄�뿴�쓣 ISO8859_1濡� 蹂��솚�븳�떎.
   *
   * @param str5601 KSC5601濡� encoding�맂 String
   * @return ISO8859_1濡� 蹂��솚�맂 String
   */
  public static String toEng( String str5601 ) {

    if( str5601 == null ) return null;

    String str8859 = null;

    try {
      str8859 = new String( str5601.getBytes("KSC5601"), "8859_1" );
    } catch( UnsupportedEncodingException e ) {
      str8859 = str5601;
    }

    return str8859;
  }
  public static String privacy( String str ) {

      // 개인정보 노출 점검
		PSCheck check = new PSCheck();           // PSCheck 클래스 생성
		check.setJuminAll(true);                 // 전체 주민번호 검사여부
		check.setJuminPart(true);                // 부분(앞자리) 주민번호 검사여부
		check.setSaup(true);                     // 사업자번호 검사여부
		check.setBubin(true);                    // 법인번호 검사여부
		check.setSinyong(true);                  // 신용카드번호 검사여부
		check.setHandphone(true);                // 핸드폰번호 검사여부
		//check.setMail(true);                   // E메일 주소 검사여부
		
		String msg = "";		
		String tmpStr_1 = "";
		int count = 0;
		try {
			
			str = htmlRemove1(str);
			//System.out.println("str common: " + str);
			PSResult[] list = check.checkPrivacy(str); // 폼데이터(제목/본문) 검사결과
			if (list.length > 0) {
			   for (int j = 0; j < list.length; j++) {
			      System.out.println("type: " + list[j].getType()); // 노출항목 타입코드번호
			      String[] tmpStr = list[j].getValueArray(); // getValueArray 적용시
			      for (int k = 0 ; k < tmpStr.length ; k++) {
			         System.out.println("value: " + tmpStr[k]); // 노출 값
			         count ++;
			      }
			      msg += list[j].getTypeStr() + ": " + list[j].getValue(); // 메시지 처리
			      msg += "₩₩n";
			      if (count == 1) {
			         tmpStr_1 = list[j].getValue();
			      }else{
			    	  tmpStr_1 = tmpStr_1 + " : " + list[j].getValue() ;
			      }
			   }
			}
			System.out.println("tmpStr_1" + tmpStr_1);
			return tmpStr_1;
		}catch (Exception ex) {
//			 예외처리.
			return "";
		}
  }
  
  public static String htmlRemove1(String str) {
	  StringBuffer t = new StringBuffer();
	  StringBuffer t2 = new StringBuffer();
	  
	 
	  char[] c = str.toCharArray();
	  char ch;
	  int d = 0;
	  boolean check = false;
	  boolean scriptChkeck = false;
	  boolean styleCheck = false;
	  for(int i=0,len = c.length;i<len;i++) {
	   ch = c[i];
	   if(ch=='<') {
	    check = true;
	   }
	   
	   if(!check&!scriptChkeck&&!styleCheck){
	    
	    t.append(ch);
	   }

	    d++;
	    t2.append(ch);
	    if(d>9){
	     t2.delete(0,1);

	    }
	    
	    
	    if(!scriptChkeck) {
	     if(t2.toString().toLowerCase().indexOf("<script")==0){
	      scriptChkeck = true; 
	     }
	     
	    }
	    if(scriptChkeck) {
	     if(t2.toString().toLowerCase().indexOf("</script>")==0){
	     
	      scriptChkeck = false; 
	     }

	    }
	    
	    
	    if(!styleCheck) {
	     if(t2.toString().toLowerCase().indexOf("<style")==0){
	      styleCheck = true; 
	     }
	     
	    }
	    if(styleCheck) {
	     
	     if(t2.toString().toLowerCase().indexOf("</style>")==0){
	      styleCheck = false; 
	     }

	    }
	    
	    if(ch=='>') {
	     check = false;
	    }
	   }
	  
	    
	  return  t.toString();  
	 }
  
}