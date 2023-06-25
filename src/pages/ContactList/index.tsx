import { useEffect, useState } from "react";
import { deleteAPI, get } from "../../API/axios";
import { Button,  Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,  faTrash } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../ContactForm";
import { toast } from "react-toastify";
import { Contact } from "../../interfaces/contact";

import './styles.css'
import NoDataFound from "../../components/NoDataFound";
const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [contact, setContact] = useState<Contact>();
  const [search,setSearch] = useState('')
  const [searchText,setSearchText] = useState('')
  const [showPrompt,setShowPrompt] = useState(false)

  useEffect(() => {
    setRefresh(false);
    let data:any ={}
    if(search){
      data.fullName=search
    
  }
    get("/contacts",data).then((response: any) => {
      if(response?.data?.data?.length){
        setShowPrompt(true)
      }
      setContacts(response?.data?.data);
    });
  }, [refresh,search]);

  const handleDelete = (id: string) => {
    deleteAPI(`/contact/${id}`)
      .then((response: any) => {
        toast.success("Contact deleted sucessfully");
        setRefresh(true);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const contactList = contacts?.map((contact: any, index: number) => (
    <tr key={contact._id} className="table-row">
      <td>{index + 1}</td>
      <td>{contact._id}</td>
      <td>{contact.fullName}</td>
      <td>{contact.email}</td>
      <td>{contact.phone_number}</td>
      <td>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => handleEditContact(contact)}
          className="icon"
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="icon"
          onClick={() => handleDelete(contact._id)}
        />
      </td>
    </tr>
  ));

  const handleEditContact = (data:any) => {
    setShow(!show);
    setContact(data);
  };
  const handleAddContact = () => {
    setShow(!show);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
setSearchText(e.target.value)
  }

  const handleSearchButton = () =>{
    setSearch(searchText)
  }
  return (
    <div className="main-container">
      <p className="header">Contact List</p>
      <div className='header-div'>
        
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              className='me-2 search-input'
              onChange={handleSearch}
            />
            <Button className='add-btn' onClick={handleSearchButton}>
              Search
            </Button>
          </Form>
       
      <Button onClick={handleAddContact} className='add-btn'>Add Contact</Button>

      </div>
      <Table responsive striped bordered hover>
        <thead>
          <th className="table-heading">S.N</th>
          <th className="table-heading">ID</th>
          <th className="table-heading">Full name</th>
          <th className="table-heading">Email</th>
          <th className="table-heading">Phone number</th>
          <th className="table-heading">Actions</th>
        </thead>

        <tbody>{
        contacts?.length ?
        contactList
      :
      <NoDataFound 
      show={showPrompt} 
      handleClose={()=>setShowPrompt(false)}
      setShowForm={setShow}
      />
      }</tbody>
      </Table>
      <ContactForm
        show={show}
        handleClose={() => setShow(false)}
        setRefresh={setRefresh}
        contact={contact}
      />
    </div>
  );
};

export default ContactList;
