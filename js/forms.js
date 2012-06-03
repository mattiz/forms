(function( $ ){

	// ----------------------------------------------------------------------
	// Init plugin
	// ----------------------------------------------------------------------
	var init = function() {
		// Make questions sortable
		$("#container").sortable({ placeholder: 'sortable-placeholder' });

		// Edit button in view mode
		$(".question-view .edit").on("click", function() {
			var question = $(this).parent().parent();
			var questionView = question.find(".question-view");
			var questionEdit = question.find(".question-edit");

			question.css("background", "#fff4c2");

			questionView.css("display", "none");
			questionEdit.css("display", "block");
		});

		// Edit and Done button in edit mode
		$(".question-edit .edit, .question-edit .done").on("click", function() {
			var question = $(this).parent().parent();
			var questionView = question.find(".question-view");
			var questionEdit = question.find(".question-edit");

			questionView.find(".title").html( questionEdit.find(".title").val() );
			questionView.find(".help").html( questionEdit.find(".help").val() );

			question.css("background", "white");

			questionView.css("display", "block");
			questionEdit.css("display", "none");
		});

		// Delete button
		$(".question .delete").on("click", function() {
			if( confirm( "Er du sikker på at du vil slette dette spørsmålet?" ) ) {
				$(this).parent().parent().remove();
			}
		});

		// Change color on mouse over
		$(".question").on("mouseenter", function() {
			if( $(".question").find(".question-view").css("display") == "block" ) {
				$(this).css("background", "#fff9dd");
			}
		});

		$(".question").on("mouseleave", function() {
			if( $(".question").find(".question-view").css("display") == "block" ) {
				$(this).css("background", "white");
			}
		});
	}


	// ----------------------------------------------------------------------
	// Add question
	// ----------------------------------------------------------------------
	var add = function( type ) {
		var types = {
			text     : ".text-question",
			paragraph: ".paragraph-question"
		};

		var question = $("#templates " + types[ type ]).clone(true);
		question.appendTo("#container");
		question.css("background", "#fff4c2");

		var questionView = question.find(".question-view");
		var questionEdit = question.find(".question-edit");

		questionView.css("display", "none");
		questionEdit.css("display", "block");
	}


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



$(document).ready(function() {
	$("#container").forms();


	$("#add-text").on("click", function() {
		$("#container").forms("add", "text");
	});


	$("#add-paragraph").on("click", function() {
		$("#container").forms("add", "paragraph");
	});
});







