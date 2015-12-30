# Spin-docker example dockerfile for MongoDB
# https://github.com/atbaker/spin-docker | http://www.mongodb.org/

# Use phusion/baseimage as base image
FROM phusion/baseimage:0.9.15

#Who is maintaining this code and project? Me!
MAINTAINER Abhishek Gorti <abhishek.gorti@gmail.com>

# Set correct environment variables
ENV HOME /root

# Install MongoDB
# Add 10gen official apt source to the sources list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list

# Install MongoDB
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y mongodb-org
RUN mkdir -p /data/db
RUN chown -R mongodb:mongodb /data
# Bind ip to accept external connections
RUN awk '/bind_ip/{print "bind_ip = 0.0.0.0";next}1' /etc/mongod.conf > /tmp/mongod.conf
RUN cat /tmp/mongod.conf > /etc/mongod.conf 

# Create a runit entry for your app
RUN mkdir /etc/service/mongo
ADD run_mongo.sh /etc/service/mongo/run
RUN chmod +x /etc/service/mongo/run
RUN chown root /etc/service/mongo/run

# Clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# one additional application port (Mongo runs on 27017) and one for ssh (22)
EXPOSE 27017
EXPOSE 22

RUN rm -f /etc/service/sshd/down

# Regenerate SSH host keys. baseimage-docker does not contain any, so you
# have to do that yourself. You may also comment out this instruction; the
# init system will auto-generate one during boot.
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

# Use baseimage-docker's init system
CMD ["/sbin/my_init"]