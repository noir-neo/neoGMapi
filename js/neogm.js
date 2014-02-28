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
  
  /*----------------------------------------
   * public
   ----------------------------------------*/
  
  
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
    
    _contentsApi('game');
    
  };
  
  /**
   * @method
   * ステージリザルトで結果を送ってね
   * @param {Object} sendData
   */
  ngm.stageResult = function(sendData) {
    
  };
  
  /*----------------------------------------
   * private
   ----------------------------------------*/
  
  _URI = 'http://www.globalmath.info/globalmath_pfapi/';
  
  _ApiParams = {};
  
  
  /**
   * エンドポイントURLからAPI使用に必要な情報を取得
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
   * Contents APIと通信するよ！
   * @param {String} p_selector
   */
  var _contentsApi = function(p_selector) {
    var uri = _URI+'contents/'+_ApiParams[version]+'/'+_ApiParams[gameId]+'/'+_ApiParams[userId]+'/@'+p_selector;
    _httpRequest('GET', uri, false, function(res) {
      return function(res) {
        console.log(res);
      };
    }, null);
  };
  
  /**
   * HTTP Requestをします！！
   * @param {String} p_method
   * @param {String} p_uri
   * @param {Boolean} p_isAsync
   * @param {Function} p_callback
   * @param {Object} p_body
   */
  var _httpRequest = function(p_method, p_uri, p_isAsync, p_callback, p_body) {
    var xhr = new XMLHttpRequest();
    xhr.open(p_method, p_uri, p_isAsync);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200){
        p_callback(xhr.responseText);
      }
    };
    var _body = null;
    if (p_method == 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      _body = p_body;
    }
    xhr.send(_body);
    
  };
  
  
})();
