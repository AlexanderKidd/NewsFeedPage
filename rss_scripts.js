var rssArray = [];

async function getTech() {
  $('#rss').empty();
  $.get("https://www.technologyreview.com/topnews.rss", function (data) {
    $(data).find("item").each(function() {
      var el = $(this);
      var dateText = el.find("pubDate").text();
      var item={
        title: $(this).find("title").text(),
        link: $(this).find("link").text(),
        dateText: dateText,
        date: new Date(dateText)
      }
      rssArray.push(item);
      $('#rss').append("<div class=\"rss-item\"><br><b><a href=\"" + el.find("link").text() + 
        "\">" + el.find("title").text() + "</a></b>" + "<br><div class=\"pubDate\">" + el.find("pubDate").text() + "</div><br></div><br>");
    });
  }); 
}

async function getUS() {
  $('#rss').empty();
  $.get("https://www.usa.gov/rss/updates.xml", function (data) {
    $(data).find("item").each(function() {
      var el = $(this);
      var dateText = el.find("pubDate").text();
      var item={
        title: $(this).find("title").text(),
        link: $(this).find("link").text(),
        dateText: dateText,
        date: new Date(dateText)
      }
      rssArray.push(item);
      $('#rss').append("<div class=\"rss-item\"><br><b><a href=" + el.find("link").text() + 
        ">" + el.find("title").text() + "</a></b>" + "<br><div class=\"pubDate\">" + el.find("pubDate").text() + "</div><br></div><br>");
    });
  });
}

async function getWorld() {
  $('#rss').empty();
  $.get("https://www.geo.tv/rss/1/2", function (data) {
    $(data).find("item").each(function () {
      var el = $(this);
      var dateText = el.find("pubDate").text();
      var item={
        title: $(this).find("title").text(),
        link: $(this).find("link").text(),
        dateText: dateText,
        date: new Date(dateText)
      }
      rssArray.push(item);
      $('#rss').append("<div class=\"rss-item\"><br><b><a href=" + el.find("link").text().replace("<![CDATA[","").replace("]]>", "") + 
        ">" + el.find("title").text() + "</a></b>" + "<br><div class=\"pubDate\">" + el.find("pubDate").text() + "</div><br></div><br>");
    });
  });
}

async function getWeather() {
  $('#rss').empty();
    $.get("http://w1.weather.gov/xml/current_obs/KROC.rss", function (data) {
    $(data).find("item").each(function() {
      var el = $(this);
      var dateText = el.find("description").text();
      var item={
        title: $(this).find("title").text(),
        link: $(this).find("link").text(),
        dateText: dateText,
        date: new Date(dateText.substring(dateText.indexOf("Last Updated on "), dateText.length - 10).replace("Last Updated on ", "").replace(",", ""))
      }
      rssArray.push(item);
      $('#rss').append("<div class=\"rss-item\"><br><b><a href=" + el.find("link").text().replace("<![CDATA[","").replace("]]>", "") + 
        ">" + el.find("title").text() + "</a></b>" + "<br>" + el.find("description").text().replace("<![CDATA[","").replace("]]>", "") + "<br></div><br>");
    });
  });
}

async function getSports() {
  $('#rss').empty();
    $.get("http://www.espn.com/espn/rss/news", function (data) {
    $(data).find("item").each(function() {
      var el = $(this);
      var dateText = el.find("pubDate").text();
      var item={
        title: $(this).find("title").text(),
        link: $(this).find("link").text(),
        dateText: dateText,
        date: new Date(dateText)
      }
      rssArray.push(item);
      $('#rss').append("<div class=\"rss-item\"><br><b><a href=" + el.find("link").text().replace("<![CDATA[","").replace("]]>", "") + 
        ">" + el.find("title").text() + "</a></b>" + "<br><div class=\"pubDate\">" + el.find("pubDate").text() + "</div><br></div><br>");
    });
  });
}

// Sorting. "callback"
function cb() {
  // Sort data
  rssArray.sort(function(a,b) {
    if(a.date.getTime() === undefined || b.date.getTime() === undefined) return 1;
    return a.date.getTime() < b.date.getTime() ? 1 : a.date.getTime() > b.date.getTime() ? -1 : 0; 
  });

  // Empty again
  $('#rss').find('br').remove();
  $('.rss-item').remove();

  // Re-enter sorted
  $.each(rssArray, function(index, item) {
    $('#rss').append("<div class=\"rss-item\"><br><b><a href=\"" + item.link + 
        "\">" + item.title + "</a></b>" + "<br><div id=\"pubDate\">" + item.dateText + "</div><br></div><br>");
  });
  $("body").css("cursor", "default");
};

function getAll() {
  this.rssArray.splice(0);
  $('.rss-item').remove();
  $("body").css("cursor", "progress");
  getWeather();
  getSports();
  getUS();
  getWorld();
  getTech();
  setTimeout(function() {
    cb();
  }, 2000);
}

function lastVisit() {
  if(localStorage.getItem("YeLastVisit")) {
    $('#lastVisit').text("Thou was last reckoned on: " + localStorage.getItem("YeLastVisit"));
  }
  localStorage.setItem("YeLastVisit", "" + new Date().toString());
}

function loginUser() {
  var userName = $('#username').val();
  var passWord = $('#password').val();
  if(localStorage.getItem(userName)) {
     if(localStorage.getItem(userName) == passWord) {
       $('#form').text("Welcome back old friend, " + userName + ".");
     }
     else {
       $('#form-error').text("Error: Thou shalt not pass!");
     }
  }
  else {
    $('#form').text("Welcome new user, " + userName + ".");
    localStorage.setItem(userName, passWord);
  }
}
