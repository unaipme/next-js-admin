FROM node:16
LABEL author="Unai Perez <unai.perez@ikerlan.es>"
WORKDIR /root/app

ADD ./package* ./
ADD ./components ./components
ADD ./pages ./pages
ADD ./public ./public
ADD ./services ./services

RUN npm install && npm run build

CMD [ "npm", "run", "start" ]