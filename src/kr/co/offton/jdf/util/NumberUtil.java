package kr.co.offton.jdf.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import kr.co.offton.jdf.basis.GeneralObject;

public final class NumberUtil extends GeneralObject
{
  public static final int ROUND_CEILING = 2;
  public static final int ROUND_DOWN = 1;
  public static final int ROUND_FLOOR = 3;
  public static final int ROUND_HALF_DOWN = 5;
  public static final int ROUND_HALF_EVEN = 6;
  public static final int ROUND_HALF_UP = 4;
  public static final int ROUND_UNNECESSARY = 7;
  public static final int ROUND_UP = 0;
  private static final String DEFAULT_PATTERN = "###,###";
  private DecimalFormat df;
  private String PATTERN = "###,###";

  public NumberUtil(String pattern)
  {
    this.PATTERN = pattern;
    this.df = new DecimalFormat(this.PATTERN);
  }

  public NumberUtil()
  {
    this.df = new DecimalFormat("###,###");
  }

  public static BigDecimal verify(BigDecimal input)
  {
    if ((input == null) || (input.equals(""))) return new BigDecimal(0);
    return input;
  }

  public static BigDecimal verify(String input)
  {
    if ((input == null) || (input.equals(""))) return new BigDecimal(0);
    return strToBigD(input);
  }

  public static BigDecimal fromDB(BigDecimal input)
  {
    if (input == null) return new BigDecimal(0);
    return input;
  }

  public static int toInt(String input)
  {
    int retVal = 0;
    try {
      retVal = Integer.parseInt(input);
    } catch (Exception e) {
      retVal = 0;
    }
    return retVal;
  }

  public void setPattern(String pattern)
  {
    this.PATTERN = pattern;
    this.df = new DecimalFormat(this.PATTERN);
  }

  public String getPattern()
  {
    return this.PATTERN;
  }

  public DecimalFormat getFormatter()
  {
    return this.df;
  }

  public static String format(double value)
  {
    return format(value, "###,###");
  }

  public static String format(double value, String pattern)
  {
    DecimalFormat ldf = new DecimalFormat(pattern);
    return ldf.format(value);
  }

  public static String format(int value)
  {
    return format(value, "###,###");
  }

  public static String format(int value, String pattern)
  {
    DecimalFormat ldf = new DecimalFormat(pattern);
    return ldf.format(value);
  }

  public static String format(long value)
  {
    return format(value, "###,###");
  }

  public static String format(long value, String pattern)
  {
    DecimalFormat ldf = new DecimalFormat(pattern);
    return ldf.format(value);
  }

  public static String format(BigDecimal value, String pattern, String defaultNull)
  {
    if (value == null) return defaultNull;

    DecimalFormat ldf = new DecimalFormat(pattern);
    return ldf.format(value.doubleValue());
  }

  public static String formatNoneZero(BigDecimal value, String pattern)
  {
    if ((value == null) || (value.doubleValue() == 0.0D)) return "";

    DecimalFormat ldf = new DecimalFormat(pattern);
    return ldf.format(value.doubleValue());
  }

  public static String formatZero(BigDecimal value, String pattern)
  {
    return format(value, pattern, "0");
  }

  public static String format(BigDecimal value, String pattern)
  {
    return format(value, pattern, "");
  }

  public static String formatNoneZero(BigDecimal value)
  {
    return formatNoneZero(value, "###,###");
  }

  public static String formatZero(BigDecimal value)
  {
    return formatZero(value, "###,###");
  }

  public static String format(BigDecimal value)
  {
    return format(value, "###,###");
  }

  public static BigDecimal strToBigD(String str)
  {
    if ((str == null) || (str.trim().length() == 0)) return null;
    return new BigDecimal(str.replaceAll(",", ""));
  }

  public static long BigtoLong(BigDecimal value)
  {
    if (value == null)
      return 0L;
    return value.longValue();
  }

  public static double BigtoDouble(BigDecimal value)
  {
    if (value == null)
      return 0.0D;
    return value.doubleValue();
  }

  public static String format(String value)
  {
    return format(strToBigD(value), "###,###");
  }

  public static String getRateAmount(boolean isKorFund, boolean isKor, boolean isFixed, String KRW, String UWD, String Rate)
  {
    String rtn = "";
    if (Rate.equals("")) Rate = "1000";
    if (KRW.equals("")) KRW = "0";
    if (UWD.equals("")) UWD = "0";
    double dbKRW = Double.parseDouble(KRW.replaceAll(",", ""));
    double dbUWD = Double.parseDouble(UWD.replaceAll(",", ""));
    double dbRate = Double.parseDouble(Rate.replaceAll(",", ""));

    if ((isKorFund) && (isKor) && (isFixed)) rtn = KRW;
    if ((isKorFund) && (isKor) && (!isFixed)) rtn = KRW;
    if ((isKorFund) && (!isKor) && (isFixed)) rtn = UWD;
    if ((isKorFund) && (!isKor) && (!isFixed)) rtn = format(dbKRW / dbRate);

    if ((!isKorFund) && (isKor) && (isFixed)) rtn = KRW;
    if ((!isKorFund) && (isKor) && (!isFixed)) rtn = format(dbUWD * dbRate);
    if ((!isKorFund) && (!isKor) && (isFixed)) rtn = UWD;
    if ((!isKorFund) && (!isKor) && (!isFixed)) rtn = UWD;

    return rtn;
  }
}