function registerUser(username, password, firstName, lastName) {
  $.ajax({
    'type': 'POST',
    'processData': false,
    'url': '/users',
    'data': `{\"username\": \"${username}\",\n\t\"password\": \"${password}\",\n\t\"firstName\": \"${firstName}\",\n\t\"lastName\":\"${lastName}\"\n\t}`,
    'headers': {
      'content-type': 'application/json',
      'cache-control': 'no-cache'
    }
  })
  .done(function(data) {
    logInUser(username, password);
  })
  .fail(function(msg) {
    var err = $.parseJSON(msg.responseText);
    renderErr(err.message);
  });
}

function logInUser(username, password) {
    $.ajax({
      type: 'POST',
      url: '/login',
      dataType: 'json',
      'headers': {
        "content-type": "application/json"
      },
      'data': `{\"username\": \"${username}\",\n\t\"password\": \"${password}\"\n}`,
    })
    .done(function(data) {
      if (localStorage.getItem('authToken')) {
        localStorage.clear();
      }
      localStorage.setItem('authToken', data.token);
      window.location.href = '/dashboard.html';
    })
    .fail(function(data) {
      var err = $.parseJSON(data.responseText);
      renderErr(err.message);
    });
}

function checkPassword(password, passwordVerify) {
  if (!(password === passwordVerify)) {
    return false;
  }
  return true;
}

//DOM Renderers
function renderErr(err) {
  $('#form-error').text(err);
  $('#form-error').css('display', 'block');
}

//Event Handlers
function signUpSubmit() {
  $('#signup-form').submit(function(event) {
    event.preventDefault();
    if (checkPassword($('#new-password').val(), $('#new-password-verify').val())) {
      var username = $('#new-username').val();
      var password = $('#new-password').val();
      var firstName = $('#new-firstName').val();
      var lastName = $('#new-lastName').val();
      registerUser(username, password, firstName, lastName);
    } else {
      return renderErr('Passwords do not match!');
    }
  });
}

function loginSubmit() {
  $('#login-form').submit(function(event) {
    //stores user inputs to be sent in ajax request.
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    logInUser(username, password);
  });
}

$(function() {

  //checks if user is logged in and redirects accordingly
  $.ajax({
    type: 'GET',
    url: '/users/me',
    dataType: 'json',
    'headers': {
      'content-type': "application/json",
      'Authorization': localStorage.getItem('authToken')
    },
    'data': '{}'
  })
  .done(function(data) {
    window.location.href = '/';
  })
  .fail(function(err) {
    $('.loader-wrapper').hide();
  });

  loginSubmit();
  signUpSubmit();
});
