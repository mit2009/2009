/**
 * @slideshow.js 
 * 2.009 Photo Gallery
 *
 * Horizontal scrolling gallery built just for 2.009, 2015 edition
 * Shiny, isn't it? Mmmmm shiny JavaScript...
 * Pretty pictures...
 * Ahh...
 *
 * Released under the MIT License
 * Copyright (C) 2015 2.009
 */

const rootURL = "http://web.mit.edu/2.009/slideshow/images/"

var timer;
var galleryPosition = 0;
var currentGalleryWidth = 0;
var currentGalleryLength = 0;
var slideShowPlaying = true;
var $galleryContainer;

var startingGalleryIndex = imageList.length - 1; // Set Initial Gallery
var currentGalleryIndex = startingGalleryIndex;

function generateCameraRoll() {
  $galleryRoll = $('.gallery-roll');
  for (i in imageList) {
    albumTitle = imageList[i][0];
    coverImageFile = imageList[i][1];
    $listItem = $('<li data-galleryid="' + i + '" data-title="' + albumTitle + '"></li>');
    $coverImage = $('<div class="collection-photo" style="background-image: url(' + addRoot(coverImageFile) + ');"></div>');
    $collectionSize = $('<div class="collection-size">' + (imageList[i].length-1) + ' photos</div>');
    $listItem.append($coverImage)
      .append(albumTitle)
      .append($collectionSize);
    $galleryRoll.prepend($listItem);
  }
}

function generateGallerySet(galleryIndex) {
  var currentFileListSmall = [];
  var currentFileListLarge = [];
  var currentFileListTitle = '';
  var currentFileList = imageList[galleryIndex];
  currentGalleryIndex = galleryIndex;

  for (i in currentFileList) {
    if (i == 0) {
      // title of album
      currentFileListTitle = currentFileList[i]
    } else {
      // For a short while, I was very curious as to how the lists of medium/large images were generated
      // After some fine code digging, found this gem from the old slideshow code
      // Now, this may not be the most reliable or most robust way to do it
      // But it's legacy. And legacy code sure is exciting.
      // The end.
      var smallImgFileName = currentFileList[i];
      var indexOfS = smallImgFileName.indexOf('s');
      var largeImgFileName1 = smallImgFileName.substring(0, indexOfS);
      var largeImgFileName2 = smallImgFileName.substring(indexOfS + 1, smallImgFileName.length);
      var largeImgFileName = largeImgFileName1 + 'm' + largeImgFileName2;
      currentFileListSmall.push(smallImgFileName);
      currentFileListLarge.push(largeImgFileName);
    }
  }

  return {small: currentFileListSmall, large: currentFileListLarge, albumName: currentFileListTitle};
}

function getGalleryWidth() {
  return parseInt($galleryContainer.css('width'))
}

function downloadImage(img, filename) {
  var a = $("<a>")
    .attr("href", img)
    .attr("download", filename)
    .appendTo("body");
  a[0].click();
  a.remove();
}

