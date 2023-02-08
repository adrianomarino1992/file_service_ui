import { IItem } from '../common/IItem';
import './File.css';

function File(file : IFile)
{
    return(
        <div className="File">
            {file.Path}
        </div>
    )
}


export default File;


export interface IFile extends IItem
{    
}