import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import logo from '../../../assets/img/logo.png'
import Button from 'react-bootstrap/Button';
import { Header, OpenMenu } from './Header.styles'
// import { connectWallet, getCurrentWalletConnected } from '../../../interact';

const AppHeader = ({ appLinks }) => {
   const [address, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const location = useLocation()
  const navigate = useNavigate()
  

  const launchApp = () => {
    navigate('/app');
  };

  const openMenu = () => {
    const openMenu = document.getElementById('open-menu')
    const hideMenu = document.getElementById('hide-menu')
    const sidebar = document.getElementById('sidebar')

    openMenu.style.display = 'none'
    hideMenu.style.display = 'block'
    sidebar.style.width = '220px'
  }

  const hideMenu = () => {
    const openMenu = document.getElementById('open-menu')
    const hideMenu = document.getElementById('hide-menu')
    const sidebar = document.getElementById('sidebar')

    openMenu.style.display = 'block'
    hideMenu.style.display = 'none'
    sidebar.style.width = '0'
  }

  //   useEffect(async () => {
  //   const { address, status } = await getCurrentWalletConnected();
  // }, []);

  const connectWallet = () => {
    
  }

  return (
    <Header className="app-mx">
      <Link to='/'>
        <img src={logo} alt="app logo"/>
      </Link>
      <ul>
        {/*<HashLink to="#contact">Contact</HashLink>*/}
        {appLinks.map((link, i) => location.pathname !== '/app' && <li key={i}>
          <HashLink smooth to={link.link}>{link.title}</HashLink>
        </li>)}
        {location.pathname !== '/app' && <Button onClick={launchApp}>
          Launch App
        </Button>}

        {address ? (
        <Button>Connected to {`${address.substring(0, 5)}...${address.slice(-5)}`}</Button>
        ) : (
              location.pathname === '/app' && <Button onClick={connectWallet}>Connect wallet</Button> 
        )}
        {/* {isConnected ? <Button variant='warning' onClick={disconnect}>Disconnect</Button> : null} */}
      </ul>
      <OpenMenu id="open-menu" onClick={openMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </OpenMenu>
      <div id="hide-menu" onClick={hideMenu}>
        ✖
      </div>
    </Header>
  )
}

export default AppHeader