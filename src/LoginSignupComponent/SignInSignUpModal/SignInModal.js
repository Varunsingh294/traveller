import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignInModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Sign In Form Data:", formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username or email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;






// import React, { useState } from "react";
// import SignInModal from "./SignInModal";
// import SignUpModal from "./SignUpModal";
// import { Button } from "react-bootstrap";

// const App = () => {
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);

//   const handleSignInClose = () => setShowSignIn(false);
//   const handleSignInShow = () => setShowSignIn(true);

//   const handleSignUpClose = () => setShowSignUp(false);
//   const handleSignUpShow = () => setShowSignUp(true);

//   return (
//     <div className="App">
//       <Button variant="primary" onClick={handleSignInShow}>
//         Sign In
//       </Button>
//       <Button variant="success" onClick={handleSignUpShow}>
//         Sign Up
//       </Button>

//       <SignInModal show={showSignIn} handleClose={handleSignInClose} />
//       <SignUpModal show={showSignUp} handleClose={handleSignUpClose} />
//     </div>
//   );
// };

// export default App;
