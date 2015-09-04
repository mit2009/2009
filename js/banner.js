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

function addBannerListeners() {
  $('#vertical-banner').on('click', '.plane', function(e) {
    $('.photo1').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo1'), 5000, 300);
    return false;
  });

  $('#vertical-banner').on('click', '.cave', function(e) {
    $('.photo2').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo2'), 5000, 300);
    return false;
  });

  $('#vertical-banner').on('click', '.owl', function(e) {
    $('.photo3').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo3'), 5000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.hut', function(e) {
    $('.photo4').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo4'), 5000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.hut', function(e) {
    $('.photo4').animate({
      top: 0
    }, 600, 'easeOutQuad')
    setRemoveOverlay($('.photo4'), 5000, 420);
    return false;
  });

  $('#vertical-banner').on('click', '.fish', function(e) {
    console.log('secret 1!');
    return false;
  });

  $('#vertical-banner').on('click', '.treehole', function(e) {
    console.log('secret 2!');
    return false;
  });

  $('#vertical-banner').on('click', '.close-msg', function(e) {
    $('.cups-container').fadeOut(200);
  })

  $('#vertical-banner').on('click', function(e) {
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
    if (e.pageY > 663 && e.pageY < 681) {
      $('.cups-container').fadeIn();
    }
  })
}

function setRemoveOverlay($this, time, top) {
  $this.timeout = setTimeout(function() {
    $this.animate({
      top: top
    }, 200, 'easeInQuad')
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