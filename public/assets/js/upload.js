
function upload() {

}

//Event Handlers
function toggleSections() {
  $('.selection-header').click(function(event) {
      if ($(this).next('.upload-form-wrapper').is(':visible')) {
        $(this).children('.toggle-indicator').html('&#9660;');
        $(this).next('.upload-form-wrapper').slideUp();
        $(this)
      } else {
      $('.upload-form-wrapper').slideUp();
      $(this).children('.toggle-indicator').html('&#9650;');
      $(this).next('.upload-form-wrapper').slideDown();
    }
  });
}

function formSubmit() {
  $('.upload-form').submit(function(event) {
    console.log('clicked');
  });
}

$(function() {
// request checks that user is logged in
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
    var currentUser = data.user
    $('.loader-wrapper').hide();
  })
  .fail(function(err) {
    window.location.href = '/login';
  });

  toggleSections();
  formSubmit();
  $('.upload-form-wrapper').hide();
});
