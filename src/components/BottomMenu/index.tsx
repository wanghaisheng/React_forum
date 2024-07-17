import { BottomMenuContainer } from "./styles";
import { FaHome, FaCompass, FaQuestion } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { RootState } from "../../store";
import { useSelector } from "react-redux";

function BottomMenu() {
  const location = useLocation();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const links = [
    { to: "/", icon: <FaHome size={14} /> },
    { to: "/topics/explore", icon: <FaCompass size={14} /> },
    { to: "/topics/my-topics", icon: <FaQuestion size={14} /> },
    // { to: "/topics/my-answers", icon: <FaMessage size={14} />, text: "My answers" },
  ];

  return (
    <BottomMenuContainer>
      <nav className="bottom-menu-content">
        <ul>
          {links.map((link, index) => (
            (link.to === "/topics/my-topics" || link.to === "/topics/my-answers") && !currentUser ? null : (
              <Link to={link.to} key={index}>
                <li className={location.pathname === link.to ? 'active' : ''}>
                  {link.icon}
                </li>
              </Link>
            )
          ))}
        </ul>
      </nav>
    </BottomMenuContainer>
  );
}

export default BottomMenu;