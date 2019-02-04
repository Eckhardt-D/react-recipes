import React, { Component, Fragment } from 'react'
import { auth } from '../services/firebase'
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'

import {Input} from 'reactstrap'

import { connect } from 'react-redux'
import { setUser, getUser } from '../actions/userActions'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            number: '',
            code: '',
            hasSent: false,
            buttonShouldSend: false,
            renderPage: false
        }

        this.onButtonClick = this.onButtonClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.confirmMessage = this.confirmMessage.bind(this)
    }

    componentWillMount() {
        this.props.getUser().then(() => {
            if(this.props.userId) {
                this.props.history.push('/home')
            } else {
                this.setState({
                    renderPage: true
                })
            }
        })
    }

    confirmMessage() {
        window.confirmationResult.confirm(this.state.code).then((result) => {
            var user = result.user;
            this.props.setUser(user)

            if(this.props.user) {
                window.location.href = '/home'
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    onButtonClick(e) {
        e.preventDefault()
        var appVerifier = window.recaptchaVerifier
        
        if(this.state.buttonShouldSend) {
            this.confirmMessage()
        } else {
        auth.signInWithPhoneNumber(this.state.number, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                this.setState({hasSent: true, buttonShouldSend: true})
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const numberInput = <Input name="number" value={this.state.number} onChange={event => this.onChange(event)} placeholder="Please enter your cellphone number to login via sms." type="text"></Input>
        const codeInput = <Input name="code" value={this.state.code} onChange={event => this.onChange(event)} placeholder="Message sent, please verify your code." type="text"></Input>

        return (
            <Fragment>
                <Navigation/>
                {this.state.renderPage ? <Landing inputRender={this.state.hasSent ? codeInput : numberInput} buttonType="Login" onButtonClick={this.onButtonClick}/> : ''}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    userId: state.user.userId
});
  
  export default connect(mapStateToProps, { setUser, getUser })(Login);