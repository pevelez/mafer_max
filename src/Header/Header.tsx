import wedding_icon from './icons/wedding_icon.svg';
import './Header.css';

interface HeaderProps { 
    fullName: string
    subtext: string
}

function Header({fullName, subtext}: HeaderProps) { 
    return (
        <header className="header">
            <p  className='header-subtext'>{subtext}</p>
            <div className='header-text-and-icon'>
                <img className='header-icon' alt='wedding' src={wedding_icon}/>
                <p className="header-text">{fullName}</p>
            </div>
        </header>
    );
};

export default Header;