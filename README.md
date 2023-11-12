# README

@file: Rice University COMP 531 Web Development HW 7 final website backend

@author: Gaole Dai (S01435587) :penguin:

@email: gd25@rice.edu

@date: Nov. 21, 2022

## Slip Days

* Use the remaining 3 days

## Server Host

```
  "netid": "gd25",
  "frontend": "https://finalfoodzone-gd25.surge.sh",
  "backend": "https://foodzone-gd25.herokuapp.com"
```

## Test Account

* username: testUser
* password: 123

## Roadmap

Main objectives:

- [x] implement all endpoints in the api. There should be no stubs.
- [x] generate a unified feed of articles for a user based on their followed users
- [x] permit users to upload profile avatars and articles with pictures
- [x] add a third-party authentication option (with account linking ) - kind of...
- [x] add **pagination** and redis store (optional) for local account

Requirements:

- [x] All endpoints are fully implemented. There are no stubs.
- [x] User feed includes articles from logged in user and their followers
- [x] Users can add comments to articles
- [x] Users can edit articles and comments
- [x] Users can update their profile avatar
- [x] Users can create articles with images and text
- [x] Pagination and Redis store (optionally) used for local (non-3rd party) login session map
- [x] All data is persistent to server reboots
- [x] Third-Party Authentication Login

## Check Rubrics

| Criteria                                                     | Finished                           | Comments                                                     |
| ------------------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------ |
| README.md file with test username, password, frontend and backend URLs | :white_check_mark:                 | In `Test Account` and `Server Host` sessions                 |
| All backend functionality is present as per previous assignment | :white_check_mark:                 |                                                              |
| Frontend: user interface and style                           | :white_check_mark:                 |                                                              |
| Frontend: fully functional as per previous assignments       | :white_check_mark:                 |                                                              |
| User's feed is provided by an efficient MongoDB query        | :white_check_mark:                 |                                                              |
| User can login with third-party authentication (and link accounts) | :white_check_mark::checkered_flag: |                                                              |
| Session is stored/retrieved from cookie                      | :white_check_mark:                 |                                                              |
| Edit articles and comments                                   | :white_check_mark:                 | Only comments and articles belongs to the current logged in user could be modified.![](https://res.cloudinary.com/hevjiekwx/image/upload/v1670199103/image-20221204181047704_b1czpw.png) |
|                                                              |                                    | ![](https://res.cloudinary.com/hevjiekwx/image/upload/v1670199418/image-20221204181601144_dla1jx.png) |
|                                                              |                                    | ![image-20221204181902167](https://res.cloudinary.com/hevjiekwx/image/upload/v1670199561/image-20221204181902167_ddyjm4.png) |
| Post article with text and image                             | :white_check_mark:                 |                                                              |
| Update profile avatar                                        | :white_check_mark:                 | Yes, photo is uploaded to Cloudinary image host              |
| Uploaded images are persistent to dyno reboots, i.e., use **Cloudinary** | :white_check_mark:                 | I use Cloudinary image host                                  |
| Pagination and optionally a Redis store used for local account (non-3rd party) login sessions | :white_check_mark:                 | Pagination - **5** posts every page.                         |
| All backend endpoints are implemented                        | :white_check_mark:                 | Yes                                                          |
| **Demerits**                                                 | ------------                       | ------------------------------------------------------------- |
| angular or react framework not used in frontend              | :x:                                | I use **React**                                              |
| unapproved third party module                                | :x:                                | React + Material UI - **limited separate css file since I use Material UI framework** |
| refreshing the page when logged in should keep the user logged in | :x:                                | NO                                                           |
| an error occurs                                              | :x:                                | NO :white_flag:                                              |
| lingering console message                                    | :x:                                |                                                              |

## Citation

* Profile Images from Pexels free images

  * https://www.pexels.com/photo/woman-wearing-brown-bucket-cap-732425/

  * https://www.pexels.com/photo/man-wearing-blue-crew-neck-t-shirt-2379005/

  * https://www.pexels.com/photo/man-in-brown-polo-shirt-614810/

  * https://www.pexels.com/photo/woman-wearing-white-shirt-with-white-flower-on-her-ear-3586798/

* Post articles from https://www.fairwaycapecod.com/about-us/customer-reviews/
