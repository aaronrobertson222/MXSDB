function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

var itemTemplate =
'<div class="item-wrapper">' +
  '<a class="item-url">' +
      '<div class="item">' +
      '<div class="item-img-wrapper">' +
        '<img class="item-img">' +
        '</div>' +
        '<div class="item-info">' +
            '<h2 class="item-title"></h2>' +
            '<p class="item-creator"></p>' +
            '<p class="item-downloads"></p>' +
            '<p class="item-description"></p>' +
        '</div>' +
      '</div>' +
    '</a>' +
'</div>';

function renderProfile(user) {
  $('.username').text(user.username);
  $('.users-name').text(user.name);
  $('.joined-date').text('Member Since: ' + user.joinedDate);
  $('.upload-count').text('Uploads: ' + user.uploads);
  $('.user-level').text('User Level: ' + user.userLevel);
}

function renderCards(data) {
  console.log(data);
  var elements = data.map(function(item) {
    var elementTemplate = $(itemTemplate);
    elementTemplate.find('.item-url').attr('href', '/uploads/id/' + item.id);
    elementTemplate.find('.item-img').attr('src', item.imgLocation);
    elementTemplate.find('.item-img').attr('alt', item.name);
    elementTemplate.find('.item-title').text(item.name);
    elementTemplate.find('.item-creator').html('By <a href="#">' + item.creator + '</a>');
    elementTemplate.find('.item-downloads').text(item.downloadCount + ' Downloads');
    elementTemplate.find('.item-description').html('Type - ' + capitalizeFirstLetter(item.itemType) + ' ' + capitalizeFirstLetter(item.category));
    return elementTemplate;
  });
  $('.results').html('');
  $('.results').append(elements);
}

function getUsersUploads(user) {
  $.ajax({
    type: 'GET',
    url: '/uploads/by/user/' + user.username,
    dataType: 'json',
  }).
  done(function(data) {
    renderCards(data);
  })
  .fail(function(err) {
    console.log(err);
  });
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
    getUsersUploads(currentUser);
    $('.loader-wrapper').hide();
  })
  .fail(function(err) {
    window.location.href = '/login';
  });
});
