import React, { useState } from 'react';
import { HeaderContainer, StyledLogo, SearchButton, SearchInput } from "./styles";
import { FaBell, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/userSlice';
import { RootState } from '../../store';

function Header() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSearchButtonClick = () => {
    if (searchTerm !== '') {
      navigate('/topics/search');
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm !== '') {
      navigate('/topics/search');
    }
  };

  return (
    <HeaderContainer>
      <div>
        <Link to={"/"} className="logo">
          <StyledLogo />
          <h2>Forum.<span>pb</span></h2>
        </Link>

        <div className={activeSearch ? 'search-container active' : 'search-container'}>
          <SearchButton onClick={handleSearchButtonClick}>
            <FaSearch size={16} />
          </SearchButton>
          <SearchInput
            type="text"
            placeholder="Search for Topics"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onClick={() => setActiveSearch(true)}
            onBlur={() => setActiveSearch(false)}
            onKeyUp={handleEnterPress}
          />
        </div>

        <div className="actions-container">
          <FaBell size={16} />
          <Link to={"/profile/1"}>
            <div className="user-photo"></div>
          </Link>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;