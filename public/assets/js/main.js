// DOM MANIPULATION //
function renderLoginOptions() {
  $('.login').css('display', 'inline-block');
  $('.responsive-login').css('display', 'inline-block');
  $('.user-info').css('display', 'none');
}

function renderUserOptions(user) {
  $('.login').css('display', 'none');
  $('.responsive-login-option').hide();
  $('.user-options').css('display', 'inline-block');
  $('.responsive-user-option').css('display', 'block');
  $('.user-name').text(user.username);
}

// Event HANDLERS //
function watchForLogout() {
  $('.log-out').click(function(event) {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  });
}

function mobileMenuClick() {
  $('.menu-button').click(function(event) {
  if ($('.responsive-nav').is(':visible')) {
    $('.responsive-nav').slideUp();
  } else {
      $('.responsive-nav').slideDown();
    }
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
  }
})
.done(function(data) {
  renderUserOptions(data.user);
  $('.upload-btn').css('display', 'inline-block');
})
.fail(function(err) {
  localStorage.clear();
  renderLoginOptions();
});
//initializing event handlers//
watchForLogout();
mobileMenuClick();
});
