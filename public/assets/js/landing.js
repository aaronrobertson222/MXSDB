$(function() {
  $('.menubar').css('background', 'transparent');
  $(document).scroll(function() {
    $('.menubar').css('transition', 'background .5s');
    var pos = $(this).scrollTop();
    if (pos === 0) {
      $('.menubar').css('background', 'transparent');
    } else {
      $('.menubar').css('background', '#333333');
    }
    if (pos < 1) {
      $('#see-more').fadeIn();
    } else {
      $('#see-more').fadeOut();
    }
  })
});
