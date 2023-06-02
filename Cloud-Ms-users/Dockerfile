FROM openjdk:17
EXPOSE 8080
COPY ./target/users-docker.jar /usr/
WORKDIR /usr/
CMD java -jar users-docker.jar