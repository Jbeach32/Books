import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      const { token, user } = data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          {error && <div>{error.message}</div>}
          Something went wrong with your login credentials!
        </Alert>
        {/* ... (rest of the form) */}
      </Form>
    </>
  );
};

export default LoginForm;
