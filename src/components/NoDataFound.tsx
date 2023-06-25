import { Button, Modal } from "react-bootstrap";
import "./styles.css";

interface IProps {
  show: boolean;
  handleClose: any;
  setShowForm: any;
}
const NoDataFound = (props: IProps) => {
  const { show, handleClose, setShowForm } = props;

  const handleAddContact = () => {
    setShowForm(true);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="container">
          <p className="title">No Data Found</p>
          <Button onClick={handleAddContact} className="btn">
            Add New Contact
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NoDataFound;
