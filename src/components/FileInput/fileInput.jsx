import FontAwesome from 'react-fontawesome'
//import CSSModules from 'react-css-modules'
import React, {Component} from 'react'

import styles from './fileInput.css'

const FileInput = ({accept, multiple, onChange, files, faIcon}) => {

  let buttonContent
  if(files && files.length === 1) {
    buttonContent = files[0].name
  } else if(files && files.length > 1) {
    buttonContent = files.length + ' files chosen'
  } else {
    if(multiple) {
      buttonContent = 'Choose some Files'
    }else {
      buttonContent = 'Choose a File'
    }
  }

  let icon = ''
  if(faIcon){
    icon = <FontAwesome styleName='icon' name={faIcon}/>
  }

  return (
    <div>

      <label styleName='fileInputLabel'>
        <input
          accept={accept}
          multiple={multiple}
          type='file'
          id='file'
          onChange={onChange}
          styleName='fileInput'/>
        {icon}
        {buttonContent}
      </label>
    </div>
  )
}

export default FileInput
