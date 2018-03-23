import React from 'react';
import Dropzone from 'react-dropzone';
import cssModules from 'react-css-modules';

import { Icon } from 'semantic-ui-react';

import styles from './file-input.scss';

const FileInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        styleName="dropzone"
        name={field.fieldName}
        onDrop={filesToUpload => field.input.onChange(filesToUpload)}
        accept={field.accepted}
      >
        <div styleName="dropzone-content">
          <Icon name="file archive outline" size="big" />
          drag and drop file here
        </div>
      </Dropzone>
      {
      field.meta.touched &&
      field.meta.error &&
      <span>{field.meta.error}</span>}
      {files && Array.isArray(files) &&
      <ul>
        {files.map(file => <li key={file.name}>{file.name}</li>)}
      </ul>}
    </div>
  );
};

export default cssModules(FileInput, styles);
