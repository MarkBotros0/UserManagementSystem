import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, MenuItem, Select, Typography, styled } from '@mui/material';
import useForm from './useForm';

export default function useFormModal({ modalValue, toggleModal, addNewUser, dataToEdit, editMode, handleEditMode, editUser }) {

    const [id, setId] = React.useState(12)

    const validateForm = (values) => {
        let errors = {};

        if (values.name.length < 4) {
            errors.name = 'Name must be more than 4 characters';
        }
        if (values.username.length < 4) {
            errors.username = 'username must be more than 4 characters';
        }
        if (values.status === ' ') {
            errors.status = 'User Status is required';
        }

        if (values.group === ' ') {
            errors.group = 'User Group is required';
        }

        if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

    const submitForm = (formValues) => {
        if (editMode) {
            editUser({ ...formValues, id: dataToEdit.id, createdOn: dataToEdit.createdOn })
            console.log(formValues)
            handleEditMode(false)
            toggleModal()

        } else {
            const userObj = {
                ...formValues,
                id: id,
                createdOn: (`${new Date()}`).slice(4, 15)
            }
            addNewUser(userObj)
            setId((prev) => prev++)
        }
        toggleModal()
    }

    const { values, setValues, handleChange, handleSubmit } = useForm(
        {
            name: '',
            username: '',
            email: '',
            group: ' ',
            status: ' '
        }, submitForm, validateForm
    )

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
            setValues({
                name: dataToEdit.name,
                username: dataToEdit.username,
                email: dataToEdit.email,
                group: dataToEdit.group,
                status: dataToEdit.status,
            })
        }
        else {
            resetState()
        }
    }, [editMode, dataToEdit])

    const resetState = () => {
        setValues({
            name: '',
            username: '',
            email: '',
            group: ' ',
            status: ' ',
        })
    }

    const handleClose = () => {
        toggleModal()
        if (editMode) {
            handleEditMode(false)
        }
    }

    return (
        <div>

            <Dialog sx={{ minHeight: "fit-content" }} open={modalValue} onClose={handleClose}>
                {!editMode ? <DialogTitle sx={{ bgcolor: "#050e2d", color: "white", fontSize: "26px", padding: "24px", marginBottom: "25px" }}>Add New User</DialogTitle> :
                    <DialogTitle sx={{ bgcolor: "#050e2d", color: "white", fontSize: "26px", padding: "24px", marginBottom: "25px" }}>Edit User</DialogTitle>}
                <DialogContent sx={{ bgcolor: "#f8fafb", borderBottom: "1px solid #dbdee6" }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <Typography variant='h6' style={{ color: "black" }}>Full Name</Typography>
                            <TextField
                                name='name'
                                onChange={handleChange}
                                value={values.name}

                                required
                                placeholder="Enter full name"
                                sx={{ width: "100%", mt: "5px" }}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: "20px" }}>
                            <Typography variant='h6' style={{ color: "black" }}>User Name</Typography>
                            <TextField
                                required
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                placeholder="Enter username"
                                sx={{ width: "100%", mt: "5px" }}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: "20px" }}>
                            <Typography variant='h6' style={{ color: "black" }}>Email Address</Typography>
                            <TextField
                                required
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                placeholder="Email Address"
                                sx={{ width: "100%", mt: "5px" }}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: "20px" }}>
                            <Typography variant='h6' style={{ color: "black" }}>User Group</Typography>
                            <Select
                                onChange={handleChange}
                                value={values.group} required
                                name='group'
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
                                onChange={handleChange}
                                value={values.status}
                                name='status'
                                required
                            >
                                <MenuItem disabled value=" " ><Typography sx={{ opacity: "0.5" }}>Choose Profile</Typography> </MenuItem>
                                <MenuItem value="locked" >Locked</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                            {/* <Box sx={{ cursor: "pointer" }} onClick={resetState}>
                                <Typography sx={{ fontWeight: "bold", textDecoration: "underline", marginLeft: "20px", fontSize: "18px" }}> Reset Fields</Typography>
                            </Box> */}
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <BlackTextButton onClick={handleClose} variant="outlined">Cancel</BlackTextButton>
                                {!editMode ? <Button size='large' type='submit'
                                    sx={{
                                        '&:hover': { backgroundColor: "#22a565" },
                                        margin: "20px 20px 10px 0", fontSize: "17px", color: "white", bgcolor: "#22a565", textTransform: "capitalize"
                                    }}>Add User</Button> :
                                    <Button size='large' type='submit' sx={{
                                        '&:hover': { backgroundColor: "#22a565" },
                                        margin: "20px 20px 10px 0", fontSize: "17px", color: "white", bgcolor: "#22a565", textTransform: "capitalize"
                                    }}
                                    >Edit User</Button>}
                            </Box>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
