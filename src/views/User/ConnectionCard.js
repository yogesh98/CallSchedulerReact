import React, {useState} from "react"
import {Card} from '@material-ui/core'
import HttpService from '../../services/HttpService'
import DateTimePicker from 'react-datetime-picker'

function ConnectionCard(props){
    console.log(props.connection.scheduled_date_time)

    const [state, setState] = useState(
        {
            date: new Date(props.connection.scheduled_date_time)
        }
    )

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
        const http = new HttpService();
        let update_connection_url = "user/update-date-time"
        const tokenId = "user-token"
        let body =  { 
                    email: props.thisUser.user.email,
                    id: props.connection.id,
                    datetime: state.date
                    }
        console.log(body)
        return http.postData(body ,update_connection_url,tokenId).then(data=>{
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

    function onChange(updatedDate){
        console.log(updatedDate)
        setState({ date: updatedDate })
    } 

    function isEpoch(dateToTest){
        return (dateToTest.getFullYear() === 1969) &&
                // getMonth is 0-indexed
                (dateToTest.getMonth() === 11) &&
                (dateToTest.getDate() == 31);
    }


    return (
        <div>
        {console.log(props.connection)}
        <br></br>
        <div >
            {props.connection.id}
            {
            props.connection.email === props.thisUser.user.email ? 
                <div>{props.connection.connection_email}</div> 
                : 
                <div>{props.connection.email}</div>  
            }
            
            {
                isEpoch(state.date)?
                <DateTimePicker value = {null} onChange = {onChange}/>
                :
                <DateTimePicker value = {state.date} onChange = {onChange}/>
            }
            {/* <DateTimePicker value = {state.date} onChange = {onChange}/> */}

            <button onClick = {HandleCancel}>Cancel Call</button>
            <button onClick = {Update_date_time}>Update</button>
        </div>
        <hr></hr>
        <br></br>
        </div>
    )
}

export default ConnectionCard