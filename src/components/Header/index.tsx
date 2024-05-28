import { HeaderContainer, SearchButton, SearchInput } from "./styles";

import logoImg from '../../assets/logo.svg';
import { FaBell, FaSearch } from 'react-icons/fa'

function Header() {
  return (
    <HeaderContainer>
      <div>
        <img className="logo-image" src={logoImg} alt="Forum | Home" />

        <div className="search-container">
          <SearchButton>
            <FaSearch size={16} />
          </SearchButton>
          <SearchInput type="text" placeholder="Search for Topics" />
        </div>

        <div className="actions-container">
          <FaBell size={16} />
          <div className="user-photo">

          </div>
        </div>
      </div>
    </HeaderContainer>
  )
}

export default Header;
