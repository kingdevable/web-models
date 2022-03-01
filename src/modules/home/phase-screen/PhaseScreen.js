import "./PhaseScreen.scss";
import Header1 from "../../../shared/components/header1/Header1";
import SubHeader from "../../../shared/components/sub-header/SubHeader";
import {useLayoutEffect, useState} from "react";
import useOnContentScroll from "../../../shared/hooks/useOnContentScroll";
import useWindowDimension from "../../../shared/hooks/useOnWindowDimension";

const phasePlainData = [
    {left: {header: 'Creator control // Community owned', subHeader: 'We’re building an art, media, and entertainment empire under this banner'}},
    {right: {header: '1st two IPs revealed', subHeader: 'With major talent attached + our model for shared agency and IP ownership'}},
    {
        left: {
            header: 'Influencer privileges',
            subHeader: <ul>
                <li>Pursue creative and commercial success - the agency won’t take cut</li>
                <li>Enhanced rights and funding opps. on agency projects</li>
                <li>Priority access for major IP NFTs</li>
                <li>Partnerships & experiences unique to the 6 archetypes</li>
                <li>Secret perks for hidden attributes in the collection</li>
            </ul>
        }
    },
    {right: {header: 'Metaverse 1st stories', subHeader: 'Full body avatars will arrive very soon after the launch alongside an app allowing you to embody your NFTs'}},
    {left: {header: 'IP creator fund', subHeader: 'Announcing the next 10 agency projects going into full development and the creators behind them'}}
];

const triggerBefore = 300;

export default function PhaseScreen() {
    const {scrollY} = useOnContentScroll({scrollContainerSelector: '.scroll-container'});
    const {windowHeight, windowWidth} = useWindowDimension();
    const [phaseData, setPhaseData] = useState(phasePlainData);
    const [phaseScreenTop, setPhaseScreenTop] = useState(-Infinity);

    const getPhaseDataWithTriggers = () => {
        const $phaseScreen = document.querySelector(`.phase-screen`) || {offsetTop: -Infinity};
        const phaseScreenTop = $phaseScreen.offsetTop;
        const newPhaseData = [...phaseData];
        setPhaseScreenTop(phaseScreenTop - windowHeight + triggerBefore);
        phaseData.forEach((phase, index) => {
            const phaseContent = document.querySelector(`.phase-screen .phase-${index + 1}`) || {offsetTop: -Infinity};
            const phaseContentTop = phaseContent.offsetTop;
            const absoluteTop = phaseScreenTop + phaseContentTop - windowHeight;
            phase.displayTrigger = absoluteTop + triggerBefore;
        });
        return newPhaseData;
    };

    useLayoutEffect(() => {
        setPhaseData(getPhaseDataWithTriggers());
    }, [windowHeight, windowWidth]);

    const renderContent = ({header, subHeader, content} = {}, displayTrigger) => {
        if(!header && !subHeader && !content){
            return null;
        }
        return <>
            {content ? content : <>
                <Header1 className={`${scrollY > displayTrigger  ? 'text-open-animation': ''}`}>{header}</Header1>
                <SubHeader className={`${scrollY > displayTrigger  ? 'text-open-animation': ''}`}>{subHeader}</SubHeader>
            </>}
        </>
    }

    return (
        <div className={"phase-screen"}>
            <div className={'middle-line'} style={{height: scrollY >= phaseScreenTop ? '100%' : 0}}/>
            {phaseData.map(({left, right, displayTrigger}, index) => {
                return <div className={`phase phase-${index + 1}`}
                            key={index}
                            style={{opacity: scrollY > displayTrigger ? 1 :0 }}
                    >
                    <div className={'left-container'}>
                        {renderContent(left, displayTrigger)}
                    </div>
                    <div className={'right-container'}>
                        {renderContent(right, displayTrigger)}
                    </div>
                </div>
            })}
        </div>
    );
}
