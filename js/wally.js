/**
 * @wally.js 
 * 2.009 Wally Generator
 *
 * For now, this is normal excitement
 * When there is more time, wally.js will be upgraded to..
 * Extra excitement!
 *
 * Released under the MIT License
 * Copyright (C) 2015 2.009
 */

const wallyParty = ['genie.png', 'magician.png', 'merlin.png', 'wonka.png'];
const wallyRoot = 'css/wally/wally_';

// Given an image tag, put wally in it.
function wheresWally($object) {
  var url = wallyRoot + wallyParty[Math.floor(Math.random()*wallyParty.length)];
  $object.attr('src', url);
}


function initWally() {
  wheresWally($('.wally').find('img'));
  wheresWally($('.front-page-wally').find('img'));
}