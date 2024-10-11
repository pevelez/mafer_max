import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'
function Register() {  
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [savedFullName, setSavedFullName] = useState<string | null>(null);

    const navigate = useNavigate();

    const [showBanner, setShowBanner] = useState<boolean>(false);

    useEffect(() => { 
        const storedFullName = localStorage.getItem('fullName')
        if (storedFullName) { 
            setSavedFullName(storedFullName);
            setShowBanner(true); // Show banner if a name exists
        }
    }, []);

    const handleSubmit = () => { 
        const fullName = `${name} ${lastName}`;
        localStorage.setItem('fullName', fullName);
        setSavedFullName(fullName);
        setName('');
        setLastName('');
        navigate('/subir');
    };

    const handleContinue = () => { 
        navigate('/subir');
    }

    const handleNewRegistration = () => { 
        setSavedFullName(null); 
        setShowBanner(false);
        localStorage.removeItem('fullName')
    }

    const MAX_CHAR_LIMIT = 15; 
    const PROHIBITED_CHARS = ['*', '/', '{', '}', '[', ']', '_', '-', '&', '\\']

    const textIsClear = (text: string) => { 
        if (text.length > 0) { 
            console.log(text)
            return !PROHIBITED_CHARS.includes(text.at(text.length - 1)!);
        } else { 
            return true;
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_CHAR_LIMIT && textIsClear(e.target.value)) {
            setName(e.target.value);
        }
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_CHAR_LIMIT && textIsClear(e.target.value)) {
            setLastName(e.target.value);
        }
    };

    return (
        <div className='registration'>
            { showBanner && savedFullName ? (
                <div>
                    <h2 className='registration-heading'>Bienvenido de vuelta, {savedFullName}</h2>
                    <p>¿Quieres registrarte con otro nombre o ingresar?</p>
                    <button className="button" onClick={handleContinue}>Ingresar</button>
                    <button className="button button-secondary" onClick={handleNewRegistration}>Entrar con otro nombre</button>
                </div>
            ) : (
                <div>
                    <h2 className="registration-heading">Regístrate para empezar a subir fotos!</h2>
                    <input
                        type='text'
                        value={name}
                        className="registration-input"
                        onChange={handleNameChange}
                        placeholder='Dinos tu nombre'
                        required
                    />
                    <input
                        type="text"
                        value={lastName}
                        className="registration-input"
                        onChange={handleLastNameChange}
                        placeholder="Dinos tu apellido"
                    />
                    <button className="button" onClick={handleSubmit}>
                        Entrar
                    </button>
                </div>
            )} 
        </div>
    );
}

export default Register;