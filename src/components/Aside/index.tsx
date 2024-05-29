import Button from "../Button";
import TopUsers from "./TopUsers";
import AsideLinks from "./AsideLinks";
import { AsideContainer } from "./styles";

import { FaPlus } from 'react-icons/fa'

function Aside() {
  return (
    <AsideContainer>
      <Button variant="neutral" icon={<FaPlus size={14} />}>Create new topic</Button>

      <TopUsers />

      <AsideLinks />
    </AsideContainer>
  )
}

export default Aside
