# Redux-TrackingApp-FrontEnd
### Version 1.0 Beta
The Front-end for a Calorie tracking mobile app that connects with a RESTful API through HTTP Requests

Web based Mobile Application using a [custom built API](https://github.com/Aaron-RN/ROR-TrackingApp-API) to gather and manipulate information related to various type of foods.

## Features
### Calorie Tracker (carbs, fats, proteins)
- After Logging in a User is able to add various meals to their tracker. 
- The meals added to the tracker will be saved and stored in the back-end server's database.  
- The User is then able to track the amount of calories (carbohydrates, fats and proteins) they've eaten.
### Track calories on a weekly basis
- The calories eaten is stored and sorted on a weekly basis.
### Personalized Notes
- A User can also remove Food items as well as add personalized notes to each food item.

![screenshot](./screenshot.jpg)
![screenshot](./screenshot2.jpg)

## [Live Link](https://arn-tracking-app.herokuapp.com/login)

## Built With

- HTML, CSS
- JavaScript
- React.js
- React-Router
- Redux.js
- Redux-Thunk
- NPM Webpack

## Setup for Local use

### Clone Repository

Grab a clone of [this repository](https://github.com/Aaron-RN/Redux-TrackingApp-FrontEnd/tree/v1.0b) from Github

### [Setting up Back-End](https://github.com/Aaron-RN/ROR-TrackingApp-API/tree/models-controllers)

In order for this application to work you will also need to setup your back-end server. You can do so following this readme guide [here](https://github.com/Aaron-RN/ROR-TrackingApp-API/tree/models-controllers).

### Setting up Front-End to Back-End connection

After you have successfully setup your back-end, you will need to change the URL the front-end connects to.

1. Navigate to your local directory of this cloned repository
2. Navigate to the src/redux/actions folder and open the index.js file
3. On line 3 where you would see const ```const URL = 'https://arn-tracking-app-api.herokuapp.com/';```, replace ```'https://arn-tracking-app-api.herokuapp.com/'``` with the url of your back-end server that you would have setup following the ["Setting up The Back-End"](https://github.com/Aaron-RN/ROR-TrackingApp-API/tree/models-controllers) Guide

### Install Dependencies

```
$ npm install
```

### Run Application

```
$ npm run server
```

### Running Tests

```
$ npm run test
```

## Running Linters

### ESLint
- Run `npx eslint .` on the root of your project directory.

### Stylelint
- Run `npx stylelint "**/*.{css,scss}"` on the root of your project directory.

### Future Changes
- Upon logging in redirect user to FoodList component page
- Major reboot for desktop design
- Add more information in the progress component page
- Add more functionality to the buttons in the more component page
(Help document, Detailed Profile Page, Settings Menu, Ability to set a Goal)

## Author

👤 **Aaron Rory**

- Github: [@Aaron-RN](https://github.com/Aaron-RN)
- Twitter: [@ARNewbold](https://twitter.com/ARNewbold)
- Linkedin: [Aaron Newbold](https://www.linkedin.com/in/aaron-newbold-1b9233187/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](lic.url) licensed.
