import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import ClassMenu from './ClassMenu'
import GameLayout from './GameLayout'
import ResourceMenu from './ResourceMenu'

export default function ClassCreator (){

    const [fields, setFields] = useState({
        system:'',
        stats: [],
        resources: [],
        skills: [],
        savingThrows:[],
        damageResistances:[],
        statusEffectsResistances:[],
        name:'',
    })

    useEffect(()=>{
        getStatSystem()
    }, [])

    const getStatSystem = () => {
        axios.get('CreateSystem/load').then((response)=> {
            response = response.data[0]
            setFields({
                stats:response.stats ?  JSON.parse(response.stats) : [],
                resources:response.resources ?  JSON.parse(response.resources) : [],
                skills:response.skills ?  JSON.parse(response.skills) : [],
                savingThrows:response.saving_throws ? JSON.parse(response.saving_throws) : [],
                damageResistances:response.damageTypes ? JSON.parse(response.damageTypes) : [],
                statusEffectsResistances:response.statusEffects ? JSON.parse(response.statusEffects) : [],
            })
        })
    }

    const handleStatsChange = (e, field, key) =>{
        let stats = fields[field]
        stats[key].value = e.target.value

        setFields({...fields, [stats]: stats})
    }

    const renderFields = (field) => {
        return(
            <div className="sub-menu menu-v w-1/3" >
                <h2 className="text-2xl font-bold">{field}</h2>
                {fields[field].map((el, key)=>{
                    return(
                        <div  key={el.id}>
                            <label>{el.name} :  </label>
                            <input
                                className="input mx-auto"
                                name={field} type='number'
                                value={fields[field][key].value ? fields[field][key].value : 0}
                                onChange={(e) => handleStatsChange(e, field, key)}
                            />

                        </div>
                    )
                })}
            </div>
        )
    }

    const saveClass = () => {

    }

    const loadClasss = () => {

    }

    const deleteClass = () => {

    }

    // const systemSelector = () =>{
    //
    //     axios.get('/system/loadSystem')
    //     return (
    //
    //     )
    // }

    return (
        <GameLayout
            backgroundURL={'/warrior-hall.jpg'}
            content={
                <div className="menu menu-v w-full" >
                    <div className="sub-menu">
                        <h2 className="text-2xl font-bold ">Class Name</h2>
                        <input className="input text-2xl space-x-4" value={fields.name} onChange={(e) => setFields({...fields, name:e.target.value}) }/>
                    </div>
                    <div className="menu menu-h w-full flex-wrap overflow-y-auto place-content-evenly " >
                        <div className="sub-menu menu-v w-1/3" >
                            <h2 className="text-2xl font-bold" >Class Stats</h2>
                            {fields.stats.map((el, key)=>{
                                return(
                                    <div  key={el.id}>
                                        <label>{el.name} :  </label>
                                        <input
                                            className="input mx-auto"
                                            type='number'
                                            value={fields.stats[key].value ? fields.stats[key].value : 0}
                                            onChange={(e) => handleStatsChange(e, 'stats' ,key)}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        {renderFields('resources')}

                        {renderFields('skills')}

                        {renderFields('savingThrows')}

                        {renderFields('damageResistances')}

                        {renderFields('statusEffectsResistances')}

                    </div>

                </div>
            }
            // rightMenu = {
            //
            //     // <ResourceMenu loadResource={loadClasss} deleteResource={deleteClass} saveResource={saveClass} resourceList={} />
            // }

        />

    )
}
