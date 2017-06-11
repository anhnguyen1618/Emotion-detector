import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactCamera from './ReactCamera'
import './style.scss'

const renderApp = (Component) => {
  render(
    <AppContainer>
    	<Component/>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(ReactCamera)

if (module.hot) {
  module.hot.accept('./ReactCamera.jsx', () => {
    renderApp(require('./ReactCamera.jsx').default)
  })
}
