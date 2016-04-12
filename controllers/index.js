exports.index = function(req, res) {
  res.render('index', {
    title: 'Octopus: A Slack Bot'
  });
};
