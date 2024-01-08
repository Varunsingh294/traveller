import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditModal = ({ show, handleClose, userId, userData, handleEdit }) => {
  const [editedUserData, setEditedUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const userToEdit = userData.find(user => user.user_id === userId);
    if (userToEdit) {
      setEditedUserData({
        fname: userToEdit.fname,
        lname: userToEdit.lname,
        email: userToEdit.email,
        phone: userToEdit.phone,
      });
    }
  }, [userId, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(`http://localhost/traveler/users_update.php?user_id=${userId}`, {
        fname: editedUserData.fname,
        lname: editedUserData.lname,
        email: editedUserData.email,
        phone: editedUserData.phone,
      });

      if (response.data.success) {
        // Call the parent component's handleEdit function to update the state
        handleEdit(userId, editedUserData);

        handleClose();
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('An error occurred while updating user data', error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="fname"
              value={editedUserData.fname}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lname"
              value={editedUserData.lname}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={editedUserData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              name="phone"
              value={editedUserData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
