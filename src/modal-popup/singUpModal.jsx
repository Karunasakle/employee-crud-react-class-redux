import React,{Component} from 'react'
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { TextField, Button, MenuItem, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('FirstName is Required'),
    lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('LastName is Required'),
    email: Yup.string().email('Invalid Email Address').required('Email is Required'),
    phone: Yup.number().required('Number is Required')
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10),
    password: Yup.string().required('Password is Required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(passwordRules, { message: "Please create a stronger password" }),
    city:Yup.string().required('City is Required'),
    gender:Yup.boolean().required("Gender is Required")
});

export default class singUpModal extends Component {
    constructor(props){
        super(props);
        this.state={
             users:[]
        }
        console.log(33423,this.state.users)
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(values){
      console.log(values)
    }

  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose} >
        <div className='modal-popup-wrapper'>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    password: '',
                    city: '',
                    gender:'',
                }}
                validationSchema={SignupSchema}

            >
                {({ errors,
                    touched,
                    values,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Form onSubmit={(values)=>{this.handleOnSubmit(values)}}>
                        <h1>Sign Up</h1>
                        <TextField
                            type='text'
                            onChange={(e) => setFieldValue('firstname', e.target.value)}
                            onBlur={(e) => setFieldValue('firstname', e.target.value)}
                            name='firstname'
                            label="FirstName"
                            variant="outlined"
                            error={errors.firstname}
                            helpertext={errors.firstname && touched.firstname ? <div>{errors.firstname}</div> : null}
                        />

                        <TextField
                            type='text'
                            name='lastname'
                            label="LastName"
                            variant="outlined"
                            onChange={(e) => setFieldValue('lastname', e.target.value)}
                            onBlur={(e) => setFieldValue('lastname', e.target.value)}
                            error={errors.lastname}
                            helpertext={errors.lastname && touched.lastname ? <div>{errors.lastname}</div> : null}
                        />
                        <TextField
                            type='text'
                            name='email'
                            label="email"
                            variant="outlined"
                            onChange={(e) => setFieldValue('email', e.target.value)}
                            onBlur={(e) => setFieldValue('email', e.target.value)}
                            error={errors.email}
                            helpertext={errors.email && touched.email ? <div>{errors.email}</div> : null}
                        />
                        <TextField
                            type='number'
                            name='phone'
                            id="outlined-basic"
                            label="Phone No"
                            variant="outlined"
                            onChange={(e) => setFieldValue('phone', e.target.value)}
                            onBlur={(e) => setFieldValue('phone', e.target.value)}
                            error={errors.phone}
                            helpertext={errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                        />
                        <TextField
                            type='password'
                            name='password'
                            label="Password"
                            variant="outlined"
                            onChange={(e) => setFieldValue('password', e.target.value)}
                            onBlur={(e) => setFieldValue('password', e.target.value)}
                            error={errors.password}
                            helpertext={errors.password && touched.password ? <div>{errors.password}</div> : null}
                        />
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">City</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={values.city}
                                label="City"
                                onChange={(e) => setFieldValue('city', e.target.value)}
                                onBlur={(e) => setFieldValue('city', e.target.value)}
                                error={errors.city}
                                helpertext={errors.city && touched.city ? <div>{errors.city}</div> : null}
                            >
                                <MenuItem value="python">Indore</MenuItem>
                                <MenuItem value="react">Bhopal</MenuItem>
                                <MenuItem value="ror">Khandwa</MenuItem>
                                <MenuItem value="php">Khargone</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="gender"
                                label="Gender"
                                onChange={(e) => setFieldValue('gender', e.target.value)}
                                onBlur={(e) => setFieldValue('gender', e.target.value)}
                                error={errors.gender}
                                helpertext={errors.gender && touched.gender ? <div>{errors.gender}</div> : null}
                            >
                                <FormControlLabel  value="female" control={<Radio />} label="Female" />
                                <FormControlLabel  value="male" control={<Radio />} label="Male" />
                                <FormControlLabel  value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        <Button type="submit" variant="contained">Submit</Button>
                    </Form>)}
            </Formik>
        </div>
    </Modal>
    )
  }
}

