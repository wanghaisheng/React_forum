import { MarqueeContainer, MarqueeText } from "./styles";

interface MarqueeProps {
  duration: number;
}

function Marquee({ duration }: MarqueeProps) {
  const words = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Redux",
    "AWS"
  ]

  return (
    <MarqueeContainer>
      <MarqueeText duration={duration}>
        {words.map((word, index) => (
          <span key={index}>{word}</span>
        ))}
      </MarqueeText>
    </MarqueeContainer>
  );
}

export default Marquee;
