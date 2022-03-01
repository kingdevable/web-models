import './Header1.css';

export default function Header1({children, className = '', style}){
    return <h1 className={`${className} header1`} style={style}>
        {children}
    </h1>
}