function addGalleryListeners() {
  $('.gallery-box').on('click', '.scroll-left', function() {
    shiftGallery('right', 'easeOutQuad');
    switchSlideShowStatus(false);
  })
  $('.gallery-box').on('click', '.scroll-right', function() {
    shiftGallery('left', 'easeOutQuad');
    switchSlideShowStatus(false);
  })
  $('.gallery-box').on('click', '.playpause-btn', function() {
    switchSlideShowStatus();
    return false;
  })
  $('.gallery-box').on('click', '.img-download', function() {
      downloadImage(
        addRoot($(this).parent().find('img').data('large-image')), 
        $(this).parent().find('img').data('large-image'))
  })
  $('.gallery-box').on('click', 'img', function() {
    openImagePopover($(this).data('large-image'));
  })
  $('.gallery-box').on('click', '.caption', function() {
    $('.gallery-collections').slideToggle();
    return false;
  })
  $(document).on('click', '.cover', function() {
    $('.cover').fadeOut();
  })
  $('.cover').on('click', 'img', function() {
    return false;
  })
  $('.cover').on('click', '.download-btn', function() {
    downloadImage($(this).parent().find('img').attr('src'), 
      $(this).parent().find('img').attr('src'))
    return false;
  })
  $('.gallery-collections').on('click', 'li', function() {
    loadNewGallerySet($(this).data('galleryid'))
    $('.gallery-collections').slideUp();
  })
  $(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
          shiftGallery('right', 'easeOutQuad');
          switchSlideShowStatus(false);
        break;

        case 38: // up
        break;

        case 39: // right
          shiftGallery('left', 'easeOutQuad');
          switchSlideShowStatus(false);
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
}

function addRoot(img) {
  return rootURL + img;
}

function openImagePopover(img) {
  $coverImage = $('<img height="90%" src="' + addRoot(img) + '">');
  $('.cover').find('.img-box').html($coverImage);
  $('.cover').fadeIn();
}

// returns true if CGI was valid. changes CGI to be valid if not, and returns false
function checkValidGalleryIndex() {
  temp = currentGalleryIndex
  currentGalleryIndex = Math.min(Math.max(currentGalleryIndex, 0), startingGalleryIndex)
  return temp == currentGalleryIndex
}

function shiftGallery(direction, ease) {
  var ease = ease || 'easeInOutQuad'
  var dir = direction || 'left';
  shiftDistance = parseInt($galleryContainer.css('width')) * 0.9
  $galleryContainer.stop();

  if (currentGalleryWidth == 0) {
    computeGalleryFullWidth();
  }

  if (dir == 'left') {

    if (parseInt($galleryContainer.css('left')) - shiftDistance > getGalleryWidth()-currentGalleryWidth) {
      $galleryContainer.animate({'left': '-=' + shiftDistance}, 1200, ease);
    } else if (parseInt($galleryContainer.css('left')) - shiftDistance > (-currentGalleryWidth)) {
      // This bit of logic below doesn't make sense to me. but it works. let's not question it.
      $galleryContainer.animate(
        {
          'left': -currentGalleryWidth+getGalleryWidth()-10*(currentGalleryLength+3)
        }, 1200, ease);
    } else {
      currentGalleryIndex -= 1;
      if (checkValidGalleryIndex()) {
        loadNewGallerySet(currentGalleryIndex);
      }
      // Load Next Set
    }
  } else {
    if (parseInt($galleryContainer.css('left')) < -shiftDistance) {
      $galleryContainer.animate({'left': '+=' + shiftDistance}, 1200, ease);
    } else if (parseInt($galleryContainer.css('left')) < 0) {
      $galleryContainer.animate(
        {
          'left': 0
        }, 1200, ease);
    } else {
      currentGalleryIndex += 1;
      if (checkValidGalleryIndex()) {
        loadNewGallerySet(currentGalleryIndex);
      }
      // Load Previous Set
    }
  }
}

function switchSlideShowStatus(hardSet) {
  if (hardSet == undefined) {
    newStatus = !slideShowPlaying;
  } else {
    newStatus = hardSet;
  }
  slideShowPlaying = newStatus;
  
  if (newStatus) {
    // Slideshow Playing
    $('.playpause-btn').css('background-position', '0 0');
    animateGalleryContainer();
    timer = setInterval(animateGalleryContainer, 5000);
  } else {
    // Slideshow Stopped
    $('.playpause-btn').css('background-position', '-13px 0');
    clearInterval(timer)
  }
  
}

function animateGalleryContainer() {
  if (currentGalleryWidth == 0) {
    computeGalleryFullWidth();
  }
  shiftGallery('left');
}

function computeGalleryFullWidth() {
  currentGalleryWidth = 0;
  $galleryContainer.children('div').each(function() {
    currentGalleryWidth += parseInt($(this).css('width'))
  })
}

function loadNewGallerySet(root) {
  currentGalleryWidth = 0;
  $galleryContainer = $('.photo-gallery');
  $galleryContainer.children('div').each(function() {
    $(this).fadeOut(400, function() {
      $(this).remove();
    });
  });

  var gallerySet = generateGallerySet(root);
  currentGalleryLength = gallerySet.small.length
  var galleryWidth = $galleryContainer.css('width');

  $galleryContainer.css('left', 0);
  $('.caption-text').text(gallerySet.albumName)
  // Load Gallery Set
  for (i in gallerySet.small) {
    $img = $('<div class="img-container" style="display: none"> \
                <img data-large-image="'+gallerySet.large[i]+'" src="' + addRoot(gallerySet.small[i]) + '"></img> \
                <div class="img-download"></div> \
              </div>');
    $img.find('img').attr('height', 180);
    $galleryContainer.append($img);
  }

  $galleryContainer.children('div').each(function() {
    $(this).hide().delay(300).fadeIn(300);
  })
}

function initGallery() {
  loadNewGallerySet(startingGalleryIndex);
  generateCameraRoll();
  addGalleryListeners();
  timer = setInterval(animateGalleryContainer, 5000); // This is the intermittent slideshow scrolling
}