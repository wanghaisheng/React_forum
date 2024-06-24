import { SpinnerContainer } from "./styles";

import { FaCircleNotch } from 'react-icons/fa'

function Spinner() {
  return (
    <SpinnerContainer>
      <FaCircleNotch size={30} color="#fff" />
    </SpinnerContainer>
  )
}

export default Spinner;
