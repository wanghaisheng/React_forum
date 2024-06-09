import Button from "../Button";
import TopUsers from "./TopUsers";
import AsideLinks from "./AsideLinks";
import { AsideContainer } from "./styles";

import { FaPlus } from 'react-icons/fa'
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom'

function Aside() {
  const location = useLocation();

  return (
    <AsideContainer>
      {location.pathname !== '/topics/new-topic' && (
        <Link to={"/topics/new-topic"}>
          <Button variant="neutral" icon={<FaPlus size={14} />}>Create new topic</Button>
        </Link>
      )}

      <TopUsers />

      <AsideLinks />
    </AsideContainer>
  )
}

export default Aside
