var express = require('express');
var router = express.Router();
var vo = require('vo');
var yargs = require('yargs');
var Xvfb = require('xvfb');


/* POST 호출 처리 */
router.post('/', function(req, res, next) {
  var nightmare = require('nightmare')({ show: false });
  var xvfb = new Xvfb();
  var smartcode = req.body.code;
  var XSSfilter = function(smartcode) { return smartcode.replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var numberck = /^[0-9]+$/;

  if (!(numberck.test(smartcode)) || smartcode.length != 19) {
                   res.send({result:true, code:"제대로 입력해주세요(19자리,숫자만)"});
            }
  else {

              vo(run)(function(err, code) {
                  if (err){ xvfb.stopSync(); res.send({result:true, code:"유효 기간을 넘었거나 잘못 입력하셨습니다."}); throw err;}
                  else{ xvfb.stopSync();}
              });
        }






  function *run() {
      xvfb.startSync();
      console.log('code : '+ smartcode);
      var code = yield nightmare
          .goto('https://s.kfcvisit.com/kor')
          .wait('#NextButton')
          .click('#NextButton')
          .wait('#InputCouponNum')
          .type('input[title="InputCouponNum"]', smartcode)
          .click('#NextButton')
          .wait('#FNSR001000')
          .click('.Opt2 input')
          .click('#NextButton')
          .wait('#FNSR002000')
          .click('.Opt6 input')
          .click('#NextButton')
          .wait('#FNSR004000')
          .click('.Opt4 input')
          .click('#NextButton')
          .wait('#FNSBlock300')
          .click('#FNSR013000 .Opt4 input')
          .click('#FNSR020000 .Opt4 input')
          .click('#FNSR024000 .Opt4 input')
          .click('#FNSR007000 .Opt4 input')
          .click('#FNSR009000 .Opt4 input')
          .click('#FNSR032000 .Opt4 input')
          .click('#NextButton')
          .wait('#FNSR011000') // "음식의 맛" 점수에 가장 큰 영향을 미친 음식은 무엇입니까?
          .click('.Opt7 input')
          .click('#NextButton')
          .wait('#FNSR033000')
          .click('.Opt2 input')
          .click('#NextButton')
          .wait('#FNSBlock1800')
          .click('#FNSR036000 .Opt3 input')
          .click('#FNSR035000 .Opt3 input')
          .click('#NextButton')
          .wait('#FNSS080000')
          .click('#NextButton')
          .wait('#FNSR040000')
          .click('.Opt2 input')
          .click('#NextButton')
          .wait('#FNSR003000')
          .click('.Opt2 input')
          .click('#NextButton')
          .wait('#FNSR048000')
          .click('.Opt2 input')
          .click('#NextButton')
          .wait('#finishIncentiveHolder')
          .evaluate(function () {
              return document.querySelector('.ValCode').textContent.trim();
          })


      yield nightmare.end();
      res.send({result:true, code:code});
  }

});

module.exports = router;
