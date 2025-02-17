# base image
FROM node:16.13.2 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /app

# generate build
RUN npm run build-production --output-path=dist

############
### prod ###
############

# base image
FROM nginx:stable-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist/trouvaille-website /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
