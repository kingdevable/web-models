import "./Header.scss";
import {FONT_COLORS} from "../../modules/home/scroll-container/ScrollContainer";

export default function Header({fontColor}) {
    return (
        <div className={"app-header"}>
            {fontColor === FONT_COLORS.WHITE ?
                <img src='images/app-white-logo.svg' alt={"app-logo"}/>:
                <img src='images/app-black-logo.svg' alt={"app-logo"}/>}
            <div className={'right-content'}>
                {fontColor === FONT_COLORS.WHITE ?
                    <img src='images/twitter-logo-white.png' alt={"twitter-logo"}/> :
                    <img src='images/twitter-logo.svg' alt={"twitter-logo"}/>
                }
                {fontColor === FONT_COLORS.WHITE ?
                    <img src='/images/discord-logo-white.svg' alt={"discord-logo"}/> :
                    <img src='/images/discord-logo.svg' alt={"discord-logo"}/>
                }
            </div>
        </div>
    );
}
