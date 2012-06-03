(function( $ ){

	// ----------------------------------------------------------------------
	// Init plugin
	// ----------------------------------------------------------------------
	var init = function() {
		// Make questions sortable
		$("#container").sortable({ placeholder: 'sortable-placeholder' });

		// Edit button in view mode
		$(document).on('click', '.question-view .edit', function() {
			closeAllEdits();
			editQuestion( $(this).parent().parent() );
		});

		// Edit and Done button in edit mode
		$(document).on('click', '.question-edit .edit, .question-edit .done', function() {
			closeAllEdits();
			viewQuestion( $(this).parent().parent() );
		});

		// Delete button
		$(document).on('click', '.question .delete', function() {
			if( confirm( "Er du sikker på at du vil slette dette spørsmålet?" ) ) {
				$(this).parent().parent().remove();
			}
		});

		// Change color on mouse over
		$(document).on('mouseenter', '.question', function() {
			if( $(this).find(".question-view").css("display") == "block" ) {
				$(this).css("background", "#fff9dd");
			}
		});

		$(document).on('mouseleave', '.question', function() {
			if( $(this).find(".question-view").css("display") == "block" ) {
				$(this).css("background", "white");
			}
		});
	}


	var viewQuestion = function( question ) {
		var questionView = question.find(".question-view");
		var questionEdit = question.find(".question-edit");

		// Copy data
		questionView.find(".title").html( questionEdit.find(".title").val() );
		questionView.find(".help").html( questionEdit.find(".help").val() );

		question.css("background", "white");

		questionView.css("display", "block");
		questionEdit.css("display", "none");
	}


	var editQuestion = function( question ) {
		var questionView = question.find(".question-view");
		var questionEdit = question.find(".question-edit");

		question.css("background", "#fff4c2");

		questionView.css("display", "none");
		questionEdit.css("display", "block");
	}


	var closeAllEdits = function() {
		$(".question").each(function() {
			viewQuestion( $(this) );
		});
	}


	// ----------------------------------------------------------------------
	// Add question
	// ----------------------------------------------------------------------
	var add = function( type ) {
		closeAllEdits();

		var textQuestion = $(
			'<div class="question text-question"> \
				<div class="question-view"> \
					<button class="delete"><img src="img/bin_closed.png"></button> \
					<button class="edit"><img src="img/pencil.png"></button> \
					<div class="title"></div> \
					<div class="help"></div> \
					<input type="text" disabled="disabled"></textarea> \
				</div> \
				<div class="question-edit"> \
					<button class="delete"><img src="img/bin_closed.png"></button> \
					<button class="edit"><img src="img/pencil.png"></button> \
					<div> \
						<label for="title">Tittel</label> \
						<input style="text" class="title"> \
					</div> \
					<div> \
						<label for="help">Hjelpetekst</label> \
						<input style="text" class="help"> \
					</div> \
					<p class="example">Brukerens svar</p> \
					<button class="done">Ferdig</button> \
				</div> \
			</div>'
		);


		var paragraphQuestion = $(
			'<div class="question paragraph-question"> \
				<div class="question-view"> \
					<button class="delete"><img src="img/bin_closed.png"></button> \
					<button class="edit"><img src="img/pencil.png"></button> \
					<div class="title"></div> \
					<div class="help"></div> \
					<textarea disabled="disabled"></textarea> \
				</div> \
				<div class="question-edit"> \
					<button class="delete"><img src="img/bin_closed.png"></button> \
					<button class="edit"><img src="img/pencil.png"></button> \
					<div> \
						<label for="title">Tittel</label> \
						<input style="text" class="title"> \
					</div> \
					<div> \
						<label for="help">Hjelpetekst</label> \
						<input style="text" class="help"> \
					</div> \
					<p class="example">Brukerens svar</p> \
					<button class="done">Ferdig</button> \
				</div> \
			</div>'
		);


		var types = {
			text     : textQuestion,
			paragraph: paragraphQuestion
		};

		var question = types[ type ];


		question.appendTo("#container");
		question.css("background", "#fff4c2");

		var questionView = question.find(".question-view");
		var questionEdit = question.find(".question-edit");

		questionView.css("display", "none");
		questionEdit.css("display", "block");
	}


	// ----------------------------------------------------------------------
	// Plumbing
	// ----------------------------------------------------------------------
	var methods = {
		init : init,
		add  : add
	};


	$.fn.forms = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );

		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.forms' );
		}

		return this;
	};

})( jQuery );
