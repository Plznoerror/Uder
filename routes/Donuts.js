var express = require('express');
var router = express.Router();
var vo = require('vo');
var yargs = require('yargs');
var Xvfb = require('xvfb');


/* POST 호출 처리 */
router.post('/', function(req, res, next) {
  var nightmare = require('nightmare')({ show: false });
  var xvfb = new Xvfb();
  var smartcode = req.body.Ccode;
  var XSSfilter = function(smartcode) { return smartcode.replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var numberck = /^[0-9]+$/;


    vo(run)(function(err, Ccode) {
                  if (err){ xvfb.stopSync();res.send({result:true, Ccode:"유효 기간을 넘었거나 잘못 입력하셨습니다."}); throw err;}
                  else{ xvfb.stopSync();}
              });

  function *run() {
    xvfb.startSync();
    console.log('code : '+ smartcode);
    var Ccode = yield nightmare
    .goto('https://www.mykkdd.com/kor')
      .wait('input[id="CN1"]')
      .insert('input[id="CN1"]', smartcode.substring(0,3))
      .insert('input[id="Index_VisitDateDatePicker"]', smartcode.substring(3,6))
      .insert('input[id="CN3"]', smartcode.substring(6,9))
      .insert('input[id="CN4"]', smartcode.substring(9,12))
      .insert('input[id="CN5"]', smartcode.substring(12,15))
      .insert('input[id="CN6"]', smartcode.substring(15,16))
      .click('input[type="submit"]')
      .wait('#FNSR001000')

      .evaluate(function () {
        return document.querySelector('.ValCode').textContent.trim();
});
  yield nightmare.end();
  res.send({Cresult:true, Ccode:Ccode});
}
});

module.exports = router;
