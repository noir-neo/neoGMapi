// ゲーム開始時に呼んでください。
ngm.gameStart();

// hiscoreを取得します。
// 今までPOSTしたscoreすべての中の最高値です。
console.log('hiscore:'+ngm.getHiscore());

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
    getbadgeid: 0, // クリアによって取得したバッジがあればIDを
    // なければnullなり空配列[]なり''なり適当に入れてください。
    // 1回のクリアで複数バッジを取得した場合は配列で
    // getbadgeid: [0,2],
    });

}, 10000); 
