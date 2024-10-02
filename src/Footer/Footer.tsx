import { NavLink } from 'react-router-dom';
import './Footer.css';
import upload_red from './icons/upload_red.svg';
import upload_black from './icons/upload_black.svg';
import view_red from './icons/view_red.svg';
import view_black from './icons/view_black.svg';

interface FooterProps { 
    currentPage: string
}
function Footer({currentPage}: FooterProps) {
  return (
    <footer className="footer">
        <NavLink to="/subir" style={({ isActive, isPending }) => {
            return {
                color: isActive ? "red" : "black",
                textDecoration: "none"
            }
        }}>
            <div className='icon-container'>
                <img className='footer-icon' alt='subir' src={currentPage === 'subir' ? upload_red : upload_black}/>
                <span>Subir</span>
            </div>
        </NavLink>
        <NavLink to="/fotos" style={({ isActive, isPending }) => {
            return {
                color: isActive ? "red" : "black",
                textDecoration: "none"
            }
        }}>
            <div className='icon-container'>
                <img className='footer-icon' alt='fotos' src={currentPage === 'fotos' ? view_red : view_black}/>
                <span>Fotos</span>
            </div>
        </NavLink>
    </footer>
  );
};

export default Footer;
