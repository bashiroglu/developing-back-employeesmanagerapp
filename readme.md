This is back-end code repo of my developing-back-employeesmanagerapp.
In this repo, the restful API will be built and connected to db.

After download project files, in the project directory, you can run :

### `npm start`

But do not forget adding you config file with gmail and its password for email, you need to change database details in app.js.

As a Stack and third party libraries, dev dependencies etc:

1. Node JS
2. Express JS
3. Mongo DB
4. Mongoose
5. Nodemon
6. jsonwebtoken
7. nodemailer
8. html-pdf
9.

This is the first project that is designed and coded by me. In some concepts, I don't know what I am doing. Because I haven't seen them in anywhere, I just thought that it may be possible to do like this and I did(sometimes it worked). I will list thoso below

1. There are many to count, in starting I thought it will be less but now I realize most of application is not acceptable in terms of clean code(esepecially in front side), maintainablity etc., although it works . I understand many things that why we are not supposed to use them.

### My mistakes for this project:

1. I did have some idea about routes but not in depth. But thing is, during development I need more ready material to work on.

2. I understand that it was very important to have clear(solid) roadmap of building app. So kinda todos in user friendly interface life trello.

### Weak sides of project or my mistakes in terms of code which I chose

1. I always response success: 'done' or any other stupid response which don't give any information about process.

2. if in client side email is updated which is possible with setting route, application will be broken.

3. sending back email rather than user id which lead more problems such as not being able to change email by user interface etc.

4. auth middleware to check use is admin or not or the data belongs to him to manage or not.
