import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';

class Header extends React.Component {
    renderAdmin = () => {
        if (this.props.isSignedIn) {
            return(
                <div className="header-item">
                    <Link to="/posts/new" className="header-item-addPost">Add Post</Link>
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="header">
                <div className="header-item header-item-title">BLOG UPDATES</div>
                <div>{this.renderAdmin()}</div>
                <div className="header-item">
                    <Link to="/" className="header-item-allPost">All Post</Link>
                </div>
                <GoogleAuth />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps) (Header);