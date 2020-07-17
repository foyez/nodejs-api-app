# Use small Alpine Linux image
FROM node:12-alpine

# Set environment variables
ENV PORT=5000

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

# RUN yarn cache clean --force

RUN yarn

COPY ./ ./

# for redis
# RUN sysctl vm.overcommit_memory=1

EXPOSE $PORT

CMD ["yarn", "run", "dev"]
# CMD ["/bin/bash"]