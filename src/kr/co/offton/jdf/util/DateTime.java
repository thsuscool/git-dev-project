package kr.co.offton.jdf.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import kr.co.offton.jdf.basis.GeneralObject;

/**
 * <pre>
 * PGM_NAME: OFFTON DateTime
 * DESC: ��¥ �� �ð�ó���� ���� Ŭ����
 * author: (��)���� Offton Co., Ltd.
 * since: 2003
 * history: version 1.0
 * see:
 * </pre>
 */
public final class DateTime extends GeneralObject {
  public final static int YEAR         = Calendar.YEAR;
  public final static int MONTH        = Calendar.MONTH;
  public final static int DAY_OF_MONTH = Calendar.DAY_OF_MONTH;

  /**
   * <pre>
   * Don't let anyone instantiate this class
   * </pre>
   */
  private DateTime() {}

  /**
   * <pre>
   * param Timestamp input�� null�ΰ��, return new Timestamp(0) --> January 1, 1970 00:00:00 GMT<br>
   * input�� null�� �ƴϸ�, return input;
   * @param  input
   * @return Timestamp
   * </pre>
   */
  public static Timestamp verify(Timestamp input) {
    if(input == null) return new Timestamp(0);
    return input;
  }

  /**
   * <pre>
   * param String input�� null�ΰ��, return new Timestamp(0) --> January 1, 1970 00:00:00 GMT<br>
   * input�� null�� �ƴϸ�, input�� java.sql.Timestamp�� ����ȯ�Ͽ� ����(return toTimestamp(input))
   * @param  input
   * @return Timestamp
   * </pre>
   */
  public static Timestamp verify(String input) {
    if(input == null) return new Timestamp(0);
    return toTimestamp(input);
  }

  /**
   * <pre>
   * ���� �ð��� java.sql.Timestamp ��ü�� ����
   * @return Timestamp
   * </pre>
   */
  public static Timestamp getNowTimestamp() {
    return new Timestamp((new Date()).getTime());
  }

  /**
   * <pre>
   * ���� �ð��� java.util.Date ��ü�� ����
   * @return java.util.Date
   * </pre>
   */
  public static Date getNow() {
    return new Date();
  }

  /**
   * <pre>
   * param String ymd �� "yyyy-MM-dd" ��¥ ������ �°�, �����ϴ� ��¥������ check��. ������ void��.<br>
   * ����, Exception �߻����η� üũ��.
   * param String ymd �� null�ΰ�� NullPointerException, ������ Ʋ����� ParseException �߻�.
   * @param ymd
   * @throws java.lang.NullPointerException
   * @throws java.text.ParseException
   * </pre>
   */
  public static void check(String ymd) throws Exception
  {
    DateTime.check(ymd, "yyyy-MM-dd");
  }

  /**
   * <pre>
   * param String ymd �� param String format ��¥ ������ �°�, �����ϴ� ��¥������ check��. ������ void��.<br>
   * ����, Exception �߻����η� üũ��.
   * param String ymd �� null�ΰ�� NullPointerException, ������ Ʋ����� ParseException �߻�.
   * @param ymd
   * @param format
   * @throws java.lang.NullPointerException
   * @throws java.text.ParseException
   * </pre>
   */
  public static void check(String ymd, String format) throws ParseException
  {
    if ( ymd == null )
      throw new NullPointerException("date string to check is null");
    if ( format == null )
      throw new NullPointerException("format string to check date is null");

    SimpleDateFormat formatter = new SimpleDateFormat (format, java.util.Locale.KOREA);
    Date date = null;
    try
    {
      date = formatter.parse(ymd);
    }
    catch(ParseException e)
    {
      throw new ParseException(e.getMessage() + " with format \"" + format + "\"", e.getErrorOffset());
    }

    if ( ! formatter.format(date).equals(ymd) )
      throw new ParseException("Out of bound date:\"" + ymd + "\" with format \"" + format + "\"", 0);
  }

