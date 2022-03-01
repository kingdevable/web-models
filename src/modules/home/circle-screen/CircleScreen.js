import "./CircleScreen.scss";
import useWindowOnScrollRatio from "../../../shared/hooks/useOnWindowScrollRatio";
import {useLayoutEffect, useRef, useState} from "react";
import useOnContentScroll from "../../../shared/hooks/useOnContentScroll";
import useWindowDimension from "../../../shared/hooks/useOnWindowDimension";

const textContentsStrings = [
    'A next generation 10k avatar NFT.',
    'The iconic world of visionary artist JOR ROS (adidas, Nike, Superplastic.)',
    "Meta-story by the lead writer of the latest instalment of Assassin's Creed.",
    '40+ team of 3D and technical artists, and creators.',
    'A proven founding team of entrepreneurs and creatives with VC backing.'
];

const TRIGGER_POINT_PERCENTAGE = 50;
const MOBILE_VIDEO_TRIGGER = 1080;

export default function CircleScreen({scrollContainerHeight}) {
    const scrollRatio = useWindowOnScrollRatio({
        scrollContainerHeight,
        offsetSelector: ".circle-screen"
    });
    const blackText = {color: "black", opacity: 1};
    const {scrollY} = useOnContentScroll({scrollContainerSelector: '.circle-text-container'});
    const {windowHeight, windowWidth} = useWindowDimension();
    const [textContents, setTextContents] = useState(textContentsStrings.map((record)=>({content: record, minScrollTrigger: Infinity})));

    const getTextContents = () => {
        const minTriggerHeight = Math.round(TRIGGER_POINT_PERCENTAGE * windowHeight / 100);
        const textContentsArray = [];
        textContentsStrings.forEach((content, index) => {
            const $currentTextContent = document.querySelector(`.text-content span:nth-child(${index + 1})`) || {offsetTop: -Infinity};
            const $nextTextContent = document.querySelector(`.text-content span:nth-child(${index + 2})`) || {offsetTop: Infinity};
            const minScrollTrigger = index === 0 ? -Infinity : $currentTextContent.offsetTop - minTriggerHeight; //Set the first sentence selected by default
            const maxScrollTrigger = $nextTextContent.offsetTop - minTriggerHeight;
            textContentsArray.push({content, minScrollTrigger, maxScrollTrigger});
        });
        return textContentsArray;
    };

    useLayoutEffect(() => {
        setTextContents(getTextContents());
    }, [windowHeight]);

    const isMobile = windowWidth <= MOBILE_VIDEO_TRIGGER;

    return (
        <div className={"circle-screen"}>
            <div className="video-container">
                <video
                    className={'square-video'}
                    style={{display: isMobile? 'none':'block'}}
                    src={'videos/circle-animation-video.mp4'}
                    loop
                    autoPlay
                    playsInline
                    muted
                ></video>
                <video
                    className={'square-video'}
                    style={{display: isMobile? 'block':'none'}}
                    src={'videos/circle-animation-video-mobile.mp4'}
                    loop
                    autoPlay
                    playsInline
                    muted
                ></video>
            </div>
            <div className={"circle-text-container"} style={{
                overflowY: scrollRatio > 0 && scrollRatio < 1 ? 'scroll' : 'hidden',
                display: scrollRatio >= 1 ? 'none' : 'block'
            }}>
                <div className={"text-content"}>
                    {textContents.map(({content, minScrollTrigger, maxScrollTrigger}, index) => {
                        return <span style={scrollY > minScrollTrigger && scrollY < maxScrollTrigger ? blackText : {}}
                                     key={index}>
                         {content}{' '}
                    </span>
                    })}
                </div>
            </div>
        </div>
    );
}
