var page = 0;
var filter = $('.filter-select').val();

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
            '<p class="item-creator">By </p>' +
            '<p class="item-downloads"></p>' +
            '<p class="item-description"></p>' +
        '</div>' +
      '</div>' +
    '</a>' +
'</div>';

//DOM RENDERERS//
function renderCards(items) {
  var elements = items.map(function(item) {
    var elementTemplate = $(itemTemplate);
    elementTemplate.find('.item-url').attr('href', '/uploads/id/' + item.id);
    elementTemplate.find('.item-img').attr('src', item.imgLocation);
    elementTemplate.find('.item-img').attr('alt', item.name);
    elementTemplate.find('.item-title').text(item.name);
    elementTemplate.find('.item-creator').append('<p class="item-creator-name">' + item.creator + '</p>');
    elementTemplate.find('.item-downloads').text(item.downloadCount + ' Downloads');
    elementTemplate.find('.item-description').html(capitalizeFirstLetter(item.itemType) + ' - ' + capitalizeFirstLetter(item.category));
    return elementTemplate;
  });
  $('.results').html('');
  $('.results').append(elements);
}

function renderNavButtons(page, pages) {
  $('.nextPageBtn').hide();
  $('.prevPageBtn').hide();
  if (page < pages) {
    $('.nextPageBtn').css('display', 'inline-block');
    if (page > 1) {
      $('.prevPageBtn').css('display', 'inline-block');
    }
  }
  if (page === pages) {
    $('.nextPageBtn').hide();
    if (page > 1) {
      $('.prevPageBtn').css('display', 'inline-block');
    }
  }
}

//REQUESTS
function getUploads(filter) {
  $.ajax({
    type: 'POST',
    url: '/uploads/' + filter,
    dataType: 'json',
    data: {currentPage: page}
  })
  .done(function(data){
    page = data.page;
    renderCards(data.items);
    renderNavButtons(parseInt(data.page), parseInt(data.pages));
  })
  .fail(function(err) {
    window.location.href = "/error.html";
  });
}

//Event Handlers
function filterUpdate() {
  $('.filter-select').on('change', function() {
    $('.results').html('');
    page = 0;
    filter = $(this).val();
    getUploads($(this).val());
  });
}

function nextPage() {
  $('.nextPageBtn').click(function(event) {
      getUploads(filter);
  });
}

function prevPage() {
    $('.prevPageBtn').click(function(event) {
      page = page - 2;
      getUploads(filter);
    });
  }

$(function() {
  getUploads($('.filter-select').val());

  //initialzing event Handlers
  filterUpdate();
  nextPage();
  prevPage();
});
