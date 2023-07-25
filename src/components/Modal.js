import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, MenuItem, Select, Typography, styled } from '@mui/material';

export default function Modal({ modalValue, toggleModal, addNewUser, dataToEdit, editMode, handleEditMode, editUser }) {

    const [name, SetName] = React.useState('')
    const [username, SetUsername] = React.useState('')
    const [email, SetEmail] = React.useState('')
    const [group, SetGroup] = React.useState('')
    const [id, setId] = React.useState(12)
    const [status, setStatus] = React.useState('')

    const BlackTextButton = styled(Button)(({ theme }) => ({
        color: '#000',
        border: `1px solid ${theme.palette.grey[500]}`,
        margin: "20px 20px 10px 0",
        fontSize: "17px",
        textTransform: "capitalize",
        fontWeight: "bold"
    }));

    React.useEffect(() => {
        if (editMode) {
            SetName(dataToEdit.name)
            SetUsername(dataToEdit.username)
            SetEmail(dataToEdit.email)
            SetGroup(dataToEdit.group)
            setStatus(dataToEdit.status)
        }
    }, [dataToEdit, editMode])

    React.useEffect(() => {
        if (editMode) {
            SetGroup(dataToEdit.group)
            setStatus(dataToEdit.status)
        } else {
            SetGroup(" ")
            setStatus(" ")
        }
    }, [modalValue])

    const resetState = () => {
        SetUsername('')
        SetName('')
        SetEmail('')
        SetGroup(' ')
        setStatus(' ')
    }

    const saveUserEdit = () => {
        const newUserData = {
            name,
            username,
            email,
            group,
            id: dataToEdit.id,
            status,
            createdOn: dataToEdit.createdOn
        }
        editUser(newUserData)
        handleEditMode()
        toggleModal()
    }

    const addUser = () => {
        const userObj = {
            name,
            username,
            email,
            group,
            id,
            status,
            createdOn: (`${new Date()}`).slice(4, 15)
        }
        resetState()
        setId(id + 1)
        addNewUser(userObj)
        toggleModal()
    }

    const handleClose = () => {
        toggleModal()
        resetState()
        if (editMode) {
            handleEditMode()
        }
    }


    return (
        <div>

            <Dialog sx={{ minHeight: "fit-content" }} open={modalValue} onClose={handleClose}>
                {!editMode ? <DialogTitle sx={{ bgcolor: "#050e2d", color: "white", fontSize: "26px", padding: "24px", marginBottom: "25px" }}>Add New User</DialogTitle> :
                    <DialogTitle sx={{ bgcolor: "#050e2d", color: "white", fontSize: "26px", padding: "24px", marginBottom: "25px" }}>Edit User</DialogTitle>}
                <DialogContent sx={{ bgcolor: "#f8fafb", borderBottom: "1px solid #dbdee6" }}>

                    <FormControl fullWidth>
                        <Typography variant='h6' style={{ color: "black" }}>Full Name</Typography>
                        <TextField
                            onChange={(e) => SetName(e.target.value)}
                            value={name}
                            required
                            id="Name"
                            placeholder="Enter full name"
                            sx={{ width: "100%", mt: "5px" }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: "20px" }}>
                        <Typography variant='h6' style={{ color: "black" }}>User Name</Typography>
                        <TextField
                            required
                            value={username}
                            onChange={(e) => SetUsername(e.target.value)}
                            id="username"
                            placeholder="Enter username"
                            sx={{ width: "100%", mt: "5px" }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: "20px" }}>
                        <Typography variant='h6' style={{ color: "black" }}>Email Address</Typography>
                        <TextField
                            required
                            id="email"
                            value={email}
                            onChange={(e) => SetEmail(e.target.value)}
                            placeholder="Email Address"
                            sx={{ width: "100%", mt: "5px" }}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: "20px" }}>
                        <Typography variant='h6' style={{ color: "black" }}>User Group</Typography>
                        <Select
                            value={group}
                            onChange={(e) => SetGroup(e.target.value)}
                            required
                            defaultValue='User Group'
                        >
                            <MenuItem disabled value=" " ><Typography sx={{ opacity: "0.5" }}>Choose User Group</Typography></MenuItem>
                            <MenuItem value="Office" >Office</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Head Office">Head Office</MenuItem>
                        </Select>

                    </FormControl>

                    <FormControl fullWidth sx={{ mt: "20px", mb: "20px" }}>
                        <Typography variant='h6' style={{ color: "black" }}>Assign Profile</Typography>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <MenuItem disabled value=" " ><Typography sx={{ opacity: "0.5" }}>Choose Profile</Typography> </MenuItem>
                            <MenuItem value="locked" >Locked</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                    <Box sx={{ cursor: "pointer" }} onClick={resetState}>
                        <Typography sx={{ fontWeight: "bold", textDecoration: "underline", marginLeft: "20px", fontSize: "18px" }}> Reset Fields</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <BlackTextButton onClick={handleClose} variant="outlined">Cancel</BlackTextButton>
                        {!editMode ? <Button size='large'
                            sx={{
                                '&:hover': { backgroundColor: "#22a565" },
                                margin: "20px 20px 10px 0", fontSize: "17px", color: "white", bgcolor: "#22a565", textTransform: "capitalize"
                            }} onClick={addUser}>Add User</Button> :
                            <Button size='large'
                                sx={{
                                    '&:hover': { backgroundColor: "#22a565" },
                                    margin: "20px 20px 10px 0", fontSize: "17px", color: "white", bgcolor: "#22a565", textTransform: "capitalize"
                                }}
                                onClick={saveUserEdit}>Edit User</Button>}
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}
