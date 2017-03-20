const state = {};

// UTILITY FUNCTIONS //


// DOM MANIPULATION //
function renderLoginOptions() {
  $('.login').css('display', 'inline-block');
  $('.user-info').css('display', 'none');
}

function renderUserInfo(user) {
  $('.login').css('display', 'none');
  $('.user-options').css('display', 'inline-block');
  $('#user-name').text(user.username);
}

// Event HANDLERS //
function watchForLogout() {
  $('.log-out').click(function(event) {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  });
}



// READY FUNCTION //
$(function() {

$.ajax({
  type: 'GET',
  url: '/users/me',
  dataType: 'json',
  'headers': {
    'content-type': "application/json",
    'Authorization': localStorage.getItem('authToken')
  },
  'data': '{}'
})
.done(function(data) {
  state.user = data.user;
  renderUserInfo(data.user);
})
.fail(function(err) {
  renderLoginOptions();
});

watchForLogout();

});
