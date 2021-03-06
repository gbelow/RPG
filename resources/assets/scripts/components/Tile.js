import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import PropTypes from 'prop-types';


export default class Tile extends Component {
    constructor(props){
        super(props)

        this.state = {
            character:'',
            structure:'',
            tile:'',
            effect:'',
            visible:true,
        }
    }

    onClick = () => {
        this.props.onHexClick({
            hex: this.props.hex,
            tile: this.state.tile,
            structure: this.state.structure,
            character: this.state.character,
            effect: this.state.effect
        })
    }

    onHover = () => {
        if(this.props.clicked.current){
            this.props.onHexClick({
                hex: this.props.hex,
                tile: this.state.tile,
                structure: this.state.structure,
                character: this.state.character,
                effect: this.state.effect
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.tile != this.state.tile ||
            nextState.structure != this.state.structure ||
            nextState.character != this.state.character ||
            nextState.effect != this.state.effect ||
            nextState.visible != this.state.visible ||
            JSON.stringify(nextProps.gridParams) != JSON.stringify(this.props.gridParams)
        ){
            return true
        }else{
            return false
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.gridParams.size != this.props.gridParams.size){
            this.forceUpdate()
        }
    }

    changePattern = (pattern, type) => {
        this.setState({[type]: type + '-' + pattern.toString() })
    }

    setVisibility = (arg) => {
        this.setState({visible:arg})
    }

    renderHex = (fill) => {
        const {hex} = this.props
        return(
            <Hexagon
                onClick={this.onClick}
                onMouseLeave={this.onHover}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                fill={fill}
            />
        )
    }

    render(){
        if(this.state.visible == true){
            return(
                <>
                    {this.renderHex(this.state.tile)}

                    {this.state.structure ?
                        this.renderHex(this.state.structure)
                    : ''}

                    {this.state.character ?
                        this.renderHex(this.state.character.split('[')[0])
                    : ''}

                    {this.state.effect ?
                        this.renderHex(this.state.effect)
                    : ''}

                </>
            )
        }else{
            return(
                <>
                    {this.renderHex(null)}
                </>
            )
        }
    }
}

Tile.propTypes = {
    hex : PropTypes.object.isRequired
}
