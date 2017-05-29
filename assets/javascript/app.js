$(document).ready(function() {
	var animals = [
	{name: "Moose", question: "Moose are herbivores (plant-eaters) and they like to eat flowering plants, shrubs, leaves and small branches of the trees. During the summer, they eat plants from the river, like pondweed and pond lilies."}, 
	{name: "Zebra", question: "Zebras are very fast-moving animals, and can reach speeds of up to 40mph when galloping across the plains. This is just fast enough to outpace predators such as lions. Foals can run with the herd within a few hours of birth."}, 
	{name: "Giraffe", question: "A giraffe's neck is too short to reach the ground. As a result, it has to awkwardly spread its front legs or kneel to reach the ground for a drink of water."}, 
	{name: "Barn Owl", question: "Barn Owls have very long legs, toes and talons to help them to catch prey hidden under long grass."}, 
	// {name: "Cuttlefish", question: "Cuttlefish can change to be almost any color—even though they're colorblind."}, 
	// {name: "Leafy Seadragon", question: "The Leafy Sea Dragon has no known predators. Their leafy camouflage and spiny fins keep large fish from snacking on them."}, 
	// {name: "Sun Bear", question: "A sun bear's diet consists of lizards, little birds, rodents, insects, termites, fruit and honey."}, 
	// {name: "Komondor Dog", question: "The Komondor dog was bred to guard livestock."}, 
	// {name: "Angora Rabbit", question: "There are four types of Angora rabbits: English, French, Giant, and Satin."}, 
	// {name: "Red Panda", question: "Red Panda's are slightly bigger than a domestic cat."}, 
	// {name: "Three Toed Sloth", question: "Three Toed Sloth's fur hangs upside down, running from their stomachs to their backs."}, 
	// {name: "Emperor Tamarin", question: "There are two subspecies of Emperor tamarin found in the south west Amazon Basin."}, 
	// {name: "White-faced Saki Monkey", question: "White-faced sakis typically live around 14 years in their natural habitat and have been recorded to live up to 36 years in captivity."}, 
	// {name: "Tapir", question: "Tapir calves are born with dappled markings; at about six months, they lose the markings and look like a miniature adult tapir."}, 
	// {name: "Hagfish", question: "The estimated 76 species of hagfishes live in cold waters around the world, from shallow to as deep as 5,500 feet."}, 
	// {name: "Star-nosed Mole", question: "Star-nosed Mole are almost completely blind, so they use the 22 tentacles around their nose to detect prey."}, 
	// {name: "Proboscis Monkey", question: "The male Proboscis Monkey is not only one of the largest monkeys in Asia but also has a long and fleshy nose and a large swollen stomach."}, 
	// {name: "Pink Fairy Armadillo", question: "Pink Fairy Armadillo are the smallest of all known armadillos."}, 
	// {name: "Axolotl", question: "The axolotl is a salamander and like other salamanders, it is an amphibian."}, 
	// {name: "Aye-aye", question: "The aye-aye is the largest nocturnal primate in the world."}, 
	// {name: "Alpaca", question: "Alpacas were domesticated by the Incas more than 6,000 years ago and raised for their exquisite fleece."}, 
	// {name: "Tarsier", question: "Tarsier have the largest eyes (compared to the body size) of all mammals."}, 
	// {name: "Dumbo Octopus", question: "Dumbo Octopus live on the seafloor or hover just slightly above it at depths of 3000 to 4000 meters."}, 
	// {name: "Frill-necked Lizard", question: "Frill-necked Lizards get their name from their brightly coloured frill that they can make stand up to make themselves look much larger to scare off predators."}, 
	// {name: "Narwhal", question: "Scientists don’t know exactly why narwhals have tusks—though they might be used to impress females or fight other males."}, 
	// {name: "Sucker-footed Bat", question: "Sucker-footed Bats are named for the presence of small cups on its wrists and ankles."}, 
	// {name: "Pygmy Marmoset", question: "On average, pygmy marmosets reach between 4.75 and 6 inches in length and weight between 3.53 and 4 ounces."}, 
	// {name: "Blobfish", question: "A Blobfish doesn’t have a skeleton or muscles."}, 
	// {name: "Platypus", question: "The platypus, found only in Australia, is one of only five mammal species that lay eggs instead of giving birth to live young."}, 
	// {name: "African Shoebill", question: "An African Shoebill's beak is around 9 inches long and about 4 inches wide. It ends with a nail-like hook, which is used for killing it's prey."}, 
	// {name: "Yeti Crab", question: "Yeti Crabs range in size from 15 cm to under half a cm across."}, 
	];
	var correctAns = 0;
	var wrongAns = 0;
	var unknownAns = 0;
	var askedQuestions = [];
	var answers = [];
	var answerHolder = [];
	var correctAnimal = "";
	var correctValue = 0;
	var intervalId;
	var intervalIdAnswer;
	var clockRunning = false;
	var answerRuning = false;
	var stopTime = 10;

	$('#sections').on('click', 'button.startButton', function() {
		generateQuestion();
	});

	$('#sections').on('click', 'button.wrongButton', function() {
		wrongAns++;
		$('#headSection').html('<h1>Answer!</h1><br>');
		$('#sections').html('<h1>Wrong!<br> The correct answer is ' + correctAnimal + '</h1><br>');
		$('#sections').append('<img src="assets/images/' + correctAnimal + '.jpg" alt=' + correctAnimal + 'image">');
		pauseAnswer();
	});

	$('#sections').on('click', 'button.correctButton', function() {
		correctAns++;
		$('#headSection').html('<h1>Answer!</h1><br>');
		$('#sections').html('<h1>Correct!<br> The correct answer is ' + correctAnimal + '</h1><br>');
		$('#sections').append('<img src="assets/images/' + correctAnimal + '.jpg" alt=' + correctAnimal + 'image">');
		pauseAnswer();
	});

	$('#sections').on('click', 'button.restartButton', function() {
		correctAns = 0;
		wrongAns = 0;
		unknownAns = 0;
		askedQuestions = [];
		generateQuestion();
	});


	function generateQuestion() {
		if (askedQuestions.length < animals.length) {
			stopTime = 10;
			$('#headSection').html('<h1>' + stopTime + ' seconds</h1><br>');
			startClock();
			var randNum = 0;
			var givenQuestion = "";
			randNum = Math.floor(Math.random()*animals.length);
			givenQuestion = animals[randNum].question
			if ($.inArray(randNum, askedQuestions) === -1) {
				$('#sections').html('<h1>' + givenQuestion + '</h1><br>');
				answers = [];
				correctAnimal = animals[randNum].name;
				answers.push(correctAnimal);
				generateWrongAnswers(randNum);
				correctValue = $.inArray(correctAnimal, answers);
				for (i = 0; i < answers.length; i++) {
				    if (i === correctValue) {
				    	$('#sections').append('<button class="btn btn-success btn-lg correctButton"><span><h1>' + answers[i] + '</h1></span></button><br>');
				    } else {
				    	$('#sections').append('<button class="btn btn-success btn-lg wrongButton"><span><h1>' + answers[i] + '</h1></span></button><br>');
				    }
				}
				askedQuestions.push(randNum);
			} else {
				generateQuestion();
			}
		} else {
			$('#headSection').html('<h1>Final Score</h1>');
			$('#sections').html('<h1>You reached the end!</h1><p>Correct Answers: ' + correctAns + '<br>Incorrect Answers: ' + wrongAns + '<br> Unanswered: ' + unknownAns + '<br></p>');
			$('#sections').append('<button class="btn btn-success btn-lg restartButton"><span><h1>Restart</h1></span></button>');
		}
	}

	function generateWrongAnswers(currentElement) {
		var randNum = 0;
		var holder = [];
		holder.push(currentElement);
		while (answers.length < 4) {
			randNum = Math.floor(Math.random()*animals.length);
			if ($.inArray(randNum, holder) === -1) {
				holder.push(randNum);
				answers.push(animals[randNum].name);
			}
		}
		mixAnswers();
	}

	function mixAnswers() {
		var randNum = 0;
		var holder = [];
		answerHolder = [];
	    while (answerHolder.length < 4) {
			randNum = Math.floor(Math.random()*answers.length);
			if ($.inArray(randNum, holder) === -1) {
				holder.push(randNum);
				answerHolder.push(answers[randNum]);
			}
		}
		answers = answerHolder;
	}

	function startClock() {
		stopTime = 10;
		clearInterval(intervalIdAnswer);
		answerRunning = false;
		if (!clockRunning) {
	        intervalId = setInterval(function() { 
				$('#headSection').html('<h1>' + stopTime + ' seconds</h1><br>');
				if (stopTime === 0) {
					unknownAns++;
					$('#headSection').html('<h1>Answer!</h1><br>');
					$('#sections').html('<h1>Times Up!<br> The correct answer is ' + correctAnimal + '</h1><br>');
					$('#sections').append('<img src="assets/images/' + correctAnimal + '.jpg" alt=' + correctAnimal + 'image">');
					pauseAnswer();
				}
				stopTime--;
			}, 1000);
	    clockRunning = true;
		}
	}

	function pauseAnswer() {
		stopTime = 5;
		clearInterval(intervalId);
		clockRunning = false;
		if (!answerRunning) {
	        intervalIdAnswer = setInterval(function() { 
				if (stopTime === 0) {
					generateQuestion();
				}
				stopTime--;
			}, 1000);
	    answerRunning = true;
		}
	}

});