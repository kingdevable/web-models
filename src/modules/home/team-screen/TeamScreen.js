import "./TeamScreen.scss";
import useWindowOnScrollRatio from "../../../shared/hooks/useOnWindowScrollRatio";
import Header1 from "../../../shared/components/header1/Header1";
import Header3 from "../../../shared/components/header3/Header3";
import useWindowDimension from "../../../shared/hooks/useOnWindowDimension";
import {useMemo} from "react";
import {teamListTemp} from "./TeamScreen.data";

const teamList = [...teamListTemp];
const mobileTrigger = 1250;
const ROWS = Array.from(Array(5));
const MEMBERS_IN_ROW = 5;

export default function TeamScreen({scrollContainerHeight}) {
    const scrollRatio = useWindowOnScrollRatio({
        scrollContainerHeight,
        offsetSelector: ".team-screen"
    });

    const {windowWidth} = useWindowDimension();
    const isMobile = mobileTrigger > windowWidth;

    const {leftPadding, rowDisplayTrigger, maxRowWidth} = useMemo(()=>{
        const gutter = 60;
        const memberWidth = 180;
        const unitWidth = memberWidth + gutter;
        const leftPadding = (windowWidth - ((Math.min(MEMBERS_IN_ROW, teamList.length) * unitWidth) - gutter));
        const rowDisplayTrigger = 1 / (ROWS.length+1);
        const maxRowWidth = unitWidth * MEMBERS_IN_ROW;
        return {unitWidth, leftPadding, rowDisplayTrigger, maxRowWidth};
    }, [windowWidth]);

    const renderTeamList = ()=>{
        return <div className={'team-list'}>
            {ROWS.map((row, index)=>{
                let rowStyle = {opacity: 0, transform: `translateY(100vh)`};
                if(scrollRatio >= rowDisplayTrigger*(index +2)){
                    rowStyle = {opacity: 0, transform: `translateY(-100vh)`};
                } else if(scrollRatio >= rowDisplayTrigger*(index +1) || (index===0 && scrollRatio >=0)){
                    rowStyle = {opacity: 1, transform: 'translateY(0px)'};
                }
                return <div className={`team-row ${teamList[index].members.length === 6 ? ' six-members': ''}`} key={index} style={{...rowStyle}}>
                    {teamList[index].members
                        .map(({title, title2, description, imageName}, innerIndex) => {
                            return <div className={`team-member ${teamList[index].hideDescription? 'hide-description': ''}`} key={innerIndex}>
                                <div className={'text-container'}>
                                    <Header3 className={'title'}> {title}</Header3>
                                    <Header3 className={'title'}> {title2}</Header3><br/>
                                    <div className={'description'}> {description}</div>
                                </div>
                                <img src={`images/team-people/${imageName}.png`}/>
                            </div>
                        })}
                </div>
            })}
        </div>
    }

    return (
        <div className={"team-screen"}
             style={{overflowY:"hidden"}}>
            <div className={'white-mask'}/>
            <div className={'title'}>
                <img src='images/team-screen/title-icon.svg'/> <br/>
                <Header1>The team</Header1>
            </div>
            {renderTeamList()}
        </div>
    );
}
