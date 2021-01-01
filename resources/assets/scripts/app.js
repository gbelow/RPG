import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import MapCreator from './components/MapCreator'
import TileCreator from './components/TileCreator'
import ImageUploader from './components/ImageUploader'

if(document.getElementById('createMap') ){
    let createMap = document.getElementById('createMap');
    ReactDOM.render(<MapCreator {...(createMap.dataset)} />, document.getElementById('createMap'))
}

if(document.getElementById('createTile') ){
    let createTile = document.getElementById('createTile');
    ReactDOM.render(<TileCreator {...(createTile.dataset)} />, document.getElementById('createTile'))
}

if(document.getElementById('uploadImage') ){
    let uploadImage = document.getElementById('uploadImage');
    ReactDOM.render(<ImageUploader {...(uploadImage.dataset)} />, document.getElementById('uploadImage'))
}
