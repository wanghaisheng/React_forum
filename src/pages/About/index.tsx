import { AboutInfo, Container, HeroImage } from "./styles"
import heroImage from "../../assets/about-hero-image.png"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <Container>
      <AboutInfo>
        <div>
          <section>
            <h2>About this project</h2>
            <p>This project was developed with the purpose of being an organized place for weekly questions about the Compass UOL scholarship program.</p>
            <p>Students can create topics with their questions and have them answered by the program's instructors.</p>
          </section>

          <section>
            <h2>Technologies</h2>
            <p>React, TypeScript, Styled Components and React Router Dom.</p>
          </section>
        </div>

        <section>
          <h2>Developed by</h2>
          <Link to="https://github.com/VitorHugoAntunes" target="_blank">Vitor Hugo Antunes Passos</Link>
        </section>
      </AboutInfo>
      <div>
        <HeroImage>
          <img src={heroImage} alt="Hero" />
        </HeroImage>
      </div>
    </Container>
  )
}

export default AboutPage
