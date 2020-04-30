import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import { deletePost } from '../../actions';
import { Link } from 'react-router-dom';


class PostList extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    deletePost = id => {
        if (window.confirm('Are you sure you want to delete the post?')) {
            this.props.deletePost(id);
        }
    }

    showSignInMessage = () => {
        if (!this.props.isSignedIn) {
            return <div className="signin-message">Please sign in to add and delete a post</div>
        }
    }

    showDeleteButton = id => {
        if (this.props.isSignedIn) {
            return (
                <button onClick={() => this.deletePost(id)} className="btn-delete">Delete Post</button>
            )
        }
    }

    render() {
        return (
            <div style={{ height: '70vh', overflow: 'scroll'}} className="posts-list-body">
                {this.showSignInMessage()}
                <div className="posts-list-title">List of All Posts</div>
                <ul className="posts-list">
                    {this.props.posts.map(post => {
                        return (
                            <li className="posts-list-item" key={post.id}>
                                <Link to={`/posts/show/${post.id}`} className="posts-list-item-title">{post.title}</Link>
                                <div className="posts-list-item-category">{post.categories}</div>
                                {this.showDeleteButton(post.id)}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { posts: Object.values(state.posts),
             isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchPosts, deletePost }) (PostList);