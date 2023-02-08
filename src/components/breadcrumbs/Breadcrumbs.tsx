import './Breadcrumbs.css';

function Breadcrumbs({ path }: { path: string })
{
    if(!path)
        path = "loading...";

    const parts = path.split('\\');

    return(
        <div className="Breadcrumbs">
            {parts.map((p, i) => <a key={i} href={BuildURL(path ,i)}>{i !== 0 ? "\\" : ""}{p}</a>)}
        </div>
    )
}


function BuildURL(path: string, index : number)
{
    let url = "";
    const parts = path.split('\\');

    for(let i = 0; i < parts.length; i++)
    {
        if(i > index)
            break;

        url += `${i !== 0 ? "\\" : ""}${parts[i]}`;
    }

    return `/spread?folder=${url}`;
}

export default Breadcrumbs;