$(document).ready(function() {

	ko.bindingHandlers.sortableList = {
		init: function(element, valueAccessor) {
			var list = valueAccessor();
			$(element).sortable({
				update: function(event, ui) {
					//retrieve our actual data item
					var item = ui.item.tmplItem().data;

					//figure out its new position
					var position = ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);

					//remove the item and add it back in the right spot
					if (position >= 0) {
						list.remove(item);
						list.splice(position, 0, item);
					}
				},
				placeholder: 'sortable-placeholder'
			});
		}
	};



	var Option = function(name) {
	    this.name = ko.observable(name);
	}


	var Question = function(title, description, type) {
	    this.title       = ko.observable(title);
	    this.description = ko.observable(description);
	    this.type        = ko.observable(type);
	    this.editMode    = ko.observable(false);
	    this.options     = ko.observableArray([
	    	new Option("Det forste alternativet"),
	    	new Option("Det andre alternativet")
	    ]);
	    this.requireAttachment = ko.observable(false);
	    this.fromScale         = ko.observable("1");
	    this.toScale           = ko.observable("6");
	    this.fromScaleLabel    = ko.observable("Glad!");
	    this.toScaleLabel      = ko.observable("Sur!");

	    this.edit = function() {
	        this.editMode( ! this.editMode() );
	    }

	    this.addOption = function() {
	        this.options.push( new Option("") );

	        // Set focus to the last option added
	        $('.options-container .option input[type=text]').last().focus();
	    }

	    this.removeOption = function( option ) {
	        this.options.remove( option );
	    }.bind(this);

	    this.moreThanOneOption = function() {
	    	return this.options().length > 1;
	    }
	}




	function ViewModel() {
		this.questions = ko.observableArray([
	        new Question("Annabelle", "Beskrivelse", 'singleline'),
	        new Question("Bertie", "Beskrivelse", 'paragraph'),
	        new Question("Charles", "Beskrivelse", 'multiplechoice'),
	        new Question("Deveraux", "Beskrivelse", 'checkboxes'),
	        new Question("Excalibur", "Beskrivelse", 'scale')
        ]);

        this.addQuestion = function( question ) {
        	this.questions.push( question );
        };

        this.removeQuestion = function( question ) {
        	this.questions.remove( question );

        }.bind(this);

        this.addText = function() {
        	var newQuestion = new Question("", "", 'singleline');
			newQuestion.edit();
			this.addQuestion( newQuestion );
        }
	}



	var viewModel = new ViewModel()
	ko.applyBindings( viewModel );







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

});