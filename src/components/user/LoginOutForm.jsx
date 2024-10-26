import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormInput from '../common/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLoading, useSessionUser } from '../contexts/GlobalStateContext';

const LoginOutForm = () => {
  const { isAuthorized, checkPasswordAsync, logOutAsync } = useSessionUser();
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState('');
  const [captionText, setCaptionText] = useState('Log in');
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
    setPassword('');
    window.history.back();
  };

  const handlePasswordChanged = (value) => setPassword(value);

  const handleLogInOut = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setLoading(true);
    try {
      if (isAuthorized) {
        const response = await logOutAsync();
        if (response === 'userLoggedOut') {
          window.history.back();
        }
      } else {
        const response = await checkPasswordAsync(password);
        if (response === 'PasswordOk') {
          navigate('/albums');
        } else {
          // Handle case where response is not a token
          console.error('Login failed or invalid response');
          setCaptionText('Wrong password, try again...')
        }
      }
    } catch (error) {
        console.error("Error:", error);
        setCaptionText('Wrong password, try again...')
    } finally {
        setLoading(false);
  }
};

  return (
    <Modal
      size="sm"
      show={showModal}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-sm"
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>
          {!isAuthorized ? (
            <FormInput
              text={password}
              type="password"
              placeholder="Password"
              preText={captionText}
              onTextChanged={handlePasswordChanged}
              onEnter={handleLogInOut}
            />
          ) : (
            <strong>Log out</strong>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogInOut}>
          {isAuthorized ? 'Log out' : 'Log in'}
        </Button>
        <Button style={{ border: 'none', background: 'none', color: 'black' }}>
          <FontAwesomeIcon
            icon={faSpinner}
            size="2x"
            spin
            style={{ opacity: loading ? '1' : '0' }}
          />
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginOutForm;
