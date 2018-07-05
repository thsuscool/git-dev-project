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
 * DESC: 날짜 및 시간처리를 위한 클래스
 * author: (주)옵톤 Offton Co., Ltd.
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
   * param Timestamp input이 null인경우, return new Timestamp(0) --> January 1, 1970 00:00:00 GMT<br>
   * input이 null이 아니면, return input;
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
   * param String input이 null인경우, return new Timestamp(0) --> January 1, 1970 00:00:00 GMT<br>
   * input이 null이 아니면, input을 java.sql.Timestamp로 형변환하여 리턴(return toTimestamp(input))
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
   * 현재 시간을 java.sql.Timestamp 객체로 리턴
   * @return Timestamp
   * </pre>
   */
  public static Timestamp getNowTimestamp() {
    return new Timestamp((new Date()).getTime());
  }

  /**
   * <pre>
   * 현재 시간을 java.util.Date 객체로 리턴
   * @return java.util.Date
   * </pre>
   */
  public static Date getNow() {
    return new Date();
  }

  /**
   * <pre>
   * param String ymd 가 "yyyy-MM-dd" 날짜 형식이 맞고, 존재하는 날짜인지를 check함. 리턴은 void임.<br>
   * 사용시, Exception 발생여부로 체크함.
   * param String ymd 가 null인경우 NullPointerException, 포맷이 틀린경우 ParseException 발생.
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
   * param String ymd 가 param String format 날짜 형식이 맞고, 존재하는 날짜인지를 check함. 리턴은 void임.<br>
   * 사용시, Exception 발생여부로 체크함.
   * param String ymd 가 null인경우 NullPointerException, 포맷이 틀린경우 ParseException 발생.
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
   * param String ymd 가 "yyyyMMdd" 날짜 형식이 맞고, 존재하는 날짜이면 return true.<br>
   * param String ymd 가 날짜 형식이 맞지 않거나, 존재하지 않는 날짜일 때 return false
   * @param ymd
   * @return boolean
   * </pre>
   */
  public static boolean isValid(String ymd) throws Exception {
    return DateTime.isValid(ymd, "yyyyMMdd");
  }

  /**
   * <pre>
   * param String ymd 가 param String format 날짜 형식이 맞고, 존재하는 날짜이면 return true.<br>
   * param String ymd 가 날짜 형식이 맞지 않거나, 존재하지 않는 날짜일 때 return false
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
   * 현재 날짜를 "yyyy-MM-dd" 날짜 형식의 String 객체로 리턴
   * @return String
   * </pre>
   */
  public static String getDateString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt를 "yyyy-MM-dd" 날짜 형식의 String 객체로 리턴<br>
   * param java.util.Date dt 가 null이면 return null;
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
   * param java.sql.Timestamp ts를 "yyyy-MM-dd" 날짜 형식의 String 객체로 리턴<br>
   * param java.sql.Timestamp ts 가 null이면 return null;
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
   * 현재 날짜를 param String pattern 날짜 형식의 String 객체로 리턴<br>
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
   * param java.util.Date dt를 param String pattern 날짜 형식의 String 객체로 리턴<br>
   * param java.util.Date dt 가 null이면 return null;
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
   * 현재날짜를 param "yyyyMMdd" 날짜 형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd"); 와 동일한 결과를 리턴함
   * @return String
   * </pre>
   */
  public static String getShortDateString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt를 "yyyyMMdd" 날짜 형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함
   * param java.util.Date dt 가 null이면 return null;
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
   * param java.sql.Timestamp ts를 "yyyyMMdd" 날짜 형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함
   * param java.sql.Timestamp ts 가 null이면 return null;
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
   * 현재시간을 "HHmmss"(시.분.초)형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함
   * @return String
   * </pre>
   */
  public static String getShortTimeString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("HHmmss", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt의 시간을 "HHmmss"(시.분.초)형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함<br>
   * param java.util.Date dt 가 null이면 return null;
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
   * 현재 날짜-시간을 "yyyy-MM-dd HH:mm:ss:SSS" 형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함
   * @return String
   * </pre>
   */
  public static String getTimeStampString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss:SSS", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt를 "yyyy-MM-dd HH:mm:ss:SSS" 형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함
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
   * 현재 시간을 "HH:mm:ss" 형식의 String 객체로 리턴<br>
   * @return String
   * </pre>
   */
  public static String getTimeString() {
    SimpleDateFormat formatter = new SimpleDateFormat ("HH:mm:ss", java.util.Locale.KOREA);
    return formatter.format(new Date());
  }

  /**
   * <pre>
   * param java.util.Date dt를 "HH:mm:ss" 형식의 String 객체로 리턴<br>
   * getDateString("yyyyMMdd",dt); 와 동일한 결과를 리턴함
   * param java.util.Date dt가 null이면 return null;
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
   * param String ymd에서 year과 month를 뽑아서 월이 10보다 크거나 같으면 년+1 을<br>
   * 10보다 작으면 년을 String 객체로 리턴함.<br>
   * 자바의 Date에서 new Date(2003,4,15)는 2003년 5월 15일 임.<br>
   * param String ymd는 "yyyyMMdd"형식의 String 객체이어야함.
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
   * param String ymd가 null이거나 ymd.trim().length() 가 1보다 작다면 현재날짜 java.util.Date 객체로 리턴<br>
   * param String ymd가 "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" 날짜 형식인 경우 java.util.Date 객체로 리턴<br>
   * Exception 처리가 없으므로 Exception발생시 에러발생됨
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
   * param String ymd가 null이거나 ymd.trim().length() 가 1보다 작다면 현재날짜 java.util.Calendar 객체로 리턴<br>
   * param String ymd가 "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" 날짜 형식인 경우 java.util.Calendar 객체로 리턴<br>
   * Exception 처리가 없으므로 Exception발생시 에러발생됨
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
   * param String ymd가 null이거나 ymd.trim().length() 가 1보다 작다면 현재날짜 java.sql.Timestamp 객체로 리턴<br>
   * param String ymd가 "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" 날짜 형식인 경우 java.sql.Timestamp 객체로 리턴<br>
   * Exception 처리가 없으므로 Exception발생시 에러발생됨
   * @param ymd
   * @return Timestamp
   * </pre>
   */
  public static Timestamp toTimestamp( String ymd ) {
    return new Timestamp( toDate( ymd ).getTime() );
  }

  /**
   * <pre>
   * param String ymd가 null이거나 ymd.trim().length() 가 1보다 작다면 return null<br>
   * param String ymd가 "yyyyMMdd","yyyy/MM/dd","yyyy-MM-dd" 날짜 형식인 경우 java.sql.Timestamp 객체로 리턴<br>
   * Exception 처리가 없으므로 Exception발생시 에러발생됨
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
   * 현재 날짜에 param int n 만큼 '일(day)'을 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeDate(int n) {
    return RelativeTimestamp(new java.util.Date(), n, DateTime.DAY_OF_MONTH);
  }

  /**
   * <pre>
   * 현재 날짜에 param int n 만큼 '월(month)'을 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeMonth(int n) {
    return RelativeTimestamp(new java.util.Date(), n, DateTime.MONTH);
  }

  /**
   * <pre>
   * 현재 날짜에 param int n 만큼 '년(year)'을 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
   * @param  n
   * @return Timestamp
   * </pre>
   */
  public static Timestamp RelativeYear(int n) {
    return RelativeTimestamp(new java.util.Date(), n, DateTime.YEAR);
  }

  /**
   * <pre>
   * param java.util.Date date에 param int n 만큼 '일(day)'를 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
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
   * param java.util.Date date에 param int n 만큼 '월(month)'을 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
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
   * param java.util.Date date에 param int n 만큼 '년(year)'을 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
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
   * param java.util.Date date에 param int n 만큼 param int mode 에 따라
   * '일(day)', '월(month)', '년(year)'을 증가 시켜서 java.sql.Timestamp 객체로 리턴<br>
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
   * param java.util.Date date1 에서 param java.util.Date date2 를 빼서 시간차이를 일(day) 나타내는 int 로 리턴.
   * 짜투리는 무시됨.
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
   * param String ymd 는 "yyyyMM","yyyyMMdd" 날짜형식의 String 객체이다. ymd의 length()가 6자리인경우와 8자리인 경우에 대해서만 작동함.<br>
   * ymd가 null 인경우 return "";<br>
   * 예) convertFormat("200305,"-") --> return "2003-05";, convertFormat("20030515,"/") --> return "2003/05/15";
   * 짜투리는 무시됨.
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
   * param String ymd 는 "yyyyMM","yyyyMMdd" 날짜형식의 String 객체이다. ymd의 length()가 6자리인경우와 8자리인 경우에 대해서만 작동함.<br>
   * ymd가 null 인경우 return "";<br>
   * 예) convertFormat("200305) --> return "2003-05";, convertFormat("20030515) --> return "2003-05-15";
   * 짜투리는 무시됨.
   * @param ymd
   * @return String
   * </pre>
   */
  public static String convertFormat(String ymd) {
    return convertFormat(ymd,"-");
  }

  /**
   * <pre>
   * param String ym 는 "yyyyMM" 날짜형식의 String 객체이고, ym의 월(month)의 마지막 일(day)을 int로 리턴함.
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
   * 해당 날짜의 요일을 리턴(1:일 2:월 3:화 4:수 5:목 6:금 7:토 )
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
   * 해당 날짜의 요일을 리턴(1:일 2:월 3:화 4:수 5:목 6:금 7:토 )
   * @param ymd
   * @return int
   * </pre>
   */
  public static int getDayOfWeek(GregorianCalendar ymd) {
      return ymd.get(GregorianCalendar.DAY_OF_WEEK);
  }

  /**
   * <pre>
   * 내일 날짜를 리턴 - 20030101
   * @param ymd
   * @return String
   * </pre>
   */
  public static String nextDay(String ymd){
      return calDay(ymd,1);
  }

  /**
   * <pre>
   * 어제 날짜를 리턴
   * @param ymd
   * @return String
   * </pre>
   */
  public static String preDay(String ymd){
      return calDay(ymd,-1);
  }

  /**
   * <pre>
   * 오늘날짜에 일 수를 더한 날짜를 출력
   * @param n
   * @return String
   * </pre>
   */
  public static String calDay(int n){
      GregorianCalendar today = new GregorianCalendar(java.util.Locale.KOREA);   //오늘..
      today.add(GregorianCalendar.DATE,n);
      SimpleDateFormat formatter = new SimpleDateFormat ("yyyyMMdd", java.util.Locale.KOREA);

      return formatter.format(today.getTime());
  }

  /**
   * <pre>
   * 해당날짜에 일 수를 더한 날짜를 출력
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
   * 해당날짜에 일 수를 더한 날짜를 출력
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
   * 해당날짜를 GregorianCalendar형으로 리턴
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
  	 * 날짜 문자열을 지역에 따른 형식으로 변환한다.
  	 * 
  	 * @param ymd 형식(YYYYMMDD)을 가진 날짜 문자열
  	 * @param localeType 지역구분. "KO"나 "Y"면 한국, "EN", "N"이면 미국.
  	 * @return 지역에 맞게 포맷팅된 날짜 문자열. 
  	 *         한국일 경우는 "YYYY-MM-DD" 미국일 경우는 "MM-DD-YYYY" 			
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
	 * 특정년월의 말일을 반환한다.
	 * @param year 년
	 * @param month 월
	 * @return 해당 년월의 말일
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
  	 * 올바른 형식("YYYYMMDD")의 날짜 문자열인지 확인한다.
  	 * @param s 형식("YYYYMMDD")을 가진 날짜 문자열
  	 * @return 원하는 날짜 문자열의 Date 객체
  	 * @throws java.text.ParseException
  	 */
	public static java.util.Date getDate(String s) throws java.text.ParseException {
		return getDate(s, "yyyyMMdd");
	}
	
	/**
	 * 올바른 형식("YYYYMMDD")의 날짜 문자열인지 확인한다.
	 * @param s 형식을 가진 날짜 문자열
	 * @param format s날짜 문자열의 형식 포맷 
	 * @return 원하는 날짜 문자열의 Date 객체
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
	 * 원하는 달 수가 더해진 날짜 문자열을 반환한다.
	 * @param s
	 * @param month 더할 월수
	 * @return 날짜 형식이 맞고, 존재하는 날짜일 때 월수 더하기
	 * @throws Exception 형식이 잘못 되었거나 존재하지 않는 날짜일 경우 발생한다.
	 */
	public static String addMonths(String s, int month) throws Exception {
		return addMonths(s, month, "yyyyMMdd");
	}

	/**
	 * return add month to date strings with user defined format.
	 * @param String date string
	 * @param int 더할 월수
	 * @param format string representation of the date format. For example, "yyyy-MM-dd".
	 * @return int 날짜 형식이 맞고, 존재하는 날짜일 때 월수 더하기
	 *           형식이 잘못 되었거나 존재하지 않는 날짜: java.text.ParseException 발생
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