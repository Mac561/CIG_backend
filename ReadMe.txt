If Docker works!! (Docker is up)

1. run docker on your computer
2. comment out line 15
3. uncomment out line 16
4. to run docker services : docker-compose up --build
5. to stop docker servces : docker-compose down
6. stop docker on your computer

If Docker does not work!!

1. uncomment line 15 from server.js
2. comment out line 16 from server.js
3. to run server w/ mongoDB : npm start
4. to stop server control(key) + z

comments:
RESTful Routes:
As of today, i added examples of how the RESTful routes should (maybe??) be created
please look at the comments, i just handled the CRUD operations for the user
if you have better ideas of how it should be ran the feel free to change anything i just did

mongoDB:
I am still getting the hang of mongoDB but i started messing with it. In the
models folder i added the schema for how a user would be handled, as of now
any other schemas should be handled similarly unless you know better ways to do so
for different schemas make new .js files and export/import them the way I did

route.rest file:
this is an alternative for Postman, you can use either this file or the app Postman
The way to use it is to seperate each endpoint test with the sign:# three exact times,
(###) and add new tests to whatever routes you want as like the examples i added


Errors:
if you get any errors please make sure the port is correct on all the files
you are calling the port in (8081 etc) like in the server.js or in the route.rest


Please look at the comments on the files as i have tried to explain them the
best way i could, good luck!