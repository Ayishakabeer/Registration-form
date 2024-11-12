import React, { useState } from "react";
import { TextField, Button, MenuItem, FormControl, FormControlLabel, Radio, RadioGroup, InputLabel, Select, Grid, Typography, Paper, Box, Alert } from "@mui/material";

const courses = ["Biology", "Computer Science", "Commerce", "Humanities"];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    course: "",
  });

  const [error, setError] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) formErrors.mobile = "Please enter a valid 10-digit mobile number";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Please enter a valid email address";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.dob) formErrors.dob = "Date of birth is required";
    if (!formData.course) formErrors.course = "Please select a course";

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    setError({});
    setShowAlert(true);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      address: "",
      mobile: "",
      email: "",
      gender: "",
      dob: "",
      course: "",
    });
    setError({});
    setShowAlert(false); // Hide success message on cancel
  };

  return (
    <Paper elevation={3} style={{ padding: "2em", margin: "2em auto", maxWidth: 600, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
      <Typography variant="h4" gutterBottom>
        Higher Secondary Admission Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {["name", "address", "mobile", "email"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                fullWidth
                variant="standard"
                value={formData[field]}
                onChange={handleChange}
                error={Boolean(error[field])}
                helperText={error[field]}
                required
                sx={{
                  "& .MuiInput-underline:before": { borderBottomColor: "grey" },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "black" },
                  "& .MuiInput-underline:after": { borderBottomColor: "black", borderBottomWidth: 2 },
                }}
                multiline={field === "address"}
                rows={field === "address" ? 4 : 1}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth error={Boolean(error.gender)}>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {error.gender && <Typography color="error">{error.gender}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="standard"
              value={formData.dob}
              onChange={handleChange}
              error={Boolean(error.dob)}
              helperText={error.dob}
              required
              sx={{
                "& .MuiInput-underline:before": { borderBottomColor: "grey" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "black" },
                "& .MuiInput-underline:after": { borderBottomColor: "black", borderBottomWidth: 2 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="standard" error={Boolean(error.course)}>
              <InputLabel>Course</InputLabel>
              <Select
                name="course"
                value={formData.course}
                onChange={handleChange}
                label="Course"
                required
              >
                {courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
              {error.course && <Typography color="error">{error.course}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" style={{ backgroundColor: 'black' }} type="submit">
              Register
            </Button>
            <Button variant="contained" style={{ backgroundColor: 'grey' }} onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>

      {showAlert && (
        <Box mt={3}>
          <Alert severity="success">
            <strong>Data stored successfully!</strong>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </Alert>
        </Box>
      )}
    </Paper>
  );
};

export default RegistrationForm;