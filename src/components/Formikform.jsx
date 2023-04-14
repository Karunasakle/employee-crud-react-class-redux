import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import SingUpModal from '../modal-popup/singUpModal';
import './styles.scss'

export default class Formikform extends Component {
    constructor(props){
      super(props);
          this.state={
            show : false
          }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
}


handleClose(){
  this.setState({show:false});
}

handleShow(){
  this.setState({show:true});
}


  render() {
    return (
      <div className='sign-up-wrapper'>
      <Container>
        <div className='sing-up-container'>
          <Row className='d-flex justify-content-center mt-5'>
            <Col md={6}>
              <Button variant='primary' onClick={this.handleShow} >Add User</Button>
              <SingUpModal
                handleClose={this.handleClose}
                show={this.state.show}
              />
            </Col>
          </Row>
        </div>
      </Container>


    </div>
    )
  }
}

  
  
