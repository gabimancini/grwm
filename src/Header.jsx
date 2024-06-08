import { Image } from "react-bootstrap"
import Logo from './grwmLogo.jpeg'
import { TiSocialTwitter, TiSocialInstagram } from "react-icons/ti";
export default function Header() {
    return (
        <header>
            <Image src={Logo} className="logo" width={300} />
            <div>
                <TiSocialTwitter size={30} fill="#515151"  />
                <TiSocialInstagram size={30} fill="#515151" />
            </div>
        </header>
    )
}