import { ButtonContainer } from "./styles";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant: 'confirm' | 'cancel' | 'neutral' | 'transparent';
  icon?: React.ReactNode;
}

function Button({ children, type, variant, icon, ...rest }: ButtonProps) {
  return (
    <ButtonContainer type={type} className={variant}  {...rest}>
      {icon}
      {children}
    </ButtonContainer>
  )
}

export default Button
