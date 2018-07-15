const channelId = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
  "noobs2ninjas", "runitup", "riotgames", "Naysayer88", "sheviiioficial", "JeffGrossPoker", "PokerStars"
];
let len = channelId.length;
let text = "";
let text2 = "";

function jsonp(url, callback) {
  let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
    delete window[callbackName];
    document.getElementsByTagName('head')[0].appendChild(script);
    callback(data);
  };
  let script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.getElementsByTagName('head')[0].appendChild(script);
}

for (i = 0; i < len; i++) {
  jsonp('https://wind-bow.gomix.me/twitch-api/streams/' + channelId[i], function(data) {
    if (data.stream === null) {
      let twitchName = data._links.channel.replace(/https:\/\/api.twitch.tv\/kraken\/channels\//, "");
      jsonp(`https://wind-bow.gomix.me/twitch-api/channels/${twitchName}`, function(data) {
        text2 += `<li class=\"list-item\"><a target=\"_blank\" href=\"${data.url}\">
        <img src=\"${data.logo}\">${data.name}</a><span>Off-line</span></li>`;
        document.getElementById('offline').innerHTML = text2;
      });
    } else {
      text += `<li class=\"list-item\"><a target=\"_blank\" href=\"${data.stream.channel.url}"\"><img src=\"${data.stream.channel.logo}\"> ${data.stream.channel.name}</a><span>${data.stream.channel.status}</span></li>`;
    }
    document.getElementById('online').innerHTML = text;
  });
};

function searchList() {
  let inputVal = document.getElementById('input').value.toLowerCase();
  let ulOnline = document.getElementById('online');
  let ulOffline = document.getElementById('offline');
  let listItemOnline = ulOnline.querySelectorAll("li.list-item");
  let listItemOffline = ulOffline.querySelectorAll("li.list-item");
  let len = listItemOnline.length;
  let ben = listItemOffline.length;
  for (let i = 0; i < len; i++) {
    let a = listItemOnline[i].getElementsByTagName('a')[0];
    if (a.innerHTML.toLowerCase().indexOf(inputVal) > -1) {
      listItemOnline[i].style.display = "";
    } else {
      listItemOnline[i].style.display = "none";
    }
  }
  for (let i = 0; i < ben; i++) {
    let b = listItemOffline[i].getElementsByTagName('a')[0];
    if (b.innerHTML.toLowerCase().indexOf(inputVal) > -1) {
      listItemOffline[i].style.display = "";
    } else {
      listItemOffline[i].style.display = "none";
    }
  }
}

function displayBoth() {
  document.getElementById('offline').style.display = "block";
  document.getElementById('online').style.display = "block";
}

function displayOnline() {
  document.getElementById('offline').style.display = "none";
  document.getElementById('online').style.display = "block";
}

function displayOffline() {
  document.getElementById('offline').style.display = "block";
  document.getElementById('online').style.display = "none";
}
