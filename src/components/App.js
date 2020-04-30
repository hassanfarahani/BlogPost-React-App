import React from 'react';
import '../styles.css'
import Header from './Header';
import Footer from './Footer';
import { Router, Route, Switch } from 'react-router-dom';
import PostList from './posts/PostList';
import PostCreate from './posts/PostCreate';
import PostShow from './posts/PostShow';
import PostDelete from './posts/PostDelete';
import history from '../history';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Router history={history}>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={PostList} />
                        <Route path="/posts/new" component={PostCreate} />
                        <Route path="/posts/show/:id" component={PostShow} />
                        <Route path="/posts/delete" component={PostDelete} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}

export default App;