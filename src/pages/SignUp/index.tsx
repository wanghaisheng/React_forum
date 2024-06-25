import { Container, FormContainer } from "./styles";
import AuthForm from "../../components/AuthForm";
import HeroSection from "../../components/HeroSection";

function SignUp() {
  return (
    <Container>
      <FormContainer>
        <AuthForm
          title="Sign Up"
          buttonText="Sign Up"
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
            {
              label: "Confirm Password",
              type: "password",
              name: "confirmPassword",
              value: "",
              onChange: (event) => console.log(event.target.value),
            },
          ]}
          socialButtons
          bottomLink="signin"
          width="500px"
        />
      </FormContainer>

      <HeroSection />
    </Container>
  )
}

export default SignUp;
