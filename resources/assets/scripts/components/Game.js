import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {Map} from './Map'
import SizeMenu from './SizeMenu'
import TilesMenu from './TilesMenu'
import axios from 'axios'
import MapCRUD from './MapCRUD'
import GameLayout from './GameLayout'
import BrushSizeMenu from './BrushSizeMenu'
import MapController from './MapController'
import CharacterPanel from './CharacterPanel'
import ActionController from './Actions/ActionController'
import {HexUtils} from 'react-hexgrid';
import TurnMenu from './TurnMenu'
import CharacterMenu from './CharacterMenu'

export default function Game () {

    const defaultSizes = {x:16,y:8,size:3}
    const [size, setSize] = useState(defaultSizes)
    const [selectedCharacter, setSelectedCharacter] = useState('')
    const [selectedAction, setSelectedAction] = useState('')
    const [currentCharacter, setCurrentCharacter] = useState('')
    const [load, setLoad] = useState(null)

    const tiles = useRef({})
    const structures = useRef({})

    const [tileList, setTilesList] = useState([])
    const [structureList, setStructuresList] = useState([])
    const [characterList, setCharacterList] = useState([])

    const [turn, setTurn] = useState(0)

    const [isYourTurn, setIsYourTurn] = useState(false)
    const [actionFunction, setActionFunction] = useState()
    const [action, setAction] = useState([])

    useEffect(()=>{
        if(action.length != 0){
            action.forEach((el) => {
                characterReducer(el.action)
            })
            setAction([])
        }
    }, [JSON.stringify(action)])

    const characterReducer = (action) => {
        let newChars = action
        setCharacterList({...characterList, ...action })
    }

    const loadIntoMap = async (data) => {

        let map = JSON.parse(data.map_json)
        const {width, height, name} = data

        await setSize({x:width, y:height, size:size.size})

        structures.current = map.structure
        tiles.current = map.tile

        setTilesList((await loadTilesList(map.tile)).data)
        setLoad(data)
    }

    const loadTilesList = async (map) => {
        let tileList = []
        Object.values(map).forEach((el)=>{
            if(!tileList.find((i) => i == el.pattern)){
                tileList.push(el.pattern)
            }
        })

        return await axios.post('Tile/load', {tileIDs:tileList})
    }

    return (
        <GameLayout
            backgroundURL='/forest.jpg'
            content={
                <MapController
                    size={size}
                    setTile={actionFunction}
                    selectedPattern={currentCharacter}
                    brushSize={1}
                    load={load}
                    unsetLoad = {() => setLoad(null)}
                />
            }

            rightMenu = {
                <div className="menu-v">
                    <TurnMenu
                        turn={turn} setTurn={setTurn}
                        isYourTurn={isYourTurn} setIsYourTurn={setIsYourTurn}
                        characters={characterList}
                        currentCharacter={currentCharacter}
                        setAction={setAction}
                    />

                    <div className="sub-menu menu-v">
                        <MapCRUD
                            editable={false}
                            loadIntoMap = {loadIntoMap}
                            mapToSave={{structures:structures, tiles:tiles}}
                            size={size}
                        />
                    </div>
                </div>
            }

            bottomMenu={
                <CharacterMenu
                    currentCharacter={currentCharacter}
                    setCurrentCharacter={setCurrentCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                    characterList={characterList}
                    isYourTurn={isYourTurn}
                    setAction={setAction}
                    setActionFunction={setActionFunction}
                />
            }

            bottomLeftSpace={
                <CharacterPanel
                    character={characterList[currentCharacter]}
                />
            }

            bottomRightSpace={
                <ActionController
                    setSelectedAction={setSelectedAction}
                    selectedAction={selectedAction}
                    characters={characterList}
                    structures={structureList}
                    tiles={tileList}
                    currentCharacter={currentCharacter}
                    setActionFunction={setActionFunction}
                    setAction={setAction}
                    inCombat={turn > 0 ? true : false}
                    isYourTurn={isYourTurn}
                />
            }
        />
    )
}
