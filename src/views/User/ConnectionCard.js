import React from "react"
import {Card} from '@material-ui/core'
import HttpService from '../../services/HttpService'
import DateTimePicker from 'react-datetime-picker'

function ConnectionCard(props){
    console.log(props)

    function HandleCancel(){
        console.log(props.connection.id)
        const http = new HttpService();
        let cancel_connection_url = "user/cancel-connection/" + props.connection.id
        const tokenId = "user-token"
        let body = { email: props.thisUser.user.email }

        return http.postData(body ,cancel_connection_url,tokenId).then(data=>{
            console.log(JSON.stringify(data));
            props.updateConnection(
                {
                    connections: data.result,
                    success: true
                }
            )
            return data;
        }).catch((error)=> {
            console.log(error)
            return error; 
            });
    }

    function Update_date_time(){

    }


    return (
        <div>
        {console.log(props.connection)}
        <br></br>
        <Card>
            <div >
                {props.connection.id}
                {
                props.connection.email === props.thisUser.user.email ? 
                    <div>{props.connection.connection_email}</div> 
                    : 
                    <div>{props.connection.email}</div>  
                }

                <DateTimePicker value = {props.connection.scheduled_date_time}/>

                <button onClick = {HandleCancel}>Cancel Call</button>
                <button onClick = {Update_date_time}>Update</button>
            </div>
        </Card>
        <br></br>
        </div>
    )
}

export default ConnectionCard