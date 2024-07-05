import React, { useEffect, useState } from 'react';
import { HeaderContainer, StyledLogo, SearchButton, SearchInput } from "./styles";
import { FaBell, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/userSlice';
import { RootState } from '../../store';
import { SkeletonAvatar } from '../Loading';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const searchTerm = useSelector((state: RootState) => state.user.searchTerm);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <HeaderContainer>
      <div>
        <Link to="/" className="logo">
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
          {loading ? (
            <SkeletonAvatar />
          ) : user ? (
            <Link to={`/profile/${user?.id}`}>
              <img
                src={user.photoUrl}
                alt="User"
                className="user-photo"
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;