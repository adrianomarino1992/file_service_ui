import React, { useState } from "react";

import {GiConfirmed} from 'react-icons/gi';
import {MdCancel} from 'react-icons/md';

import {useContext} from 'react';

import {EventsContext} from '../../context/GlobalContext';

import './Confirm.css';

import Button from "../../button/Button";


export interface IConfirmParams
{
    Title : string;
    Message : string;
    OKEventHandler : ()=>void, 
    CancelEventHandler : ()=>void

}

function Confirm({childrens } : { childrens : JSX.Element[]})
{
    const globalContext = useContext(EventsContext);


    const [props, setProps] = useState({
        Message: "Some message waiting to user confirm or cancel", 
        Title : "Title of confirm popup", 
        OKEventHandler : ()=> {           
        }, 
        CancelEventHandler : ()=> { 
        }, 
        Visible : false
    });
    
    const OKEvent = () =>
    {
        props.OKEventHandler();
        setProps(previos => {return {...previos, Visible : false}})

    };

    const CancelEvent = () =>
    {
        props.CancelEventHandler();
        setProps(previos => {return {...previos, Visible : false}})

    };

    globalContext.Confirm = (params : IConfirmParams)=>{
        setProps(previos => {return {...params, Visible : true}});
    }

    return(
    <>
        <div className="ConfirmBackground" style={{display : props.Visible ? "block" : "none"}}>

            <div className="Confirm">
                <h1>{props.Title}</h1>
                <h4>{props.Message}</h4>
                <Button {...{Text : "OK", key:1, Icon: <GiConfirmed style={{position : "absolute", top: "10px", left: "10px", fontSize: "15px"}} />, ClickEvent:OKEvent , Style:{position: "absolute", bottom: "15px", right: "175px"}}}/>
                <Button {...{Text : "Cancel", key:2, Icon: <MdCancel style={{position : "absolute", top: "10px", left: "10px", fontSize: "17px"}} />, ClickEvent:CancelEvent, Style:{position: "absolute", bottom: "15px", right: "15px"} }}/> 
            </div>
        </div>
        {childrens.map(s => s)}
        
    </>
    )

}


export default Confirm;