import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import history from '../history';

class GoogleAuth extends React.Component {
    // Initialize the google's api library (loading the lib)
    componentDidMount() {
        window.gapi.load('client: auth2', () => {
            // init: returns a promise and it executes an async network request over to google's api server in order to initialize our client
            window.gapi.client.init({
                clientId: '369951215656-7j7232thjjdgljod7r0pkh958l761hnk.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // getting a reference to the auth object & saving a reference to it on our component class
                this.auth = window.gapi.auth2.getAuthInstance();

                // this.auth.isSignedIn.get(): True or False ==> displaying the Authentication state on the screen using onAuthChange function
                this.onAuthChange(this.auth.isSignedIn.get())

                // onAuthChange function will be called anytime the user's authentication status changes
                // onAuthChange is a callback function so we have to set it up as an arrow function
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
        history.push('/')
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="btn-signin">
                    <i className="fa fa-google"></i>
                    <span>Sign Out</span>
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="btn-signin">
                    <i className="fa fa-google"></i>
                    <span>Sign In with Google</span>
                </button>
            )
        }
    }

    render() {
        return (
        <div className="header-item header-item-signIn">{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth);
