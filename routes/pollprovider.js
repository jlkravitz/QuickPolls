PollProvider = function(){

};

PollProvider.prototype.polls = {};

PollProvider.prototype.findByCode = function(code, callback){
	var result = this.polls[code] || null;
	callback(null, result);
}

PollProvider.prototype.save = function(poll, callback){
	console.log('Saving...');
	var code = generateCode.call(this);
	console.log('Generated code...' + code);
	this.polls[code] = poll;
	console.log('About to call callback...');
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