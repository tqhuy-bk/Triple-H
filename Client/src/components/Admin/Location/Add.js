import React, { useEffect, useState } from "react";
import { IconButton, Paper } from "@material-ui/core";

import { Link } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import FormLocationAdmin from "./Form";

function AdminAddLocation(props) {


  const [location, setLocation] = useState({
    name: '',
    images: [],
    fullname: '',
    province: null,
    position: {
      lng: 108,
      lat: 16
    },
    information: ''
  })

  useEffect(() => {
    document.title = 'Admin - Thêm địa điểm'
  }, [])


  return (
    <Paper style={{ marginTop: 120, marginInline: 50, marginBottom: 30, padding: 30 }}>
      <IconButton component={Link} to={`/admin/location`} title="Quay lại">
        <ArrowBack />
      </IconButton>

      <FormLocationAdmin location={location} setLocation={setLocation} mode='add' />
    </Paper>
  );
}


export default AdminAddLocation;
