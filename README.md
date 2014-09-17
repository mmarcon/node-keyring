# node-keyring

Never push your passwords and API keys to version control again!

With node-keyring you can store credentials on your local machine or server (optionally encrypted with password) and retrieve them from your application when needed. This means you can freely push your code to version control, even to public repositories without having to worry about exposing your passwords, api keys and other secret strings.

## Example

```javascript
var keyring = require('../keyring');

var foursquareURL = '';
foursquareURL += 'https://api.foursquare.com/v2/venues/search?';
foursquareURL += 'radius={RADIUS}&ll={LOCATION}&limit={LIMIT}&v=20120927';
foursquareURL += '&client_id={ID}&client_secret={SECRET}';

var keyringApi = keyring.instance().load();

//Before running the example, from the command line do the following:
//  keyring store -k foursquare.myapp.clientId -v SOME_CLIENT_ID
//  keyring store -k foursquare.myapp.clientSecret -v SOME_CLIENT_SECRET

foursquareURL = foursquareURL.replace('{RADIUS}', 1500)
                             .replace('{LOCATION}', '52.5,13.3')
                             .replace('{LIMIT}', 50)
                             .replace('{ID}', keyringApi.retrieve('foursquare.myapp.clientId'))
                             .replace('{SECRET}', keyringApi.retrieve('foursquare.myapp.clientSecret'));

console.log(foursquareURL);
```