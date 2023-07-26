import * as React from 'react';
import { Box, Button, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField, Typography, ThemeProvider, createTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import EditIcon from '@mui/icons-material/Edit';
import HttpsIcon from '@mui/icons-material/Https';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const columns = [
    { field: 'name', headerName: 'Name', width: 270 },
    { field: 'username', headerName: 'User Name', width: 230 },
    { field: 'email', headerName: 'Email Address', width: 350 },
    { field: 'group', headerName: 'Group', width: 220, },
    { field: 'status', headerName: 'Status', width: 170 },
    { field: 'createdOn', headerName: 'Created On', width: 170 },
];


export default function DataTable({ data, toggleModalEditMode, deleteUsers, filterUsers }) {
    const [search, setSearch] = React.useState("");
    const [usernameSearch, setUsernameSearch] = React.useState('')
    const [userState, setUserState] = React.useState("any");
    const [selectedRows, setSelectedRows] = React.useState([]);

    const getRowData = (e) => {
        toggleModalEditMode(e.row)
    }

    const getRowDataByIndex = () => {
        if (selectedRows.length == 1)
            toggleModalEditMode(data[selectedRows-1])
    }

    const searchUsersByAnyKey = (e) => {
        setSearch(e.target.value)
        filterUsers(e.target.value, usernameSearch, userState)
    }

    const handleSearchByUsername = (e) => {
        setUsernameSearch(e.target.value)
        filterUsers(search, e.target.value, userState)
    }

    const handleUserStateChange = (e) => {
        setUserState(e.target.value)
        filterUsers(search, usernameSearch, e.target.value)
    }

    const deleteDataOfUsers = () => {
        deleteUsers(selectedRows)
    }

    const handleSelectionChange = (selections) => {
        setSelectedRows(selections);
    };

    const handleDeselectAll = () => {
        setSelectedRows([]);
    };

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    cell: {
                        fontSize: "17px"
                    },
                    columnHeader: {
                        fontSize: "17px",
                        color: "#8c97ad",
                    },
                    columnHeaders: {
                        backgroundColor: "#f8fafb"
                    }
                }
            }
        }
    });

    return (
        <div style={{ height: "fit-content", width: '100%' }}>
            <Box sx={{ bgcolor: "white", border: "1px solid #dee1e8", borderRadius: "10px" }}>
                <Box sx={{ display: "flex", alignItems: "center", padding: "20px 0 0px 20px" }}>
                    <TextField
                        size="small"
                        variant="outlined"
                        onChange={searchUsersByAnyKey}
                        value={search}
                        placeholder='Search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        sx={{ marginLeft: "18px" }}
                        size="small"
                        variant="outlined"
                        placeholder='User Name'
                        value={usernameSearch}
                        onChange={handleSearchByUsername}
                    />

                    <Box sx={{ minWidth: 160, marginLeft: "18px" }}>
                        <FormControl fullWidth>
                            <Select value={userState} size="small" onChange={handleUserStateChange}>
                                <MenuItem selected value='any'>Any</MenuItem>
                                <MenuItem value="locked" >Locked</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <LocalizationProvider sx={{ paddingTop: "0px" }} dateAdapter={AdapterDayjs}>
                        <DemoContainer sx={{ marginLeft: "18px", paddingTop: "0px" }} components={['DatePicker']}>
                            <DatePicker slotProps={{ textField: { size: "small" } }} label={'All Time'} />
                        </DemoContainer>
                    </LocalizationProvider>


                    <Typography sx={{ color: "blue", marginLeft: "18px" }}>All Filters</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px", marginBottom: "10px", paddingLeft: "20px" }}>
                        <Typography variant='p' sx={{ marginRight: "10px" }}>{`${selectedRows.length} selected`}</Typography>
                        <Typography variant='p' sx={{ marginRight: "10px" }}>|</Typography>
                        {/* hereajhsdjahbsdjashbdajsdha */}
                        <IconButton onClick={getRowDataByIndex} sx={{ borderRadius: "5px", color: "#51576d", bgcolor: "#e7e9ef", marginRight: "10px" }} variant="contained" color="secondary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={deleteDataOfUsers} sx={{ borderRadius: "5px", color: "#51576d", bgcolor: "#e7e9ef", marginRight: "10px" }} variant="contained" color="secondary">
                            <DoDisturbAltIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: "5px", color: "#51576d", bgcolor: "#e7e9ef", marginRight: "10px" }} variant="contained" color="secondary">
                            <HttpsIcon />
                        </IconButton>
                        <Button sx={{ color: "#51576d", bgcolor: "#e7e9ef", textTransform: "capitalize", marginRight: "10px" }}>Assign to Profile</Button>
                        <Button sx={{ color: "#51576d", bgcolor: "#e7e9ef", textTransform: "capitalize", marginRight: "10px" }}>Assign to Group</Button>
                        <IconButton sx={{ borderRadius: "5px", color: "#51576d", bgcolor: "#e7e9ef", marginRight: "10px" }} variant="contained" color="secondary">
                            <MoreVertIcon />
                        </IconButton>
                        <Typography onClick={handleDeselectAll} variant='p' sx={{ margin: "0", marginRight: "10px", textDecoration: "underline", cursor: 'pointer' }}>Unselect all</Typography>
                    </Box >

                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px", marginBottom: "10px", paddingLeft: "20px" }}>
                        <IconButton sx={{ borderRadius: "5px", color: "#51576d", bgcolor: "#e7e9ef", marginRight: "10px" }} variant="contained" color="secondary">
                            <FileDownloadIcon />
                        </IconButton>
                    </Box>
                </Box>

                <ThemeProvider theme={theme} >
                    <DataGrid
                        rows={data}
                        columns={columns}
                        disableColumnMenu
                        pageSizeOptions={[5, 10]}
                        onRowClick={getRowData}
                        checkboxSelection
                        rowSelectionModel={selectedRows}
                        onRowSelectionModelChange={handleSelectionChange}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            }
                        }}
                    />
                </ThemeProvider>
            </Box>
        </div>
    );
}
