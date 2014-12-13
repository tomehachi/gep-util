package com.geplab.util.string;

import java.util.regex.Pattern;

/**
 * 文字列関連ユーティリティクラス.<br>
 *
 * @author GEP-lab
 */
public class StringUtil {

    private StringUtil() {}

    /* -- 目次(ユーティリティを複数のセクションで分けています)
     * 1. 判定
     *
     *
     *
     */

    /* -- 1. 判定 --------------------------------------------------------------------------------------------------- */

    /**
     * 文字列が null か、長さが0の場合にtrueを返す.<br>
     *
     * @param str 入力文字列
     * @return 文字列が空かどうか(true=空, false=空ではない)
     */
    public static boolean isEmpty(String str) {
        return (str == null || str.length() < 1);
    }

    /** 大文字アルファベットパターン */
    private static Pattern UPPER_ALPHABET_PATTERN = Pattern.compile(".*[A-Z]+.*");
    /**
     * 大文字アルファベットを含むかどうかを返す.<br>
     * @param str 入力文字列
     * @return 大文字アルファベット(大文字)を含むかどうか(true=含む, false=含まない)
     */
    public static boolean containsUpperAlphabet(String str) {
        return UPPER_ALPHABET_PATTERN.matcher(str).matches();
    }

    /** 小文字アルファベットパターン */
    private static Pattern LOWER_ALPHABET_PATTERN = Pattern.compile(".*[a-z]+.*");
    /**
     * 小文字アルファベットを含むかどうかを返す.<br>
     *
     * @param str 入力文字列
     * @return 小文字アルファベット(小文字)を含むかどうか(true=含む, false=含まない)
     */
    public static boolean containsLowerAlphabet(String str) {
        return LOWER_ALPHABET_PATTERN.matcher(str).matches();
    }

    /**
     * アルファベットを含むかどうかを返す.<br>
     *
     * @param str 入力文字列
     * @return アルファベット(大文字/小文字)を含むかどうか(true=含む, false=含まない)
     */
    public static boolean containsAlphabet(String str) {
        return containsUpperAlphabet(str) || containsLowerAlphabet(str);
    }

    /** 数字パターン */
    private static Pattern NUMBER_PATTERN = Pattern.compile(".*[0-9]+.*");
    /**
     * 数字を含むかどうかを返す.<br>
     *
     * @param str 入力文字列
     * @return 数字を含むかどうか(true=含む, false=含まない)
     */
    public static boolean containsNumber(String str) {
        return NUMBER_PATTERN.matcher(str).matches();
    }

    /**
     * 全角文字を含むかどうかを返す.<br>
     *
     * @return 全角文字を含むかどうか(true=含む, false=含まない)
     */
    public static boolean containsDoubleByteChar(String str) {
        return (str.getBytes().length != str.length());
    }

}
