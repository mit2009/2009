/**
 * @banner.js 
 * 2.009 Side Banner 
 *
 * life gives you lemons, 
 * relax - make sideways banners!
 * Click, click, click, haiku.
 *
 * Released under the MIT License
 * Copyright (C) 2015 2.009
 */

var timeoutCheck;

function addBannerListeners() {
  $('#vertical-banner').on('click', '.plane', function(e) {
    retractPhotos();
    $('.photo1').animate({
      top: -10
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo1'), 6000, 300);
    return false;
  });

  $('#vertical-banner').on('click', '.cave', function(e) {
    retractPhotos();
    var creepyOrNot = Math.random();
    if (creepyOrNot < 0.5) {
      $('.photo2').css('background-image', 'url("css/banner/photo2b.gif")')
    } else {
      $('.photo2').css('background-image', 'url("css/banner/photo2.gif")')
    }
    $('.photo2').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo2'), 7000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.owl', function(e) {
    logEvent($(this))
    retractPhotos();
    $('.photo3').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo3'), 10000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.hut', function(e) {
    retractPhotos();
    $('.photo4').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo4'), 10000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.minecart', function(e) {
    retractPhotos();
    $('.photo5').css('background-image', 'url("css/banner/photo5.gif")')
    $('.photo5').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo5'), 10000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.cage', function(e) {
    retractPhotos();
    $('.photo6').css('background-image', 'url("css/banner/photo6.gif")')
    $('.photo6').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo6'), 7000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.fish', function(e) {
    retractPhotos();
    $('.fish-secret').css('background-image', 'url("css/banner/secret-1.jpg")')
    $('.fish-secret').animate({
      top: 200
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.fish-secret'), 5000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.photo1', function(e) {
    retractPhotos();
    if (e.pageY < 180 && e.pageY > 130 && gameOnline) {
      $('.cups-container').fadeIn();
    }
    return false;
  });

  $('#vertical-banner').on('click', '.photo4', function(e) {
    retractPhotos();
    if (e.pageY < 250 && e.pageY > 100 && e.pageX > 100 && e.pageX < 170) {
      $('.pour-secret').css('background-image', 'url("css/banner/secret-3.jpg")')
      $('.pour-secret').animate({
        top: 200
      }, 600, 'easeOutQuad')
      setRemoveOverlay($('.pour-secret'), 5000, 420);
    }
    return false;
  })

  $('#vertical-banner').on('click', '.treehole', function(e) {
    retractPhotos();
    $('.tree-secret').css('background-image', 'url("css/banner/secret-2.jpg")')
    $('.tree-secret').stop().animate({
      top: 200
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.tree-secret'), 5000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.close-msg', function(e) {
    $('.cups-container').fadeOut(200);
  })

  $('#vertical-banner').on('click', function(e) {
    retractPhotos();
    if (e.pageY > 643 && e.pageY < 681 && gameOnline) {
      $('.cups-container').fadeIn();
    }
  })
}

function retractPhotos() {
  if ($('.photo1').css('top') != 300) {
    $('.photo1').animate({
      top: 300
    }, 200, 'easeInQuad')
  }
  if ($('.photo2').css('top') != 300) {
    $('.photo2').animate({
      top: 300
    }, 200, 'easeInQuad')
  }
  if ($('.photo3').css('top') != 450) {
    $('.photo3').animate({
      top: 450
    }, 200, 'easeInQuad')
  }
  if ($('.photo4').css('top') != 450) {
    $('.photo4').animate({
      top: 450
    }, 200, 'easeInQuad')
  }
  if ($('.photo5').css('top') != 800) {
    $('.photo5').animate({
      top: 800
    }, 200, 'easeInQuad')
  }
  if ($('.photo6').css('top') != 800) {
    $('.photo6').animate({
      top: 800
    }, 200, 'easeInQuad')
  }
  if ($('.fish-secret').css('top') != 800) {
    $('.fish-secret').animate({
      top: 800
    }, 200, 'easeInQuad')
  }
  if ($('.tree-secret').css('top') != 800) {
    $('.tree-secret').animate({
      top: 800
    }, 200, 'easeInQuad')
  }
  if ($('.pour-secret').css('top') != 800) {
    $('.pour-secret').animate({
      top: 800
    }, 200, 'easeInQuad')
  }
  clearTimeout(timeoutCheck);
}

/*
function setRemoveOverlay($this, time, top) {
  $this.timeout = setTimeout(function() {
    $this.animate({
      top: top
    }, 200, 'easeInQuad')
  }, time)
}
*/

function setRemoveOverlay($this, time, top) {
  timeoutCheck = setTimeout(function() {
    retractPhotos();
  }, time)
}

// Minimize the Banner if the window width is small
// TODO: Add ability for user to reopen
function checkBannerDisplay() {
  if ($(window).width() >= 700) {
    $('.right-container').css('left', 200);
    canToggleBanner = false;
  } else {
    $('.right-container').css('left', 30);
    canToggleBanner = true;
  }
}

function initBanner() {
  // Add Banner HTML Markup
  $('#vertical-banner').append(banner_markup);
  
  // Give 200ms to load graphics, then fade in.
  setTimeout(function() {
    $('#vertical-banner').fadeIn();
  }, 200)
  setTimeout(function() {
    $('#vertical-banner-container').animate({
      backgroundColor: "#D69C0B"
    }, 500)
    $('.banner-back-cover').animate({
      backgroundColor: "#D69C0B"
    }, 500)
  }, 500)
  addBannerListeners();
  checkBannerDisplay();
}