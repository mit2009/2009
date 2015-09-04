/**
 * @menu.js 
 * 2.009 Navigation Menu 
 *
 * Top navigation menu for the 2.009 Website, 2015 edition.
 * Some parts taken from the previous website
 *
 * Released under the MIT License
 * Copyright (C) 2015 2.009
 */

// MENU NAMES AND LINKS
const main_menus = ["Information","Schedule","Teams","Team Manual","Project Info","Resources","Gallery"]
const sub_menus = [
// format: menu_file_name, url, index to base_urls (0-normal,1-protected,2-no base)
["Description","courseinfo/CourseDescription.html",0,
 "Organization","courseinfo/instructionComponents.html",0,
 "Topics","courseinfo/courseTopics.html",0,
 "Grading","grading/Grading.html",0,
 "Staff","courseinfo/People.html",0,
 "Mentors","courseinfo/teamMentors.html",0,
 "Sponsors","courseinfo/courseSponsors.html",0,
 "Mailing lists","courseinfo/MailingLists.html",0,
 "Site map","siteMap.html",0,
],
["Key dates","schedule/keyDates.html",0,
 "Syllabus","schedule/ScheduleChart.html#current",0,
 "Deliverables","assignments/Assignments.html",0,
 "Lecture notes","schedule/LectureList.html",0,
 "Lab notes","schedule/LabList.html",0,
 "Timesheets","assignments/DesignTimeSheet.html",0, 
 "Tutorials","resources/events.html",0,
],
["All","teams/indexTeams.html",1,
 "Red","teams/teamPages/RedTeam.html",1,
 "Green","teams/teamPages/GreenTeam.html",1,
 "Silver","teams/teamPages/SilverTeam.html",1,
 "Blue","teams/teamPages/BlueTeam.html",1,
 "Yellow","teams/teamPages/YellowTeam.html",1,
 "Pink","teams/teamPages/PinkTeam.html",1,
 "Orange","teams/teamPages/OrangeTeam.html",1,
 "Purple","teams/teamPages/PurpleTeam.html",1,
 "labCAMs","teams/PappalardoCam.htm",1,
 "PM sites","wiki/index.html",0,
 "Dropbox","wiki/dropbox.html",0,
],
["Team roles","teammanual/TeamRoles.html",0,
 "Task forces","teammanual/definingTaskForces.html",0,
 "Ethics codes","teammanual/ethics.html",0,   
 "Email","resources/mediaAndArticles/digitalCommunicationTips.html",0,
 "Workspace","teammanual/equipmentWorkspace.html",0,
 "Materials","teammanual/projectMaterials.html",0,
 "Pappa policy","teammanual/pappalardoSafety.html",0,
 "Purchasing","teammanual/purchases.html",0,
 "Meeting primer","resources/mediaAndArticles/3_MeetingPrimer.pdf",0,
 "Safety","teammanual/safety.html",0,
 "Shipping","teammanual/shippingAddress.html",0,
 "Tax forms","teammanual/taxForms.html",0,
],
["Theme","project/projectTheme.html",0,
 "Workflow","project/projectWorkflow.html",0,
 "Budget","project/projectBudget.html",0,
 "3-ideas presentation","assignments/IdeasPresentation.html",0,
 "Sketch model review","assignments/SketchModelReview.html",0,
 "Mockup review","assignments/MockUpReview.html",0,
 "Assembly review","assignments/AssemblyProductContract.html",0,
 "Technical review","assignments/TechnicalReview.html",0,
 "Final presentation","assignments/FinalPresentation.html",0,
],
[ "References","resources/references.html",0,
 "2.009 library page","http://libraries.mit.edu/2.009",2, 
 "Brainstorming 101","lectures/2_brainstormTutorial.pdf",0,
 "Computer pwd","lecturesProtected/2009ComputerArea.html",1,
 "Laser cutting","resources/laserTutorial/index.html",0,
 "Patent applications","resources/mediaAndArticles/provisionalPatents.html",0,
 "Plot & 3D print","lecturesProtected/plotterLaser3DInstructions.html",1,
 "Projector code","teammanual/manualSecure/projectors.html",1,
 "Scanning & phone","resources/phoneScanner.html",0,
 "Sketching ideas","resources/sketchingTutorials.html",0,
 "Solidworks","resources/mediaAndArticles/solidworks.html",0,
 "Vendors","resources/vendors.html",0,   
 "Vinyl cutting","resources/vinylTutorial/index.html",0, 
 "2.009 store","store/index.html",0,
],
["Fun!","experiments/experimentsIndex.html",0,   
 "2014","http://designed.mit.edu/gallery/list-2014.html", 2,
 "2013","http://designed.mit.edu/gallery/list-2013.html", 2,
 "2012","http://designed.mit.edu/gallery/list-2012.html", 2,
 "2011","http://designed.mit.edu/gallery/list-2011.html", 2,
 "2010","http://designed.mit.edu/gallery/list-2010.html", 2,
 "2009","http://designed.mit.edu/gallery/list-2009.html", 2,
 "2008","http://designed.mit.edu/gallery/list-2008.html", 2,
 "2007","http://designed.mit.edu/gallery/list-2007.html", 2,
 "2006","http://designed.mit.edu/gallery/list-2006.html", 2,
 "themes","interestMedia/themes/themeRevealsIndex.html", 0,
 "pumpkins","interestMedia/2009pumpkins/2009pumpkins.html",0,
]
]

// I really didn't want to do this. 
// Unfortunately, there's just so much menu, nothing ever fits!
// Custum Menu Widths it is!

const menuWidth = [100, 90, 70, 120, 145, 135, 80]
const colors = ['', 'tredA hredA', 'tgrnA hgrnA', 'tslvA hslvA', 'tbluA hbluA', 'tylwA hylwA', 'tpnkA hpnkA', 'torgA horgA', 'tpurA hpurA']

function checkSpecialFormatting($item, menu, submenu) {
  if (menu == 2) {
    $item.addClass(colors[submenu])
    $item.find('a').addClass(colors[submenu])
  }
  return $item;
}

function initMenu() {
  var base_urls;

  if (document.location.href.indexOf('localhost') > 1 && false) {
    console.log('running locally')
    base_urls = ["/", "/",""]; 
  } else {
    base_urls = ["2.009/www/", "https://web.mit.edu/2.009/www/",""]; 
  }

  // Generate Menus
  for (i in main_menus) {
    $menuItem = $('<li class="nav-item"></li>');
    $menuItem.css('width', menuWidth[i])
    $menuHeader = $('<div class="nav-header">' + main_menus[i] + '</div>');
    $menuItem.append($menuHeader)

    $menuSubList = $('<ul></ul>');
    for (j = 0; j < sub_menus[i].length/3; j ++) {
      menuLink = base_urls[sub_menus[i][j*3 + 2]] + sub_menus[i][j*3 + 1];
      $menuSubItem = $('<li><a href="' + menuLink + '">' + sub_menus[i][j*3] + '</a></li>');
      $menuSubItem = checkSpecialFormatting($menuSubItem, i, j);
      $menuSubList.append($menuSubItem);
    }

    $menuItem.append($menuSubList);
    $('.navbar').append($menuItem);

    $spacer = $('<li class="spacer-width"></li>');
    $spacer.css('width', menuWidth[i])
    $('.nav-position ul.spacer').append($spacer)
  }
}