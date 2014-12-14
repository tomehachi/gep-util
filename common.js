/* ================================================================================================================== */
/* GEP-lab 汎用関数ライブラリ                                                                                         */
/* 1. 通信                                                                                                            */
/* 2. 文字列置換                                                                                                      */
/* 3. 日付操作                                                                                                        */
/* ================================================================================================================== */

/* ------------------------------------------------------------------------------------------------------------------ */
/* 1. 通信                                                                                                            */
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * 指定したURLにデータをPOSTし、返されたJSONを返す.
 */
var $gep_doPost = function(postUrl, postData) {
    var result;
    $.ajax({
        type: "post",
        url: postUrl,
        dataType: "json",
        data: postData,
        cache: false,
        async: false,
        success: function(json) {
            result = json;
        }
    });
    return result;
};


/* ------------------------------------------------------------------------------------------------------------------ */
/* 2. 文字列置換                                                                                                         */
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * Stringクラスを継承してreplaceAllメソッドを定義.
 */
String.prototype.replaceAll = function (org, dest){
      return this.split(org).join(dest);
};

/**
 * 表示用にサニタイズ.
 */
var $gep_convert = function(txt) {
    return String(txt)
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("&", "&amp")
        .replaceAll("\n", "<br>")
        .replaceAll("{chat}", "<i class='fa fa-comments'></i>")
        .replaceAll("{out-link}", "<i class='fa fa-share-square-o'></i>");
};

/**
 * 指定した日付型をデフォルトフォーマットに整形した文字列に変換して返す(年月日).
 */
var $gep_formatDate = function(date) {
    return formatDate(date, "yyyy/MM/dd");
};

/**
 * 指定した日付型をデフォルトフォーマットに整形した文字列に変換して返す(年月日時分秒).
 */
var $gep_formatTimestamp = function(date) {
    return formatDate(date, "yyyy/MM/dd HH:mm:ss");
};

/**
 * 指定した日付型を指定フォーマットに整形した文字列にして返す.
 */
var formatDate = function (date, format) {
    if (!format) format = 'yyyy-MM-dd HH:mm:ss.SSS';
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
};


/* ------------------------------------------------------------------------------------------------------------------ */
/* 3. 日付操作関数                                                                                                    */
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * 指定年, 月の最終日を返す.
 */
var getEndDayOfMonth = function(date) {
    return (new Date(
            date.getFullYear(),
            date.getMonth() +1,
            0,
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds())
    ).getDate();
};

var addDay = function(date, amount) {
    return (new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() +amount,
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds())
    );
};

var addMonth = function(date, amount) {
    var currentDate = date.getDate();
    var endDate = getEndDayOfMonth(new Date(date.getFullYear(), date.getMonth() +amount, 1));
    return (new Date(
            date.getFullYear(),
            date.getMonth() +amount,
            currentDate > endDate ? endDate : currentDate,
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds())
    );
};
