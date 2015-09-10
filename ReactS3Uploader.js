"use strict";

var React = require('react'),
    S3Upload = require('./s3upload.js'),
    objectAssign = require('object-assign');

var ReactS3Uploader = React.createClass({

    propTypes: {
        signingUrl: React.PropTypes.string.isRequired,
        onProgress: React.PropTypes.func,
        onFinish: React.PropTypes.func,
        onError: React.PropTypes.func,
        onClearInput: React.PropTypes.func,
        showClearButton: React.PropTypes.bool,
        signingUrlHeaders: React.PropTypes.object,
        signingUrlQueryParams: React.PropTypes.object,
        uploadRequestHeaders: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            onProgress: function(percent, message) {
                console.log('Upload progress: ' + percent + '% ' + message);
            },
            onFinish: function(signResult) {
                console.log("Upload finished: " + signResult.publicUrl)
            },
            onError: function(message) {
                console.log("Upload error: " + message);
            },
            onClearInput: function() {
                console.log("Upload clear input");
            }
        };
    },

    uploadFile: function() {
        new S3Upload({
            fileElement: React.findDOMNode(this.refs.input),
            signingUrl: this.props.signingUrl,
            onProgress: this.props.onProgress,
            onFinishS3Put: this.props.onFinish,
            onError: this.props.onError,
            signingUrlHeaders: this.props.signingUrlHeaders,
            signingUrlQueryParams: this.props.signingUrlQueryParams,
            uploadRequestHeaders: this.props.uploadRequestHeaders
        });
    },

    _removeFile: function(){
      this.props.onClearInput();
      React.findDOMNode(this.refs.input).value = '';
    },

    render: function() {
        return (
          <div>
            { this.props.showClearButton ?
                <a className="remove-file-btn" onClick={this._removeFile}>X</a>
              : null
            }
            <input {...this.props} ref="input" type="file" onChange={this.uploadFile} />
          </div>
        )
    }

});


module.exports = ReactS3Uploader;
