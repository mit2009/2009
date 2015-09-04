/**
 * @cupsandballs.js 
 * 2.009 Cups and Balls 
 *
 * Hey, you found a secret!
 * Go away, quit cheating
 * Trust me, its more fun if you don't know ;)
 *
 * Released under the MIT License
 * Copyright (C) 2015 2.009
 */

// STANDARD CONSTANTS
const url = "http://localhost:3000";
const maxSequenceLength = 8;
const guessRevealTime = 1800;

// MOVEMENT PATTERNS 
const r1 = [{"top": 60}, {"top": 50}, {"top": 40}, {"top": 30}, {"top": 30}, {"top": 30}, {"top": 30}, {"top": 40}, {"top": 50}, {"top": 60}]
const s1 = [{"top":61,"left":66},{"top":65,"left":62},{"top":71,"left":56},{"top":72,"left":39},{"top":72,"left":29},{"top":67,"left":21},{"top":65,"left":20}]
const s2 = [{"top":60,"left":18},{"top":54,"left":24},{"top":52,"left":35},{"top":51,"left":49},{"top":52,"left":55},{"top":55,"left":64},{"top":58,"left":64}]
const s3a = [{"top":62,"left":21},{"top":56,"left":31},{"top":48,"left":48},{"top":46,"left":69},{"top":46,"left":89},{"top":47,"left":102},{"top":51,"left":108},{"top":57,"left":112}]
const s3b = [{"top":66,"left":109},{"top":73,"left":101},{"top":79,"left":91},{"top":79,"left":75},{"top":76,"left":59},{"top":73,"left":44},{"top":69,"left":33},{"top":65,"left":25}]
const s4a = [{"top":60,"left":21},{"top":60,"left":26},{"top":60,"left":35},{"top":60,"left":46},{"top":60,"left":54},{"top":60,"left":60},{"top":60,"left":65},{"top":60,"left":66}]
const s4b = [{"top":62,"left":113},{"top":66,"left":109},{"top":73,"left":100},{"top":75,"left":87},{"top":75,"left":69},{"top":75,"left":48},{"top":71,"left":33},{"top":68,"left":25}]
const s4c = [{"top":57,"left":20},{"top":50,"left":31},{"top":44,"left":49},{"top":43,"left":65},{"top":42,"left":81},{"top":46,"left":100},{"top":51,"left":108},{"top":56,"left":111}]
const f1a = [{"top":66,"left":19},{"top":74,"left":27},{"top":79,"left":46},{"top":79,"left":62},{"top":79,"left":66},{"top":79,"left":54},{"top":75,"left":39},{"top":70,"left":29}]
const f1b = [{"top":59,"left":109},{"top":56,"left":107},{"top":52,"left":96},{"top":52,"left":85},{"top":52,"left":79},{"top":52,"left":89},{"top":53,"left":96},{"top":57,"left":105}]
const f2a = [{"top":64,"left":63},{"top":66,"left":65},{"top":72,"left":70},{"top":76,"left":80},{"top":78,"left":85},{"top":76,"left":76},{"top":74,"left":71},{"top":69,"left":68}]
const f2b = [{"top":61,"left":110},{"top":57,"left":106},{"top":56,"left":103},{"top":56,"left":101},{"top":56,"left":105},{"top":57,"left":110},{"top":59,"left":110}]

// STATE TRACKER
var gameState = 0;
var score = 0;
var key = '';
var timer = 0;
var countOutTimer;
var classHighscore = 0;

// MOVEMENT FUNCTIONS
function zero() {
  $('.c1').css({top: 60, left: 20});
  $('.c2').css({top: 60, left: 65});
  $('.c3').css({top: 60, left: 110});
}

function showUnderCup(cup, s) {
  $cup = $('.c' + cup)
  runSequence($cup, r1.slice(0), s)
}

function swap12(s) {
  runSequence($('.c2'), s2.slice(0), s);
  runSequence($('.c1'), s1.slice(0), s);
}

