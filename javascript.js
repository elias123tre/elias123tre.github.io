function addLink (objects) {
  $(objects).each(function () {
    $(this).html('<a>' + $(this).html() + '</a>')
  })
}

function autoId (objects) {
  $(objects).each(function () {
    $(this).attr(
      'id',
      $(this)
        .html()
        .toLowerCase()
        .replace(/ /g, '-')
        .trim()
    )
  })
}

addLink('.auto-id > li')
addLink('.sidenav > ul > li')
$('.sidenav > ul > li > a').addClass('unform-link')

autoId('.post-wrapper > .post > h1')

var articles = []

$('.post-wrapper > .post > h1').each(function () {
  var content = $(this).html()
  articles.push(content)
})

for (var index = 0; index < articles.length; index++) {
  $('.sidenav > ul > li > a')
    .eq(index)
    .append(articles[index])
}

$('.sidenav > ul > li > a').each(function () {
  $(this).attr(
    'href',
    '#' +
    $(this)
      .html()
      .replace(/<svg[\s\S]*<\/svg>/g, '')
      .toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .trim()
  )
})

$('.post-wrapper > .post > h1').each(function () {
  var id = $(this).attr('id')
  var content = $(this).html()
  $('.sidenav > ul > ' + id).append(content)
})

var pages = []
$('.auto-id > *').each(function () {
  var name = $(this)
    .children('a')
    .html()
    .toLowerCase()
    .replace(/ /g, '-')
    .trim()
  pages.push(name)
  $(this).attr('id', 'id-' + name)
  $(this)
    .children('a')
    .attr('href', '#' + name)
  $(this)
    .children('a')
    .addClass('menulink')
  $(this)
    .children()
    .addClass('unform-link')
})

$('.post-wrapper > .post')
  .first()
  .css('margin-top', 0)

function changePage (destination) {
  var tempPages = pages.slice(0)
  tempPages.splice(tempPages.indexOf(destination), 1)
  tempPages.forEach(function (value) {
    $('.' + value).css('right', '-100vw')
    setTimeout(function () {
      $('.' + value).hide()
      $('.' + destination).show()
      $('.' + destination).css('right', '0')
    }, 400)
  })
}

var currentHash = window.location.hash.replace('#', '')

function changeTitle () {
  currentHash = window.location.hash.replace('#', '')
  if (pages.includes(currentHash)) {
    document.title =
      'Elias - ' +
      $('#id-' + currentHash)
        .children()
        .html()
        .trim()

    if (currentHash === pages[0]) {
      // Actions for page 1: Skolarbeten
      changePage('skolarbeten')
    }
    if (currentHash === pages[1]) {
      // Actions for page 2: Skapelser
      changePage('skapelser')
    }
    if (currentHash === pages[2]) {
      // Actions for page 3: Om mig
      changePage('om-mig')
      setTimeout(function () {
        $('.m-image').css('height', $('.om-mig > section:first').height())
      }, 400)
    }
  } else {
    changePage('skolarbeten')
    window.location.hash = '#skolarbeten'
  }
}

$(window).one('load', function () {
  $('body').fadeIn(700, function () {
    //
  })
  $('.m-image').css('height', $('.om-mig > section:first').height())
  defArrows()
})

window.onhashchange = changeTitle
changeTitle()

var tempArticles = []
for (index = 0; index < articles.length; index++) {
  tempArticles.push(
    articles[index]
      .toLowerCase()
      .replace(/ /g, '-')
      .trim()
  )
}

var lastId = $('.sidenav > ul')
var menuItems = $('.sidenav > ul > li').find('a')
var scrollItems = []
$('.post > h1').each(function () {
  scrollItems.push('#' + $(this).attr('id'))
})

var id
var current
var fromTop = $(this).scrollTop()
function onScroll () {
  fromTop = $(this).scrollTop()

  current = scrollItems.map(function (value) {
    if ($(value).offset().top - 50 < fromTop) {
      return value
    }
  })
  current = current.filter(n => n)
  current = current[current.length - 1]

  id = current
  // var id = current && current.length ? current[0].id : ''
  // id = id.substring(1)
  if (lastId !== id) {
    lastId = id
    menuItems.removeClass('active')
    $('[href="' + lastId + '"]').addClass('active')
  }

  if (fromTop + window.innerHeight === $(document).height()) {
    menuItems.removeClass('active')
    $('[href="#' + tempArticles[tempArticles.length - 1] + '"]').addClass('active')
  } else {
    menuItems.removeClass('active')
    $('[href="' + lastId + '"]').addClass('active')
  }

  if (fromTop === 0) {
    $('.fab').fadeOut()
    menuItems.removeClass('active')
    $('[href="#' + tempArticles[0] + '"]').addClass('active')
  }
  if (fromTop !== 0) {
    $('.fab').fadeIn()
  }
}
$(window).scroll(onScroll)

