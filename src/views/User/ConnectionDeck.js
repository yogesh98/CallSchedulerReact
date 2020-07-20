import ConnectionCard from './ConnectionCard'
import HttpService from '../../services/HttpService'
import React,{useState, useEffect} from "react"

function ConnectionDeck(props){

    let firstRender = true

    let getAllConnections = props.updateConnections
    let connectionList = props.connectionsList



    useEffect(() => {
        getAllConnections();
    }, [connectionList])

    let connectionCardList = connectionList.connections.map(item => <ConnectionCard key = {item.id} connection = {item} thisUser = {props.userProf} updateConnection = {props.updateConnectionList}/>)
    if (firstRender === true){
        getAllConnections()
    }

    return (
        <div>
            {
                connectionList.success?
                    <div>
                    {connectionCardList}
                    </div>
                :
                    <div>
                    <h1>Loading...</h1>
                    </div>
            }
        </div>
    )
}

export default ConnectionDeck