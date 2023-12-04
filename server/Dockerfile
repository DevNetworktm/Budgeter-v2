FROM node:18.18-alpine
WORKDIR /home/budgeter-server/
COPY . .
RUN yarn

# Build
RUN yarn build
COPY ./src/docs ./dist/docs

CMD [ "yarn", "start" ]