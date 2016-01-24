# Welcome to geneseq
This documentation is intended only to setup the application server. It has no API, so this just a installation and setup guide.

## Prerequisites

* Install Docker

## Download and Run the Docker Image
`docker pull waco001/geneseq`
## Make a shared folder
Create a folder on your server to act as a shared folder between the docker image and your hard drive.

    docker-portal/
        /db/  # An empty folder for mongodb to use
        mongodump.tar.gz # The latest mongodb dump
## Import the MongoDump
`mongorestore --db gene_locale dump/gene_locale --drop`  
This will overwrite anything in the db `genelocale`
## Start the docker image
`sudo docker run --name app -p 22:22 -p 80:8080 -v geneseq-portal:/data waco001/geneseq /sbin/my_init --enable-insecure-key`
## Download Insecure SSH Key (Temporary Testing)
```
# Download the insecure private key
curl -o insecure_key -fSL https://github.com/phusion/baseimage-docker/raw/master/image/services/sshd/keys/insecure_key
chmod 600 insecure_key

# Find image ip address
docker inspect <container id>

# Login to the container
ssh -i insecure_key root@<IP address>
```
## Run the Python Development Server
`cd / && rm -rf /opt/ && mkdir /opt && git clone https://github.com/waco001/geneseq.git opt/ && python3 /opt/source/wsgi.py`
