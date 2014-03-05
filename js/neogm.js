/*====================
 * 
 * neogm.js 0.1.0
 * 
 * WTFPL
 * (s) 2014 neo.
 * 
 ====================*/

(function() {'use strict'; })();

var ngm = ngm || {};
ngm.global = window || global || this;

(function() {
  
  
  /**
   * ばーじょん
   */
  ngm.VERSION = '0.1.0';
  
  
  /**
   * @method
   * ゲーム開始時に呼んでね
   */
  ngm.gameStart = function() {
    
    // API使用に必要な情報を取得・保持
    _ApiParams = _getUrlParams();
    ngm.getBadgeInfo();
  };
  
  ngm.getHiscore = function() {
    return _ApiParams.hiscore;
  };
  
  /**
   * @method
   * ステージリザルトで結果を送ってね
   * @param {Object} sendData
   */
  ngm.stageResult = function(sendData) {
    _stageEndDate = ngm.getDate();
    
    /*
    if (sendData.getbadgeid != null) {
      
      var _achivementid = [];
      var _achievementpoint = [];
      var _achivementstatus = [];
      var _achivementearneddate = [];
      for (var i = 0; i < sendData.getbadgeid.length; i++) {
        _achivementid.push(_badgeID[sendData.getbadgeid[i]]);
        _achievementpoint.push(_badgePoint[sendData.getbadgeid[i]]);
        _achivementstatus.push(true);
        _achivementearneddate.push(ngm.getDate());
      }
      var achievementresult = {
        achivementid: _achivementid,
        achievementpoint: _achievementpoint,
        achivementstatus: _achivementstatus,
        achivementearneddate: _achivementearneddate,
        };
    }
    sendData.achievementresult = achievementresult;
    */
    var _ac = [];
    _ac[0] = _badgeID[sendData.getbadgeid];
    _ac[1] = _badgePoint[sendData.getbadgeid];
    _ac[2] = true;
    _ac[3] = ngm.getDate();
    sendData.achievementresult = _ac;
    _post(sendData);
  };
  
  var _stageStartDate;
  var _stageEndDate;
  ngm.stageStart = function() {
    _stageStartDate = ngm.getDate();
  };
  
  var _URI = 'http://www.globalmath.info/globalmath_pfapi/';
  
  var _ApiParams = {};
  
  /**
   * URLからAPI使用に必要な情報を取得
   * @return {Object}
   */
  var _getUrlParams = function() {
    var result_params = {};
    var temp_params = window.location.search.substring(1).split('&');
    for(var i = 0; i < temp_params.length; i++) {
      params = temp_params[i].split('=');
      result_params[decodeURIComponent(params[0])] 
        = decodeURIComponent((params[1]||"").replace(/\+/g, " "));
    }
    return result_params;
  };
  
  /**
   * すべてはゲームレベルを取得するため
   */
  ngm._getGamelevelCallback;
  ngm.getGamelevel = function(callback) {
    ngm._getGamelevelCallback = callback;
    var uri = _URI+'contents/'+_ApiParams['version']+'/'+_ApiParams['gameId']+'/'+_ApiParams['userId']+'/@game';
    _get(uri, 'ngm.contentsGameCallback');
  };
  ngm.contentsGameCallback = function(data) {
    ngm._getGamelevelCallback(data.gamelevel);
  };
  
  /**
   * バッジ情報
   */
  var _badgeID = [];
  var _badgePoint = [];
  var _badgeStatus = [];
  ngm.getBadgeInfo = function() {
    var uri = _URI+'contents/'+_ApiParams['version']+'/'+_ApiParams['gameId']+'/'+_ApiParams['userId']+'/@achievementresult';
    _get(uri, 'ngm.contentsAchievementCallback');
  };
  ngm.contentsAchievementCallback = function(data) {
    _badgeID = data.achievementid;
    _badgePoint = data.achievementpoint;
    _getBadgeInfo = data.achivementstatus;
    console.log(_badgeID);
  };
  
  
  
  /**
   * GetRequest
   * クロスドメイン制約に引っかかるため闇実装
   * ベネッセコーポレーションのソースコードを参考(許諾済み)
   * @param {String} p_uri
   */
  var _get = function(p_uri, p_callbackFuncName) {
    var script = document.createElement('script');
    script.charset = 'utf-8';
    script.src = p_uri+'?callback='+p_callbackFuncName;
    document.body.appendChild(script);
  };
  
  /**
   * PostRequest
   * 同上、闇中の闇
   */
  var _post = function(data) {
console.log(data.achievementresult);
    // POST先のURLを生成
      var uri = _URI+"activity/"+_ApiParams['version']+'/'+_ApiParams['gameId']+'/'+_ApiParams['userId']+"/@gameresult";

      // 送信データの作成
      var param = {};
      param['gametitle'] = '';
      param['playid'] = _ApiParams['playId'];
      param['gamestartdate'] = _stageStartDate;
      param['gamelevel'] = data.gamelevel;
      param['resultscore'] = data.score;
      param['scoreearneddate'] = _stageEndDate;
      param['achievementresult'] = data.achievementresult;
      param['gameenddate'] = _stageEndDate;
      param['tryerrorcount'] = 0;
      param['mathscore'] = 0;
      param['mathtime'] = (_stageEndDate - _stageStartDate)/1000;

      // パラメータが設定されている事を確認
      if (param !== undefined) {
        // フレーム識別用のID
        var seq = 0;

        // POST用のフォームを生成
        var frm = document.createElement("form");
        document.body.appendChild(frm);
        frm.action = uri;
        frm.method = 'post';
        frm.target = 'pfr' + seq;
        frm.charset='UTF-8';

        // 送信情報の設定
        for (var paramName in param) {
          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', paramName);
          input.setAttribute('value', param[paramName]);
          frm.appendChild(input);
        };

        // ターゲットとなるiframeを生成
        var pfr = document.createElement('iframe');
        pfr.name = 'pfr' + (seq++);

        // 直後はabout:blankを表示する
        pfr.src = "about:blank";

        // 下のクロージャ内で使うカウンタ
        var cnt = 0;
        var onload = pfr.onload = function(){
          // iframeが準備できたらフォームを送信
          if (cnt++ == 0) {
            frm.submit();
          // フォーム受信後、form,iframeを削除
          } else {
            if (frm.parentNode != null) {
              frm.parentNode.removeChild(frm);
            };
            if (pfr.parentNode != null) {
              pfr.parentNode.removeChild(pfr);
            };
          };
        };
        if (document.all) {
          pfr.onreadystatechange = function(){ /* for IE */
            // onloadが動作しないので代用
            if (this.readyState == "complete") {
              pfr.contentWindow.name = pfr.name;
              onload();
            };
          };
        };
        document.body.appendChild(pfr);
      };
  };
  
  ngm.getDate = function () {
    var _Date = new Date();
    return _Date.getFullYear() + '-' + ( _Date.getMonth  () + 1 ) + '-' + _Date.getDate   () + ' ' + 
    _Date.getHours   () + ':' +   _Date.getMinutes()       + ':' + _Date.getSeconds();
  };
  
  
})();
