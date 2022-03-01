import { useState, useEffect } from "react";

const getWindowDimension = ()=>({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
});

export default function useWindowDimension() {
    const [windowDimension, setWindowDimension] = useState(getWindowDimension());

    useEffect(() => {
        let scrollId;

        const handleDimensionChange = () => {
            clearTimeout(scrollId);
            scrollId = setTimeout(() => setWindowDimension(getWindowDimension()), 200);
        };

        window.addEventListener("resize", handleDimensionChange);
        return () => window.removeEventListener("resize", handleDimensionChange);
    }, []);

    return windowDimension;
}
