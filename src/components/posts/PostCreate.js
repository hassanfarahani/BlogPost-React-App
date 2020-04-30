import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../../actions';
import history from '../../history';

class PostCreate extends React.Component {

    renderInput = ({ input, label, id, meta }) => {
        return (
            <React.Fragment>
                <div className="label">
                    <label htmlFor={id}>{label}</label>
                </div>
                <div className="input">
                    <input {...input} autoComplete="off" id={id} />
                </div>
                {this.renderError(meta)}
            </React.Fragment>
        )
    }

    renderTextarea = ({ input, label, id, meta }) => {
        return (
            <React.Fragment>
                <div className="label">
                    <label htmlFor={id}>{label}</label>
                </div>
                <div className="area-text">
                    <textarea {...input} cols="60" rows="10" id={id}></textarea>
                </div>
                {this.renderError(meta)}
            </React.Fragment>
        )
    }

    renderError = ({ error, touched }) => {
        if (error && touched) {
          return <div className="error-message">{error}</div>
        }
    }

    onSubmit = formValues => {
        console.log('form values:', formValues)
        this.props.createPost(formValues);
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-title">Add a new post</div>
                <form style={{ height: '70vh'}} className="post-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" component={this.renderInput} label="Title" id="title" />
                    <Field name="categories" component={this.renderInput} label="Category" id="category" />
                    <Field name="content" component={this.renderTextarea} label="Content" id="content" />
                    <div className="buttons">
                        <button type="submit" className="btn btn-submit">Save</button>
                        <button onClick={() => history.push('/') } className="btn btn-cancel">Cancel</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.categories) {
        errors.category = 'You must enter a category';
    }

    if (!formValues.content) {
        errors.content = 'You must enter a text';
    }

    return errors;
}

export default reduxForm ({
    form: 'postCreate',
    validate
})(connect(null, { createPost })(PostCreate));