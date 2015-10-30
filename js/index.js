$(document).ready (function(){
"use strict";

	var score = 0;
	var randomNumber;
	var gameEnabled = false;
	var timeOut;
	var weaponSelection;

	var initializeGame = function () {
		//if the value is undefined then set it...home computer
		$("#highest-score").html(window.localStorage.counterValue);
		$("img").css("display", "none");
		// weaponSelection = $(".cursor > img");
	}

	var removeMobFromGameBoard = function (blockNumber) {
		$(blockNumber + ">img").fadeOut(100).css("display", "none");
		$(blockNumber).removeClass("mobOnBoard");
	}

	var randomImageGenerator = function () {
		var maxNumber = 15;
		randomNumber = Math.floor(Math.random() * maxNumber);
		var blockNumber = "[data-block='" + randomNumber + "']";

		if (!$(".block").hasClass("mobOnBoard")) {
			$(blockNumber + ">img").fadeIn(150).css("display", "inline");
			//Change the cursor when cursor is on top of the image only
			$(blockNumber + ">img").css({'cursor': 'url(/cursors/axes.png), default'});
			//Add mobOnBoard class
			$(blockNumber).addClass("mobOnBoard");
			timeOut = setTimeout(function(){
				removeMobFromGameBoard (blockNumber);
				randomImageGenerator();
			}, 2000);
			//The clear timeOuts for this setTimeout are in the resetGame function
		}
	}

	var updateHighestScore = function () {
		if (score > window.localStorage.counterValue)
		{
			window.localStorage.counterValue = score;
			$("#highest-score").html(score);
		}
	}

	var updateScore = function () { 
		score++;
		$("#player-score").html(score);
	}

	var clearScore = function (){
		score = 0;
		$("#player-score").html(score);
	}

	var resetGame = function (){
		//Remove all mobs currently on the page		
		$(".block > img").css("display", "none");
		//Re-appear the start button
		$(".start-button").css("display", "inline");
		clearScore();
		gameEnabled = false;
	}

	var gameOver = function (){
		alert("Game Over!");
		clearTimeout(timeOut);
		updateHighestScore();
		resetGame();
	}
		
	//Event Listener
	$(".start-button").click (function (event) {
		event.preventDefault();
		gameEnabled = true;
		//"Remove" the start button
		$(this).css("display", "none");
		//Remove all mobOnBoard Classes
		$(".block").removeClass("mobOnBoard");
		randomImageGenerator();
		setTimeout(gameOver, 10000);
	});	

	//Event Listener
	$('.block').click (function (event) {
		event.stopPropogation;
		if (gameEnabled) {
			var imageClicked = $(this).attr("data-block");
			var blockNumber = "[data-block='" + imageClicked + "']";

			//Remove the mob
			if ($(blockNumber).hasClass("mobOnBoard")) {
				removeMobFromGameBoard (blockNumber);
				clearTimeout(timeOut);
				updateScore ();
			}
			if (!$(blockNumber).hasClass("mobOnBoard"))
			{
				randomImageGenerator();			
			}
		}
	});
	initializeGame();
});

//TODO:
//refactor to use a class
//steve/alex image on side of gameboards				