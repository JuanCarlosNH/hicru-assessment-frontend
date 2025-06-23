import Modal from '@mui/material/Modal';
import { Box, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SimpleModal = ({modalOpen, handleOpenModal, modalTitle, afterConfirmation}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        justifyContent: "center"
    };

    return(
        <Modal
            open={modalOpen}
            onClose={() => handleOpenModal()}
            aria-labelledby="modal-title"
        >
            <Grid container columnSpacing={1} sx={style}>

                <Typography id="modal-title" variant="h6" component="h3" align="center" mb={3}>
                    {modalTitle}
                </Typography>

                <Box sx={{ justifyContent: "center", display: "flex" }}>
                    <Button onClick={() => afterConfirmation()} 
                        variant="contained" 
                        sx={{ mr: 2 }}
                    >Yes</Button>
                    <Button onClick={() => handleOpenModal()} variant="contained">No</Button>
                </Box>
            </Grid>
        </Modal>
    );

}

export default SimpleModal;