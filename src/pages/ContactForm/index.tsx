import { Form, Row,  Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./styles.css";
import { post, put } from "../../API/axios";
import { toast } from "react-toastify";
import { ContactInput } from "../../interfaces/contact";

interface IProps {
  show: boolean;
  handleClose: any;
  setRefresh: any;
  contact?: ContactInput;
}
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name Required"),
  email: yup.string().email(),
  phone_number: yup.string().required("Phone Number Required").min(10).max(10),
});

const ContactForm = (props: IProps) => {
  const { show, handleClose, setRefresh, contact } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (contact) {
      data.id = contact._id;
      put("/contact", data)
        .then((response) => {
          toast.success("Contact updated successfully");
          setRefresh(true);
          handleClose();
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      post("/contact", data)
        .then((response) => {
          toast.success("Contact added successfully");
          setRefresh(true);
          handleClose();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full name"
                  defaultValue={contact?.fullName}
                  {...register("fullName")}
                />
              </Form.Group>
              {errors?.fullName?.message && (
                <span className="error-message">
                  {errors?.fullName?.message as string}
                </span>
              )}
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={contact?.email}
                  {...register("email")}
                />
              </Form.Group>
              {errors?.email?.message && (
                <span className="error-message">
                  {errors?.email?.message as string}
                </span>
              )}
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  defaultValue={contact?.phone_number}
                  {...register("phone_number")}
                />
              </Form.Group>
              {errors?.phone_number?.message && (
                <span className="error-message">
                  {errors?.phone_number?.message as string}
                </span>
              )}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactForm;
