import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field, option } from 'redux-form';
import cssModules from 'react-css-modules';

import FileInput from 'components/file-input/file-input';
import { createItem } from 'actions/index.actions';

import styles from './upload-form.scss';

class UploadForm extends React.Component {
  static propTypes = {
    createItem: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  formActionDispatch = (values) => {
    // create new FormData obj from form values
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key.indexOf('File') !== -1) {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });

    // call action creator with new FormData obj
    this.props.createItem(formData);
  }

  render() {
    const fileInputs = [
      {
        fieldName: 'itemFile',
        title: 'item file',
        type: 'file',
        component: 'FileInput',
        accepted: 'application/x-rar-compressed, application/x-7z-compressed, application/zip',
        content: 'upload',
      },
      {
        fieldName: 'imageFile',
        title: 'image file',
        type: 'file',
        component: 'FileInput',
        accepted: 'image/jpeg, image/png',
        content: 'image',
      },
    ];

    const {
      handleSubmit,
      pristine,
      submitting,
    } = this.props;

    return (
      <div styleName="wrapper">
        <h1 styleName="form-header">
          Upload
        </h1>
        <form
          id="upload-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.formActionDispatch)}
        >
          <h3 styleName="section-header">Select Files</h3>
          <div styleName="file-inputs-group">
            {fileInputs.map(field => (
              <div styleName="file-input">
                <label key={field.fieldName}>
                  {field.title}
                  <Field
                    name={field.fieldName}
                    component={FileInput}
                    type={field.type}
                    placeholder={field.fieldName}
                    accepted={field.accepted}
                    content={field.content}
                  />
                </label>
              </div>
            ))}
          </div>

          <h3 styleName="section-header">Upload Information</h3>

          <div styleName="info-inputs-group">

            <label>
                Title
                <br />
              <Field
                styleName="input"
                name="title"
                component="input"
                placeholder="Example Title"
              />
            </label>

            <label>
                Type
                <br />
              <Field
                styleName="type-select"
                name="type"
                component="select"
                label="Type"
                inverted
              >
                <option default>Select Upload Type</option>
                <option value="bike">Bike</option>
                <option value="gear">Gear</option>
                <option value="track">Track</option>
              </Field>
            </label>


            <label>
              Description
              <br />
              <Field
                styleName="description"
                name="description"
                component="textarea"
                label="Description"
                placeholder="About this upload..."
              />
            </label>

            <div>
              <label>
                Private
                <Field
                  styleName="private-checkbox"
                  name="private"
                  component="input"
                  type="checkbox"
                />
                <p styleName="private-info">
                * Uploads marked private are only accessible via direct link.
                </p>
              </label>
            </div>
          </div>


          <button
            styleName="submit-button"
            type="submit"
            disabled={pristine || submitting}
          >
            Upload
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = {};//eslint-disable-line

const mapDispatchToProps = {
  createItem,
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'UploadForm',
})(cssModules(UploadForm, styles)));
