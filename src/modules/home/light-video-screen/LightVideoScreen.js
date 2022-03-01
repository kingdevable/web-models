import "./LightVideoScreen.scss";
import useWindowOnScrollRatio from "../../../shared/hooks/useOnWindowScrollRatio";
import Header1 from "../../../shared/components/header1/Header1";
import Header3 from "../../../shared/components/header3/Header3";
import {useEffect, useRef, useState} from "react";
import {FONT_COLORS} from "../scroll-container/ScrollContainer";

export default function LightVideoScreen({scrollContainerHeight, setFontColor}) {
    const scrollRatio = useWindowOnScrollRatio({
        scrollContainerHeight, offsetSelector: ".light-video-screen"
    });

    useEffect(() => {
        if (scrollRatio > 0 && scrollRatio <1) {
            setFontColor(FONT_COLORS.WHITE);
        } else {
            setFontColor(FONT_COLORS.BLACK);
        }
    }, [scrollRatio]);

    return (
        <div className={"light-video-screen"}>
            <div className={'circle-second-part-container'}>
                <div className="video-container">
                    <video
                        className={'square-video'}
                        src={'videos/moving-lights.mp4'}
                        loop
                        autoPlay
                        playsInline
                        muted
                    ></video>
                </div>
                {scrollRatio > 0 && <SideTextContent scrollRatio={scrollRatio}/>}
            </div>
        </div>
    );
}

const texts = [
    {content: <>Six avatar<br/>archetypes.<br/></>},
    {content: <>Shared ownership of the BIA</>},
    {content: <>As we develop and fund “wild originality”</>}
];

const SideTextContent = ({scrollRatio})=>{
    return <div className={'side-text-content'}>
        {scrollRatio >= 0 && <Header1 className={"actor-text-content text-open-animation"}>
            Who do you want to be?
        </Header1>}
        {(scrollRatio >= 0 && scrollRatio < 0.33) &&
        <Header3 className={"actor-text-content text-open-animation"}>{texts[0].content}</Header3>}
        {(scrollRatio >= 0.33 && scrollRatio <= 0.66) &&
        <Header3 className={"actor-text-content text-open-animation"}>{texts[1].content}</Header3>}
        {scrollRatio > 0.66 && <Header3 className={"actor-text-content text-open-animation"}>{texts[2].content}</Header3>}
    </div>
}
