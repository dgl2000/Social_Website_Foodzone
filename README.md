# README

@file: Rice University COMP 531 Web Development HM6 backend unit test and API

@author: Gaole Dai (S01435587) :penguin:

@email: gd25@rice.edu

@date: Nov. 6, 2022

## Host Server

      "netid": "gd25",
      "frontend": "https://newerfoodzone-gd25.surge.sh",
      "backend": "https://newerfoodzone.herokuapp.com"

## Function

- `POST /register` register new user
- `POST /login` log in user
- `PUT /logout` log out current logged in user
- `GET /headline` return headline for logged in user
- `PUT /headline` update logged in user headline
- `GET /articles` returns articles of logged in user
- `GET /articles/id` (where id is a valid or invalid article id)
- `POST /article` (adding an article for logged in user returns list of articles with new article, validate list increased by one and contents of the new article)

## Rubrics

| Merits                                                       |      Finished      | Comments                                                     |
| ------------------------------------------------------------ | :----------------: | ------------------------------------------------------------ |
| README.md file with frontend and backend URLs                | :white_check_mark: | In Host Server Session                                       |
| Frontend: Site is hosted on Surge                            | :white_check_mark: |                                                              |
| Frontend: Implements same requirements from last assignment  | :white_check_mark: |                                                              |
| Backend: Site is hosted on Heroku                            | :white_check_mark: |                                                              |
| Backend: POST /login returns a username and message          | :white_check_mark: | In windows 10 -`curl -X POST -H "Content-Type: application/json" --data "{\"username\":\"imgloriadai\", \"password\": \"123\"}" https://newerfoodzone.herokuapp.com/login` |
| Backend: POST /register updates the list of registered users | :white_check_mark: | `curl -X POST -H "Content-Type: application/json" --data "{\"username\":\"testUser\", \"password\": \"123\", \"email\":\"testUser@rice.edu\", \"dob\":\"11/11/2002\", \"zipcode\":\"77005\"}" https://newerfoodzone.herokuapp.com/register` |
| Backend: PUT /logout logs out user and removes session id    | :white_check_mark: | `curl -X PUT -H "Content-Type: application/json" https://newerfoodzone.herokuapp.com/logout` |
| Backend: GET /headline/:user? returns the headline messages for requested users | :white_check_mark: |                                                              |
| Backend: PUT /headline updates the headline message          | :white_check_mark: |                                                              |
| Backend: GET /articles returns articles for logged in user   | :white_check_mark: | Current logged in user's articles are returned -> Mack said it is design issue, I will change with logged in user + follower in final app |
| Backend: POST /article returns an array of articles with newly added article | :white_check_mark: | Return current logged in user's articles with the newly added one |
| Backend: implement GET /articles and GET /articles/:id as one endpoint not two | :white_check_mark: | Yes, one endpoint                                            |
| Backend: Stub: PUT /password                                 | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: GET /email/:user?                             | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: PUT /email                                    | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: GET /zipcode/:user?                           | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: PUT /zipcode                                  | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: GET /avatar/:user?                            | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: PUT /avatar                                   | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: GET /dob                                      | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: PUT /articles/id                              | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: GET /following/:user?                         | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: PUT /following/:user                          | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: Stub: DELETE /following/:user                       | :white_check_mark: | Already connect to the database, did not use stub            |
| Backend: MongoDB has at least three collections: users, articles, profiles | :white_check_mark: | Yes, three collections which are users, articles and profiles |
| Backend: Session id is stored as httpOnly cookie             | :white_check_mark: | Yes, I use the code from hw6 description                     |
| Backend: User passwords are hashed and salted using md5 or encrypted with bcrypt | :white_check_mark: | Yes, I use `md5` for hashing                                 |
| Backend: isLoggedIn middleware is exported from auth.ts and applied to routes | :white_check_mark: | Applied one as IC in `auth.js`                               |
| Backend: Unit test to validate POST /register                | :white_check_mark: | In `1.login.spec.js`                                         |
| Backend: Unit test to validate POST /login                   | :white_check_mark: | In `1.login.spec.js`                                         |
| Backend: Unit test to validate PUT /logout                   | :white_check_mark: | In `1.login.spec.js`                                         |
| Backend: Unit test to validate GET /headline                 | :white_check_mark: | In `2.profile.spec.js`                                       |
| Backend: Unit test to validate PUT /headline                 | :white_check_mark: | In `2.profile.spec.js`                                       |
| Backend: Unit test to validate GET /articles                 | :white_check_mark: | In `3.article.spec.js`                                       |
| Backend: Unit test to validate GET /articles/id              | :white_check_mark: | In `3.article.spec.js`                                       |
| Backend: Unit test to validate POST /article                 | :white_check_mark: | In `3.article.spec.js`                                       |
| Backend: valid junit xml test results for backend            | :white_check_mark: | Three separate file in junit-report.xml file                 |
| **Demerits**                                                 |        ----        | ----------------------------------------------------------------------------------------------- |
| not using Angular or React for frontend                      |        :x:         | I use **React**                                              |
| unapproved module or JavaScript library                      |        :x:         | React + Material UI - **limited separate css file since I use Material UI framework** |
| did not submit front-end web app reviews                     |        :x:         | Submit via Canvas                                            |
| did not follow directions in repo submission                 |        :x:         |                                                              |
