import { useEffect, useState } from "react"

import { savePosition, editPosition } from "../../api/position";
import { titleValidation, descriptionValidation, locationValidation, statusValidation, budgetValidation,
    departmentValidation, recruiterValidation } from "../../helpers/positionValidator";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

import InputAdornment from '@mui/material/InputAdornment';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Alert from '@mui/material/Alert';

import { Box, Grid } from "@mui/material";

const PositionModal = ({ modalOpen, handleOpenModal, handleRefresh, modalTitle = "New Position", currentPosition, modalAction,
    refreshValues }) => {

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [titleHelperText, setTitleHelperText] = useState("");

    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionHelperText, setDescriptionHelperText] = useState("");

    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState(false);
    const [locationHelperText, setLocationHelperText] = useState("");

    const [budget, setBudget] = useState("");
    const [budgetError, setBudgetError] = useState(false);
    const [budgetHelperText, setBudgetHelperText] = useState("");

    const [status, setStatus] = useState("");
    const [statusError, setStatusError] = useState(false);
    const [statusHelperText, setStatusHelperText] = useState("");

    const [department, setDepartment] = useState(0);
    const [departmentError, setDepartmentError] = useState(false);
    const [departmentHelperText, setDepartmentHelperText] = useState("");

    const [recruiter, setRecruiter] = useState(0);
    const [recruiterError, setRecruiterError] = useState(false);
    const [recruiterHelperText, setRecruiterHelperText] = useState("");

    const [closingDate, setClosingDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const [errorOnAPI, setErrorOnAPI] = useState(false);

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

    const statuses = [
        { id: "", value: "Select" },
        { id: "archived", value: "archived" },
        { id: "closed", value: "closed" },
        { id: "draft", value: "draft" },
        { id: "open", value: "open" }
    ];

    const departments = [
        { id: 0, value: "Select" },
        { id: 1, value: "IT" },
        { id: 2, value: "Finance" },
        { id: 3, value: "Human Resources" }
    ];

    const recruiters = [
        { id: 0, value: "Select" },
        { id: 1, value: "Roberto Gómez" },
        { id: 2, value: "César Prieto" },
        { id: 3, value: "Gonzalo Lira" }
    ];

    const yesNoButtons = (
        <div>
            <Button onClick={() => (modalAction === "save") ? saveNewPosition() : editCurrentPosition()} 
                variant="contained" 
                sx={{ mr: 2 }}
            >
                {modalAction === "save" ? "Save" : "Edit"}
            </Button>
            <Button onClick={() => handleOpenModal()} variant="contained">Cancel</Button>
        </div>
    );

    const singleYesButton = (
        <div>
            <Button onClick={() => handleOpenModal()} variant="contained">Ok</Button>
        </div>
    )

    const saveNewPosition = async() => {
        if(validateFields()) {
            const position = {
                title,
                description,
                location,
                status,
                budget,
                closingDate,
                recruiterId: recruiter,
                departmentId: department    
            };

            const savedPosition = await savePosition(position);
            if(!savedPosition) {
                setErrorOnAPI(true);
            } else {
                setErrorOnAPI(false);
                handleRefresh();
                handleOpenModal();
            }
        }
    }

    const validateFields = () => {

        let isValid = true;

        const errorTitleValidation = titleValidation(title);
        if(errorTitleValidation !== "") {
            setTitleError(true);
            setTitleHelperText(errorTitleValidation);
            isValid = false;
        } else {
            setTitleError(false);
            setTitleHelperText("");
        }

        const errorDescriptionValidation = descriptionValidation(description);
        if(errorDescriptionValidation !== "") {
            setDescriptionError(true);
            setDescriptionHelperText(errorDescriptionValidation);
            isValid = false;
        } else {
            setDescriptionError(false);
            setDescriptionHelperText("");
        }

        const errorLocationValidation = locationValidation(location);
        if(errorLocationValidation !== "") {
            setLocationError(true);
            setLocationHelperText(errorLocationValidation);
            isValid = false;
        } else {
            setLocationError(false);
            setLocationHelperText("");
        }

        const errorStatusValidation = statusValidation(status);
        if(errorStatusValidation !== "") {
            setStatusError(true);
            setStatusHelperText(errorStatusValidation);
            isValid = false;
        } else {
            setStatusError(false);
            setStatusHelperText("");
        }

        const errorBudgetValidation = budgetValidation(budget);
        if(errorBudgetValidation !== "") {
            setBudgetError(true);
            setBudgetHelperText(errorBudgetValidation);
            isValid = false;
        } else {
            setBudgetError(false);
            setBudgetHelperText("");
        }

        const errorDepartmentValidation = departmentValidation(department);
        if(errorDepartmentValidation !== "") {
            setDepartmentError(true);
            setDepartmentHelperText(errorDepartmentValidation);
            isValid = false;
        } else {
            setDepartmentError(false);
            setDepartmentHelperText("");
        }

        const errorRecruiterValidation = recruiterValidation(recruiter);
        if(errorRecruiterValidation !== "") {
            setRecruiterError(true);
            setRecruiterHelperText(errorRecruiterValidation);
            isValid = false;
        } else {
            setRecruiterError(false);
            setRecruiterHelperText("");
        }

        return isValid;
    }

    const editCurrentPosition = async() => {
        const position = {
            title,
            description,
            location,
            status,
            budget,
            closingDate,
            recruiterId: recruiter,
            departmentId: department    
        };

        const editedPosition = await editPosition(currentPosition.id, position);
        if(!editedPosition) {
            setErrorOnAPI(true);
        } else {
            setErrorOnAPI(false);
            handleRefresh();
            handleOpenModal();
        }
    }

    const handleChangeTitle = (event) => {
        setTitleError(false);
        setTitleHelperText("");
        setTitle(event.target.value);
    } 

    const handleChangeDescription = (event) => {
        setDescriptionError(false);
        setDescriptionHelperText("");
        setDescription(event.target.value);
    } 

    const handleChangeLocation = (event) => {
        setLocationError(false);
        setLocationHelperText("");
        setLocation(event.target.value);
    } 

    const handleChangeBudget = (event) => {
        setBudgetError(false);
        setBudgetHelperText("");
        const budgetField = event.target.value;
        if(budgetField) {
            setBudget(parseFloat(budgetField));
        }
    } 

    const handleChangeStatus = (event) => {
        setStatusError(false);
        setStatusHelperText("");
        setStatus(event.target.value);
    };

    const handleChangeDepartment = (event) => {
        setDepartmentError(false);
        setDepartmentHelperText("");
        setDepartment(event.target.value);
    };

    const handleChangeRecruiter = (event) => {
        setRecruiterError(false);
        setRecruiterHelperText("");
        setRecruiter(event.target.value);
    };

    useEffect(() => {
        if(currentPosition) {

            setTitle(currentPosition.title);
            setDescription(currentPosition.description);
            setLocation(currentPosition.location);
            setBudget(currentPosition.budget);
            setStatus(currentPosition.status !== undefined ? currentPosition.status: "");
            setDepartment(currentPosition.departmentId !== undefined ? currentPosition.departmentId : 0);
            setRecruiter(currentPosition.recruiterId !== undefined ? currentPosition.recruiterId : 0);
            setClosingDate(currentPosition.closingDate);
            
            setTitleError(false);
            setTitleHelperText("");
            setDescriptionError(false);
            setDescriptionHelperText("");
            setLocationError(false);
            setLocationHelperText("");
            setStatusError(false);
            setStatusHelperText("");
            setBudgetError(false);
            setBudgetHelperText("");
            setDepartmentError(false);
            setDepartmentHelperText("");
            setRecruiterError(false);
            setRecruiterHelperText("");

        }
    }, [currentPosition, refreshValues]);

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

                <Grid mb={3} sx={{ display: (errorOnAPI) ? 'inline' : 'none' }}>
                    <Alert severity="error">Ooops! Something wrong happened, try later</Alert>
                </Grid>

                <TextField 
                    value={title} 
                    fullWidth 
                    size="small" 
                    sx={{ mb: 2 }} 
                    label="Title"
                    error={titleError}
                    helperText={titleHelperText}
                    variant={(modalAction === "show") ? "filled" : "outlined"}
                    onChange={handleChangeTitle}
                    slotProps={{
                        input: {
                            readOnly: (modalAction === "show") ? true : false,
                        },
                    }}
                />

                <TextField 
                    value={description} 
                    fullWidth 
                    size="small" 
                    sx={{ mb: 2 }} 
                    label="Description" 
                    error={descriptionError}
                    helperText={descriptionHelperText}
                    variant={(modalAction === "show") ? "filled" : "outlined"}
                    onChange={handleChangeDescription}
                    slotProps={{
                        input: {
                            readOnly: (modalAction === "show") ? true : false,
                        },
                    }}
                />

                <TextField 
                    value={location} 
                    fullWidth 
                    size="small" 
                    sx={{ mb: 2 }} 
                    label="Location" 
                    error={locationError}
                    helperText={locationHelperText}
                    variant={(modalAction === "show") ? "filled" : "outlined"}
                    onChange={handleChangeLocation}
                    slotProps={{
                        input: {
                            readOnly: (modalAction === "show") ? true : false,
                        },
                    }}
                />

                <Grid size={6}>
                    <FormControl fullWidth size="small" error={statusError}>
                        <InputLabel id="status-select">Status</InputLabel>
                        <Select
                            labelId="status-select"
                            value={status}
                            label="Status"
                            variant={(modalAction === "show") ? "filled" : "outlined"}
                            onChange={handleChangeStatus}
                            slotProps={{
                                input: {
                                    readOnly: (modalAction === "show") ? true : false,
                                },
                            }}
                        >
                            {
                                statuses.map((status) => {
                                    return <MenuItem value={status.id} key={status.id}>{status.value}</MenuItem>
                                })
                            }
                        </Select>
                        <FormHelperText>{statusHelperText}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={6}>
                    <TextField 
                        value={budget} 
                        size="small" 
                        sx={{ mb: 2 }} 
                        label="Budget" 
                        error={budgetError}
                        helperText={budgetHelperText}
                        variant={(modalAction === "show") ? "filled" : "outlined"}
                        type="number" 
                        onChange={handleChangeBudget} 
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                readOnly: (modalAction === "show") ? true : false,
                            },
                        }}
                    />
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ mb: 2 }}
                        label="Closing date"
                        readOnly={(modalAction === "show") ? true : false}
                        value={dayjs(closingDate)}
                        onChange={(newClosingDate) => setClosingDate(newClosingDate)}
                        slotProps={{ textField: { fullWidth: true, size:"small" } }}
                    />
                </LocalizationProvider>
                
                <Grid size={6}>
                    <FormControl fullWidth size="small" error={departmentError}>
                        <InputLabel id="department-select">Department</InputLabel>
                        <Select
                            labelId="department-select"
                            value={department}
                            label="Department"
                            variant={(modalAction === "show") ? "filled" : "outlined"}
                            onChange={handleChangeDepartment}
                            slotProps={{
                                input: {
                                    readOnly: (modalAction === "show") ? true : false,
                                },
                            }}
                        >
                            {
                                departments.map((department) => {
                                    return <MenuItem value={department.id} key={department.id}>{department.value}</MenuItem>
                                })
                            }
                        </Select>
                        <FormHelperText>{departmentHelperText}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={6} sx={{ mb: 2 }}>

                    <FormControl fullWidth size="small" error={recruiterError}>
                        <InputLabel id="recruiter-select">Recruiter</InputLabel>
                        <Select
                            labelId="recruiter-select"
                            value={recruiter}
                            label="Recruiter"
                            variant={(modalAction === "show") ? "filled" : "outlined"}
                            onChange={handleChangeRecruiter}
                            slotProps={{
                                input: {
                                    readOnly: (modalAction === "show") ? true : false,
                                },
                            }}
                        >
                            {
                                recruiters.map((recruiter) => {
                                    return <MenuItem value={recruiter.id} key={recruiter.id}>{recruiter.value}</MenuItem>
                                })
                            }
                        </Select>
                        <FormHelperText>{recruiterHelperText}</FormHelperText>
                    </FormControl>

                </Grid>

                <Box sx={{ justifyContent: "center", display: "flex" }}>
                    {(modalAction === "show") ? singleYesButton : yesNoButtons}
                </Box>
            </Grid>
        </Modal>
    );

}

export default PositionModal;