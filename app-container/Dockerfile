# Use phusion/baseimage as base image
FROM phusion/baseimage:0.9.18

#Who is maintaining this code and project? Me!
MAINTAINER Abhishek Gorti <abhishek.gorti@gmail.com>

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]

# ...put your own build instructions here...
#ENV MONGO_VERSION 2.6.6
# Install MongoDB
# Add 10gen official apt source to the sources list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" > \
   /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN apt-get -y install \
          python3 \
          python3-pip \
          uwsgi-plugin-python3 \
          curl \
          uwsgi \
          git \
          nano \
          cron \
          libffi-dev

# Create a runit entry for your app
RUN mkdir /etc/service/mongo
ADD run_mongo.sh /etc/service/mongo/run
RUN chmod +x /etc/service/mongo/run
RUN chown root /etc/service/mongo/run

#RUN mkdir /etc/service/mzapprun
#ADD run_mzapp.sh /etc/service/mzapprun/run
#RUN chmod +x /etc/service/mzapprun/run
#RUN chown root /etc/service/mzapprun/run

#RUN mkdir -p /etc/my_init.d
#ADD startgit /etc/my_init.d/startgit.sh

#Copy new mongo conf file over
COPY mongod.conf /etc/

#Install pip dependencies
COPY pip_requirements.txt /tmp/
RUN pip3 install -r /tmp/pip_requirements.txt

RUN  git clone https://github.com/waco001/geneseq.git \
    /opt/ && \
    ln -s /opt/geneseq/source /usr/local/lib/geneseq && \
    ln -s /opt/geneseq/data/update_processed.py /usr/local/bin/update_processed && \
    ln -s /opt/geneseq/data/update_mouse_expression.py /usr/local/bin/update_mouse_expression && \
    ln -s /opt/geneseq/data/update_annotations.py /usr/local/bin/update_annotations

#Enable SSH Server
RUN rm -f /etc/service/sshd/down


#EXPOSE 8080

EXPOSE 22
# Regenerate SSH host keys. baseimage-docker does not contain any, so you
# have to do that yourself. You may also comment out this instruction; the
# init system will auto-generate one during boot.
RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*