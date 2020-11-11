
# Tamu-disc-golf
[![version](https://img.shields.io/badge/node-12.9.0-brightgreen.svg)](https://nodejs.org/en/)&nbsp;&nbsp;&nbsp;&nbsp; [![version](https://img.shields.io/badge/npm-6.14.0-success.svg)](https://www.npmjs.com/)&nbsp;&nbsp;&nbsp;&nbsp;[![Master Build](https://github.com/acramer/tamu-disc-golf/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/acramer/tamu-disc-golf/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster)

This is the repository for Tamu Disc Golf [Website](http://tamudiscgolf.herokuapp.com/client/index.html)

---
## Requirements

For development, you will only need Node.js and a node global package
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

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Running the project

    $ node index.js

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