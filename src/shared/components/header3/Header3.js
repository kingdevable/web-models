import './Header3.css';

export default function Header3({children, className='', style={}}){
    return <h3 className={`${className} header3`} style={style}>
        {children}
    </h3>
}
