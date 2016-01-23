# Dependencies
### Docker
Follow [these instructions](http://docs.docker.com/engine/installation/) to setup Docker specific to your machine.
### Docker Image
The Docker Image contains all the source code for the application.
Use `docker pull waco001/geneseq` to download the Image.
#Setup
In order to run the application you will need to create a Docker-Data folder. This folder acts as a bridge between your computer and the Docker Virtual Machine. Move the given **gene dump file** and unzip it in that folder with `tar -zxvf mongodump.tar.gz`.

Make the folders required for the MongoDB to initialize in. `mkdir db`
#Running the Application
Run the container with `docker run -p 80:8080 -p 8081:8081 -v ~/Docker-Data:/data -i -t waco001/geneseq`. Replace `~/Docker-Data` with the path of your Docker-Data folder.
##First Time Run
In order to completely setup the application for the first time, we need to import the existing data into the MongoDB server. Enter these commands from within the Docker Container.

If your MongoDB service is not running, you can commandeer it with `service mongod start|stop|restart|status`.

`mongorestore --db gene_locale dump/gene_locale --drop` imports all the extracted gene data from **/dump** and puts it into a Mongo format in **/db**. The `--drop` command is used to overwrite all data in the **gene_locale** database.

#### Notice
Certain MongoDB versions 3.0.7 (latest as of 11/27/15) have a [bug]() when trying to import new data using `mongorestore`. It will return an error about the End-Of-File for the dump. A solution is to use the `batchsize` parameter. This will make the command run much slower though. Using `mongorestore --db gene_locale dump/gene_locale --drop --batchsize=1000` will bypass this error.

## Run

In some cases, the MongoDB server and the webserver will not run on start. `mongod --fork --syslog` will start the MongoDB server. Use `python3 /opt/geneseq/source/wsgi.py
` to start the web server afterwards.

Condensed: `mongod --fork --syslog && python3 /opt/geneseq/source/wsgi.py`

## Detaching from Container
Use `CTRL P + Q` will detach from the current session, but leave it running in the background.

## Attaching to Container

`docker ps` Will show a list of currently running containers.

|CONTAINER ID|IMAGE|COMMAND|CREATED|STATUS|PORTS|NAMES|
|------------|-----|-------|-------|------|-----|-----|
|67c3e6bdc363|waco001/geneseq|"/bin/sh -c '/bin/bas"|3 minutes ago|Up 3 minutes|0.0.0.0:80->8080/tcp, 0.0.0.0:32769->8081/tcp|amazing_mirzakhani|

Use the first 3 characters of your generated **Container ID** to re-attach to the container. `docker attach 67c`

## Using Mongo Express
[Mongo Express](https://github.com/andzdroid/mongo-express) is a tool similar to PHP-MyAdmin to view and edit MongoDB tables in the web browser. Install it globally with `npm install -g mongo-express`.

## Viewing
Access the site locally at `0.0.0.0` and view the MongoExpress at `0.0.0.0:8081`
