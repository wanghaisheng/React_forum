import { BottomMenuContainer } from "./styles";

interface AsideProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function BottomMenu({ children, ...rest }: AsideProps) {
  return (
    <BottomMenuContainer {...rest}>
      {children}
    </BottomMenuContainer>
  )
}

export default BottomMenu
