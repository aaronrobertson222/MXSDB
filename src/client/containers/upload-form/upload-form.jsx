import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

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
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key.indexOf('File') !== -1) {
        formData.append(key, values[key][0]);
      } else {
        formData.append(key, values[key]);
      }
    });

    this.props.createItem(formData);
  }

  render() {
    const fileInputs = [
      {
        fieldName: 'itemFile',
        title: 'item file',
        type: 'file',
        component: 'FileInput',
        accepted: 'application/x-rar-compressed, application/x-7z-compressed',
      },
      {
        fieldName: 'imageFile',
        title: 'image file',
        type: 'file',
        component: 'FileInput',
      },
    ];

    const textInputs = [
      {
        fieldName: 'title',
        title: 'item title',
        type: 'text',
        component: 'input',
      },
      {
        fieldName: 'description',
        title: 'item description',
        type: 'text',
        component: 'input',
      },
      {
        fieldName: 'type',
        title: 'item type',
        type: 'option',
        component: 'input',
      },
      {
        fieldName: 'private',
        title: 'private',
      },
    ];

    const {
      handleSubmit,
      pristine,
      submitting,
    } = this.props;

    return (
      <div styleName="wrapper">
        <form id="upload-form" encType="multipart/form-data" onSubmit={handleSubmit(this.formActionDispatch)}>
          {fileInputs.map(field => (
            <label key={field.fieldName}>
              {field.title}
              <Field
                name={field.fieldName}
                component={FileInput}
                type={field.type}
                styleName="file-input"
                placeholder={field.fieldName}
                accecpted={field.accepted}
              />
            </label>
          ))}
          {textInputs.map(field => (
            <label key={field.fieldName}>
              {field.title}
              <Field
                name={field.fieldName}
                component="input"
                type={field.type}
                styleName="input"
                placeholder={field.fieldName}
              />
            </label>
          ))}
          <button type="submit" disabled={pristine || submitting}>Upload</button>
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
