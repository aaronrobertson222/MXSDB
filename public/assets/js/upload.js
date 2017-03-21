function toggleSections() {
  $('.section-header').click(function(event) {
      console.log('clicked');
      if ($(this).next('.upload-form').is(':visible')) {
        $(this).next('.upload-form').slideUp();
      } else {
      $('.upload-form').slideUp();
      $(this).next('.upload-form').slideDown();
    }
  });


}


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
    var currentUser = data.user
    $('.loader-wrapper').hide();
  })
  .fail(function(err) {
    window.location.href = '/login';
  });

  toggleSections();

  $('.upload-form').hide();
});
