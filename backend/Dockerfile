FROM openjdk:11.0.2-jdk-stretch as helper
WORKDIR /workspace/app
COPY . .
RUN mv ./.cache/wrapper/dists/*/*/*.zip ./gradle/wrapper/
RUN ./gradlew --gradle-user-home=./.cache build --build-cache -x test
RUN mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)




FROM openjdk:11.0.2-jdk-stretch
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/build/dependency
COPY --from=helper ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=helper ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=helper ${DEPENDENCY}/BOOT-INF/classes /app
EXPOSE 8080
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-cp","app:app/lib/*","com.findincommon.app.AppApplication"]
