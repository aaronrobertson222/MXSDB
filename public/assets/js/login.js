const state = {};

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
      console.log(data);
      localStorage.setItem('authToken', data.token);
      state.user = data.user;
      window.location.href = 'dashboard.html';
    })
    .fail(function(err) {
      console.log('failed login' + err);
    });
}
