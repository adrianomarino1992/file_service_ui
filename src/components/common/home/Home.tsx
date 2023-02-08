import { useEffect, useState } from "react";

import './Home.css';

function Home()
{
    const [dir, setDir] = useState("");

    useEffect(()=>{

        (async () =>
        {
          const domain = window.location.hostname;
    
          try{
    
            let getDefaultTaskResult = await fetch(`http://${domain}:5555/fs/default-dir`);
    
            let dirPath = await getDefaultTaskResult.json();
            
            if(dirPath)
                setDir(`http://${window.location.hostname}:${window.location.port}/spread?folder=${dirPath}`);
           
          }catch(err)
          {
            console.debug(err);      
          }
    
    
        })();   
    
      }, [])

      
    return (
        <div className="Home">
            <h1>File service application</h1>
            <a href={dir} ><h4>Go to desktop</h4></a>
        </div>
    )
}

export default Home;