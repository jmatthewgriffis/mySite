// The ball
var ball,
pos,
posDefault,
halfW,
halfH,
xVelDefault,
xVel,
yVel,
outside,

// The paddles
paddleL,
paddleR,
originalWidth,
originalHeight,
paddlePosL,
paddlePosR,
paddleVel,
upL,
downL,
upR,
downR,
scoreL,
scoreR,
originalSize,

// The frame
frame,
edgeTop,
edgeBottom,
edgeLeft,
edgeRight,

// Misc.
paused,
win;

var setup = function() {
	ball = $('#ball');
	xVelDefault = 7;
	if (Math.random() < 0.5) {
		xVel = xVelDefault;
	} else {
		xVel = -xVelDefault;
	}
	randomY();
	pos = { x : ball.offset().left + ball.width() * 0.5, y : ball.offset().top + ball.height() * 0.5 };
	posDefault = { x : ball.offset().left, y : ball.offset().top };
	halfW = ball.width() * 0.5;
	halfH = ball.height() * 0.5;
	outside = false;

	paddleL = $('#left');
	paddleR = $('#right');
	originalWidth = parseInt($(paddleL).css('width'));
	originalHeight = parseInt($(paddleL).css('height'));
	paddleVel = 8;
	paddlePosL = paddleL.offset();
	paddlePosR = paddleR.offset();
	scoreL = 0;
	scoreR = 0;
	originalSize = $('#scoreL').css('font-size');

	frame = $('#wrapper');
	edgeTop = frame.offset().top;
	edgeLeft = frame.offset().left;
	edgeBottom = frame.offset().top + frame.height();
	edgeRight = frame.offset().left + frame.width();

	paused = false;
	win = false;
	
	// Background:
	var myLine = $('.line');
	var lineH = myLine.outerHeight(true);
	var numLines = (frame.height() / lineH);
	for (var i = 0; i < numLines; i++) {
		myLine.append('<div class="line"></div>');
	}

	// console.log('setup!');
}

setup();

// Update loop:
setInterval(function(){
	if (!paused) {
		pos.x = ball.offset().left + ball.width() * 0.5;
		pos.y = ball.offset().top + ball.height() * 0.5;
		paddlePosL = paddleL.offset();
		paddlePosR = paddleR.offset();


		// Collision

		if (pos.y - halfH <= edgeTop || pos.y + halfH >= edgeBottom) {
			if (!outside) {
				yVel *= -1;
				squashBall('v');
				$('#bounce2').trigger('play');
			}
		}

		if (
			( pos.y + halfH >= paddlePosR.top &&
			pos.y - halfH <= paddlePosR.top + paddleR.height() &&
			pos.x + halfW >= paddlePosR.left &&
			pos.x - halfW <= paddlePosR.left + paddleR.width() ) 
			)
		{
			rebound();
			squashPaddle(paddleR);
		}
		if (
			( pos.y + halfH >= paddlePosL.top &&
			pos.y - halfH <= paddlePosL.top + paddleL.height() &&
			pos.x + halfW >= paddlePosL.left &&
			pos.x - halfW <= paddlePosL.left + paddleL.width() )
			)
		{
			rebound();
			squashPaddle(paddleL);
		}

		if (paddlePosL.top <= edgeTop) {
			upL = false;
		}
		if (paddlePosL.top + paddleL.height() >= edgeBottom) {
			downL = false;
		}
		if (paddlePosR.top <= edgeTop) {
			upR = false;
		}
		if (paddlePosR.top + paddleR.height() >= edgeBottom) {
			downR = false;
		}


		// Movement

		if (!win) {
			pos.x += xVel;
			pos.y += yVel;
			ball.offset({top: pos.y - ball.height() * 0.5, left: pos.x - ball.width() * 0.5});
		}


		// Offscreen
		if (pos.x + halfW <= edgeLeft || pos.x - halfW >= edgeRight) {
			ball.css('visibility', 'hidden');
			outside = true;
		}
		var offMargin = 75 * Math.abs(xVel);
		if (pos.x + halfW <= edgeLeft - offMargin) {
			scoreR++;
			$('#scoreR').text(scoreR);
			$('#score').trigger('play');
			resetBall();
		}
		if (pos.x - halfW >= edgeRight + offMargin) {
			scoreL++;
			$('#scoreL').text(scoreL);
			$('#score').trigger('play');
			resetBall();
		}


		// Win
		if (!win) {
		if (scoreL >= 11 || scoreR >= 11) {
			win = true;
			var winner;
			if (scoreL > scoreR) {
				winner = $('#scoreL');
			} else {
				winner = $('#scoreR');
			}
			$(winner).animate({
			    'font-size': '10em'
			  }, 2000, function() {
			    $('#winner').css('visibility', 'visible');
			  });
		}
	}


		// Controls
		if (upR) {
			paddlePosR.top -= paddleVel;
	        paddleR.offset(paddlePosR);
		}
		if (downR) {
			paddlePosR.top += paddleVel;
	        paddleR.offset(paddlePosR);
		}
		if (upL) {
			paddlePosL.top -= paddleVel;
	        paddleL.offset(paddlePosL);
		}
		if (downL) {
			paddlePosL.top += paddleVel;
	        paddleL.offset(paddlePosL);
		}
	}
}, 1000 / 60); // 60 FPS

