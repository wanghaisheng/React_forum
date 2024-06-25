import { Container, FormContainer } from "./styles";
import AuthForm from "../../components/AuthForm";
import HeroSection from "../../components/HeroSection";

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

      <HeroSection />
    </Container>
  )
}

export default SignIn;
