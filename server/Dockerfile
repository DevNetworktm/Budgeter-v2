FROM node:18.18-alpine
WORKDIR /home/budgeter-server/
COPY . .
RUN yarn
RUN yarn build
RUN rm -rf src
CMD [ "yarn", "start" ]