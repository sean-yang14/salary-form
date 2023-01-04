import { Link } from 'react-router-dom'

function Header({ bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyles}>
      <div className='container'>
        <Link to='/' style={{ textDecoration: 'none', color: '#ff6a95' }}>
          <h2>The Scrubs Network</h2>
        </Link>
      </div>
    </header>
  )
}

Header.defaultProps = {
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95',
}

export default Header
