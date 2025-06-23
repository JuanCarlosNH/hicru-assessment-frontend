import { useEffect, useState } from "react"
import { getAllPositions, deletePosition } from "../api/position";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import PositionModal from "../components/modals/PositionModal";
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import moment from 'moment';
import { Grid } from "@mui/material";
import SimpleModal from "../components/modals/SimpleModal";

const PositionViewContainer = () => {
    
    const [positionList, setPositionList] = useState([]);
    const [refreshTable, setRefreshTable] = useState(0);
    const [refreshModalValues, setRefreshModalValues] = useState(0);
    const [positionModalTitle, setPositionModalTitle] = useState("");
    const [openPositionModal, setOpenPositionModal] = useState(false);
    const [confirmationModalTitle, setConfirmationModalTitle] = useState("");
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [currentPosition, setCurrentPosition] = useState({});
    const [positionModalAction, setPositionModalAction] = useState("");
    const [errorOnAPI, setErrorOnAPI] = useState(false);

    const getPositions = async() => {
        const positions = await getAllPositions(); 
        if(!positions) {
            setErrorOnAPI(true);
        } else {
            setErrorOnAPI(false);
            setPositionList(positions);
        }
    };

    const deleteCurrentPosition = async() => {
        const isDeleted = await deletePosition(currentPosition.id);
        if(!isDeleted) {
            setErrorOnAPI(true);
        } else {
            setErrorOnAPI(false);
            handleOpenConfirmationModal();
            handleRefreshTable();
        }
    }

    const handleOpenConfirmationModal = () => {
        setOpenConfirmationModal(!openConfirmationModal);
    }

    const handleRefreshTable = () => {
        setRefreshTable(prevKey => prevKey + 1);
    };

    const handleDeletePosition = (position) => {
        setCurrentPosition(position);
        setConfirmationModalTitle(`Are you sure you want to delete position: ${position.title}?`);
        handleOpenConfirmationModal();
    }

    const handleOpenPositionModal = (currentPositionModalTitle, modalAction) => {
        setCurrentPosition({});
        setRefreshModalValues(prevKey => prevKey + 1);
        setPositionModalTitle(currentPositionModalTitle);
        setPositionModalAction(modalAction);
        setOpenPositionModal(!openPositionModal);
    }

    const handleEditPosition = (position) => {
        setCurrentPosition(position);
        setRefreshModalValues(prevKey => prevKey + 1);
        setPositionModalTitle("Edit Position");
        setPositionModalAction("edit");
        setOpenPositionModal(!openPositionModal);
    }

    const handleShowPosition = (position) => {
        setCurrentPosition(position);
        setRefreshModalValues(prevKey => prevKey + 1);
        setPositionModalTitle("Position Details");
        setPositionModalAction("show");
        setOpenPositionModal(!openPositionModal);
    }
    
    useEffect(() => {
        getPositions();
    }, [refreshTable]);

    return(
        <div>

            <Grid container 
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <Grid size={8}
                    sx={{
                        justifyContent: "center"
                    }}
                >
                    <Typography variant="h4" component="h3" align="center" my={5}>
                        Available Positions
                    </Typography>
                </Grid>

                <Grid size={8} mb={3} sx={{ display: (errorOnAPI) ? 'inline' : 'none' }}>
                    <Alert severity="error">Ooops! Something wrong happened, try later</Alert>
                </Grid>

                <Grid size={8}
                    mb={3}
                    sx={{
                        justifyContent: "flex-end",
                        display: "flex"
                    }}
                >
                    <Button sx={{ textTransform: 'none' }} 
                        variant="contained" 
                        onClick={() => handleOpenPositionModal("New Position", "save")}
                    >
                        Add new Position
                    </Button>
                </Grid>

                <Grid size={8}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Location</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Budget</TableCell>
                                    <TableCell align="center">Closing Date</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {positionList.length > 0 && positionList.map((position) => (
                                    <TableRow
                                        key={position.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="center">{position.title}</TableCell>
                                        <TableCell align="center">{position.description}</TableCell>
                                        <TableCell align="center">{position.location}</TableCell>
                                        <TableCell align="center">{position.status}</TableCell>
                                        <TableCell align="center">{position.budget}</TableCell>
                                        <TableCell align="center">{moment(position.closingDate).format('MM/DD/YYYY')}</TableCell>
                                        <TableCell align="center">
                                            <Edit onClick={() => handleEditPosition(position)} />
                                            &nbsp;&nbsp;&nbsp;
                                            <Delete onClick={() => handleDeletePosition(position)} />
                                            &nbsp;&nbsp;&nbsp;
                                            <VisibilityIcon onClick={() => handleShowPosition(position)}/>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <PositionModal 
                modalOpen={openPositionModal}
                handleOpenModal={setOpenPositionModal}
                handleRefresh={handleRefreshTable}
                modalTitle={positionModalTitle}
                currentPosition={currentPosition}
                modalAction={positionModalAction}
                refreshValues={refreshModalValues}
            />

            <SimpleModal
                modalOpen={openConfirmationModal}
                handleOpenModal={handleOpenConfirmationModal}
                modalTitle={confirmationModalTitle}
                afterConfirmation={deleteCurrentPosition}
            />

        </div>
    );

};

export default PositionViewContainer;