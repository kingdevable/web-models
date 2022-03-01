import './ScrollContainer.css';
import StickyView from "../sticky-view/StickyView";
import React, {useState} from "react";
import Header from "../../../layout/header/Header";
import SideText from "../../../layout/side-text/SideText";
import Footer from "../../../layout/footer/Footer";

export const FONT_COLORS = {
    BLACK: 'black',
    WHITE: 'white'
};

export default function ScrollContainer({children}) {
    const [fontColor, setFontColor] = useState(FONT_COLORS.BLACK);

    const renderContent = ({scrollContainerHeight, child, props, hideHeaderFooter, index}) => {
        return <>
            {!hideHeaderFooter ? <>
                <Header fontColor={fontColor} index={index}/>
                {/*<SideText fontColor={fontColor} index={index}/>*/}
                <Footer fontColor={fontColor} index={index}/>
            </> : null}
            {React.cloneElement(child, {...props, scrollContainerHeight, setFontColor})}
        </>
    }

    return <div className={'scroll-container'}>
        {(Array.isArray(children) ? children : [children]).map((child, index) => {
            const {
                props: {scrollContainerHeight = '300vh', contentHeight = '100vh', hideHeaderFooter, useSticky = true},
                props,
                type: {name: contentType}
            } = child;
            return useSticky ? <StickyView
                scrollContainerHeight={scrollContainerHeight}
                key={contentType}
                contentHeight={contentHeight}
            >
                {renderContent({scrollContainerHeight, child, props, hideHeaderFooter, index})}
            </StickyView> : <React.Fragment key={contentType}>
                {renderContent({scrollContainerHeight, child, props, hideHeaderFooter, index})}
            </React.Fragment>;
        })}
    </div>
}
