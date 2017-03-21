// UTILITY FUNCTIONS //


// DOM MANIPULATION //
function renderLoginOptions() {
  $('.login').css('display', 'inline-block');
  $('.user-info').css('display', 'none');
}

function renderUserOptions(user) {
  $('.login').css('display', 'none');
  $('.user-options').css('display', 'inline-block');
  $('.user-name').text(user.username);
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
  url: '/me',
  dataType: 'json',
  'headers': {
    'content-type': "application/json",
    'Authorization': localStorage.getItem('authToken')
  }
})
.done(function(data) {
  console.log(data);
  renderUserOptions(data.user);
})
.fail(function(err) {
  localStorage.clear();
  renderLoginOptions();
});

watchForLogout();
});
