# findincommon

After cloning this project, you have to do these steps in order to successfully run it with `docker-compose up --build`:<br/>
1. Change wrapper url to appropriate (uncomment one and comment another): `vim ./backend/gradle/wrapper/gradle-wrapper.properties` <br/>
2. Go to the backend folder: `cd ./backend`<br/>
3. Execute build command, it downloads wrapper and all of the dependencies:<br/>
```
./gradlew --gradle-user-home=./.cache build
```
4. Convert gradlew file line endings to unix format (crlf to lf): `dos2unix .backend/gradlew`<br/>
5. Change wrapper url to local (uncomment one and comment another): `vim ./backend/gradle/wrapper/gradle-wrapper.properties`<br/>
