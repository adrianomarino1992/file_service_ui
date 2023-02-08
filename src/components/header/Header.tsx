import './Header.css'

import {useContext} from 'react';
import {AiFillFolderAdd, AiOutlineUpload} from 'react-icons/ai';

import Button from '../button/Button';
import { EventsContext } from '../context/GlobalContext';

function Header()
{
    const globalContext = useContext(EventsContext);    

    const NewFolderEventClick = () =>
    {
      globalContext.NewFolderEventCLick();
    }

    const UploadFileClickEventHandler = () =>
    {
      globalContext.UploadFileEventHandler!();
    }

    return (
    <div className="Header">
       <h1>File server</h1>
       <h3>http://{window.location.hostname}:{window.location.port}</h3>
       <Button {...{Text : window.screen.availWidth > 700 ? "New Folder" : "", ClickEvent : NewFolderEventClick, Icon: <AiFillFolderAdd style={{fontSize: "22px", position : "absolute", top: "7px", left: "12px"}} />, Style: {
         position: "absolute",
         top: "20px",
         right: "10px",
         width: window.screen.availWidth > 700 ? "150px" : "50px"
       }}}/>
       <Button {...{Text : window.screen.availWidth > 700 ? "Upload" : "", ClickEvent : UploadFileClickEventHandler , Icon: <AiOutlineUpload style={{fontSize: "22px", position : "absolute", top: "7px", left: "12px"}} />, Style: {
         position: "absolute",
         top: "20px",
         right: window.screen.availWidth > 700 ? "170px" : "70px",
         width: window.screen.availWidth > 700 ? "150px" : "50px"
       }}}/>
    </div>
    );
}


export default Header;