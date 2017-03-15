// UTILITY FUNCTIONS //

// handles post request to server for new user creation
function newUserRegistration(username, password, firstName, lastName) {
  $.ajax({
    type: 'POST',
    'processData': false,
    'data': `{\"username\": \"${username}\",\n\t\"password\": \"${password}\",\n\t\"firstName\": \"${firstName}\",\n\t\"lastName\":\"${lastName}\"\n\t}`,
    url: '/users',
    'headers': {
      "content-type": "application/json",
      "cache-control": "no-cache"
    },

  })
  .done(function(msg) {
    console.log(`SUCCESS! user ${msg.username} created!`);
  })
  .fail(function(err) {
    let errorMessage = JSON.parse(err.responseText);
    console.log()
});
}

// DOM MANIPULATION //
// renders modal with contents according to which option was clicked
function renderModal(option) {
  var className = '.' + option;
  $(className).css('display', 'block');
  $('.modal-container').css('display', 'block');
}

// Event HANDLERS //

// watches for log-in or sign-up to be clicked and then renders modal accordingly
function watchLoginOrSubmitClick() {
  $('.login-option').click(function(event) {
    var option = $(event.target).text();
    renderModal(option);
  });
}

// watches for close modal to be clicked and hides modal and contents
function watchCloseModal() {
  $('.close-modal').click(function() {
    $('.modal-container').css('display', 'none');
    $('.Log-In').css('display', 'none');
    $('.Sign-Up').css('display', 'none');
  });
}

// watches for login form submit
function watchForLoginSubmit() {
  $('.Log-In').submit(function() {
    var username = $('#username').val();
    var password = $('#password').val();
  });
}


// watches for sign up form submit
function watchForSignUpSubmit() {
  $('.Sign-Up').submit(function(event) {
    event.preventDefault();
    var username = $('#new-username').val();
    var password = $('#new-password').val();
    var firstName = $('#new-firstName').val();
    var lastName = $('#new-lastName').val();

    newUserRegistration(username, password, firstName, lastName);

  });
}

// READY FUNCTION //
$(function() {
watchLoginOrSubmitClick();
watchCloseModal();
watchForLoginSubmit();
watchForSignUpSubmit();
});
