import "./BlackScreen.scss";
import useWindowOnScrollRatio from "../../../shared/hooks/useOnWindowScrollRatio";
import Header1 from "../../../shared/components/header1/Header1";
import {useEffect} from "react";
import {FONT_COLORS} from "../scroll-container/ScrollContainer";

export default function BlackScreen({scrollContainerHeight, setFontColor}) {
    const scrollRatio = useWindowOnScrollRatio({
        scrollContainerHeight,
        offsetSelector: ".black-screen"
    });

    useEffect(() => {
        if (scrollRatio > 0) {
            setFontColor(FONT_COLORS.WHITE);
        } else {
            setFontColor(FONT_COLORS.BLACK);
        }
    }, [scrollRatio]);

    const getTextScrollRatio = (scrollRatio)=>{
        return scrollRatio;
    };

    const getMediaScrollRatio = (scrollRatio)=>{
        return scrollRatio;
    };

    return (
        <div className={"black-screen"} style={{background: scrollRatio >= -0.8 ? "black" : "white"}}>
            <BlackScreenText scrollRatio={getTextScrollRatio(scrollRatio)}/>
            <BlackScreenMedia scrollRatio={getMediaScrollRatio(scrollRatio)}/>
        </div>
    );
}

function BlackScreenMedia({scrollRatio}) {
    return <>
        <div className={"actor-main-video"} style={{opacity: scrollRatio >= -0.8 ? 1 : 0}}>
            <BlackScreenVideo className={'main'} src={'videos/black-screen/black-screen-main-video.mp4'}/>
        </div>
        <div className={"actor-top-video"}>
            <BlackScreenVideo className={'top'} src={'videos/black-screen/black-screen-top-video.mp4'}/>
        </div>
        <div className={"actor-bottom-video"} style={{opacity: scrollRatio > 0.02 ? 1 : 0}}>
            <BlackScreenVideo className={'bottom'} src={'videos/black-screen/black-screen-bottom-video.mp4'}/>
        </div>
    </>;
}

function BlackScreenVideo({className, src}){
    return <div className={`video-container ${className}`}>
        <video
            src={src}
            autoPlay
            loop
            playsInline
            muted
        ></video>
    </div>
}

function BlackScreenText({scrollRatio}) {

    return <div className={"text-container"}>
        <img src='/images/quote-icon-3.svg' alt={'quote-icon'}/>
        {scrollRatio < 0.25 && (
            <Header1 className={`text-open-animation`}>
                Wanna make your own mark?
            </Header1>
        )}
        {scrollRatio > 0.25 && scrollRatio < 0.5 && (
            <Header1 className={`text-open-animation`}>
                Ready to use advanced avatars
            </Header1>
        )}
        {scrollRatio > 0.5 && scrollRatio < 0.75 && (
            <Header1 className={`text-open-animation`}>
                IP rights to make them web3 superstars
            </Header1>
        )}
        {scrollRatio > 0.75 && (
            <Header1 className={`text-open-animation`}>
                The full backing of the BIA
            </Header1>
        )}
    </div>
}
