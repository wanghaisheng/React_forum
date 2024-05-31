import { Container, PrivacyInfo } from "./styles";

function PrivacyPage() {
  return (
    <Container id="about-container">
      <PrivacyInfo>
        <div>
          <h2>Important Privacy Notice</h2>
          <p>
            Welcome to Forum.pb! Your privacy is of utmost importance. As a public space for discussion, it is important to ensure you are aware of the risks associated with sharing personal and sensitive information.
          </p>
        </div>

        <div>
          <h2>Public Information</h2>
          <p>
            Please remember that all posts made to this forum are public and can be seen by anyone. Therefore, it is essential that you do not share information that could compromise your privacy or security. This includes, but is not limited to:
          </p>

          <ul>
            <li>
              Personal Information: Avoid sharing your full name, address, telephone number, SSN(CPF), ID(RG) or any other personally identifiable information.
            </li>
            <li>
              Financial Information: Never disclose credit card numbers, banking information, or any other financial information.
            </li>
            <li>
              Login Credentials: Do not publish your passwords, usernames, or any information related to your account.
            </li>
            <li>
              Sensitive Information: Medical data, extreme political opinions, or any other information that could be considered sensitive or private.
            </li>
          </ul>
        </div>
      </PrivacyInfo>
    </Container>
  )
}

export default PrivacyPage;
