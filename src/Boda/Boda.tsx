import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCapture from './VideoCapture';

export default function Boda() {
    const [fullName, setFullName] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedFullName = localStorage.getItem('fullName');
        if (storedFullName) { 
            setFullName(storedFullName);
        } else { 
            navigate('/');
        }
    }, [navigate]);

    const handleImageUpload = () => { 
        console.log('Uploading image');
    }
    const handleVideoUpload = () => { 
        console.log('Uploading video');
    }
    return(
        <div>
             {fullName ? (
                <h1>Hola {fullName}!</h1>
            ) : (
                <h1>No te has registrado! Redirigiendote</h1>
            )}
            <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} />
            <input type="file" accept="video/*" capture="environment" onChange={handleVideoUpload} />
            <VideoCapture/>
        </div>
    );
}