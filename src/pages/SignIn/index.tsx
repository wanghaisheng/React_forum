import { Container, Description, FormContainer, HeroContainer, HeroImage, HeroTitle, StyledLogo } from "./styles";
import heroImage from '../../assets/hero-image.png';
import Marquee from "../../components/Marquee";
import AuthForm from "../../components/AuthForm";

function SignIn() {
  return (
    <Container>
      <FormContainer>
        <AuthForm
          title="Sign In"
          buttonText="Sign In"
          onSubmit={(event) => event.preventDefault()}
          formFields={[
            {
              label: "Email",
              type: "email",
              name: "email",
              value: "",
              onChange: (event) => console.log(event.target.value),
            },
            {
              label: "Password",
              type: "password",
              name: "password",
              value: "",
              onChange: (event) => console.log(event.target.value),
            },
          ]}
          socialButtons
          bottomLink="signup"
          width="500px"
        />
      </FormContainer>

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
    </Container>
  )
}

export default SignIn;
