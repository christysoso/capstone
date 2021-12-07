# NeighborBooks

NeighborBooks allows users to geolocate and view book availability at free take a book leave book neighborhood libraries within Vancouver to promote book sharing and community. Users can click into a bookshelf on the map to view book availability, take a book as well as had a book or increased visibility/accessibility 


##Required API

Please register your own google maps api key using the google maps javascript api key
https://developers.google.com/maps/documentation/javascript/overview

##Installation

Please run NPM install in both client and server folders

##Knex/MySQL
This project currently uses mock data from a MySql database. Please run the following in order to use see this data

cd
client

npx knex:migrate latest
npx knex seed:run




