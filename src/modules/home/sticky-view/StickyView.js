import './StickyView.css';

export default function StickyView({children, scrollContainerHeight, contentHeight}){
    return <div className={'sticky-view-container'} style={{height: scrollContainerHeight}}>
        <div className={'sticky-view'} style={{height: contentHeight}}>
            {children}
        </div>
    </div>
}
