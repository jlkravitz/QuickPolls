PollProvider = function(){

};

PollProvider.prototype.polls = {};

PollProvider.prototype.findByCode = function(code, callback){
	var result = this.polls[code] || null;
	callback(false, result);
}

/* Saves poll to temporary storage. 
 * 
 * First, a votes array is added to the poll. Then, a code
 * is generated to associate with the poll. */
PollProvider.prototype.save = function(poll, callback){
	poll.votes = [];
	for (var i = 0; i < poll.choices.length; i++){
		poll.votes.push(0);
	}

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
	console.log(this.polls, code, poll)
	if (poll){
		poll.votes[choice]++;
		callback(false, poll);
	} else {
		callback(true, poll);
	}
};

exports.PollProvider = PollProvider;