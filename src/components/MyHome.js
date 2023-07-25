import React, { useEffect, useState } from 'react'
import DataGrid from '../components/DataGrid'
import UseFormModal from './UseFormModal';
import { Box, Button, Typography } from '@mui/material';

const MyHome = () => {
  const rows = [
    { id: 1, name: 'Mark', username: 'marko', email: "marooka@hadasd.com", group: "Office", status: "locked", createdOn: "Dec 10 2022" },
    { id: 2, name: 'Essam', username: 'ezzo', email: "esammezzo@hadasd.com", group: "Manager", status: "active", createdOn: "Dec 10 2022" },
    { id: 3, name: 'Mofid', username: 'mofid11', email: "mofid223@hadasd.com", group: "Head Office", status: "inactive", createdOn: "Dec 10 2022" },
    { id: 4, name: 'Samer', username: 'samoor', email: "samoor@hadasd.com", group: "Office", status: "locked", createdOn: "Dec 10 2022" },
    { id: 5, name: 'Hany', username: 'hon', email: "hanoosh@hadasd.com", group: "Head Office", status: "active", createdOn: "Dec 10 2022" },
    { id: 6, name: 'Rady', username: 'aboreda', email: "aboreda@hadasd.com", group: "Office", status: "inactive", createdOn: "Dec 10 2022" },
    { id: 7, name: 'Kazem', username: 'kazooma', email: "kimzo@hadasd.com", group: "Manager", status: "active", createdOn: "Dec 10 2022" },
    { id: 8, name: 'Ramez', username: 'ramooz', email: "ramooza@hadasd.com", group: "Head Office", status: "active", createdOn: "Dec 10 2022" },
    { id: 9, name: 'Metwally', username: 'mito', email: "metwallymito@hadasd.com", group: "Manager", status: "inactive", createdOn: "Dec 10 2022" },
    { id: 10, name: 'Shaker', username: 'shokshok', email: "shakershokshok@hadasd.com", group: "Office", status: "active", createdOn: "Dec 10 2022" },
    { id: 11, name: 'Hamid', username: 'mido', email: "hamidmido@hadasd.com", group: "Head Office", status: "locked", createdOn: "Dec 10 2022" },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [data, SetData] = useState(rows)
  const [filteredData, SetFilteredData] = useState(rows)
  const [dataToEdit, SetDataToEdit] = useState({})
  const [editMode, setEditMode] = React.useState(false)


  const toggleModal = () => {
    setOpenModal(!openModal)
  }

  const deleteUsers = (indices) => {
    const newArray = data.filter(obj => !indices.includes(obj.id));
    SetData(newArray)
  }

  const filterUsers = (searchValue, usernameFilter, userStatus) => {
    console.log({ searchValue, usernameFilter, userStatus })
    const filteredArray = data.filter(obj =>
      (searchValue === '' || Object.values(obj).some(value => String(value).toLowerCase().includes(searchValue.toLowerCase()))) &&
      (usernameFilter === '' || obj.username.includes(usernameFilter)) &&
      (userStatus === 'any' || obj.status === userStatus)
    )
    SetFilteredData(filteredArray)
  }

  const addNewUser = (newUser) => {
    SetData(currData => [...currData, newUser])
  }

  const editUser = (newUserData) => {
    const array = data;
    var oldDataIndex = array.indexOf(dataToEdit);
    const newArray = array.map((value, index) => (index === oldDataIndex ? newUserData : value));
    SetData(newArray)
  }

  const toggleModalEditMode = (data) => {
    toggleModal()
    SetDataToEdit(data)
    setEditMode(true)
  }

  const handleEditMode = (value) => {
    setEditMode(value)
  }

  useEffect(() => {
    SetFilteredData(data)
  }, [data])

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "20px", marginBottom: "20px" }}>
        <Typography sx={{ fontWeight: "bold" }} variant={"h4"}> User Management</Typography>
        <Button variant={'contained'} color={'success'} onClick={toggleModal}>+ Add New</Button>
      </Box>
      <DataGrid
        filterUsers={filterUsers}
        deleteUsers={deleteUsers}
        toggleModalEditMode={toggleModalEditMode}
        data={filteredData} />
      <UseFormModal
        dataToEdit={dataToEdit}
        editUser={editUser}
        handleEditMode={handleEditMode}
        editMode={editMode}
        toggleModal={toggleModal}
        modalValue={openModal}
        addNewUser={addNewUser} />
    </>
  )
}

export default MyHome