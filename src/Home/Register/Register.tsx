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
        navigate('/boda');
    };

    const handleContinue = () => { 
        navigate('/boda');
    }

    const handleNewRegistration = () => { 
        setSavedFullName(null); 
        setShowBanner(false);
        localStorage.removeItem('fullName')
    }

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
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Dinos tu nombre'
                        required
                    />
                    <input
                        type="text"
                        value={lastName}
                        className="registration-input"
                        onChange={(e)=> setLastName(e.target.value)}
                        placeholder="Dinos tu apellido"
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )} 
        </div>
    );
}

export default Register;