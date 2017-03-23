function renderProfile(user) {
  $('.username').text(user.username);
  $('.users-name').text(user.name);
  $('.joined-date').text('Member Since: ' + user.joinedDate);
  $('.upload-count').text('Uploads: ' + user.uploads);
  $('.user-level').text('User Level: ' + user.userLevel);
}

$(function() {
  $.ajax({
    type: 'GET',
    url: '/dashboard',
    dataType: 'json',
    'headers': {
      'content-type': "application/json",
      'Authorization': localStorage.getItem('authToken')
    }
  })
  .done(function(data) {
    var currentUser = data.user;
    renderProfile(currentUser);
    $('.loader-wrapper').hide();
  })
  .fail(function(err) {
    window.location.href = '/login';
  });
});
