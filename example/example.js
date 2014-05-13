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