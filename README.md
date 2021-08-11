# LinguiBook - A network for sharing and gaining linguistic wisdom.

LinguiBook web application built with ReactJS❄ and Firebase🔥.

> Built using React🚀 and Firebase🔥

Click [**Here**](https://noteit-ed2e5.web.app/) to see the live Demo

## Features covered in Version 1.

- SignIn With Google.
- Post a Vocabulary in Public or Private.
- Save and Like the Public post - (Vocabulary),
- cursor based Pagination,
- Infinite Scroll using IntersectionObserver.

## Technology Used

- **React** (FrontEnd)
- **Redux and Reac-Redux** (To manage context level application state)
- **Firebase** - Baas (Backend as a Service)
  - **Firestore** (NoSQL Database)
  - **Hosting**
  - **Authentication**

### To run this on Local Machine

- Clone this repo, and cd into it.
- install all the dependencies form package.json.
- Create a project in Firebase Console.
- Enable Goolgle Login.
- intergrate your secret project key with your local environment.
- Run app by typing `npm start` in command line.
- Make sure to read the **Note** section below.

### Note that

- All the function which does the database transition are created in a coustom Hook and imported into the component.
  Check `src\hooks\useFireStore.js`
- You will have to create **Indexes** in firestore, as HomePage and SavedPage uses **Compound Queries** to fetch data from firestore. While running the application for first time there will be an error in console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)
