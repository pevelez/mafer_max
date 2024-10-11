// FileUploadService.ts

import axios, { AxiosProgressEvent } from 'axios';

class FileUploadService {
    static async getPresignedUrl(fullName: string, fileName: string, fileType: string): Promise<string> {
        try {
            const response = await axios.post(
                'https://bnbhu7h8gb.execute-api.us-west-1.amazonaws.com/prod/signedUrls/',
                {
                    fullName,
                    fileName,
                    fileType
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status !== 200) {
                throw new Error('Error getting presigned URL');
            }

            return response.data.presignedUrl;
        } catch (error) {
            console.error('Error getting presigned URL:', error);
            throw error;
        }
    }

    static async uploadFileToS3(
        presignedUrl: string,
        file: File,
        onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
    ) {
        try {
            const response = await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                },
                onUploadProgress
            });

            if (response.status !== 200) {
                throw new Error('Upload to S3 failed');
            }
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw error;
        }
    }
}

export default FileUploadService;
