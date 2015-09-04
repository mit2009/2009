/**
 * @banner.js 
 * 2.009 Scripts Initializer
 *
 * let's get these web scripts on the road!
 * Vrooooommmmm.
 *
 * Released under the MIT License
 * Copyright (C) 2015 2.009
 */

var bannerHeight = 680;

$(window).on('scroll', function() {
  scroll = $(document).scrollTop()
  bannerDiff = bannerHeight - $(window).height()
  if (bannerHeight > $(window).height()) {
    if (bannerDiff < scroll) {
      $('#vertical-banner').css('top', -bannerDiff)
        .css('position', 'fixed')
    } else {
      $('#vertical-banner').css('top', 0)
        .css('position', 'relative')
    }
  } else {
    $('#vertical-banner').css('top', 0)
      .css('position', 'fixed')
  }
});

// Hover Fix for Touch & Mobile Devices
$('body').on('touchmove', function (e) {
  if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
});

// Check whether or not to collapse Banner
$(window).on('resize', function() {
  checkBannerDisplay();
});

$(function() {
  $('body').bind('touchstart', function(e) {});

  initWally();
  initBanner();
  initCupsAndBalls();
  if ($('.gallery-box').length) {
    initGallery();
  }
  initMenu();
})