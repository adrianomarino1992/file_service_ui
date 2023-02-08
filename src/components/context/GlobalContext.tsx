import {createContext} from 'react';
import { IConfirmParams } from '../prompt/confirm/Confirm';
import { IDialogParams } from '../prompt/dialog/Dialog';

export interface IGlobalEvents
{
    NewFolderEventCLick : () => void;
    Confirm? : (params : IConfirmParams)=>void;
    Dialog? : (params : IDialogParams)=>void;
    UploadFileEventHandler? : () => void;
}

const defaulGlobalEvents = { NewFolderEventCLick : ()=>{ }};

export const EventsContext = createContext<IGlobalEvents>(defaulGlobalEvents);


function GlobalContextProvider({childrens} : {childrens : JSX.Element[]})
{
    
    return(
        <EventsContext.Provider value={defaulGlobalEvents}>
            { childrens.map(s => <div key={Math.random()}>{s}</div>)}
        </EventsContext.Provider>
    )
}


export default GlobalContextProvider;