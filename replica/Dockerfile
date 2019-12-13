FROM mongo
WORKDIR /
COPY ./replicate.js /replicate.js
CMD ["mongod", "--replSet", "rs0", "--bind_ip_all"]
#RUN mongo replicate.js
EXPOSE 27017