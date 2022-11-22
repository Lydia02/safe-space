# Blog Api
An API that shows the list of articles created by different authenticated users. 

## Built with
- Javascript
- Node.Js
- MONGODB
- Express.Js


## Table of Contents
- Prerequisites
- Requirements
- Setup
- Base URL
- Models
- Endpoints
- Tests on all endpoints
- License
- Author

## Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Requirements
- User should be able to resgister, login.
- Authenticated users should be able to generate token and create posts.
- Using JWT as authentication strategy, token generated should expire after 1 hour.
- Blogs created should be in two state; **draft and published**.
- The owner of blog should be able to edit,delete, change the state of the blog.
- unauthenticated users should be able to read published blogs
- Test application

## Setup
- Install Nodejs,mongodb
- Pull this repo
- run `npm install`
- update .env with yours
- run `npm dev`

## Base URL
localhost:process.env.PORT || [BlogAPI](https://calm-erin-lizard-veil.cyclic.app/blogs)

## Models
## Users

### User signup details

| field | data_type| constraints  |
| :---:   | :---: | :---: |
| email | String   | required, unique=true |
| password | String | required |
| firstname | String | required |
| lastname | String |required |

### User login details
| field | data_type |
| :---:   | :---: | 
| email | String  |
| password | String |

## Article model

| field | data_type| constraints  |
| :---:   | :---: | :---: |
| title | String   | required, unique=true |
| description | String | optional |
| author | ObjectId | optional |
| state | String |default, enum |
| read_count | Number   | default |
| reading_time | String | optional |
| body | String | required,  unique=true |
| timestamp | String |optional |

# Endpoints

### Signup
- **Route**: /signup
- **Method**: POST
- Body: 

```
{
  "email": "Lydia@gmail.com",
  "password": "lydia",
  "firstname": "lydia1",
  "lastname": "dev"
}

```

- **Response**

```
{
  "message": "Signup successful",
  "user": {
    "firstname": "lydia1",
    "lastname": "dev",
    "password": "$2b$10$/d3nq.raaIkU4tWtPPhl2.BtYIQLeXKOXgnGoAiEvrXb8H5D1q3sK",
    "email": "Lydia@gmail.com",
    "article": [],
    "_id": "63690150b3bedc7a1ee4d430",
    "__v": 0
  }
}
```
### Login
- **Route**: /login
- **Method**: POST
- **Body**: 
```
{
  "email": "Lydia@gmail.com",
  "password": "lydia"
 }
 ```
 - **Response**
 ```
 {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjkwMTUwYjNiZWRjN2ExZWU0ZDQzMCIsImVtYWlsIjoiTHlkaWFAZ21haWwuY29tIn0sImlhdCI6MTY2NzgyNzA0MywiZXhwIjoxNjY3ODMwNjQzfQ.yue2VqdFuu1bfKs9Yi2vYkDHjpb2VIBNPl8lNShxSQI"
}
```
# Test all endpoints

### Create article by auntenticated Users

- **Route**: /blog
- **Method**: POST
- **Header**: Authorization: Bearer {token}
- **Body**:

```
{
    "title": "Enter your blog title",
    "description": "Blog description",
    "tag" "#blog_tag",
    "body": "blog content"
}
```
- **Response**
```
{
  "status": true,
  "data": {
    "title": "Enter your blog title",
    "description": "Blog description",
    "body": "blog content",
    "author": "63690150b3bedc7a1ee4d430",
    "state": "draft",
    "read_count": 0,
    "reading_time": 1,
    "_id": "636907d2b3bedc7a1ee4d434",
    "createdAt": "2022-11-07T13:27:46.829Z",
    "updatedAt": "2022-11-07T13:27:46.829Z",
    "__v": 0
  }
}
```

### Update the state from **draft** to **Published**

- **Route**: /blog/:id
- **Method**: PATCH
- **Header**: Authorization: Bearer {token}
- **Body**:

```
{
       "state": "published"
}
```
- **Responses**
```
{
  "status": true,
  "message": "Article updated successfully",
  "article": {
    "_id": "636907d2b3bedc7a1ee4d434",
    "title": "Enter your blog title",
    "description": "Blog description",
    "body": "blog content",
    "author": "63690150b3bedc7a1ee4d430",
    "state": "published",
    "read_count": 0,
    "reading_time": 1,
    "createdAt": "2022-11-07T13:27:46.829Z",
    "updatedAt": "2022-11-07T13:33:23.686Z",
    "__v": 0
  }
}
```

### Get **published** article by authenticated user

- **Route**: /blog/:id
- **Method**: GET
- **Header**: Authorization: Bearer {token}
- Resposes:
```
{
  "status": true,
  "data": {
    "_id": "636907d2b3bedc7a1ee4d434",
    "title": "Enter your blog title",
    "description": "Blog description",
    "body": "blog content",
    "author": {
      "_id": "63690150b3bedc7a1ee4d430",
      "firstname": "lydia1"
    },
    "state": "published",
    "read_count": 1,
    "reading_time": 1,
    "createdAt": "2022-11-07T13:27:46.829Z",
    "updatedAt": "2022-11-07T13:38:43.957Z",
    "__v": 0
  }
}
```
### Get **draft** article by authenticated user

- **Route**: /blog/:id
- **Method**: GET
- **Header**: Authorization: Bearer {token}
- **Responses**:
```
{
  "status": true,
  "data": {
    "_id": "636907d2b3bedc7a1ee4d434",
    "title": "Enter your blog title",
    "description": "Blog description",
    "body": "blog content",
    "author": {
      "_id": "63690150b3bedc7a1ee4d430",
      "firstname": "lydia1"
    },
    "state": "draft",
    "read_count": 1,
    "reading_time": 1,
    "createdAt": "2022-11-07T13:27:20.829Z",
    "updatedAt": "2022-11-07T13:38:20.957Z",
    "__v": 0
  }
}
```
### Delete article by owner

- **Route**: /blog/:id
- **Method**: DELETE
- **Header**:Authorization: Bearer {token}
- **Responses**:
```
{
  "status": true,
  "article": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

### Get **published** articles by unauthenticated users

- **Route**: /blogs
- **Method**: GET
- **Response:**

```
{
  "status": true,
 message": "Published Articles found!",
  "article": {
    "_id": "636907d2b3bedc7a1ee4d434",
    "title": "Enter your blog title",
    "description": "Blog description",
    "body": "blog content",
    "author": "63690150b3bedc7a1ee4d430",
    "state": "published",
    "read_count": 1,
    "reading_time": 1,
    "createdAt": "2022-11-07T13:27:46.829Z",
    "updatedAt": "2022-11-07T13:38:43.957Z",
    "__v": 0
  }  
}
```

# LICENSE

# AUTHOR

Lydia Ojoawo : [@Lydia02](https://github.com/Lydia02)
