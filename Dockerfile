FROM balenalib/raspberry-pi-alpine-node:8
# FROM balenalib/raspberrypi3-alpine-node:8

WORKDIR /usr/src/app

RUN apk update \
&& apk add build-base python \
&& rm -rf /var/cache/apk/*

COPY ./package.json .

RUN JOBS=MAX npm install --unsafe-perm --production \
&& npm cache verify \
&& rm -rf /tmp/*

COPY . .

ENTRYPOINT ["/bin/bash", "./start.sh"]