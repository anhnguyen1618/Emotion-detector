const _ = require('ramda')
const axios = require('axios')
const fs = require('fs')

const { EMOTION_API, SUBSCRIPTION_KEY } = require('./constants.js')

exports.fetchEmotion = url => {
  const headers = { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY }
  const payload = { url }
  const processResponse = _.compose(getEmotion, _.prop('data'))
  return axios.post(EMOTION_API, payload, { headers })
    .then(processResponse)
    .catch(err => 'neutral')
}

const getEmotion = ([data]) => {
  const scores = data.scores
  const keys = _.keys(scores)
  const compare = (maxKey, curKey) => scores[maxKey] > scores[curKey] ? maxKey : curKey
  return keys.reduce(compare, keys[0])
}

exports.writeFile = (fileName, data, encoding) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, encoding, err => {
      if (err) reject(err)

      resolve(fileName)
    })
  })
}
