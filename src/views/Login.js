import React, { Component, Fragment } from 'react'
import { auth } from '../services/firebase'
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'

import { connect } from 'react-redux'
import { setUser, getUser } from '../actions/userActions'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            number: '',
            code: '',
            entered: false,
            isError: false
        }

        this.onButtonClick = this.onButtonClick.bind(this)
        this.onChange = this.onChange().bind(this)
    }

    componentDidMount() {
        this.props.getUser()

        if(this.props.user) {
            window.location.href = '/home'
        }
    }

    onButtonClick(e) {
        e.preventDefault()

        var phoneNumber = getPhoneNumberFromUserInput();
        var appVerifier = window.recaptchaVerifier;
        auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                this.setState({entered:true})
                window.confirmationResult = confirmationResult
                confirmationResult.confirm(this.state.code).then(function (result) {
                    var user = result.user;
                    this.props.setUser(user)

                    if(this.props.user) {
                        window.location.href = '/home'
                    }
                  }).catch(function (error) {
                    this.setState({isError:true})
                  });
            }).catch(function (error) {
                window.recaptchaVerifier.render().then(function(widgetId) {
                    grecaptcha.reset(widgetId);
                    this.setState({isError:true})
                })
            })
    }

    onChange(e) {
        const code = e.currentTarget.value

        this.setState({
            code
        })
    }

    render() {
        <Fragment>
            <Navigation/>
            <Landing button="Login" onButtonClick={this.onButtonClick}/>
            {this.state.entered ? <Input name="code" onChange={this.onChange} placeholder="Please enter your confirmation code." type="text"></Input> : ''}
        </Fragment>
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    userId: state.user.userId
});
  
  export default connect(mapStateToProps, { setUser, getUser })(Login);