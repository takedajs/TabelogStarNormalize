var style = document.createElement("style");
style.appendChild(document.createTextNode('.tabelog-score { font-weight: normal; font-size: 60%; color: #bbb }'));
document.body.appendChild(style);

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

    //モバイルかどうか判別
    //c-rating__valクラスはPCにしか存在しない
    var isMobile = true;
    if (document.getElementsByClassName("c-rating__val").length > 0) {
        isMobile = false;
    }

    if (isMobile) {
        //SP用
        //検索結果ページ
        var sptbElement = document.getElementsByClassName("sptb-rating--lg");
        for (var i = 0; i < sptbElement.length; i++) {

            //一度正規化したものは、再度正規化を行わない
            if (typeof sptbElement[i].getElementsByClassName("tabelog-score")[0] !== "undefined") {
                continue;
            }

            var element = sptbElement[i].getElementsByClassName("sptb-rating__val")[0];
            var score = parseFloat(element.textContent);

            //評価が0件のお店対応
            if (isNaN(score)) continue;

            //点数を正規化
            var normalize_score = normalize(score);

            //点数を正規化したものに変更する
            element.innerHTML = normalize_score.toFixed(1) + ' <span class="tabelog-score">(' + score.toFixed(2) + ')</span>';

            //星を正規化した点数に合わせる
            var rate = element.parentNode;
            rate.className = rate.className.replace(/sptb-rating--val\d\d/, "sptb-rating--val" + normalize_score * 10);
        }

        //マイページ
        var bkmElement = document.getElementsByClassName("p-bkm-item__ranking-score");
        for (var i = 0; i < bkmElement.length; i++) {

            if (typeof bkmElement[i].getElementsByClassName("tabelog-score")[0] !== "undefined") {
                continue;
            }

            var element = bkmElement[i];
            var score = parseFloat(element.textContent);

            if (isNaN(score)) continue;

            var normalize_score = normalize(score);

            element.innerHTML = normalize_score.toFixed(1) + ' <span class="tabelog-score">(' + score.toFixed(2) + ')</span>';
        }

    } else {
        //PC用
        $(".c-rating__val").each(function(index, element) {
            var score = parseFloat($(element).text());

            if (isNaN(score)) return;

            var normalize_score = normalize(score);

            $(element).html(normalize_score.toFixed(1) + ' <span class="tabelog-score">(' + score.toFixed(2) + ")</span>");

            var rate = $(element).parent()[0];
            rate.className = rate.className.replace(/c-rating--val\d\d/, "c-rating--val" + normalize_score * 10);
        });
    }
}

//SP用 さらに読み込むを押下された時
document.getElementById("now-loading").onclick = function() {
    //ajaxでレストラン情報の読み込みが終わった後に実行
    setTimeout(patch, 3000);
};
