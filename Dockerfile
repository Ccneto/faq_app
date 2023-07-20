FROM ubuntu:20.04
LABEL maintainer="Carlos Castanho Neto <castanho.cneto@gmail.com>"

RUN apt-get update
RUN apt-get install -y software-properties-common

RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install -y python3-dev
RUN apt-get install -y python3-pip

RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs

RUN apt-get update
RUN npm install
RUN npm install axios
RUN npm install react-string-format
RUN npm install react-scripts@3.3.1 -g

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

ENV PATH /app/view/node_modules/.bin:$PATH

RUN pip install -r requirements.txt
COPY ./DB /app/DB
COPY ./model /app/model
COPY ./view /app/view
COPY ./view/package.json /app/view/package.json
COPY . /app

RUN export LANG=C.UTF-8
RUN ln -s /usr/bin/python3 /usr/bin/python

# CMD [ "python3", "./app.py" ]