onScroll()

var isChrome = navigator.userAgent.search('Chrome') > 0
var isFirefox = navigator.userAgent.search('Firefox') > 0

function defArrows () {
  window.skolarbeten =
    $('#id-om-mig').outerWidth(true) +
    $('#id-skapelser').outerWidth(true) +
    ($('#id-skolarbeten').outerWidth(true)) / 2
  window.skapelser =
    $('#id-om-mig').outerWidth(true) +
    ($('#id-skapelser').outerWidth(true)) / 2
  window.ommig = ($('#id-om-mig').outerWidth(true)) / 2
  if (isChrome) {
    // window.skolarbeten -= 16
    window.skapelser -= 16
    window.ommig -= 32
  }
  if (isFirefox) {
    window.skolarbeten -= 30
    window.skapelser -= 30
    window.ommig -= 30
  }

  $('#menu-styles').html(
    '.main-wrapper.skolarbeten::before {right: ' +
    window.skolarbeten +
    'px;}.main-wrapper.skapelser::before {right: ' +
    window.skapelser +
    'px;}.main-wrapper.om-mig::before {right: ' +
    window.ommig +
    'px;}'
  )
}

var ublChromeLink = 'https://chrome.google.com/webstore/detail/cjpalhdlnbpafiamejdnhcphjbkeiagm'
var ublFirefoxLink = 'https://addons.mozilla.org/firefox/downloads/file/1580486'

var tampChromeLink = 'https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo'
var tampFirefoxLink = 'https://addons.mozilla.org/firefox/downloads/file/1076900'

if (isChrome) {
  $('#downloadTampermonkey').attr('href', tampChromeLink)
  $('#downloadTampermonkey').attr('target', '_blank')

  $('#downloadUblock').attr('href', ublChromeLink)
  $('#downloadUblock').attr('target', '_blank')
}
if (isFirefox) {
  $('#downloadTampermonkey').attr('href', tampFirefoxLink)

  $('#downloadUblock').attr('href', ublFirefoxLink)
}

var links = {
  fitgirl: 'https://fitgirl-repacks.site/?s=',
  fmovies: 'https://fmovies.to/search?keyword=',
  yourmovie: 'https://www.yourmovie.org/?s=',
  pahe: 'https://pahe.in/?s=',
  _1337x: 'https://1337x.to/search/'
}

$('form').submit(function (e) {
  e.preventDefault()
  var id = $(this).children('label:first').children('span').html().toLowerCase()
  var value = $(this).children('label:first').children('input:first').val()
  if (id === '1337x') {
    id = '_1337x'
    value = value + '/1/'
  }
  var link = links[id]
  if (value) {
    window.open(link + value, '_blank')
  }
})

$('h1').each(
  function () {
    $(this).attr('id',
      $(this).html()
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
        .trim()
    )
  }
)

var installing = false

var addons = ['https://adsbypasser.github.io/releases/adsbypasser.full.es7.user.js',
  'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
  'https://raw.githubusercontent.com/HandyUserscripts/AntiAdware/master/AntiAdware.user.js',
  'https://greasyfork.org/scripts/9165-auto-close-youtube-ads/code/Auto%20Close%20YouTube%20Ads.user.js',
  'https://greasyfork.org/scripts/27481-automatic-clicker-for-recaptcha-of-url-shortener/code/Automatic%20Clicker%20for%20reCAPTCHA%20of%20URL%20Shortener.user.js',
  'https://greasyfork.org/scripts/31088-morecaptcha/code/MoreCAPTCHA.user.js']
var currentAddon = addons[1]

function handleVisibilityChange () {
  if (installing) {
    if (!document.hidden) {
      if (currentAddon === undefined) {
        console.log('Done installing addons')
        installing = false
        return
      }

      window.location.replace(currentAddon)
      currentAddon = addons[(addons.indexOf(currentAddon)) + 1]
    }
  }
}

function initInstall () {
  installing = true
  currentAddon = addons[1]
}

document.addEventListener('visibilitychange', handleVisibilityChange, false)

$('#downloadAddons > button').click(initInstall)
$('#downloadAddons').attr('href', addons[0])
