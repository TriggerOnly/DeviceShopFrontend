import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteBrand = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
              Удалить бренд
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                  <Modal.Title> Удалить бренд</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  I will not close if you click outside me. Do not even try to press
                  escape key.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Назад
                  </Button>
                  <Button variant="primary">Удалить</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export const DeleteDevice = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
      <>
          <Button variant="primary" onClick={handleShow}>
            Удалить девайс
          </Button>
          <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
          >
              <Modal.Header closeButton>
                <Modal.Title> Удалить девайс</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                I will not close if you click outside me. Do not even try to press
                escape key.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Назад
                </Button>
                <Button variant="primary">Удалить</Button>
              </Modal.Footer>
          </Modal>
      </>
  );
};

export const DeleteType = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
      <>
          <Button variant="primary" onClick={handleShow}>
              Удалить тип
          </Button>
          <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
          >
              <Modal.Header closeButton>
                <Modal.Title> Удалить тип</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                I will not close if you click outside me. Do not even try to press
                escape key.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Назад
                </Button>
                <Button variant="primary">Удалить</Button>
              </Modal.Footer>
          </Modal>
      </>
  );
};