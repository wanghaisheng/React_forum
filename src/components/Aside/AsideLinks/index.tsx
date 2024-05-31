import { Link } from 'react-router-dom';
import { AsideLinksContainer } from './styles';

function AsideLinks() {
  return (
    <AsideLinksContainer>
      <div className='column'>
        <Link to='/topics/explore'>Explore topics</Link>
        <Link to='/help'>Help</Link>
        <Link to='/privacy'>Privacy</Link>
      </div>

      <div className='column'>
        <Link to='/about'>About</Link>
        <Link to='/terms'>Terms</Link>
        <Link to='https://compass.uol/pt/home/' target='_blank'>Compass UOL</Link>
      </div>
    </AsideLinksContainer>
  )
}

export default AsideLinks;
