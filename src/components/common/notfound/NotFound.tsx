
import { useSearchParams } from 'react-router-dom';

import './NotFound.css';

function NotFound()
{
    const query = useSearchParams()[0];
    
    if(!query.get("folder"))
        window.location.href = "/home";

    return(

        <div className="NotFound">
         <h1>Ops!</h1>
         <h3>Folder not found.</h3>
        </div>        
    )
} 


export default NotFound;