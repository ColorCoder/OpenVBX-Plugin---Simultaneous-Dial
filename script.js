$(document).ready(function(){
	// $(document).bind('applet-visible', function(event, instance) {
		// if(link.hasClass('standard---dial')) {
		// }
	// });

	var app = $('.flow-instance.custom---simudial');

	// detect when voicemail widget user or group is chosen
	
	$(".simudial-applet .usergroup-container", app).live('usergroup-selected', function(e, usergroup_label, type){
		// hide the a/s picker if it's a user, because they configure that in their personal settings, but show if it's a group
		if (type == 'group') {
			$(e.target).closest('.simudial-applet').find('.group-voicemail').show();
			$(e.target).closest('.simudial-applet').find('.personal-voicemail').hide();
		} else {
			$(e.target).closest('.simudial-applet').find('.group-voicemail').hide();
			$(e.target).closest('.simudial-applet').find('.personal-voicemail').show();
		}
	});

	$(".simudial-applet input.dial-whom-selector-radio", app).live('change', function (e) {
		var value = $(e.target).val();
		
		var noAnswerAction = $(e.target).closest('.simudial-applet').find('input.no-answer-action-radio');
		
		if (value == 'user-or-group') {
			$(e.target).closest('.simudial-applet').find('.nobody-answers-user-group').removeClass('hide');
			$(e.target).closest('.simudial-applet').find('.nobody-answers-number').addClass('hide');
			$(e.target).closest('.simudial-applet').find('.voicemail-row').removeClass('hide');
		} else if (value == 'number') {
			$(e.target).closest('.simudial-applet').find('.nobody-answers-user-group').addClass('hide');
			$(e.target).closest('.simudial-applet').find('.nobody-answers-number').removeClass('hide');
			$(e.target).closest('.simudial-applet').find('.voicemail-row').addClass('hide');
			
			// The user has selected to dial an arbitrary number and the voicemail
			// option isn't available for that mode.  So, if "Send to Voicemail" had
			// previousimudialsly been selected, we need to choose something new.
		} else {
			alert("Unexpected value: " + value);
		}
	});

	// Highlights the region for radio-tables
	$(".simudial-applet input.no-answer-action-radio,.simudial-applet input.dial-whom-selector-radio", app).live('click', function(event) {
		var tr = $(this).closest('tr');
		$('tr', tr.closest('table')).each(function (index, element) {
			// Set the others to off
			$(element).removeClass('on').addClass('off');
		});
		
		tr.addClass('on').removeClass('off');
	});

});
