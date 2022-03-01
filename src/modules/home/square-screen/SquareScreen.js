import "./SquareScreen.scss";
import useWindowOnScrollRatio from "../../../shared/hooks/useOnWindowScrollRatio";
import {useEffect, useMemo} from "react";

const MAX_SCROLL_RATIO_FOR_FULL_SCREEN = 0.5

export default function SquareScreen({scrollContainerHeight}) {
    const scrollRatio = useWindowOnScrollRatio({
        scrollContainerHeight,
        offsetSelector: ".square-screen"
    });

    const squareDimension = useMemo(() => {
        if (scrollRatio > 0) {
            const scrollRatioAbs = Math.abs(scrollRatio);
            const initialHeight = 50;
            const initialWidth = 40;
            const full = 100;
            const height = Math.min(full,
                full - (initialHeight - (scrollRatioAbs * 2 * initialHeight))
            );
            const width = Math.min(full,
                full - (initialWidth - (scrollRatioAbs * 2 * initialWidth))
            );
            const dimension = {
                height: `${height}vh`,
                width: `${width}vw`
            };
            if (height >= 100) {
                dimension.border = "0px solid black";
                dimension.borderRadius = "0px";
            }
            return dimension;
        }
    }, [scrollRatio]);

    useEffect(()=>{
        const $video = document.querySelector('.square-video');
        if(scrollRatio > MAX_SCROLL_RATIO_FOR_FULL_SCREEN && scrollRatio < 1){
            $video.play();
        } else {
            $video.pause();
        }
    }, [scrollRatio]);

    return (
        <div className={"square-screen"}>
            <div className={"screen-container"}>
                <div className={"square"} style={squareDimension}>
                    <div
                        className="video-container"
                        style={{
                            borderRadius: scrollRatio >= MAX_SCROLL_RATIO_FOR_FULL_SCREEN ? 0 : undefined
                        }}
                    >
                        <video
                            className={'square-video'}
                            src={'videos/square-screen-video.mp4'}
                            loop
                            autoPlay
                            playsInline
                            muted
                        ></video>
                    </div>
                </div>
            </div>
        </div>
    );
}
