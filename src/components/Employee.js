import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import Modal from 'react-modal';
import { Button, Card } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import Dialog from "@mui/material/Dialog";
import { connect } from 'react-redux';
import { fetchEmployees, addEmployee, deleteEmployee, updateEmployee } from '../Redux/EmployeeSlice';

const customStyles = {
    content: {
        height: "500px",
        width: "500px",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



const divStyle = {
    display: "flex",
    felxDirection: "row",
    position: "absolute",
    right: "27px",
    bottom: "8px",
    top: "70px",
    padding: "1rem",
};
const confirmButtonStyle = {
    width: "5rem",
    height: "28px",
    fontSize: "1rem",
    backgroundColor: "#94b8d7",
    color: "black",
    margin: "5px",
    borderRadius: "10px",
    float: 'right'
};
class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: {
                name: "",
                email: "",
                department: "",
                gender: "",
                mobileno: "",
            },
            modalIsOpen: false,
            loading: false,
            isEdit: false,
            openDialog: false,
            id: null,
            updateid: null,

        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openDialogBox = this.openDialogBox.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
   

    componentDidMount() {
        this.props.FetchEmployees();
    }

    openModal() {
        console.log("5656")
        this.setState({ modalIsOpen: true })
    }

    closeModal() {
        this.setState({ 
            modalIsOpen: false,
            initialValues:{
                name :"",
                email:"",
                department:"",
                gender:"",
                mobileno:""
            },
            updateid:null
        })
    }


    handleOnSubmit(values, resetForm,) {
        console.log(values,"values")
        const id =  parseInt(this.state.updateid);
        if(id){
            setTimeout(()=>{
                this.props.updateEmployee(values)
                resetForm({ values:""});
                this.closeModal()
            },2000)
            
        }
        else{
            this.setState({ loading: true, })
            setTimeout(() => {
                this.props.addEmployee(values)
                this.setState({ loading: false })
                toast.success("USer Created Successfully")
                resetForm({ values: "" });
                this.closeModal()
            }, 2000);
        }
        
    }


    handleClose() {
        this.setState({
            openDialog: false
        })
    };

    openDialogBox(ids) {
        console.log("deletefunction", ids)
        this.setState({
            id: ids,
            openDialog: true
        })

    };

    handleDelete(){
        console.log(this.state.id)
        this.props.deleteEmployee(this.state.id)
        this.setState({
            openDialog: false
        })
    }

    handleEdit(item) {
        console.log(item)
        this.setState({
            modalIsOpen: true,
            isEdit: true,
            updateid: item.id,
            initialValues :{
                id:item.id,
                name : item.name,
                email:item.email,
                department : item.department,
                gender : item.gender,
                mobileno : item.mobilenos
            }
        })
        console.log(777, this.state.updateid)
    
    }

    render() {
        return (
            <div className='main-container'>
                <div className="addbutton">
                    <Button variant="primary" onClick={this.openModal}><h4>Add Employee</h4></Button>
                </div>
                <h2 style={{marginLeft:"30px"}}>Employee List</h2>
                <div className=' col-sm-12  d-flex justify-content mt-5 list-container'>
                    <div className="row" >
                        {this.props?.users?.map((value, index) => {
                            return (
                                <div className='col-sm-4' key={index}>

                                    <Card style={{
                                        border: "2px solid",
                                        height: "300px",
                                        maxWidth: "600px",
                                    }} key={index}
                                        className='card m-2'>
                                        <Card.Body>
                                            <Card.Title>
                                                {value.name}
                                            </Card.Title>
                                            <Card.Text>
                                                Email :  {value.email}
                                            </Card.Text>
                                            <Card.Text>
                                                Department : {value.department}
                                            </Card.Text>
                                            <Card.Text>
                                                Gender : {value.gender}
                                            </Card.Text>
                                            <Card.Text>
                                                Mobile No. {value.mobileno}
                                            </Card.Text>
                                            <Button style={{ marginRight: "10px" }} variant="warning" onClick={() => this.handleEdit(value)}>Edit</Button>
                                            <Button variant="danger" onClick={()=>{this.openDialogBox(value.id)}} >Delete</Button>
                                        </Card.Body>
                                    </Card>


                                </div>
                            )
                        })}

                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                    >
                        <button style={{ float: "right" }} onClick={this.closeModal}>close</button>
                        <h2 className='modal-heading'> {!this.state.isEdit ? "Add Employee" : "Update Employee"}</h2>

                        <Formik
                            initialValues={this.state.initialValues}

                            validate={values => {
                                const errors = {}
                                if (!values.name) {
                                    errors.name = "This Field is Required"
                                }
                                if (!values.email) {
                                    errors.email = "This Field is Required"
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = "Invalid Email Address"
                                }
                                if (!values.department) {
                                    errors.department = "This Field is Required"
                                }
                                if (!values.gender) {
                                    errors.gender = "This Field is Required"
                                }
                                if (!values.mobileno) {
                                    errors.mobileno = "This Field is Required"
                                }
                                return errors;
                            }}
                            onSubmit={(values, { resetForm }) => {
                                this.handleOnSubmit(values, resetForm);
                            }}
                        >
                            {({
                                values,
                                errors,
                                handleSubmit,
                                setFieldValue
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        placeholder='Enter your Name'
                                        type="name"
                                        name="name"
                                        onChange={(e) => setFieldValue('name', e.target.value)}
                                        onBlur={(e) => setFieldValue('name', e.target.value)}
                                        value={values.name}
                                        className="form-control input-desgin"
                                    />
                                    {errors.name && <div>{errors.name}</div>}

                                    <input
                                        placeholder='Enter your Email'
                                        type="email"
                                        name="email"
                                        onChange={(e) => setFieldValue('email', e.target.value)}
                                        onBlur={(e) => setFieldValue('email', e.target.value)}
                                        value={values.email}
                                        className="form-control input-desgin"
                                    />
                                    {errors.email && <div>{errors.email}</div>}

                                    <label>Department
                                        <Field as="select"
                                            name="department"
                                            onChange={(e) => setFieldValue('department', e.target.value)}
                                            onBlur={(e) => setFieldValue('department', e.target.value)}
                                            className="form-control input-desgin"
                                            value={values.department}
                                        >
                                            <option value="Python">Python</option>
                                            <option value="ReactJS">ReactJS</option>
                                            <option value="NodeJS">NodeJs</option>
                                        </Field>
                                    </label>
                                    {errors.department && <div>{errors.department}</div>}

                                    <label> Gender
                                        <input
                                            type="radio"
                                            name="gender"
                                            onChange={(e) => setFieldValue('gender', e.target.value)}
                                            onBlur={(e) => setFieldValue('gender', e.target.value)}
                                            value="Male"
                                        />
                                        Male</label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            onChange={(e) => setFieldValue('gender', e.target.value)}
                                            onBlur={(e) => setFieldValue('gender', e.target.value)}
                                            value="Female"
                                        />
                                        Female</label>
                                    {errors.gender && <div>{errors.gender}</div>}

                                    <input
                                        placeholder='Enter your Mobile.No'
                                        type="number"
                                        name="mobileno"
                                        onChange={(e) => setFieldValue('mobileno', e.target.value)}
                                        onBlur={(e) => setFieldValue('mobileno', e.target.value)}
                                        value={values.mobileno}
                                        className="form-control input-desgin"
                                    />
                                    {errors.mobileno && <div>{errors.mobileno}</div>}
                                     {this.state.loading ?
                                        <ThreeDots
                                            height="80"
                                            width="80"
                                            radius="9"
                                            color="#4fa94d"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClassName=""
                                            visible={true}
                                        /> :
                                        <Button variant='primary' style={{ width: "80px", height: "50px" }} type="submit">
                                           {this.state.isEdit ? "Update" : "Save"}
                                        </Button> 
                                         }
                                </form>
                            )}
                        </Formik>
                    </Modal>
                </div>
                <div>
                    <Dialog onClose={this.handleClose} open={this.state.openDialog}>
                        <p style={{ marginTop: "37px", padding: "13px 42px", fontWeight: "bold", fontSize: "20px" }}>
                            Are you sure to delete this employee? {" "}
                        </p>
                        <br></br>
                        <div style={divStyle}>
                            <button style={confirmButtonStyle} onClick={()=>{this.handleDelete()}}>
                                Confirm
                            </button>
                            <button style={confirmButtonStyle} onClick={this.handleClose}>
                                Cancel
                            </button>
                        </div>
                    </Dialog>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchEmployees: () => dispatch(fetchEmployees()),
        addEmployee: (values) => dispatch(addEmployee(values)),
        deleteEmployee: (id) => dispatch(deleteEmployee(id)),
        updateEmployee : (values) => dispatch(updateEmployee(values))
    }
};

const mapStateToProps = (state) => (
    { users: state.user.employees });

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