function swap23(s) {
  runSequence($('.c3'), s2.slice(0).map(function(i) {
    return {"top": i.top, "left": (i.left+45)}
  }), s);
  runSequence($('.c2'), s1.slice(0).map(function(i) {
    return {"top": i.top, "left": (i.left+45)}
  }), s);
}

function swap13(s) {
  runSequence($('.c3'), s3a.slice(0), s);
  runSequence($('.c1'), s3b.slice(0), s);
}

function swapleft(s) {
  runSequence($('.c3'), s4a.slice(0), s);
  runSequence($('.c2'), s4a.slice(0).map(function(i) {
    return {"top": i.top, "left": (i.left+45)}
  }), s);
  runSequence($('.c1'), s4b.slice(0), s);
}

function swapright(s) {
  runSequence($('.c2'), s4a.slice(0).reverse(), s);
  runSequence($('.c1'), s4a.slice(0).reverse().map(function(i) {
    return {"top": i.top, "left": (i.left+45)}
  }), s);
  runSequence($('.c3'), s4c.slice(0), s);
}

function swapfake1(s) {
  runSequence($('.c1'), f1a.slice(0), s);
  runSequence($('.c3'), f1b.slice(0), s);
}

function swapfake2(s) {
  runSequence($('.c2'), f2a.slice(0), s);
  runSequence($('.c3'), f2b.slice(0), s);
}

function swapfake3(s) {
  runSequence($('.c1'), f2a.slice(0).map(function(i) {
    return {"top": i.top, "left": (i.left-45)}
  }), s);
  runSequence($('.c2'), f2b.slice(0).map(function(i) {
    return {"top": i.top, "left": (i.left-45)}
  }), s);
}

var move = {
  swap12: swap12,
  swap13: swap13,
  swap23: swap23,
  swapright: swapright,
  swapleft: swapleft,
  swapfake1: swapfake1,
  swapfake2: swapfake2,
  swapfake3: swapfake3
}

function runSequence(object, sequence, speed) {
  setTimeout(function() {
    var newPos = sequence.pop()
    object.css(newPos)
    if (Object.keys(sequence).length > 0) {
      runSequence(object, sequence, speed)
    } else {
      zero();
    }
  }, speed)
}

function showBall(i) {
  $('.b' + i).show();
}

function hideBalls() {
  $('.b1').hide();
  $('.b2').hide();
  $('.b3').hide();
}

function resetBallColors() {
  $('.b1').attr('class', 'ball b1 redb');
  $('.b2').attr('class', 'ball b2 greenb');
  $('.b3').attr('class', 'ball b3 blueb');
}

function runBlocks(blocks, speed, revealcup, finalcolor) {
  for (i in revealcup) {
    showBall(revealcup[i])
    showUnderCup(revealcup[i], speed);
  }
  var blockSpeed = speed*(maxSequenceLength+2);
  setTimeout(function() {
    if (revealcup != []) {
      hideBalls();
    }
    var block = move[blocks.pop()]
    block(speed); // Execute the sequences
    if (Object.keys(blocks).length > 0) {
      runBlocks(blocks, speed, [], finalcolor);
    } else {
      setTimeout(function() {
        setGuess(finalcolor);
      }, blockSpeed)
    }
  }, blockSpeed)
}

function setSubText(t) {
  $('.cup-score').html('score: <em>' + score + '</em> time: <em>' + t + '</em>');
  if (t > 0) {
    countOutTimer = setTimeout(function() {
        setSubText(t-1)
    }, 1000)
  } else {
    if (gameState == 2) {
      // out of time
      makeGuess(4);
    }
  }
}

