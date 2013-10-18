PollProvider = function(){

};

PollProvider.prototype.polls = {};

PollProvider.prototype.findByCode = function(code, callback){
	var result = this.polls[code] || null;
	callback(null, result);
}

PollProvider.prototype.save = function(poll, callback){
	var code = generateCode.call(this);
	this.polls[code] = poll;
	callback(null, code);

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

exports.PollProvider = PollProvider;