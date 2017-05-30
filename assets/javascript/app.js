$(document).ready(function() {
	var animals = [
	{name: "Moose", question: "These large northern herbivores like to eat flowering plants, shrubs, leaves, and small tree branches. During the summer, they eat plants from the river, like pondweed and pond lilies."}, 
	{name: "Zebra", question: "These very fast-moving striped animals, can reach speeds of up to 40mph when galloping across the African  plains."}, 
	{name: "Giraffe", question: "The world's tallest animal  has a neck which is too short to reach the ground. As a result, it has to awkwardly spread its front legs or kneel for a drink of water."}, 
	{name: "Barn Owl", question: "This bird of prey has very long legs, toes, and talons to help them to catch prey hidden under long grass."}, 
	{name: "Cuttlefish", question: "This cephalopod can change to be almost any color—even though they're colorblind."}, 
	{name: "Leafy Seadragon", question: "This animal has no known predators. Their leafy camouflage and spiny fins keep large fish from snacking on them."}, 
	{name: "Sun Bear", question: "This omnivore's diet consists of lizards, little birds, rodents, insects, termites, fruit, and honey."}, 
	{name: "Komondor Dog", question: "This animal was bred by humans to guard livestock."}, 
	{name: "Red Panda", question: "This cute and fluffy animal is slightly bigger than a domestic cat and is nicknamed the Firefox."}, 
	{name: "Three Toed Sloth", question: "This slow moving animal has fur which hangs upside down, running from their stomachs to their backs."}, 
	{name: "Emperor Tamarin", question: "This primate has mustache-like fur on its face and is found in the south west Amazon Basin."}, 
	{name: "African Shoebill", question: "This bird's beak is around 9 inches long and about 4 inches wide. It ends with a nail-like hook, which is used for killing it's prey."},
	{name: "Star-nosed Mole", question: "This creature is almost completely blind, so they use the 22 tentacles around their nose to detect prey."}, 
	{name: "Proboscis Monkey", question: "This primate is not only one of the largest monkeys in Asia but also has a long and fleshy nose and a large swollen stomach."}, 
	{name: "Axolotl", question: "This salamander has external gills which frill out behind its head."}, 
	{name: "Aye-aye", question: "This animal is the largest nocturnal primate in the world."}, 
	{name: "Alpaca", question: "This animal was domesticated by the Incas more than 6,000 years ago and raised for their exquisite fleece."}, 
	{name: "Tarsier", question: "This animal has the largest eyes (compared to the body size) of all mammals."}, 
	{name: "Dumbo Octopus", question: "This animal lives on the seafloor, or hovers just slightly above it, at depths of 3000 to 4000 meters."}, 
	{name: "Frill-necked Lizard", question: "This animals get their name from their brightly coloured frill that they can make stand up to make themselves look much larger to scare off predators."}, 
	{name: "Sucker-footed Bat", question: "This flying mammal is named for the presence of small cups on its wrists and ankles."}, 
	{name: "Pygmy Marmoset", question: "This animal, the smallest monkey in the world, is between 4.75 and 6 inches in length and weighs between 3.53 and 4 ounces."}, 
	{name: "Platypus", question: "This animal, found only in Australia, is one of only five mammal species which lay eggs instead of giving birth to live young."},  
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
	var stopTime = 30;

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
			stopTime = 30;
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
		stopTime = 30;
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
		stopTime = 3;
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