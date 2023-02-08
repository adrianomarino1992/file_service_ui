
import {AiFillFolderAdd, AiFillFile} from 'react-icons/ai'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useContext, useRef, ChangeEvent } from 'react';
import { IItem, Type } from '../common/IItem';


import { toast } from 'react-toastify';
 
import 'react-confirm-alert/src/react-confirm-alert.css';

import './Directory.css'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { EventsContext } from '../context/GlobalContext';


export interface IDirectory
{
    Path : string;
    Childrens? : string[],
    Files? : string[]
}

function Directory (){

    var dirRef = useRef({} as IDirectory);

    const [dir, setDir] = useState({} as IDirectory);

    const [query] = useSearchParams();

    const globalContext = useContext(EventsContext);        

    const inputRef = useRef<HTMLInputElement | null>(null);     
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        if (!e.target.files) {
          return;
        }    

        let file = e.target.files[0];
        
        globalContext.Confirm!({

            Title: "File upload",
            Message: `Are you sure you want upload ${file?.name} ?`,
            OKEventHandler: async ()=>{

               
                let formData = new FormData();

                formData.append('file', file);

                let uploadFileTask = await fetch(`http://${window.location.hostname}:5555/fs/upload?folder=${dir.Path}&filename=${file.name}`, 
                {
                    method: "POST", 
                    body: formData
                });

                let result = await uploadFileTask.json();

                if(result.created)
                {
                    dirRef.current.Files!.push(`${dir.Path}\\${file.name}`);

                    let newRoot : IDirectory = 
                    {
                      Path: dir.Path!, 
                      Childrens : dirRef.current.Childrens, 
                      Files: dirRef.current.Files
                    };

                    setDir(newRoot);

                    toast("File uploaded!");

                }else{

                    toast("Error while trying upload file");
                }


            }, 
            CancelEventHandler: ()=>
            {

            }
        })
       
    };

    useEffect(()=>{
        

        (async()=>{

           let dirPath = query.get("folder");
           
           globalContext.UploadFileEventHandler = () =>
           {            
                inputRef.current?.click();
           }

            globalContext.NewFolderEventCLick = ()=> {
                
                globalContext.Dialog!({
                    Title : "Create new folder!", 
                    Message : "Type the ame of new folder ", 
                    PlaceHolder: "folder name...", 
                    CancelEventHandler : folder =>{ }, 
                    OKEventHandler : async folder =>
                    { 
                        if(!folder || folder.trim() === "")
                        {
                            toast("The folder name is invalid");
                            return;
                        }

                       let createFolderTask = await fetch(`http://${window.location.hostname}:5555/fs/createFolder?folder=${dirPath}\\${folder}`);

                       let response = await createFolderTask.json();

                       if(!response || response.error)
                       {
                         toast("Error to create the folder");
                         return;

                       }else{                                    

                        dirRef.current.Childrens!.push(`${dirPath}\\${folder}`);

                        let newRoot : IDirectory = 
                        {
                          Path: dirPath!, 
                          Childrens : dirRef.current.Childrens, 
                          Files: dirRef.current.Files
                        };

                        setDir(newRoot);

                        toast("Folder creadted!")
                        
                       }


                    }        
                  });
            };

           if(!dirPath || dirPath.trim() === '')
               window.location.href=`/`;
            
               
            if(dir.Childrens)
                return;

           let getFoldersTaskResult = await fetch(`http://${window.location.hostname}:5555/fs/folders?folder=${dirPath}`);

           let folders = await getFoldersTaskResult.json() as string[];

           let getFilesTaskResult = await fetch(`http://${window.location.hostname}:5555/fs/files?folder=${dirPath}`);

           let files = await getFilesTaskResult.json() as string[];           

           let root : IDirectory = 
            {
              Path: dirPath!, 
              Childrens : folders, 
              Files: files
            };
                  
            dirRef.current = root;
            setDir(root);

        })()

    }, []);
    
    return(
        <div className="Directory" style={{ display: dir.Childrens || dir.Files ? 'block' : 'none' }}>           
            <Breadcrumbs {...{path : dir.Path}} />
            <input ref={inputRef} onChange={handleFileChange} type={'file'} hidden></input>
            {dir.Childrens?.map(s => <ItemCard key={Math.random()} {...{Path : s, Type : Type.DIRECTORY}} />) }
            {dir.Files?.map(s => <ItemCard key={Math.random()} {...{Path : s, Type : Type.FILE}} />) }
        </div>
    )
}



function ItemCard(item : IItem)
{
    if(item.Type === Type.FILE)
    {
        return(<h1 className='FileCard' onClick={(e)=> window.location.href=`http://${window.location.hostname}:5555/fs/download?file=${item.Path}`}><AiFillFile style={{width: "25px", fontSize: "15px" }}/>{GetName(item.Path)}</h1>);
    }

    return(<h1 className='DirectoryCard' onClick={(e)=> window.location.href=`/spread?folder=${item.Path}`}><AiFillFolderAdd style={{width: "25px", fontSize: "15px" }} /> {GetName(item.Path)} </h1>);
}
   

function GetName(path : string)
{
    let indexOfPathSeparatorChar : number = path.lastIndexOf('\\');

    if(indexOfPathSeparatorChar === -1)
        return path;
    
    return path.substring(++indexOfPathSeparatorChar, path.length);

}

export default Directory;