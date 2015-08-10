var socket = io();


var connectionCount = document.getElementById('connection-count');

socket.on('userConnection', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
    addUserVoteToUserPage(this.innerText);
  });
}

socket.on('voteCount', function (votes) {
  console.log(votes);
});

var addVotesToPage = function (votes) {
  var pageView = document.getElementById('vote-count');
  votes = JSON.stringify(votes); // [object Object]
  pageView.innerText = "User votes " + votes;
};

var addUserVoteToUserPage = function (userVote) {
  var userTallyView = document.getElementById('user-vote');
  userVote = JSON.stringify(userVote);
  userTallyView.innerText = 'My vote was: ' + userVote;
}

socket.on('tally', addVotesToPage);

//Emit a event to the user's individual socket that lets them know when their vote has been cast (and what vote they cast).

// Update the DOM to show the user what vote they have currently cast (based on the previous step).