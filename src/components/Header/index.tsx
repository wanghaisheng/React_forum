import { HeaderContainer, StyledLogo, SearchButton, SearchInput } from "./styles";
import { FaBell, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useState } from 'react';

function Header() {
  const [activeSearch, setActiveSearch] = useState(false);

  return (
    <HeaderContainer>
      <div>
        <Link to={"/"} className="logo">
          <StyledLogo />
          <h2>Forum.<span>pb</span></h2>
        </Link>

        <div className={activeSearch === true ? 'search-container active' : 'search-container'} onClick={() => setActiveSearch(true)} onBlur={() => setActiveSearch(false)}>
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
