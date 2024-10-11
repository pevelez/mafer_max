import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import '../App.css';
import './Boda.css';

import video_white from './icons/video_white.svg';
import image_white from './icons/image_white.svg';
import FileUploadService from './FileUploadService';
import { AxiosProgressEvent } from 'axios';
import UploadModal from './UploadModal';

export default function Boda() {

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const [fullName, setFullName] = useState<string | null>(null);
    const navigate = useNavigate();
    const imageFileInputRef = useRef<HTMLInputElement>(null);
    const videoFileInputRef = useRef<HTMLInputElement>(null);

    // State for selected file and preview
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>('');

    useEffect(() => {
        const storedFullName = localStorage.getItem('fullName');
        if (storedFullName) {
            setFullName(storedFullName);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        setIsUploading(true);

        const logProgress = (progressEvent: AxiosProgressEvent) => { 
            const total = progressEvent.total || progressEvent.loaded; // Fallback to loaded if total is undefined
            const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
        
            console.log('Upload Progress' + percentCompleted.toString());
            setUploadProgress(percentCompleted);
        }

        if (!selectedFile || !fullName) {
            alert('No hay archivo seleccionado o falta el nombre completo.');
            return;
        }
        try {

            const presignedUrl = await FileUploadService.getPresignedUrl(
                fullName,
                selectedFile.name,
                selectedFile.type
            );
            await FileUploadService.uploadFileToS3(presignedUrl, selectedFile, logProgress);

            console.log('File uploaded successfully to S3');
            //alert('Archivo subido exitosamente.');
            handleCancel();
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir el archivo.');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setPreviewURL('');
    };

    const handleImageCaptureClick = () => {
        if (imageFileInputRef.current) {
            imageFileInputRef.current.click();
        }
    };

    const handleVideoCaptureClick = () => { 
        if (videoFileInputRef.current) { 
            videoFileInputRef.current.click()
        }
    }

    return (
        <>
            <Header fullName={fullName ?? ''} subtext='Capturar momento'/>
            <div className='content'>
                {!selectedFile ? (
                    <div className='capture-buttons'>
                        <div className='capture-button' onClick={handleImageCaptureClick} >
                            <button className='capture-button'> Capturar Imagen </button>
                            <img src={image_white} alt='' className='capture-icon'/>
                        </div>
                        <div className='capture-button' onClick={handleVideoCaptureClick}>
                            <button className='capture-button'> Capturar Video </button>
                            <img src={video_white} alt='' className='capture-icon'/>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileSelection}
                            ref={imageFileInputRef}
                            style={{ display: 'none' }}
                        />

                        <input
                            type="file"
                            accept="video/*"
                            capture="environment"
                            onChange={handleFileSelection}
                            ref={videoFileInputRef}
                            style={{ display: 'none' }}
                        />
                    </div>
                ) : (
                    <div className='preview'>
                        <div className='preview-actions'>
                            <h2>Vista Previa</h2>
                            <div className='preview-buttons'>
                                <div className='upload-button'>
                                    <button onClick={handleUpload}> Subir </button>
                                </div>
                                <div className='cancel-button'>
                                    <button onClick={handleCancel}> Cancelar </button>
                                </div>
                            </div>
                        </div>
                        <div className='file-container'>
                            {selectedFile.type.startsWith('image/') ? (
                                <img
                                    src={previewURL}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', height: "auto" }}
                                />
                            ) : (
                                <video
                                    src={previewURL}
                                    controls
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
            <UploadModal open={isUploading} progress={uploadProgress} />
            <Footer currentPage={'subir'} />
        </>
    );
}