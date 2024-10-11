import { Modal, Box, LinearProgress, Typography } from '@mui/material';

type UploadModalProps = { 
    open: boolean
    progress: number
}

function UploadModal({open, progress}: UploadModalProps) { 
    return(
        <Modal open={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
              variant="h6"
              gutterBottom
              sx={{
                  fontFamily: 'BoldFont',
                  textAlign: 'center', // Center the text
              }}
          >
              Subiendo Archivo!
          </Typography>
          <Typography
              variant="body2"
              sx={{
                  fontFamily: 'BoldFont',
                  textAlign: 'center', // Justify the text
              }}
          >
            Por favor no cierres el navegador
        </Typography>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="textSecondary" align="center" mt={2} sx={{fontFamily: 'BoldFont'}}
          >
            {`${progress}%`}
          </Typography>
          {progress === 100 && ( 
                    <Typography
                        variant="body1"
                        color="success.main"
                        align="center"
                        mt={2}
                        sx={{ fontFamily: 'BoldFont' }}
                    >
                        ¡Archivo subido con éxito!
                    </Typography>
                )}
        </Box>
      </Modal>
    );
};
export default UploadModal;