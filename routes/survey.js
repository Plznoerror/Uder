module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    res.render('survey', { title: 'Express' });
  });

  return router;
}
