
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'QuickPolls' });
};

exports.share = function(req, res){
		var question = req.body.question;
		delete req.body.question;

		var choices = [];
		for (var param in req.body) {
			if (req.body.hasOwnProperty(param)) {
				choices.push(req.body[param]);
			}
		}

		var PollProvider = new (require('./pollprovider').PollProvider);
		PollProvider.save({
			question: question,
			choices: choices
		}, function(error, pollCode){
			res.render('share', { title: 'Share your poll', question: question, choices: choices, code: pollCode });
		});
};
