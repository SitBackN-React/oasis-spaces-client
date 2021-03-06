import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Footer from './../shared/Footer'
// import Layout from './../shared/Layout'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import ListCreate from './../routes/ListCreate'
import Lists from './../routes/Lists'
import List from './../routes/List'
import ListEdit from './../routes/ListEdit'
import Item from './../routes/Item'
import ItemCreate from './../routes/ItemCreate'
import ItemEdit from './../routes/ItemEdit'
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }
  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }
  render () {
    const { msgAlerts, user } = this.state
    // console.log(this.props)
    return (
      <Fragment>
        <Header user={user} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-list' render={() => (
            <ListCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/lists' render={(props) => (
            <Lists {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/lists/:id' render={(props) => (
            <List {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/lists/:id/edit' render={(props) => (
            <ListEdit {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/lists/:id/items/:itemId' render={(props) => (
            <Item {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/lists/:id/create-item' render={(props) => (
            <ItemCreate {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/lists/:id/items/:itemId/edit-item' render={(props) => (
            <ItemEdit {...props} msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <Footer />
      </Fragment>
    )
  }
}
export default App
