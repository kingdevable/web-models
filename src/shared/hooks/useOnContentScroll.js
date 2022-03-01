import { useState, useEffect } from "react";

const getScroll = (event) => ({
    scrollX: (event && event.target && event.target.scrollLeft) || 0,
    scrollY: (event && event.target && event.target.scrollTop) || 0,
});

export default function useOnContentScroll({
                                              onlyOnScrollEnd,
                                              scrollContainerSelector='.scroll-container'
}) {
    const [windowScroll, setWindowScroll] = useState(getScroll());

    useEffect(() => {
        let scrollId;

        const handleScroll = (event) => {
            if (onlyOnScrollEnd) {
                clearTimeout(scrollId);
                scrollId = setTimeout(() => setWindowScroll(getScroll(event)), 200);
            } else {
                setWindowScroll(getScroll(event));
            }
        };

        const $scrollContainer = document.querySelector(scrollContainerSelector);
        setTimeout(()=> $scrollContainer.addEventListener("scroll", handleScroll), 400);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return windowScroll;
}
