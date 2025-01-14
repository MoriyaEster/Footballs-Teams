FROM ubuntu:latest

RUN mkdir test

RUN apt update && apt install sudo -y

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 admin 

RUN  echo 'admin:1234' | chpasswd

RUN mkdir /football-app

COPY . /football-app

RUN sudo apt-get update -y

RUN sudo apt-get install locales -y

RUN sudo apt-get install curl -y

ENV REACT_APP_API_KEY=528d45c9b4d41c33b7b813fbaeda7d25

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\ 
sudo apt-get install -y nodejs

WORKDIR /football-app

RUN npm i

EXPOSE 3000

CMD npm run start
