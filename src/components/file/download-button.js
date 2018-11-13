import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';

import DownloadBlob from '../common/download-blob/download-blob';


export default class DownloadButton extends PureComponent {
    static propTypes = {
        downloadName: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        blob: PropTypes.instanceOf(Blob)
    };

    static getDerivedStateFromProps({
        blob: nextBlob
    }, {
        blob: currentBlob,
        downloadUrl
    }) {
        if (nextBlob !== currentBlob) {
            try {
                URL.revokeObjectURL(downloadUrl);
            } catch (e) {
                // do nothing
            }
            return {
                blob: nextBlob,
                downloadUrl: URL.createObjectURL(nextBlob)
            };
        } else {
            return {
                blob: currentBlob,
                downloadUrl
            };
        }
    }

    state = {
        downloadUrl: '',
        blob: null
    };

    downloadBlob = () => {
        const {downloadName} = this.props;
        const {blob} = this.state;
        window.navigator.msSaveBlob(blob, downloadName);
    }

    renderDownloadBlobButton = () => {
        const isDamnIe = Boolean(window.navigator.msSaveBlob);
        // user is a good person
        if (!isDamnIe) {
            return (
                <DownloadBlob
                    target="_blank"
                    href={this.state.downloadUrl}
                    download={this.state.blob.type === 'text/plain' ? this.props.downloadName : undefined}
                >
                    Download
                </DownloadBlob>
            );
        } else { // 😈
            return (
                <DownloadBlob onClick={this.downloadBlob}>
                    Download
                </DownloadBlob>
            );
        }
    }

    render() {
        const {children: title} = this.props;
        return (
            <FormGroup>
                <ControlLabel>
                    {title}
                </ControlLabel>
                <InputGroup>
                    {this.renderDownloadBlobButton()}
                </InputGroup>
            </FormGroup>
        );
    }
}
