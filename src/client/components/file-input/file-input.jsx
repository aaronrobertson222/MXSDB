import React from 'react';
import Dropzone from 'react-dropzone';

const FileInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.fieldName}
        onDrop={filesToUpload => field.input.onChange(filesToUpload)}
        accept="application/x-rar-compressed, application/x-7z-compressed, application/zip"
      >
        <div>drag and drop file here</div>
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

export default FileInput;
