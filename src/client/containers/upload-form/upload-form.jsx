import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import cssModules from 'react-css-modules';

import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { InputField, TextAreaField, SelectField, CheckboxField } from 'react-semantic-redux-form';

import FileInput from 'components/file-input/file-input';
import { createItem } from 'actions/index.actions';

import typeOptions from '../../utils/commons.js';

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
        accepted: 'image/jpeg, image/png',
      },
    ];

    const {
      handleSubmit,
      pristine,
      submitting,
    } = this.props;

    return (
      <div styleName="wrapper">
        <Header as="h1" inverted>
          Upload
        </Header>
        <Form
          inverted
          id="upload-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(this.formActionDispatch)}
        >
          <Grid>
            <Grid.Row>
              {fileInputs.map(field => (
                <Grid.Column width={8}>
                  <label key={field.fieldName}>
                    {field.title}
                    <Field
                      name={field.fieldName}
                      component={FileInput}
                      type={field.type}
                      placeholder={field.fieldName}
                      accecpted={field.accepted}
                    />
                  </label>
                </Grid.Column>
              ))}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6}>
                <Field
                  name="title"
                  component={InputField}
                  label="Title"
                  placeholder="Upload title"
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  name="type"
                  component={SelectField}
                  label="Type"
                  options={typeOptions}
                  inverted
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={10}>
                <Field
                  name="description"
                  component={TextAreaField}
                  label="Description"
                  placeholder="Description"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                <Field
                  name="private"
                  component={CheckboxField}
                  label="Private"
                />
                <p styleName="private-info">
                    * Uploads marked private are only accessible via direct link.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  type="submit"
                  control={Button}
                  disabled={pristine || submitting}
                  positive
                  primary
                >
                  Submit
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
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
