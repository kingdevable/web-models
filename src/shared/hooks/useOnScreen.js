const {useEffect, useState} = require("react");

export default function useOnScreen({ref = {}, elementSelector}, {rootMargin = 0,   threshold = 0} = {}) {
    const [isIntersecting, setIntersecting] = useState(false);
    const [element, setElement] = useState(ref.current);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            {rootMargin: `${rootMargin}px`, threshold}
        );
        setTimeout(()=>{
            const observeElement = element || document.querySelector(elementSelector);
            observer.observe(observeElement);
            setElement(observeElement);
        }, 200);
        // return () => {
        //     observer.unobserve(element);
        // };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return isIntersecting;
}
