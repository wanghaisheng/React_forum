import { Link } from 'react-router-dom';
import { AsideLinksContainer } from './styles';

function AsideLinks() {
  return (
    <AsideLinksContainer>
      <div className='column'>
        <Link to='/topics/explore'>Explore topics</Link>
        <Link to='/topics/search'>Help</Link>
        <Link to='/topics/my-topics'>Privacy</Link>
      </div>

      <div className='column'>
        <Link to='/topics/explore'>About</Link>
        <Link to='/topics/search'>Terms</Link>
        <Link to='/topics/my-topics'>Compass</Link>
      </div>
    </AsideLinksContainer>
  )
}

export default AsideLinks;
