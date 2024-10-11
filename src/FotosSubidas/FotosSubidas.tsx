import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaGallery from './MediaGallery/MediaGallery';

export default function FotosSubidas() {
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

    return (
        <>
            <Header fullName={fullName ?? ''} subtext='Fotos Subidas'/>
            <MediaGallery/>
            <Footer currentPage={'fotos'}/>
        </>
    );
}