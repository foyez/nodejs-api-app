FROM node:12.16.1-buster-slim

ENV PORT=5000

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

# RUN yarn cache clean --force

RUN yarn

COPY ./ ./

EXPOSE $PORT

CMD ["yarn", "run", "dev"]
# CMD ["/bin/bash"]