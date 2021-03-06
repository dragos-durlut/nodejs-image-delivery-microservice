# nodejs-image-delivery-microservice

Node JS Image Delivery Microservice Challenge for OwnZones


## Development process described here:

[Setup](http://justcodesnippets.durlut.ro/index.php/2019/12/06/node-js-image-delivery-microservice-challenge-setup/)

[Refactoring #1](http://justcodesnippets.durlut.ro/index.php/2019/12/07/node-js-image-delivery-microservice-challenge-refactoring-1/)

[Folder structure](http://justcodesnippets.durlut.ro/index.php/2019/12/07/node-js-image-delivery-microservice-challenge-folder-structure/)

[Mongo DB & Stats page](http://justcodesnippets.durlut.ro/index.php/2019/12/08/node-js-image-delivery-microservice-challenge-mongo-db-stats-page/)

[Unit tests](http://justcodesnippets.durlut.ro/index.php/2019/12/08/node-js-image-delivery-microservice-challenge-unit-tests/)

[Documentation & How to run](http://justcodesnippets.durlut.ro/index.php/2019/12/08/node-js-image-delivery-microservice-challenge-documentation-how-to-run/)

[Docker, Node JS & MongoDB](http://justcodesnippets.durlut.ro/index.php/2019/12/09/node-js-image-delivery-microservice-challenge-docker-node-js-mongodb/)

## DOCKER

For Docker instructions, look at the bottom of this file

## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

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
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

---

## Install

    $ git clone https://github.com/dragos-durlut/nodejs-image-delivery-microservice/
    $ cd nodejs-image-delivery-microservice
    $ npm install

## Configure app

No config file so far

## Running the project

    $ npm run start

## Simple build for production

    $ npm run-script build

## Running the tests

    $ npm test


---
## How to RUN

To run the microsevice you will need to execute command `npm run start`

To see the stats you can go to [http://localhost:3000/image/stats][5] in Postman or in a broswer window. You should see something like this:

![][1]![][2]

In order to get the resized image you call this address in Postman or in Web Browser: [http://localhost:3000/image/eye.jpg/300�300][3]

Important note: you must have the image in `dist/images/original/` folder or you will get a 404 status.

You will get a 200 response along with the resized image:

![][4]

You will also notice the creation of a folder that mathches thr requested resolution.

[1]: http://justcodesnippets.durlut.ro/wp-content/uploads/2019/12/Capture7.png
[2]: http://justcodesnippets.durlut.ro/wp-content/uploads/2019/12/Capture8.png
[3]: http://localhost:3000/image/eye.jpg/300x300
[4]: http://justcodesnippets.durlut.ro/wp-content/uploads/2019/12/Capture9.png
[5]: http://localhost:3000/image/stats



---
## How to RUN with DOCKER

Run the docker command: `docker-compose up --build`

After docker finishes building we call this address:�http://localhost:3000/image/eye.jpg/600x300

And then this address:�http://localhost:3000/image/cat.jpg/600x300

And then this address:�http://localhost:3000/image/dog.jpg/600x300

And then the stats address http://localhost:3000/stats/