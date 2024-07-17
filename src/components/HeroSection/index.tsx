import Marquee from "../Marquee";
import heroImage from '../../assets/hero-image.png';

import { Description, HeroContainer, HeroImage, HeroTitle, StyledLogo } from "./styles";

function HeroSection() {
  return (
    <HeroContainer>
      <HeroTitle>
        <h2>Welcome to</h2>
        <div>
          <StyledLogo />
          <h2>
            <span>Forum.</span>pb
          </h2>
        </div>
      </HeroTitle>

      <HeroImage src={heroImage} alt="" />

      <Description>
        Be part of our community and share knowledge with others. Start your journey now and clear your doubts about:
      </Description>

      <Marquee duration={30} />
    </HeroContainer>
  )
}

export default HeroSection;
