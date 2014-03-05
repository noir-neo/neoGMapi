ngm.gameStart();

ngm.getGamelevel(function(gamelevel) {
  console.log('gamelebel:'+gamelevel);
});
console.log('hiscore:'+ngm.getHiscore());

ngm.stageStart();



setInterval(function() {
  ngm.stageResult({
  gamelevel:5,
  score:1073741823,
  getbadgeid: 2});

}, 10000); 
