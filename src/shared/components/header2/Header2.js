import './Header2.css';

export default function Header2({children, className= '', style={}}){
    return <h2 className={`${className} header2`} style={style}>
        {children}
    </h2>
}
