In progress:
Test containers.

Update your .env file 

Node version is `v20.10.0`

1. `npm i` -  for server and client 
2. change .env file for connection to DB
3. server port  `npm run start:dev` : http://localhost:8081/
4. server documentation: http://localhost:8081/swagger
5. client port  `npm run start` : http://localhost:3000

Backend:

########### Migrations and Seeds ###############

Firstly, if you want manage entities by yourself you should turn off synchronization(should be "false") in file : https://github.com/Vadym342/user-api/blob/main/server/src/database/ormconfig.ts

`seed:run` - run seeds 
`seed:revert` - revert seeds
`migration:run` - run migrations
`migration:rollback` - revert migrations

########### e2e tests locally ###############
1. Download Rancher or Docker Desktop 
2. Start Docker service locally




