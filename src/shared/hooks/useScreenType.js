import useWindowDimension from "./useOnWindowDimension";
import {SCREEN_SIZES_PIXELS} from "../constants";
import {useEffect, useState} from "react";

export default function useScreenType() {
    const {windowWidth} = useWindowDimension();
    const [screenState, setScreenState] = useState({isMobile: true});

    useEffect(()=>{
        const isMobile = windowWidth < SCREEN_SIZES_PIXELS.MOBILE;

        if(isMobile !== screenState.isMobile){
            setScreenState({isMobile});
        }
    },[windowWidth]);

    return screenState;
}
