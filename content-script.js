var style = document.createElement("style");
style.appendChild(document.createTextNode('.tabelog-score { font-weight: normal; font-size: 60%; color: #bbb }'));
document.body.appendChild(style);

// spではjqueryが呼ばれていないので追加する
var script = document.createElement('script');
//pc側で利用されているjqueryのバージョンに合わせている
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
document.body.appendChild(script);

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+patch+')();'));
document.body.appendChild(script);

function patch(){
    //既に表示されているスコアを正規化
    var normalize = function(score) {
        var normalize_score;
        if (score >= 4.0) {
            normalize_score = 5.0;
        } else if (score >= 3.5) {
            normalize_score = 4.5;
        } else if (score >= 3.4) {
            normalize_score = 4.0;
        } else if (score >= 3.3) {
            normalize_score = 3.5;
        } else if (score >= 3.1) {
            normalize_score = 3.0;
        } else if (score >= 3.0) {
            normalize_score = 2.0;
        } else {
            normalize_score = 1.0;
        }
        return normalize_score;
    }

    //PC用
    //トップ、エリア検索結果、マイページに表示されているお店対象
    $(".c-rating__val").each(function(index, element) {
        var score = parseFloat($(element).text());

        //評価が0件のお店対応
        if (isNaN(score)) return;

        //点数を正規化
        var normalize_score = normalize(score);

        //点数を正規化したものに変更する
        $(element).html(normalize_score.toFixed(1) + ' <span class="tabelog-score">(' + score.toFixed(2) + ")</span>");

        //星を正規化した点数に合わせる
        var rate = $(element).parent()[0];
        rate.className = rate.className.replace(/c-rating--val\d\d/, "c-rating--val" + normalize_score * 10);
    });

    //SP用
    $(".sptb-rating__val").each(function(index, element) {
        var score = parseFloat($(element).text());

        //評価が0件のお店対応
        if (isNaN(score)) return;

        //点数を正規化
        var normalize_score = normalize(score);

        //点数を正規化したものに変更する
        $(element).html(normalize_score.toFixed(1) + ' <span class="tabelog-score">(' + score.toFixed(2) + ")</span>");

        //星を正規化した点数に合わせる
        var rate = $(element).parent()[0];
        rate.className = rate.className.replace(/sptb-rating--val\d\d/, "sptb-rating--val" + normalize_score * 10);
    });
}
