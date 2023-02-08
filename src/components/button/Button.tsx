import './Button.css';


export interface IButtonConfig
{
    Text : string, 
    ClickEvent : ()=> void, 
    Icon? : JSX.Element, 
    Style? : React.CSSProperties
}

function Button(config : IButtonConfig)
{
    return (
    <div className="Button">        
        <button style={config.Style} onClick={config.ClickEvent}>{config.Icon}&nbsp;&nbsp;&nbsp;{config.Text}</button>   
    </div>
    );
}


export default Button;