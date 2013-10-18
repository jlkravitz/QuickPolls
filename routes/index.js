var pollProvider = new (require('./pollprovider').PollProvider);

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

		pollProvider.save({
			question: question,
			choices: choices
		}, function(error, pollCode){
			res.render('share', { title: 'Share your poll', question: question, choices: choices, code: pollCode });
		});
};

exports.poll= function(req, res){
	pollProvider.findByCode(req.params.code, function(error, poll){
		res.render('poll', { title: poll.question, question: poll.question, choices: poll.choices });
	});
};
