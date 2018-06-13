import React, { Component } from 'react'
import * as actions from '../../actions/index'
import { connect } from 'react-redux'

class Signout extends Component {
  componentDidMount() {
    this.props.signout()
  }
  render() {
    return (
      <div>Signout</div>
    )
  }
}

export default connect(null, actions)(Signout)