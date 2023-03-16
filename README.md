# Factory Management
Factory Management it backend (server only) project demonstrates Factory management system. The Factory has employees. Each employee belongs to a department. Each employee works several shifts. Each shift structure build from one or more employees.
The project base on NodeJS and MongoDB. the server manage data from three different sources:
1. (read only) The server read data from Jsonplaceholder by **REST API** to authenticate and authorize access to the factory management system
2. The server use **MongoDB** to load and store data about the employees, departments, shifts and so on.
3. The server log to **Json file** the actions that user does.

the system also tracks about the actions that users do. users have limit actions peer day like getting the list of employees, create a new department etc...
the action count resets at UTC midnight.

# installation
To run the application locally, follow these steps:
1. install nodeJS v18.12.1 or above(tested)
2. install npm 8.5.4 or above(tested)
3. (optional) install nodemon global
4. (optional) an .env file change the secret key, action limit, port or mongoDB address.
5. go to server dictory `cd server`
6. install dependencies `npm i`
7. run the server `node index.js`

# test
1. in .env file make sure the ADDRESS point on demo database and nor real database with personal data.
2. run `npm test` to use jest
3. drop the database. shifts can't be deleted by customer requirements.
