import ScrollContainer from "../../modules/home/scroll-container/ScrollContainer";
import SquareScreen from "../../modules/home/square-screen/SquareScreen";
import ActorScreen from "../../modules/home/actor-screen/ActorScreen";
import CircleScreen from "../../modules/home/circle-screen/CircleScreen";
import FashionScreen from "../../modules/home/fashion-screen/FashionScreen";
import BlackScreen from "../../modules/home/black-screen/BlackScreen";
import PhaseScreen from "../../modules/home/phase-screen/PhaseScreen";
import TeamScreen from "../../modules/home/team-screen/TeamScreen";
import FooterScreen from "../../modules/home/footer-screen/FooterScreen";
import LightVideoScreen from "../../modules/home/light-video-screen/LightVideoScreen";
import './Home.scss';
import Model from "../Model";
import {useState} from "react";

export default function App() {
    const fashionScreenHeight = '2225px';
    const [isModelOpen, setIsModelOpen] = useState(true);
    return (
        <>
            <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}/>
            {!isModelOpen &&
            <div className={'home'}>
                <ScrollContainer>
                    <ActorScreen scrollContainerHeight={"600vh"} setIsModelOpen={setIsModelOpen}/>
                    <SquareScreen scrollContainerHeight={"400vh"}/>
                    <CircleScreen scrollContainerHeight={"400vh"}/>
                    <LightVideoScreen scrollContainerHeight={"400vh"}/>
                    <FashionScreen scrollContainerHeight={fashionScreenHeight} contentHeight={fashionScreenHeight}/>
                    <BlackScreen scrollContainerHeight={"600vh"} />
                    <PhaseScreen useSticky={false}/>
                    <TeamScreen scrollContainerHeight={"600vh"}/>
                    <FooterScreen scrollContainerHeight={"100vh"} hideHeaderFooter/>
                </ScrollContainer>
            </div>
            }
        </>
    );
}
