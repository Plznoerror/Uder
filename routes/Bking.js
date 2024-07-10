var express = require('express');
var router = express.Router();
var vo = require('vo');
var yargs = require('yargs');
var Xvfb = require('xvfb');


/* POST 호출 처리 */
router.post('/', function(req, res, next) {
  var nightmare = require('nightmare')({ show: false });
  var xvfb = new Xvfb();
  var smartcode = req.body.Bcode;
  var XSSfilter = function(smartcode) { return smartcode.replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var numberck = /^[0-9]+$/;

  if (!(numberck.test(smartcode)) || smartcode.length != 16) {
      console.log(smartcode);
                   res.send({Bresult:true, Bcode:"제대로 입력해주세요(16자리,숫자만)"});
            }
  else {
              vo(run)(function(err, Bcode) {
                  if (err){ xvfb.stopSync(); throw err;}
                  else{ xvfb.stopSync();}
              });
        }



  function *run() {
    xvfb.startSync();
    console.log('code : '+ smartcode);
    var Bcode = yield nightmare
    .goto('https://kor.tellburgerking.com/')
      .wait('#NextButton')
      .click('#NextButton')
      .wait('input[id="CN1"]')
      .insert('input[id="CN1"]', smartcode.substring(0,3))
      .insert('input[id="CN2"]', smartcode.substring(3,6))
      .insert('input[id="CN3"]', smartcode.substring(6,9))
      .insert('input[id="CN4"]', smartcode.substring(9,12))
      .insert('input[id="CN5"]', smartcode.substring(12,15))
      .insert('input[id="CN6"]', smartcode.substring(15,16))
      .click('input[type="submit"]')
      .wait('#FNSR001000')
      .click('.Opt2 input')
      .click('input[type="submit"]')
      .wait('#FNSR000019')
      .click('.Opt1 input')
      .click('input[type="submit"]')
      .wait('#FNSR002000')
      .click('.Opt1 input')
      .click('input[type="submit"]')
      .wait('#FNSR004000')
      .click('.Opt4 input')
      .click('input[type="submit"]')
      .wait('#FNSBlock200')
      .wait(800)
      .click('#NextButton')
      .wait(800)
      .click('input[type="submit"]')
      .wait('#FNSBlock200')
      .wait(800)
      .click('#NextButton')
      .wait(800)
      .click('input[type="submit"]')
      .wait('#FNSBlock200')
        .wait(800)
      .click('#NextButton')
      .wait(800)
      .click('input[type="submit"]')
     .wait('#FNSBlock200')
      .wait(800)
      .click('#NextButton')
     .wait('#FNSBlock500')
      .click('#FNSR029000 .Opt4 input')
      .click('#FNSR030000 .Opt4 input')
      .click('input[type="submit"]')
      .wait('#FNSR041000')
      .click('.Opt2 input')
      .click('input[type="submit"]')
      .wait('#FNSBlock2700')
      .click('#FNSR044000 .Opt4 input')
      .click('#FNSR045000 .Opt4 input')
      .click('input[type="submit"]')
      .wait('#FNSS000121')
    .wait(800)
      .click('#NextButton')
      .wait(800)
      .click('input[type="submit"]')
    .wait(800)
      .click('#NextButton')
      .wait('#FNSBlock3800')
      .click('.Opt1 input')
      .click('input[type="submit"]')
      .wait('#FNSR057000')
      .click('.Opt3 input')
      .click('input[type="submit"]')
      .wait('#FNSR060000')
      .click('.Opt3 input')
      .click('input[type="submit"]')
      .wait('#FNSR068000')
      .click('.Opt2 input')
      .click('input[type="submit"]')
      .wait('#FNSBlock4600')
       .wait(1000)
      .click('#NextButton')
    .wait(1000)
      .click('#NextButton')
      .wait('#FNSS076000')
      .insert('input[id="S076000"]', '00000')
      .click('#NextButton')
      .wait(700)
      .evaluate(function () {
        return document.querySelector('.ValCode').textContent.trim();
});
  yield nightmare.end();
  res.send({Bresult:true, Bcode:Bcode});
}
});

module.exports = router;
