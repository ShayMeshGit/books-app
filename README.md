# books-app
A web-app book shop using NodeJS and ejs.

## How to install

- ```git clone https://github.com/ShayMeshGit/books-app.git```
- ```cd /books-app```
- ```npm install```
- Add your **mongodb URI**  in ```./src/lib/mongoUrl.js``` file
- Change ```.env.local``` file name to ```.env``` 
- Add your **SECRET** to ```.env```

## How to run
- ```npm start``` runs server localy
- ```npm run dev``` runs server localy with nodemon

## Features
- Sign-up
- Login
- You can sign-up as admin if you use **admin@admin.com** as your email (create your own password).
- When you login as admin you will be able to **Add**, **Edit** and **Delete** books.
- Search books in the shop and it will update when typing (Front-End vanilla javascript).
- View book **Details**
- Add books to **Cart**
- When not logged in the cart will be saved in ```localStorage```
- When logged in the cart will be saved in **mongodb** using ```session```
