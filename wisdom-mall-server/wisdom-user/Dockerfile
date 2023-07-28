FROM openjdk:22-slim
LABEL authors="CloverYou"

COPY target/**/**.jar /app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "/app.jar"]