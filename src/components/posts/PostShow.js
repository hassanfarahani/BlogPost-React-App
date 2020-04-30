import React from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions';
import history from '../../history';

class PostShow extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    deletePost = id => {
        if (window.confirm('Are you sure you want to delete the post?')) {
            this.props.deletePost(id);
            history.push('/');
        }
    }

    showDeleteButton = id => {
        if (this.props.isSignedIn) {
            return (
                <div className="showpost-btn">
                    <button onClick={() => this.deletePost(this.props.match.params.id)} className="btn-delete btn-delete-show">Delete Post</button>
                </div>
            )
        }
    }

    render() {
        if (!this.props.post) {
           return <div className="post-body">Loading ...</div>
        }

        const { title, categories, content } = this.props.post;
        return (
            <div style={{ height: '70vh'}} className="post-body">
                {this.showDeleteButton(this.props.match.params.id)}
                <div className="post-title">{title}</div>
                <div className="post-category"><span>Categories:</span> {categories}</div>
                <div className="post-content">{content}</div>
                <div>
                    <button class="btn-back" onClick={() => history.push('/')}>Back To All Posts</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { post: state.posts[ownProps.match.params.id],
             isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchPost, deletePost }) (PostShow);