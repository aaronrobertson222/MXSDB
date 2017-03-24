
var itemTemplate =
'<div class="item-wrapper">' +
    '<div class="item">' +
        '<img class="item-img">' +
        '<div class="item-info">' +
            '<h2 class="item-title"></h2>' +
            '<p class="item-creator"></p>' +
            '<p class="item-description"></p>' +
        '</div>' +
    '</div>' +
'</div>';

function renderCards(data) {
  console.log(data);
  var elements = data.forEach(function(item) {
    var elementTemplate = $(itemTemplate);
    elementTemplate.find('.item-img').attr('src', item.imgLocation);
    elementTemplate.find('.item-img').attr('alt', item.name);
    elementTemplate.find('.item-title').text(item.name);
    elementTemplate.find('.item-creator').text(item.creator);
    elementTemplate.find('item-description').text(item.description);
    $('.results').append(elementTemplate);
  });
  //$('.results').append(elements);
}

$(function() {
  $.ajax({
    type: 'GET',
    url: '/uploads/recent',
    dataType: 'json',
  })
  .done(function(data){
    renderCards(data);
  })
  .fail(function(err) {
    console.log(err);
  });
});
