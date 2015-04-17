/*
  aad-login.js
  Requests a token from Azure AD using username/password

  Available under the Apache 2.0 License
*/

// Configuration parameters
var directory = '';
var clientid  = '';

if (!directory || !clientid) {
  console.log('You need to provide your directory and client ID');
  process.exit(1);
}

var username = process.argv[2];
var password = process.argv[3];

if (username && password) {
  request = {
    tenant : directory,
    authorityHostUrl : 'https://login.windows.net',
    clientId : clientid,
    username : username + '@' + directory,
    password : password
  };

  var adal = require('adal-node');
  var AuthenticationContext = adal.AuthenticationContext;
  var authorityUrl = request.authorityHostUrl + '/' + request.tenant;
  var resource = '00000002-0000-0000-c000-000000000000';
  var context = new AuthenticationContext(authorityUrl);

  context.acquireTokenWithUsernamePassword(resource, request.username, request.password, request.clientId, function(err, tokenResponse) {
    console.log(tokenResponse);
    if (err) { // auth failed, not sure of err value so forcing 1/0 here
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
} else {
  console.log('No username/password provided');
  process.exit(1);
}
