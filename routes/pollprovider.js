PollProvider = function(){

};

PollProvider.prototype.polls = {};

PollProvider.prototype.findByCode = function(code, callback){
	var result = this.polls[code] || null;
	callback(false, result);
}

PollProvider.prototype.createPoll = function(question, choices, callback){
	var poll = {};
	poll['question'] = question;
	poll['choiceList'] = choices;

	var choiceToVotes = {};
	for (var i = 0; i < choices.length; i++) {
		choiceToVotes[choices[i]] = 0;
	}
	poll['choiceToVotes'] = choiceToVotes;

	callback(false, poll);
}

/* Saves poll to temporary storage. */
PollProvider.prototype.save = function(poll, callback){
	var code = generateCode.call(this);
	this.polls[code] = poll;
	callback(false, code);

	function generateCode(){
		var code;
	    while (true){
		    code = Math.random().toString(36).substr(2); // remove '0.'
		    if (!this.polls[code]){
		    	break;
		    }
	    }

	    return code;
	};
};

PollProvider.prototype.vote = function(code, choice, callback){
	var poll = this.polls[code] || null;
	if (poll){
		var choiceText = poll.choiceList[parseInt(choice)];
		poll.choiceToVotes[choiceText]++;
		callback(false, poll);
	} else {
		callback(true, poll);
	}
};

exports.PollProvider = PollProvider;