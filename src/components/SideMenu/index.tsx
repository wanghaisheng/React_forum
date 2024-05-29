import { SideMenuContainer } from "./styles";
import { FaHome, FaCompass, FaQuestion } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'

function SideMenu() {
  return (
    <SideMenuContainer>
      <nav className="side-menu-content">
        <ul>
          <li className="active">
            <FaHome size={14} />
            <span>Home</span>
          </li>

          <li>
            <FaCompass size={14} />
            <span>Explore topics</span>
          </li>

          <li>
            <FaQuestion size={14} />
            <span>My topics</span>
          </li>

          <li>
            <FaMessage size={14} />
            <span>My answers</span>
          </li>
        </ul>
      </nav>
    </SideMenuContainer>
  )
}

export default SideMenu
