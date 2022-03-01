import "./Footer.scss";
import {FONT_COLORS} from "../../modules/home/scroll-container/ScrollContainer";

export default function Footer({fontColor}) {
  return (
    <div className={"app-footer"}>
        {fontColor === FONT_COLORS.WHITE ?
            <img src='images/header-ox-logo-white.svg' alt={"app-logo"}/>:
            <img src='images/header-ox-logo.svg' alt={"app-logo"}/>
        }
    </div>
  );
}
