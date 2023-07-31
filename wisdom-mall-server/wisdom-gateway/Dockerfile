FROM openjdk:22-slim
LABEL authors="CloverYou"

COPY target/wisdom-gateway-0.0.1-SNAPSHOT.jar /app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "/app.jar"]