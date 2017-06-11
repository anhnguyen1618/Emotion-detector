# Simple emotion detector by Anh Nguyen

Technologies

 * [React](https://facebook.github.io/react/): JavaScript View library
 * [Express](https://expressjs.com/): Simple Node.js web framework
 * [Cognitive-services](https://azure.microsoft.com/en-us/services/cognitive-services//): Public API to recognize emotion by Microsoft
 * [SASS](http://sass-lang.com/): CSS pre-processor
 * And more...


### Usage

[**Live demo**](https://emo-detector.herokuapp.com/)

Install dependency:

```javascript
yarn
```

Start back-end server on port 8000:

```javascript
yarn start-backend
```

Start front-end server on port 8080:

```javascript
yarn start-front
```

Compile the distribution build:

```javascript
yarn build-front
```

### Features & instructions

* Capture image using webcam in the browser
* Save image on server and create published URL
* Fetch emotion from third-party api by providing newly created published URL of the image
* Display emotion

### Notes

* In order to create URL for image in localhost env, use [Ngrok](https://ngrok.com/) to point to port 8080 and provide that url to fetch emotion from third-party API

Thank you and happy coding!