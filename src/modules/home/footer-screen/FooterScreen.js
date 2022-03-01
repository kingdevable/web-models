import "./FooterScreen.scss";
import Header3 from "../../../shared/components/header3/Header3";

export default function FooterScreen() {
    return (
        <div className={"footer-screen"}>
            <div className={'footer-screen-container'}>
                <Header3 className={'header-container'}>
                    COMING SOON
                </Header3>
                {/*<div className={'logo-container'}>*/}
                {/*    <img src="images/footer-screen/BadInfluence_Logo.svg" alt={'bad influence'}/>*/}
                {/*</div>*/}
                <div className={'footer-container'}>
                    <div className={'logo-container'}>
                        <img src="images/footer-screen/footer-white-logo.svg" alt={'footer-logo'}/>
                        <img src="images/twitter-logo-white.png" alt={'twitter-logo'}/>
                    </div>
                    <div className={'bottom-section'}>
                        <div>©VEOPLE 2022</div>
                        <img src="images/footer-screen/0-x.png" alt={'o-x'}/>
                    </div>
                </div>
            </div>
            <div className="video-container">
                <video src="videos/footer-video.mp4"
                    autoPlay loop playsInline muted></video>
            </div>
        </div>
    );
}
