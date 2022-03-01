import {useState, useMemo, useEffect} from "react";
import useOnContentScroll from "./useOnContentScroll";
import useWindowDimension from "./useOnWindowDimension";
import useOnScreen from "./useOnScreen";

export default function useWindowOnScrollRatio({scrollContainerHeight, offsetSelector, scrollContainerSelector}) {
    const {scrollY} = useOnContentScroll({scrollContainerSelector});
    const {windowHeight} = useWindowDimension();
    const isOnScreen = useOnScreen({elementSelector: offsetSelector});
    const [offsetValue, setOffsetValue] = useState(0);
    const [lastRatio, setLastRatio] = useState(0);


    const getParentNodeWithClassName = ({sourceNode, className}) => {
        if(!sourceNode.parentNode){
            return null
        } else if(sourceNode.parentNode.className === className){
            return sourceNode.parentNode;
        } else {
            return getParentNodeWithClassName({sourceNode: sourceNode.parentNode, className});
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(scrollContainerSelector){
                return setOffsetValue(0);
            }
            const offset = getParentNodeWithClassName({
                sourceNode: document.querySelector(offsetSelector),
                className: 'sticky-view-container'
            })?.offsetTop + document.querySelector(offsetSelector).offsetTop;
            setOffsetValue(offset);
        }, 20);
    }, [windowHeight]);

    useEffect(()=>{
        if(isOnScreen) {
            let containerHeight;
            if(scrollContainerSelector){
                containerHeight = document.querySelector(offsetSelector)?.scrollHeight - windowHeight;
            }else if (scrollContainerHeight) {
                if(scrollContainerHeight.indexOf('vh') > -1){
                    containerHeight = ((windowHeight * parseInt(scrollContainerHeight)) / 100) - windowHeight
                } else {
                    containerHeight = parseInt(scrollContainerHeight);
                }
            } else {
                containerHeight = document.querySelector(offsetSelector)?.scrollHeight;
            }

            if(offsetSelector === '.text-container'){
                console.log('\n\n\n\nisOnScreen ==> ', isOnScreen);
                console.log('scrollContainerHeight=> ', scrollContainerHeight);
                console.log('offsetValue=> ', offsetValue);
                console.log('scrollY=> ', scrollY);
                console.log('scrollY - offsetValue => ', scrollY - offsetValue);
                console.log('Window Height => ', windowHeight);
                console.log('container Height => ', containerHeight);
                console.log('Ratio => ', (scrollY - offsetValue) / containerHeight);
            }
            let scrollRatio = (scrollY - offsetValue) / containerHeight;
            if (scrollRatio < 0) {
                scrollRatio = (scrollY - offsetValue) / windowHeight;
            }
            setLastRatio(scrollRatio);
        }
    },[scrollY, windowHeight, isOnScreen]);

    return lastRatio;
}
