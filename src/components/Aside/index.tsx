import { AsideContainer } from "./styles";

interface AsideProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function Aside({ children, ...rest }: AsideProps) {
  return (
    <AsideContainer {...rest}>
      {children}
    </AsideContainer>
  )
}

export default Aside
