import './SubHeader.css';

export default function SubHeader({children, className = '', style}){
    return <h4 className={`${className} sub-header`} style={style}>
        {children}
    </h4>
}
