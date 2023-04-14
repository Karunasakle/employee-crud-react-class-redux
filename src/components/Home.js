import React, { Component } from 'react'
import axios from 'axios';
import { fetchEmployees } from '../Redux/EmployeeSlice';
import { connect } from 'react-redux';
class Home extends Component {
    constructor(){
        super();
        this.state= {
            
        }
    }
componentDidMount(){
    this.props.fetchEmployees()
}


  render() {
    return (
      <div>
         
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        fetchEmployees : ()=>{fetchEmployees()}
    }
}
const mapStateToProps = (state)=>{
    return{
        users : state
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(Home)