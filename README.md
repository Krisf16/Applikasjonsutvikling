
# To-do-list
 
 group number 3
 Iselin Rosseland
 Kristian Folkvord
 
 Server API:
 server URL: https://apputvikling.herokuapp.com/
 
 create user:

 send a POST request to "/app/user" containing:
 
 username: new username
 email: new email
 password: new password
 
 expected response (if succesful);
 
 username: The username as registrerd in the database
 token: the authentication token
 userID: the ID of the user in the database
 role: 42
 
 Status 200 
 
 expected response if unsuccesful 
 
 status: 500
 message: "Error creating user"
 
 log in:
 
 send a GET to "/app/auth" containing:
 
 username: the username 
 password: the password 
 
 if succesful:
 
 username: username registrerd in the database
 password: password registrerd in the database
 token: the authentication token
 user id: The id of the user in the database
 
 expected response if unsuccesful
 
 status: 400
 message: "not a valid user"
 
 Get list:
 
 post request to "/app/list" containing
 
 token: the authentication token
 username: username registrerd in the database
 
 expected response if succesful
 
 status: 200
 
 if unsuccesful
 
 status: 500
 message: "something went wrong"