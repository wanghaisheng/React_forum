import styled, { keyframes } from 'styled-components';

interface MarqueeProps {
  duration: number;
}

const marquee = keyframes`
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
`;

export const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  padding: 10px 0;

  mask-image: linear-gradient(to right, 
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 5%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

export const MarqueeText = styled.div<MarqueeProps>`
  display: inline-block;
  padding-left: 100%;
  animation: ${marquee} ${props => props.duration}s linear infinite;
  font-size: 24px;
  color: ${props => props.theme.colors.title};

  span {
    padding: 0 1rem;
  }
`;
