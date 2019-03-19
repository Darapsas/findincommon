# findincommon

After cloning this project, you have to do these steps in order to<br/>
successfully run it with `docker-compose up --build`:<br/>
    1. Go to the backend folder: `cd ./backend`<br/>
    2. Execute build command, it downloads wrapper and all of the dependencies:<br/>
```
./gradlew --gradle-user-home=./.cache build
```
