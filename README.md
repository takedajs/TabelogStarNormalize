# TabelogStarNormalize
TabelogStarNormalize::Add-ons for Firefox https://addons.mozilla.org/ja/firefox/addon/tabelogstarnormalize/

食べログのお店についている星を正規化して再表示します。  
検索結果ページ、お店の詳細ページ、マイページにあるお店の星を正規化しています。  
Android版Firefoxにも対応。  

Normalize and redisplay stars that are used for evaluation in restaurant reviews evaluation site「Tabelog」.  
Search results page, store detail page, store's stars in My page are normalized.  
We also support Android Firefox.  

# Example

<img src="https://raw.githubusercontent.com/takedajs/ImageStorage/master/images/TabelogStarNormalize_1.png" alt="アドオン適用前と後の比較" width="800px">

# Normalize Logic

```
4.0 or over => 5 stars
3.5 to 4.0 => 4.5 stars
3.4 to 3.5 => 4 stars
3.3 to 3.4 => 3.5 stars
3.1 to 3.3 => 3 stars
3.0 to 3.1 => 2 stars
below 3.0 => 1 star
```

# Reference

miyagawa/Tabelog-HonestStars: Make Tabelog Stars more honest  
https://github.com/miyagawa/Tabelog-HonestStars/
