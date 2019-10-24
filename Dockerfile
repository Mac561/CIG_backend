FROM node:10.16.0

WORKDIR /usr/src/CIG_backend

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]