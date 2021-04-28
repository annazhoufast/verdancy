import React, {Component} from 'react';
import {Modal} from 'react-bootstrap'

export class Harvest extends React.Component {
    render() {
        const [lgShow, setLgShow] = useState(false);
        return (
            <div>
                <Button onClick={() => setLgShow(true)}>Large modal</Button>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Large Modal
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>...</Modal.Body>
                </Modal>
            </div>
        )
    }
}