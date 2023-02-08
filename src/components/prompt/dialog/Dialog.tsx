import React, { useState } from "react";

import {GiConfirmed} from 'react-icons/gi';
import {MdCancel} from 'react-icons/md';

import {useContext} from 'react';

import {EventsContext} from '../../context/GlobalContext';

import './Dialog.css';

import Button from "../../button/Button";


export interface IDialogParams
{
    Title : string;
    Message : string;    
    OKEventHandler : (text : string)=>void, 
    CancelEventHandler : (text : string)=>void,
    PlaceHolder? : string,

}

type InternalParamsType = IDialogParams & { Visible : boolean};


function Dialog({childrens } : { childrens : JSX.Element[]})
{
    const globalContext = useContext(EventsContext);    

    const [props, setProps] = useState({
        Message: `Some message waiting to user confirm or cancel 
        Some message waiting to user confirm or cancel 
        Some message waiting to user confirm or cancel 
        Some message waiting to user confirm or cancel`, 
        Title : "Title of confirm popup", 
        OKEventHandler : ()=> {           
        }, 
        CancelEventHandler : ()=> { 
        }, 
        PlaceHolder : "placeholder...",
        Visible : false
    } as InternalParamsType);

    const GetText = () : string => {

        return window.document.getElementsByTagName("input")[0].value;
    }
    
    const OKEvent = () =>
    {
        props.OKEventHandler(GetText());
        setProps(previos => {return {...previos, Visible : false}})

    };

    const CancelEvent = () =>
    {
        props.CancelEventHandler(GetText());
        setProps(previos => {return {...previos, Visible : false}})

    };

    globalContext.Dialog = (params : IDialogParams)=>{
        setProps(previos => {return {...params, Visible : true}});
    }

    return(
    <>
        <div className="DialogBackground" style={{display : props.Visible ? "block" : "none"}}>

            <div className="Dialog">
                <h1>{props.Title}</h1>
                <h4>{props.Message}</h4>
                <input type="text"placeholder={props.PlaceHolder}></input>
                <Button {...{Text : "OK", key:1, Icon: <GiConfirmed style={{position : "absolute", top: "10px", left: "10px", fontSize: "15px"}} />, ClickEvent:OKEvent , Style:{position: "absolute", bottom: "15px", right: "175px"}}}/>
                <Button {...{Text : "Cancel", key:2, Icon: <MdCancel style={{position : "absolute", top: "10px", left: "10px", fontSize: "17px"}} />, ClickEvent:CancelEvent, Style:{position: "absolute", bottom: "15px", right: "15px"} }}/> 
            </div>
        </div>
        {childrens.map(s => s)}
        
    </>
    )

}


export default Dialog;