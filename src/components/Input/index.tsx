import { StyledInput, StyledLabel } from "./styles";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, name, value, onChange }: InputProps) => (
  <div>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput type={type} name={name} value={value} onChange={onChange} required />
  </div>
);

export default Input;
