// ゲーム開始時に呼んでください。
ngm.gameStart();

// hiscoreを取得します。
// 今までPOSTしたscoreすべての中の最高値です。
var hiscore = ngm.getHiscore();
console.log('hiscore:'+ hiscore);

// gamelevelをGETします。callback関数を引数にしてください。
ngm.getGamelevel(function(gamelevel) {
  console.log('gamelebel:'+gamelevel);
});

// レベルプレイ開始ごとに呼んでください。POSTする時間を保持しています。
ngm.stageStart();

setInterval(function() {
  
  // クリア結果をPOSTします。
  ngm.stageResult({
    
    gamelevel:10,// クリアしたレベル
    score:114514, // 取得したスコア
    
    // 以下任意設定項目
    getbadgeid: 0, // クリアによって取得したバッジ
    // 1回のクリアで複数バッジを取得した場合は配列で [0,2] のように
    tryerrorcount: 0,
    mathoption: 0,
    previoushandling: false,
    browsehelp: false,
    });

}, 10000); 
