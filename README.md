
# Tamu-disc-golf
[![version](https://img.shields.io/badge/node-12.9.0-brightgreen.svg)](https://nodejs.org/en/)&nbsp;&nbsp;&nbsp;&nbsp; [![version](https://img.shields.io/badge/npm-6.14.0-success.svg)](https://www.npmjs.com/)&nbsp;&nbsp;&nbsp;&nbsp;[![Master Build](https://github.com/acramer/tamu-disc-golf/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/acramer/tamu-disc-golf/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster)

This is the repository for Tamu Disc Golf [Website](http://tamudiscgolf.herokuapp.com/client/index.html)

---
## Requirements
For development, you will need Node.js, npm and PostgreSQL
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.19.0

    $ npm --version
    6.14.0
  - #### Installing all required packages on local system
Once node and npm are installed, execute the following command to install all required packages from packages.json

  `$ npm install`

### PostgreSQL
Get the latest stable release of PostgreSQL from https://www.postgresql.org/download/ for your development system.
**Note**: You might need to add the path of the Installation directory in the environment Path depending on your operating system.

Once postgres is installed, configure the `development` section of `config/config.json` with the local postgres database details.
**Remember** the `production` section is for running on the production environment.

## Setup
 - ### Express-handlebars
The project uses express-handlebars to generate the html files. It provides multiple benefits like hierarchial html page building, looping and conditional operations on db objects.

 - ### Sequelize
We are using  [Sequelize](https://github.com/sequelize/sequelize), an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)  (Object Relation Mapper) library, to interact with the database via simpler API calls. Interacting directly with PostgreSQL is difficult because we'd have to write our own raw SQL queries.

 * Migrations

> Migrations are an elegant way to incrementally make changes to the database in a consistent manner.  It is set of scripts that basically define DDL commands.
> Remember to always migrate your database after git pull master to get the latest db schema changes
> *Fun Fact!* Sequelize stores the meta-information about the correct sequence of migrations in a table named "**SequelizeMeta**"

Apply all migrations using the following command

     $ npx sequelize db:migrate
Use the following command to only apply migrations upto a particular state.

    $ npx sequelize db:migrate --to <path-to-the-correct-migration-file>

Create a new migration file for say table events, with event_name and event_date,
```console
$ npx sequelize-cli model:generate --name events --attributes event_name:string,event_date:date
```
Unfortunately, sequelize-cli only provides an easy way to create a migration file for create-table. In order to create a migration file for any other db updates run the command
```console
$ npx sequelize-cli migration:generate --name <migration-skeleton-filename>
```
This will create a skeleton migration file and we need to write the logic for the db update operations inside this file.

 * Seeds
> Seed files enable us to populate the database with some initial data. This can also be a handy tool for populating the local database as well during development.
>
 To run all seeders,
 ```
 $ npx sequelize db:seed:all
```

To run specific seeder files, which just populates the selected tables
 ```
 $ npx sequelize db:seed --seed <List-of-seed-files>
```

To generate a new seed file for a table,
```
npx sequelize seed:generate --name <name-of-the-seed-file>
```
**Note:** Running the seed files more than once will duplicate entries in the same table.

## Running the project

    $ node index.js
   or

    $ npm start

## Runnning Tests
We have used Mocha(https://mochajs.org/) to write unit-tests. Install mocha from the terminal with the command

    $ npm install mocha

Run all tests with the command

    $ npm test

## Contributing
Pull requests are welcome. Just create a Pull Request with your branch and someone will take a look.

Please make sure to update tests appropriately.

## License
[MIT](https://choosealicense.com/licenses/mit/)
