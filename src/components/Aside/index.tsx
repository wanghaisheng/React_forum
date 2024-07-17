import Button from "../Button";
import TopUsers from "./TopUsers";
import AsideLinks from "./AsideLinks";
import { AsideContainer } from "./styles";

import { FaPlus } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Aside() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  function handleToCreateTopic() {
    if (!currentUser) {
      navigate('/signin');
    } else {
      navigate('/topics/new-topic')
    }
  }

  return (
    <AsideContainer>
      {location.pathname !== '/topics/new-topic' && (
        <Button onClick={handleToCreateTopic} variant="neutral" icon={<FaPlus size={14} />}>Create new topic</Button>
      )}

      <TopUsers />

      <AsideLinks />
    </AsideContainer>
  )
}

export default Aside