  /**
   * <pre>
   * param String ymd �� "yyyyMMdd" ��¥ ������ �°�, �����ϴ� ��¥�̸� return true.<br>
   * param String ymd �� ��¥ ������ ���� �ʰų�, �������� �ʴ� ��¥�� �� return false
   * @param ymd
   * @return boolean
   * </pre>
   */
  public static boolean isValid(String ymd) throws Exception {
    return DateTime.isValid(ymd, "yyyyMMdd");
  }

  /**
   * <pre>
   * param String ymd �� param String format ��¥ ������ �°�, �����ϴ� ��¥�̸� return true.<br>
   * param String ymd �� ��¥ ������ ���� �ʰų�, �������� �ʴ� ��¥�� �� return false
   * @param ymd
   * @param format
   * @return boolean
   * </pre>
   */
  public static boolean isValid(String ymd, String format) {
    SimpleDateFormat formatter = new SimpleDateFormat (format, java.util.Locale.KOREA);
    Date date = null;
    try {
      date = formatter.parse(ymd);
    } catch(java.text.ParseException e) {
      return false;
    }

    if(!formatter.format(date).equals(ymd))
      return false;

    return true;
  }

  /**
   * <pre>
   * ���� ��¥�� "yyyy-MM-dd" ��¥ ������ String ��ü�� ����
   * @return String
   * </pre>
   */
  public static String getDateString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt�� "yyyy-MM-dd" ��¥ ������ String ��ü�� ����<br>
   * param java.util.Date dt �� null�̸� return null;
   * @param dt
   * @return String
   * </pre>
   */
  public static String getDateString(Date dt) {
    if(dt == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd", java.util.Locale.KOREA);
    return formatter.format(dt);
  }

  /**
   * <pre>
   * param java.sql.Timestamp ts�� "yyyy-MM-dd" ��¥ ������ String ��ü�� ����<br>
   * param java.sql.Timestamp ts �� null�̸� return null;
   * @param ts
   * @return String
   * </pre>
   */
  public static String getDateString(Timestamp ts) {
    if(ts == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd",java.util.Locale.KOREA);
    return formatter.format(ts);
  }

  /**
   * <pre>
   * ���� ��¥�� param String pattern ��¥ ������ String ��ü�� ����<br>
   * For example, String time = DateTime.getFormatString("yyyy-MM-dd HH:mm:ss");
   * @param pattern
   * @return String
   * </pre>
   */
  public static String getFormatString(String pattern) {
    SimpleDateFormat formatter = new SimpleDateFormat (pattern, java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt�� param String pattern ��¥ ������ String ��ü�� ����<br>
   * param java.util.Date dt �� null�̸� return null;
   * @param pattern
   * @param dt
   * @return String
   * </pre>
   */
  public static String getFormatString(String pattern, Date dt) {
    if(dt == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat (pattern, java.util.Locale.KOREA);
    return formatter.format(dt);
  }

  /**
   * <pre>
   * ���糯¥�� param "yyyyMMdd" ��¥ ������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd"); �� ������ ����� ������
   * @return String
   * </pre>
   */
  public static String getShortDateString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt�� "yyyyMMdd" ��¥ ������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������
   * param java.util.Date dt �� null�̸� return null;
   * @param dt
   * @return String
   * </pre>
   */
  public static String getShortDateString(Date dt) {
    if(dt == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);
    return formatter.format(dt);
  }

  /**
   * <pre>
   * param java.sql.Timestamp ts�� "yyyyMMdd" ��¥ ������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������
   * param java.sql.Timestamp ts �� null�̸� return null;
   * @param ts
   * @return String
   * </pre>
   */
  public static String getShortDateString(Timestamp ts) {
    if(ts == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd",java.util.Locale.KOREA);
    return formatter.format(ts);
  }

  /**
   * <pre>
   * ����ð��� "HHmmss"(��.��.��)������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������
   * @return String
   * </pre>
   */
  public static String getShortTimeString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("HHmmss", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt�� �ð��� "HHmmss"(��.��.��)������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������<br>
   * param java.util.Date dt �� null�̸� return null;
   * @param dt
   * @return String
   * </pre>
   */
  public static String getShortTimeString(Date dt) {
    if(dt == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat ("HHmmss", java.util.Locale.KOREA);
    return formatter.format(dt);
  }

  /**
   * <pre>
   * ���� ��¥-�ð��� "yyyy-MM-dd HH:mm:ss:SSS" ������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������
   * @return String
   * </pre>
   */
  public static String getTimeStampString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss:SSS", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt�� "yyyy-MM-dd HH:mm:ss:SSS" ������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������
   * @param dt
   * @return String
   * </pre>
   */
  public static String getTimeStampString(Date dt) {
    if(dt == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss:SSS", java.util.Locale.KOREA);
    return formatter.format(dt);
  }

  /**
   * <pre>
   * ���� �ð��� "HH:mm:ss" ������ String ��ü�� ����<br>
   * @return String
   * </pre>
   */
  public static String getTimeString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("HH:mm:ss", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt�� "HH:mm:ss" ������ String ��ü�� ����<br>
   * getDateString("yyyyMMdd",dt); �� ������ ����� ������
   * param java.util.Date dt�� null�̸� return null;
   * @param dt
   * @return String
   * </pre>
   */
  public static String getTimeString(Date dt) {
    if(dt == null) return null;
    SimpleDateFormat formatter = new SimpleDateFormat ("HH:mm:ss", java.util.Locale.KOREA);
    return formatter.format(dt);
  }

  /**
   * <pre>
   * param String ymd���� year�� month�� �̾Ƽ� ���� 10���� ũ�ų� ������ ��+1 ��<br>
   * 10���� ������ ���� String ��ü�� ������.<br>
   * �ڹ��� Date���� new Date(2003,4,15)�� 2003�� 5�� 15�� ��.<br>
   * param String ymd�� "yyyyMMdd"������ String ��ü�̾����.
   * @param ymd
   * @return String
   * </pre>
   */
  public static String getFiscal_year(String ymd) {
    String fYear = "";

    int nYear  = Integer.valueOf(ymd.substring(0, 4)).intValue();
    int nMonth = Integer.valueOf(ymd.substring(4, 6)).intValue();

    if ( nMonth < 10 )
      fYear = "" + nYear;
    else
      fYear = "" + (nYear + 1);

    return fYear;
  }

  /**
   * <pre>
   * param String ymd�� null�̰ų� ymd.trim().length() �� 1���� �۴ٸ� ���糯¥ java.util.Date ��ü�� ����<br>
   * param String ymd�� "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" ��¥ ������ ��� java.util.Date ��ü�� ����<br>
   * Exception ó���� �����Ƿ� Exception�߻��� �����߻���
   * @param ymd
   * @return java.util.Date
   * </pre>
   */
  public static Date toDate(String ymd) {
    if (ymd == null || ymd.trim().length() < 1)
      return new java.util.Date();

    return toCalendar(ymd).getTime();
  }

  /**
   * <pre>
   * param String ymd�� null�̰ų� ymd.trim().length() �� 1���� �۴ٸ� ���糯¥ java.util.Calendar ��ü�� ����<br>
   * param String ymd�� "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" ��¥ ������ ��� java.util.Calendar ��ü�� ����<br>
   * Exception ó���� �����Ƿ� Exception�߻��� �����߻���
   * @param ymd
   * @return java.util.Calendar
   * </pre>
   */
  public static Calendar toCalendar(String ymd) {
    if (ymd == null || ymd.trim().length() < 1)
      return Calendar.getInstance();

    int year, mon, day = 0;

    Calendar cal = Calendar.getInstance();

    if (ymd.indexOf("/") > 0 || ymd.indexOf("-") > 0) {
      year = Integer.parseInt(ymd.substring( 0, 4 ));
      mon  = Integer.parseInt(ymd.substring( 5, 7 ));
      day  = Integer.parseInt(ymd.substring( 8, 10 ));
    } else {
      year = Integer.parseInt(ymd.substring( 0, 4 ));
      mon  = Integer.parseInt(ymd.substring( 4, 6 ));
      day  = Integer.parseInt(ymd.substring( 6, 8 ));
    }

    cal.set( year, mon - 1, day, 0, 0, 0 );

    return cal;
  }

  /**
   * <pre>
   * param String ymd�� null�̰ų� ymd.trim().length() �� 1���� �۴ٸ� ���糯¥ java.sql.Timestamp ��ü�� ����<br>
   * param String ymd�� "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" ��¥ ������ ��� java.sql.Timestamp ��ü�� ����<br>
   * Exception ó���� �����Ƿ� Exception�߻��� �����߻���
   * @param ymd
   * @return Timestamp
   * </pre>
   */
  public static Timestamp toTimestamp( String ymd ) {
    return new Timestamp( toDate( ymd ).getTime() );
  }

  /**
   * <pre>
   * param String ymd�� null�̰ų� ymd.trim().length() �� 1���� �۴ٸ� return null<br>
   * param String ymd�� "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" ��¥ ������ ��� java.sql.Timestamp ��ü�� ����<br>
   * Exception ó���� �����Ƿ� Exception�߻��� �����߻���
   * @param ymd
   * @return Timestamp
   * </pre>
   */
  public static Timestamp toNTimestamp(String ymd) {
    if(StringUtil.isEmpty(ymd))
      return null;
    return new Timestamp( toDate( ymd ).getTime() );
  }

  /**
   * <pre>
   * ���� ��¥�� param int n ��ŭ '��(day)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeDate(int n) {
    return RelativeTimestamp(new java.util.Date(), n, DateTime.DAY_OF_MONTH);
  }

  /**
   * <pre>
   * ���� ��¥�� param int n ��ŭ '��(month)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeMonth(int n) {
    return RelativeTimestamp(new java.util.Date(), n, DateTime.MONTH);
  }

  /**
   * <pre>
   * ���� ��¥�� param int n ��ŭ '��(year)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeYear(int n) {
    return RelativeTimestamp(new java.util.Date(), n, DateTime.YEAR);
  }

  /**
   * <pre>
   * param java.util.Date date�� param int n ��ŭ '��(day)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * @param  date
   * @param  n
   * @return Timestamp
   * <pre>
   */
  public static Timestamp RelativeDate(Date date,int n) {
    return RelativeTimestamp(date, n, DateTime.DAY_OF_MONTH);
  }

  /**
   * <pre>
   * param java.util.Date date�� param int n ��ŭ '��(month)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * @param  date
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeMonth(Date date, int n) {
    return RelativeTimestamp(date, n, DateTime.MONTH);
  }

  /**
   * <pre>
   * param java.util.Date date�� param int n ��ŭ '��(year)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * @param  date
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeYear(Date date, int n) {
    return RelativeTimestamp(date, n, DateTime.YEAR);
  }

  /**
   * <pre>
   * param java.util.Date date�� param int n ��ŭ param int mode �� ����
   * '��(day)', '��(month)', '��(year)'�� ���� ���Ѽ� java.sql.Timestamp ��ü�� ����<br>
   * mode --> java.util.Calendar.YEAR, java.util.Calendar.MONTH, java.util.Calendar.DAY_OF_MONTH
   * @param  date
   * @param  n
   * @param  mode
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeTimestamp(Date date, int n, int mode) {
    int year, mon, day = 0;

    Calendar beforeCal = Calendar.getInstance();
    Calendar afterCal = Calendar.getInstance();

    beforeCal.setTime( date );

    year = beforeCal.get( Calendar.YEAR );
    mon  = beforeCal.get( Calendar.MONTH );
    day  = beforeCal.get( Calendar.DAY_OF_MONTH );

    if ( mode == DateTime.YEAR )
      afterCal.set( year + n, mon, day, 0, 0, 0 );
    else if ( mode == DateTime.MONTH )
      afterCal.set( year, mon + n, day, 0, 0, 0 );
    else
      afterCal.set( year, mon, day + n, 0, 0, 0 );

    return new Timestamp (afterCal.getTime().getTime() );
  }

  /**
   * <pre>
   * param java.util.Date date1 ���� param java.util.Date date2 �� ���� �ð����̸� ��(day) ��Ÿ���� int �� ����.
   * ¥������ ���õ�.
   * @param date1
   * @param date2
   * @return int
   * </pre>
   */
  public static int getDayInterval( Date date1, Date date2 ) {
    int ONE_DAY = 86400000;
    int days    = 0;

    days = (int) ( Math.abs( date1.getTime() - date2.getTime() ) / ONE_DAY );

    return days;
  }

  /**
   * <pre>
   * param String ymd �� "yyyyMM","yyyyMMdd" ��¥������ String ��ü�̴�. ymd�� length()�� 6�ڸ��ΰ��� 8�ڸ��� ��쿡 ���ؼ��� �۵���.<br>
   * ymd�� null �ΰ�� return "";<br>
   * ��) convertFormat("200305,"-") --> return "2003-05";, convertFormat("20030515,"/") --> return "2003/05/15";
   * ¥������ ���õ�.
   * @param ymd
   * @param split
   * @return String
   * </pre>
   */
  public static String convertFormat(String ymd, String split) {

    ymd = StringUtil.verify(ymd);
    String lst_formYmd = "";

         if(ymd.length() == 6) lst_formYmd = ymd.substring(0,4) + split + ymd.substring(4,6);
    else if(ymd.length() == 8) lst_formYmd = ymd.substring(0,4) + split + ymd.substring(4,6) + split + ymd.substring(6,8);
    else if(ymd.length() == 10) lst_formYmd = ymd;
    return lst_formYmd;
  }

  /**
   * <pre>
   * param String ymd �� "yyyyMM","yyyyMMdd" ��¥������ String ��ü�̴�. ymd�� length()�� 6�ڸ��ΰ��� 8�ڸ��� ��쿡 ���ؼ��� �۵���.<br>
   * ymd�� null �ΰ�� return "";<br>
   * ��) convertFormat("200305) --> return "2003-05";, convertFormat("20030515) --> return "2003-05-15";
   * ¥������ ���õ�.
   * @param ymd
   * @return String
   * </pre>
   */
  public static String convertFormat(String ymd) {
    return convertFormat(ymd,"-");
  }

  /**
   * <pre>
   * param String ym �� "yyyyMM" ��¥������ String ��ü�̰�, ym�� ��(month)�� ������ ��(day)�� int�� ������.
   * @param ym
   * @return int
   * </pre>
   */
  public static int getLastDate(String ym) {
    int  li_lastdate  = 0;

    Calendar  curCal = Calendar.getInstance();

    curCal.setTime( toDate( ym + "01" ) );

    li_lastdate = curCal.getActualMaximum( Calendar.DAY_OF_MONTH );

    return li_lastdate;
  }

  /**
   * <pre>
   * �ش� ��¥�� ������ ����(1:�� 2:�� 3:ȭ 4:�� 5:�� 6:�� 7:�� )
   * @param ymd
   * @return int
   * </pre>
   */
  public static int getDayOfWeek(String ymd) {
    Calendar cal = toCalendar(ymd);
    return cal.get(Calendar.DAY_OF_WEEK);
  }

  /**
   * <pre>
   * �ش� ��¥�� ������ ����(1:�� 2:�� 3:ȭ 4:�� 5:�� 6:�� 7:�� )
   * @param ymd
   * @return int
   * </pre>
   */
  public static int getDayOfWeek(GregorianCalendar ymd) {
      return ymd.get(GregorianCalendar.DAY_OF_WEEK);
  }

  /**
   * <pre>
   * ���� ��¥�� ���� - 20030101
   * @param ymd
   * @return String
   * </pre>
   */
  public static String nextDay(String ymd){
      return calDay(ymd,1);
  }

  /**
   * <pre>
   * ���� ��¥�� ����
   * @param ymd
   * @return String
   * </pre>
   */
  public static String preDay(String ymd){
      return calDay(ymd,-1);
  }

  /**
   * <pre>
   * ���ó�¥�� �� ���� ���� ��¥�� ���
   * @param n
   * @return String
   * </pre>
   */
  public static String calDay(int n){
      GregorianCalendar today = new GregorianCalendar(java.util.Locale.KOREA);   //����..
      today.add(GregorianCalendar.DATE,n);
      SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);

      return formatter.format(today.getTime());
  }

  /**
   * <pre>
   * �ش糯¥�� �� ���� ���� ��¥�� ���
   * @param ymd
   * @param n
   * @return String
   * </pre>
   */
  public static String calDay(String ymd, int n){
      GregorianCalendar gcCorr_dt = gcDay(ymd);
      gcCorr_dt.add(GregorianCalendar.DATE,n);
      SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);

      return formatter.format(gcCorr_dt.getTime());
  }

  /**
   * <pre>
   * �ش糯¥�� �� ���� ���� ��¥�� ���
   * @param ymd
   * @param day
   * @return String
   * </pre>
   */
  public static String calDay(GregorianCalendar ymd, int day){
      ymd.add(GregorianCalendar.DATE,day);
      SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);

      return formatter.format(ymd.getTime());
  }

  /**
   * <pre>
   * �ش糯¥�� GregorianCalendar������ ����
   * @param ymd
   * @return GregorianCalendar
   * </pre>
   */
  public static GregorianCalendar gcDay(String ymd){
      GregorianCalendar gcCorr_dt = null;

      gcCorr_dt = new GregorianCalendar(
      Integer.parseInt(ymd.substring(0,4))
      ,Integer.parseInt(ymd.substring(4,6))-1
      ,Integer.parseInt(ymd.substring(6,8))
      );

      return gcCorr_dt;
  }
  
  	/**
  	 * ��¥ ���ڿ��� ������ ���� �������� ��ȯ�Ѵ�.
  	 * 
  	 * @param ymd ����(YYYYMMDD)�� ���� ��¥ ���ڿ�
  	 * @param localeType ��������. "KO"�� "Y"�� �ѱ�, "EN", "N"�̸� �̱�.
  	 * @return ������ �°� �����õ� ��¥ ���ڿ�. 
  	 *         �ѱ��� ���� "YYYY-MM-DD" �̱��� ���� "MM-DD-YYYY" 			
  	 */
	public static String convertLocale(String ymd, String localeType) {
	  
		if (StringUtil.isEmpty(ymd) || ymd.trim().equals("--")) {
			return "";
		} else {
			if (localeType.equals("Y") || localeType.equals("KO")) {
				return StringUtil.split(ymd, "422", "-");
			} else if (localeType.equals("N") || localeType.equals("EN")) {
				return ymd.substring(4, 6) + "-" +
						ymd.substring(6, 8) + "-" +
						ymd.substring(0, 4);
			} else {
				return StringUtil.split(ymd, "422", "-");
			}
		}	
	}
	
	/**
	 * Ư������� ������ ��ȯ�Ѵ�.
	 * @param year ��
	 * @param month ��
	 * @return �ش� ����� ����
	 * @throws java.text.ParseException
	 */
    private static int lastDay(int year, int month) throws java.text.ParseException {
    	int day = 0;
    	switch (month) {
    		case 1:
    		case 3:
    		case 5:
    		case 7:
    		case 8:
    		case 10:
    		case 12: 
    			day = 31;
    			break;
    		case 2: 
    			if ((year % 4) == 0) {
    				if ((year % 100) == 0 && (year % 400) != 0) {
    					day = 28; 
    				} else {
    					day = 29; 
    				}
    			} else {
    				day = 28; 
    			}
    			break;
            default: 
            	day = 30;
        }
        return day;
    }	
  
  	/**
  	 * �ùٸ� ����("YYYYMMDD")�� ��¥ ���ڿ����� Ȯ���Ѵ�.
  	 * @param s ����("YYYYMMDD")�� ���� ��¥ ���ڿ�
  	 * @return ���ϴ� ��¥ ���ڿ��� Date ��ü
  	 * @throws java.text.ParseException
  	 */
	public static java.util.Date getDate(String s) throws java.text.ParseException {
		return getDate(s, "yyyyMMdd");
	}
	
	/**
	 * �ùٸ� ����("YYYYMMDD")�� ��¥ ���ڿ����� Ȯ���Ѵ�.
	 * @param s ������ ���� ��¥ ���ڿ�
	 * @param format s��¥ ���ڿ��� ���� ���� 
	 * @return ���ϴ� ��¥ ���ڿ��� Date ��ü
	 * @throws java.text.ParseException
	 */
	public static java.util.Date getDate(String s, String format) throws java.text.ParseException {
		if (s == null) {
			throw new java.text.ParseException("date string to check is null", 0);
		}	
		if ( format == null ) {
			throw new java.text.ParseException("format string to check date is null", 0);
		}	

		java.text.SimpleDateFormat formatter =
				new java.text.SimpleDateFormat (format, java.util.Locale.KOREA);
		java.util.Date date = null;
		try {
			date = formatter.parse(s);
		} catch(java.text.ParseException e) {
			throw new java.text.ParseException(" wrong date:\"" + s +
					"\" with format \"" + format + "\"", 0);
		}

		if (! formatter.format(date).equals(s)) {
			throw new java.text.ParseException(
					"Out of bound date:\"" + s + "\" with format \"" + format + "\"",
					0
			);
		}	
		return date;
	}  

	/**
	 * ���ϴ� �� ���� ������ ��¥ ���ڿ��� ��ȯ�Ѵ�.
	 * @param s
	 * @param month ���� ����
	 * @return ��¥ ������ �°�, �����ϴ� ��¥�� �� ���� ���ϱ�
	 * @throws Exception ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥�� ��� �߻��Ѵ�.
	 */
	public static String addMonths(String s, int month) throws Exception {
		return addMonths(s, month, "yyyyMMdd");
	}

	/**
	 * return add month to date strings with user defined format.
	 * @param String date string
	 * @param int ���� ����
	 * @param format string representation of the date format. For example, "yyyy-MM-dd".
	 * @return int ��¥ ������ �°�, �����ϴ� ��¥�� �� ���� ���ϱ�
	 *           ������ �߸� �Ǿ��ų� �������� �ʴ� ��¥: java.text.ParseException �߻�
	 */
	public static String addMonths(String s, int addMonth, String format) throws Exception {
		java.text.SimpleDateFormat formatter =
				new java.text.SimpleDateFormat (format, java.util.Locale.KOREA);
		java.util.Date date = getDate(s, format);

		java.text.SimpleDateFormat yearFormat =
				new java.text.SimpleDateFormat("yyyy", java.util.Locale.KOREA);
		java.text.SimpleDateFormat monthFormat =
				new java.text.SimpleDateFormat("MM", java.util.Locale.KOREA);
		java.text.SimpleDateFormat dayFormat =
				new java.text.SimpleDateFormat("dd", java.util.Locale.KOREA);
		int year  = Integer.parseInt(yearFormat.format(date));
		int month = Integer.parseInt(monthFormat.format(date));
		int day   = Integer.parseInt(dayFormat.format(date));

		month += addMonth;
		if (addMonth > 0) {
			while (month > 12) {
				month -= 12;
				year  += 1;
			}
		} else {
			while (month <= 0) {
				month += 12;
				year  -= 1;
			}
		}
		java.text.DecimalFormat fourDf = new java.text.DecimalFormat("0000");
		java.text.DecimalFormat twoDf  = new java.text.DecimalFormat("00");
		String tempDate = String.valueOf(fourDf.format(year)) +
				String.valueOf(twoDf.format(month)) +
				String.valueOf(twoDf.format(day));
		java.util.Date targetDate = null;

		try {
			targetDate = getDate(tempDate, "yyyyMMdd");
		} catch(java.text.ParseException pe) {
			day = lastDay(year, month);
			tempDate = String.valueOf(fourDf.format(year)) +
					String.valueOf(twoDf.format(month)) +
					String.valueOf(twoDf.format(day));
			targetDate = getDate(tempDate, "yyyyMMdd");
		}

		return formatter.format(targetDate);
	}  
}