var pollProvider = new (require('./pollprovider').PollProvider);

exports.index = function(req, res){
	res.render('index', { title: 'QuickPolls' });
};

exports.createPoll = function(req, res){
		var question = req.body.question;
		delete req.body.question;

		var choices = [];
		for (var param in req.body) {
			if (req.body.hasOwnProperty(param)) {
				choices.push(req.body[param]);
			}
		}

		var poll = pollProvider.createPoll(question, choices, function(error, poll){
			pollProvider.save(poll, function(error, pollCode){
				res.render('share', {
					title: 'Share your poll',
					question: poll.question,
					choices: poll.choiceList,
					code: pollCode
				});
			});
		});
};

exports.showPoll = function(req, res){
	pollProvider.findByCode(req.params.code, function(error, poll){
		if (poll){
			res.render('poll', {
				title: poll.question,
				question: poll.question,
				choices: poll.choiceList,
				code: req.params.code
			});
		} else {
			res.status(404).send('Poll not found.');
		}
	});
};

exports.vote = function(req, res){
	pollProvider.vote(req.body.code, req.body.choice, function(error, poll){
		if (error){
			res.status(404).send('Cannot Vote on Nonexistent Poll.');
		} else {
			res.redirect('/poll/results/' + req.body.code);
		}
	});
};

exports.pollResults = function(req, res){
	pollProvider.findByCode(req.params.code, function(error, poll){
		if (poll){
			res.render('results', {
				title: poll.question,
				question: poll.question,
				choices: poll.choiceToVotes,
				code: req.params.code
			});
		} else {
			res.status(404).send('Poll not found.');
		}
	});
};