function resetBall() {
	ball.offset({top: posDefault.y, left: posDefault.x});
	if (scoreL < 11 && scoreR < 11) {
		ball.css('visibility', 'default');
	}
	randomY();
	if (Math.random() < 0.5) {
		xVel = xVelDefault;
	} else {
		xVel = -xVelDefault;
	}
	ball.css('width', halfW * 2);
	ball.css('height', halfH * 2);
	outside = false;
}

function rebound() {
	xVel *= -1.1;
	if (Math.random() < 0.4) {
		randomY();
	}
	squashBall('h');
	$('#bounce1').trigger('play');
}

function randomY() {
	yVel = Math.floor((Math.random() * 4) + -2);
}

function squashPaddle(myPaddle) {
	$(myPaddle).animate({
	    'width': originalWidth * 0.75,
	    'height': originalHeight * 1.15
	}, 100, function() {
		$(myPaddle).animate({
		    'width': originalWidth * 1.15,
		    'height': originalHeight * 0.92
		}, 200, function() {
		    $(myPaddle).animate({
		    'width': originalWidth,
		    'height': originalHeight
		}, 200, function() {
		    	//
			});
		});
	});
}

function squashBall(direction) {
	if (direction == 'h') {
		$(ball).animate({
		    'width': halfW,
		    'height': halfH * 2.5
		}, 100, function() {
		    $(ball).animate({
			    'width': halfW * 2.25,
			    'height': halfH * 1.75
			}, 100, function() {
		    	$(ball).animate({
				    'width': halfW * 2,
				    'height': halfH * 2
				}, 100, function() {
			    	//
				});
			});
		});
	}
	if (direction == 'v') {
		$(ball).animate({
		    'width': halfW * 2.25,
		    'height': halfH * 1.5
		}, 100, function() {
		    $(ball).animate({
			    'width': halfW * 2,
			    'height': halfH * 2
			}, 100, function() {
				//
			});
		});
	}
}

function showPause(myBool) {
	if (myBool == true) {
		$('#mask').css('visibility', 'visible');
        $('#paused').css('visibility', 'visible');
	} else {
		$('#mask').css('visibility', 'hidden');
    	$('#paused').css('visibility', 'hidden');
    }
}

$(document).keydown(function(e) {

	// Credit: http://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery

    switch(e.which) {
    	case 87: // w
    	upL = true;
    	break;

    	case 83: // s
    	downL = true;
    	break;

        case 38: // up
        upR = true;
        break;

        case 40: // down
        downR = true;
        break;
        /*
        case 37: // left
        break;
        case 39: // right
        break;
        */
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
$(document).keyup(function(e) {

    switch(e.which) {
    	case 87: // w
    	upL = false;
    	break;

    	case 83: // s
    	downL = false;
    	break;

        case 38: // up
        upR = false;
        break;

        case 40: // down
        downR = false;
        break;

        case 80: // p
        paused = !paused;
        if ($('#paused').css('visibility') == 'visible') {
        	showPause(false);
        } else {
        	showPause(true);
        }
        break;

        case 82: // r
        if (paused || win) {
        	win = false;
        	paused = false;

        	scoreL = 0;
        	$('#scoreL').text(scoreL);
        	$('#scoreL').css('font-size', parseInt(originalSize));

        	scoreR = 0;
        	$('#scoreR').text(scoreR);
        	$('#scoreR').css('font-size', parseInt(originalSize));

        	$('#winner').css('visibility', 'hidden');

        	showPause(false);
        	resetBall();
        }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});