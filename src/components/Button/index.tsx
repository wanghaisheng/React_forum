import { ButtonContainer } from "./styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'confirm' | 'cancel' | 'neutral' | 'transparent';
  icon?: React.ReactNode;
}

function Button({ children, variant, icon, ...rest }: ButtonProps) {
  return (
    <ButtonContainer className={variant}  {...rest}>
      {icon}
      {children}
    </ButtonContainer>
  )
}

export default Button
