$(function() {
	$("[data-toggle='tooltip']").tooltip();
});

var QuestionCreator = (function() {
	// id of current choice (only has to be unique, not consecutive)
	var currentId = 1;

	var setup = function() {
		appendNewChoice();
		appendNewChoice();
		appendNewChoice();

		$('#addPollChoice').on('click', function(e) {
			appendNewChoice();
		});

		$(document).on('click', '.closePollChoice', function(e) {
			$(this).parent().remove();
		});

		$('form').on('submit', function() {
			/* Check for question */
			var questionFormGroup = $(this).children().first();
			if ($('#newPollQuestion').val() === '') {
				questionFormGroup.addClass('has-error');
				return false;
			} else {
				questionFormGroup.removeClass('has-error');
			}

			/* Remove unused choices */
			var choices = [];
			$('.newPollChoice').each(function(index, choice) {
				if (choice.value === '') {
					$(this).parent().remove();
				}
			});

			/* Check for MIN_CHOICES choices. */
			var MIN_CHOICES = 2;
			var completedChoices = $('.newPollChoice').length;
			if (completedChoices < MIN_CHOICES) {
				for (var i = 0; i < MIN_CHOICES - completedChoices; i++){
					appendNewChoice();
				}
				$('.newPollChoice').each(function(index, choice) {
					if (choice.value === '') {
						$(this).parent().addClass('has-error');
					} else {
						$(this).parent().removeClass('has-error');
					}
				});
				return false;
			}

			return true;
		});
	};

	var appendNewChoice = function() {
		var choiceHtml = $('#newPollChoiceTemplate').html();
		choiceHtml = choiceHtml.replace(/{{id}}/g, currentId.toString());
		$('#poll-choices').first().append(choiceHtml);
		++currentId;
	}

	return {
		setup: setup
	};
})();

var Results = (function() {
	var getMaxVotes = function() {
		var max = 0;
		$('.progressBar').each(function(i, elem){
			var votes = parseInt($(elem).data('votes'));
			if (votes > max){
				max = votes;
			}
		});
		return max;
	};

	var setTakenPoll = function(code) {
		var taken = $.cookie('takenPolls') || '';
		if (taken.indexOf(code) == -1) taken += (code + ',');
		$.cookie('takenPolls', taken, {
			expires: 10000,
			path: '/'
		});
	};

	var setup = function(code) {
		setTakenPoll(code);
		$('.progressBar').tooltip();
		var maxVotes = getMaxVotes();
		$('.progressBar').each(function(i, elem){
			var votes = parseInt($(elem).data('votes'));
			$(this).width(votes / maxVotes * 100);
		});
	};

	return {
		setup: setup
	};
})();