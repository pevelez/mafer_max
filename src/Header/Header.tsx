import wedding_icon from './icons/wedding_icon.svg'
import './Header.css'

interface HeaderProps { 
    fullName: string
    subtext: string
}

function Header({fullName, subtext}: HeaderProps) { 
    return (
        <header className="header">
            <div className='header-top'>
                <img className='header-icon' alt='wedding' src={wedding_icon}/>
                <p className="header-text">{fullName}</p>
            </div>
            <p  className='header-subtext'>{subtext}</p>
        </header>
    );
};

export default Header;