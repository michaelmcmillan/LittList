
/**
 * Initialize
 */
var app = angular.module('kilde', ['ngCookies']);

/**
 * Routing
 */
app.config(function ($routeProvider) {
	
	$('[data-toggle="popover"]').popover({trigger: 'hover','placement': 'top'});
	
	$routeProvider.when('/',
		{ 
			controller: 'bookSearchResults',
			templateUrl: 'views/bookSearch.htm'
		}
	);
});

/**
 * API
 */
app.factory('api', ['$http', function ($http) {

    var api = {};
	
    api.queryAllBooks = function (query) {
        return $http({
			method: 'POST',
			url: '/books',
			data: { query: query }
		});
    };
	
	api.queryAllWebsites = function (query) {
		return $http({
			method: 'POST',
			url: '/websites',
			data: { query: query }
		});
	}
	
	api.survey = function (answer) {
		return $http({
			method: 'POST',
			url: '/survey',
			data: { answer: answer }
		})
	}
	
    return api;
}]);

/**
 * bookSearchResults
 * - Display results from book search
 */
app.controller('bookSearchResults', function ($rootScope, $scope, api) {
	
	// Default values
	$scope.loading = false;
	$scope.error = false;
	$rootScope.references = new Array ();
		
	/**
	 * Remove results if new search
	 */
	$scope.$watch('query', function (value) {
		if (!value) {
			if ($scope.books) {
				delete $scope.books;
			}
	
			if ($scope.website) {
				delete $scope.website;
			}
		}
	});	
	
	/**
	 * search
	 * - Searches for entries in the database
	 */
	$scope.search = function () {
		
		// Remove potentially old errors
		$scope.loading = true;
		$scope.error = false;
		
		/**
		 * Determine if website or book
		 */
		var isWebsite = new RegExp ('^(https?:\\/\\/)?'+ // protocol
		  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		  
	    /**
	     * Website
	     */
		if (isWebsite.test($scope.query)) {
	  		api.queryAllWebsites($scope.query)
			
			.success (function (website) {
				$scope.loading = false;
				$scope.website = website[0];
			})
			
			.error (function (error) {
				$scope.loading = false;
				$scope.error = error.message;
			});
		}
		
	    /**
	     * Book
	     */
		else {
		    
			// Search for books
			api.queryAllBooks($scope.query)
			.success (function (books) {
				$scope.loading = false;
			
				// String-to-JSON-hack
				for (book in books) {
					books[book].forfatter = 
						JSON.parse(books[book].forfatter);
				}
			
				// Return books
				$scope.books = books;
			})
		
			.error (function (error) {
				$scope.loading = false;
				$scope.error = error.message;
			});
		}
	}
	
	/**
	 * addReference
	 * - Adds a book to the reference list
	 */
	$scope.addReference = function (reference, type, that) {
		$(that)[0].parentNode.parentNode.setAttribute('class', 'success');
		reference.type = type;
		console.log(reference);
		$rootScope.references.push(reference);
	}
	
	/**
	 * removeReference
	 * - Removes a book from the reference list
	 */
	$scope.removeReference = function (referenceForDeletion, type, that) {
		for (reference in $rootScope.references) {
			if (referenceForDeletion.id == $rootScope.references[reference].id) {
				delete $rootScope.references[reference];
				$(that)[0].parentNode.parentNode.setAttribute('class', '');
			}
		}
	}
	
});

app.controller('survey', function ($scope, api, $cookies) {
	$scope.answered = $cookies.answered;

	$scope.answer = function (answer) {
		api.survey(answer)
		.success(function () {
			$cookies.answered = 'true';
			$('#survey').hide('slow');	
		})
		.error(function () {
			$cookies.answered = 'false';
		});
	}
});

/**
 * references
 * - Renders the references
 */
app.controller('references', function ($rootScope, $scope) {
	
	// Default is Harvard
	$scope.formatting = 'harvard';

	/**
	 * generateReferenceList
	 * - Formats the referencelist according to
	 *   the Harvard formatting.
	 */
	$rootScope.generateReferenceList = function () {
		
		var references = $rootScope.references;				

		console.log(references);

		for (reference in references) {
			
			/**
			 * Book: Parse
			 */
			if (references[reference].type == 'book') {
			
				var book = reference;
				references[book]['authors'] = new Array ();
				references[book]['chicacgoAuthors'] = new Array ();
			
				// Author-parsing
				for (author in references[book].forfatter) {
				
					firstName = references[book].forfatter[author].split(',')[1];
					lastName = references[book].forfatter[author].split(',')[0];
				
					// Try to parse the name
					try {
					
						firstNameInitials = firstName
							.replace(/\(.*?\)/g, '') // Paranthesis
						    .replace(/^\s+|\s+$/g,'') // Whitespace
							.split(' ').map(function (s) { 
								return s.charAt(0); // Return initials
							}).join('.') + '.'; // Separate with dot
					
						// Return the formatted data
						references[book]['authors'].push(lastName + ', ' +  firstNameInitials);
						
						// Chiacho-formatting
						references[book]['chicacgoAuthors'].push(
							firstName.substr(1).replace(/\(.*?\)/g, '') //Paranthesis
							.replace(/^\s+|\s+$/g,'') + ' ' +  // Whitespace
							lastName.replace(/^\s+|\s+$/g,'')); // Whitespace
				
					} catch (error) {
						console.log('Name not comma-separated. Solo author? Upcoming fix.');
						references[book]['authors'].push(references[book].forfatter[author] + '.');
					}
				}
			
				// Alphabetically sort authors 
				references[book]['authors'].sort(); 

				// Try to determine (int) year of publication
				if (references[book].aarstall) {
					try {
						references[book].yearMatched = parseInt(references[book].aarstall.match(/[0-9]{4}/)[0]);
					} catch (error) {
						console.log ('Could not match a year (yyyy). Upcoming fix.');
					}
				}
			}
			
			/**
			 * Website: Parse
			 */
			if (references[reference].type == 'website') {
				var website = reference;
				
				// Set download date to todays date
				var todaysDate = new Date();
										
				references[website].nedlastingsDato = 
				        todaysDate.getDate() +
				 '.' + (todaysDate.getMonth()+1) + 
				 '.' +  todaysDate.getFullYear();
			}
		}
		
		/**
		 * To be used in the final
		 * referencelist
		 */
		if (references) {
			$rootScope.allReferences = references;
		}
	}
});
