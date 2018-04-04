import React from 'react';
import Dropzone from 'react-dropzone';
import cssModules from 'react-css-modules';

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
          <i className="material-icons md-48">insert_drive_file</i>
          <br />
          Drag & drop {field.content} file
          <br />
          <span>click to browse</span>
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