// GAME STATE TRANSITIONS
function makeGuess(cup) {
  clearTimeout(countOutTimer);
  $('.cup').removeClass('selectable')
  $.get(url + '/guess', {key: key, guess: cup}, function(data) {
    if (data.result == "wrong") {
      showUnderCup(cup+1, 100);
      var colormap = ['','red','green','blue'];
      var listShownColors = data.shown;
      var visibleColors = []
      for (i in data.shown) { 
        visibleColors.push(colormap[listShownColors[i]])
      }
      var answer = data.answer
      for (i in answer) {
        if (visibleColors.indexOf(answer[i]) != -1) {
          cup = parseInt(i);
          $('.b' + (cup+1)).attr('class', 'ball b' + (cup+1) + ' ' + answer[i] + 'b');
          showBall(cup+1);
        }
      }
      showUnderCup(1,100);
      showUnderCup(2,100);
      showUnderCup(3,100);

      // congrats! it's a high score!
      if (data.level > data.highscore) {
        $('.new-highscore-container').fadeIn();
      }

      classHighscore = data.highscore;
      setTimeout(setGameOver, 200);
    } else {
      $('.b' + (cup+1)).attr('class', 'ball b' + (cup+1) + ' ' + $('#ball-color').attr('class') + 'b');
      $('.cup-text').html("correct!");
      showBall(cup+1);
      showUnderCup(cup+1, 100);
      setTimeout(function() {setNextRound(data)}, guessRevealTime)
    }
  });
}

function setNextRound(data) {
  resetBallColors();
  setGameMoving();
  parseServerAndStartGame(data)
}

function setGameMoving() {
  gameState = 1;
  $('.cup').removeClass('selectable')
  $('.cup-text').removeClass('selectable')
  $('.cup-text').css('color', '#999');
  $('.cup-text').css('font-weight', '300');
  $('.cup-text').text('watch closely!');
}

function setGuess(color) {
  gameState = 2;
  $('.cup').addClass('selectable')
  $('.cup-text').css('color', '#000');
  $('.cup-text').css('font-weight', '300');
  $('.cup-text').html('Pick <span id="ball-color" class="' + color + '">'+ color +'</span> ball!');
}

function setGameOver() {
  gameState = 0;
  $('.cup').removeClass('selectable')
  $('.cup-text').text('Game Over');
  $('.cup-text').css('color', 'red');
  $('.cup-text').css('font-weight', 'bold');
  $('.cup-score').html('Final Score: <em>' + score + '</em>. <span class="restart">Restart</span>?<br />Class Highscore: <em>' + classHighscore + '</em>');
}

function parseServerAndStartGame(data) {
  key = data.key;
  level = data.level;
  score = level;
  blocks = data.swaps.reverse();
  gamespeed = data.gamespeed || 50;
  expiry = data.expiry;
  color = data.color;
  shown = data.shown;

  setSubText(Math.floor((expiry-guessRevealTime)/1000))
  runBlocks(blocks, gamespeed, shown, color)
}

function startGame() {
  setGameMoving();
  $.get(url + '/initgame', {}, function(data) {
    parseServerAndStartGame(data);
  });
}

function sendHighScore(color) {
  data = {
    key: key,
    color: color
  }
  $.get(url + '/markhighscore', data, function(data) {
    console.log(data);
  });
}

function addListeners() {
  var $parent = $('#vertical-banner')
  
  $parent.on('click', '.cup-text', function() {
    if (gameState == 0) {
      startGame();
    }
  })
  $parent.on('click', '.c1', function() {
    if (gameState == 2) {
      makeGuess(0);
    }
  })
  $parent.on('click', '.c2', function() {
    if (gameState == 2) {
      makeGuess(1);
    }
  })
  $parent.on('click', '.c3', function() {
    if (gameState == 2) {
      makeGuess(2);
    }
  })
  $parent.on('click', '.restart', function() {
    if (gameState == 0) {
      startGame();
    }
  })
  $parent.on('click', '.ts', function() {
    sendHighScore($(this).data('color'));
    $('.new-highscore-container').fadeOut();
  })
  /*
  // Tracking Debugging Clicks

  var seq = []
  $parent.on('click', '.cups', function(event) {
    x = event.pageX - 20
    y = event.pageY - 200;
    seq.push({top: y, left: x})
    console.log(JSON.stringify(seq))
  });
  */
}

function initCupsAndBalls() {
  addListeners();
  zero();
}

