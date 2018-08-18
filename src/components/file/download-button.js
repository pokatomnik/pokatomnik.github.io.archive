import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';

import DownloadBlob from '../common/download-blob/download-blob';


DownloadButton.propTypes = {
    downloadUrl: PropTypes.string.isRequired,
    downloadName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default function DownloadButton({
    downloadUrl,
    downloadName,
    children: title
}) {
    return (
        <FormGroup>
            <ControlLabel>
                {title}
            </ControlLabel>
            <InputGroup>
                <DownloadBlob
                    target="_blank"
                    href={downloadUrl}
                    download={downloadName}
                >
                    Download
                </DownloadBlob>
            </InputGroup>
        </FormGroup>
    );
}
