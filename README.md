# <p align = "center"> Project 20 - RepoProvas </p>

<div align = "center">
<img src="./repoprovas-front/src/assets/logo.svg" alt="logo"/>
</div>
<br>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Icaro Pavani-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Icaro-pavani/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

RepoProvas is an REST API that store differente tests that can be filtered by subject, teacher, term and disciplines.

---

## :computer: Technologies and concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- PostgreSQL
- Prisma
- Express
- Jest

---

## :rocket: Routes

```yml
POST /sign-up
    - Route to registry a new user
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "senha": "loremipsum",
        "passwordConfirmation": "loremipsum"
    }
```

```yml
POST /sign-in
    - Route to login
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
    }
```

```yml
POST /tests (authenticated)
    - Route to add a new test
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "loremipsum",
        "pdfUrl": "http://www...",
        "categoryId": 3,
        "disciplineId": 2,
        "teacherId": 1
    }
```

```yml
GET /categories (authenticated)
    - Route to list all categories/types of test
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /disciplines (authenticated)
    - Route to list all disciplines
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /teachers/:id (authenticated)
    - Route to list all teachers from one discipline(id)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests (authenticated)
    - Route to list all tests
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
POST /tests?groupBy=disciplines (authenticated)
    - Route to list all the tests in way that is easy to group by disciplines
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests?groupBy=teachers (authenticated)
    - Route to list all tests in a way that is easy to group by teachers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Running the application

This project was created using TypeScript, [Node.js](https://nodejs.org/en/download/) and [PostgresSQL](https://www.postgresql.org/) as database. So, make sure do you have the last version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running localy.

Start cloning this repository in you local machine:

```
git clone https://github.com/Icaro-pavani/projeto20-repoprovas
```

After that, inside the cloned folder, run the command below to install the project dependencies.

```
npm install
```

At last, just need to start the server with the command:

```
npm start
```

:stop_sign: Don't forget to follow the same steps showed above in the [front-end](https://github.com/Icaro-pavani/projeto20-repoprovas/tree/main/repoprovas-front), which contains the webpage application for this API. Thus, you can test the role project.

## Deploy

The link of the deployed API is [https://ipt-repoprovas.herokuapp.com/](https://ipt-repoprovas.herokuapp.com/)
