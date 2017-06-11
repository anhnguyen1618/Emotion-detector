import React from 'react'
import axios from "axios";

export class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.video = null
    this.state = {
      streamSrc: '',
      capturedImg: '',
      emotion: '',
      displayCapturedImage: false
    }

    this.initializeCam = this.initializeCam.bind(this)
    this.snapshot = this.snapshot.bind(this)
    this.mapEmotion = this.mapEmotion.bind(this)
  }

  componentDidMount() {
    this.initializeCam()
  }

  initializeCam() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia

    const handleStream = stream => this.setState({...this.state, streamSrc: window.URL.createObjectURL(stream) })

    if (navigator.getUserMedia) {
      const config = {
        video: true,
        audio: false
      }
      navigator.getUserMedia(
        config,
        handleStream,
        err => alert(err)
      )
    } else {
      alert('This camera is not supported by your browser!')
    }
  }

  snapshot() {
    const canvas = document.createElement("canvas")
    const height = window.innerHeight
    const width = height * 4 / 3
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d');
    ctx.translate(width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(this.video, 0, 0, width, height)
    const capturedImg = canvas.toDataURL('image/jpeg')

    axios.post('/api/upload', { img: capturedImg })
      .then(({ data: emotion }) => {
        this.setState({...this.state, emotion })
      })

    this.setState({...this.state, capturedImg, displayCapturedImage: true })

    setTimeout(() => {
      this.setState({...this.state, displayCapturedImage: false, emotion: '' })
    }, 4000)
  }

  mapEmotion(emotion) {
    const emotions = {
      happiness: 'http://i.imgur.com/tHUoJRm.png',
      sadness: 'http://i.imgur.com/o6JnT93.png',
      anger: 'http://i.imgur.com/IgG7fBM.png',
      surprise: 'http://i.imgur.com/yV5Pimd.png',
      neutral: 'http://i.imgur.com/3kczTRF.png'
    }

    return emotions[emotion]
  }


  render() {
    return (
      <div className="video--container">
         <video
          className="video--flip"
          ref={video => this.video = video}
          autoPlay
          src={this.state.streamSrc}
        />
        {this.state.displayCapturedImage && 
          <div className="captured-image">
            <img src={this.mapEmotion(this.state.emotion)} className="emotion"/>
            <img src={this.state.capturedImg}/>
          </div> 
        }         
        <div className="video__footer">
            <img src="http://i.imgur.com/ENNzMac.png" onClick={this.snapshot} className="video__footer__button"/>      
        </div>
      </div>
    );
  }
}

Camera.displayName = 'Camera'

export default Camera
