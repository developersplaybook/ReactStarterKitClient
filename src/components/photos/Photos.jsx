import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PhotoFrame from './PhotoFrame';
import FileUploadFunction from './FileUploadFunction';
import TextAreaInput from '../common/TextAreaInput';
import DeleteConfirmation from '../common/DeleteConfirmation';
import { Row, Col, Container } from 'react-bootstrap';
import { Animate } from "react-simple-animate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getPhotosFromServerAsync, deletePhotoOnServerAsync, updatePhotoCaptionOnServerAsync, getAlbumById } from './photoAPI';
import { Link } from 'react-router-dom';
import { useGlobalState, useSessionUser, useLoading } from '../contexts/GlobalStateContext';

const Photos = () => {
  const { albumId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [albumCaption, setAlbumCaption] = useState('');
  const [showDeleteConfirmationModals, setShowDeleteConfirmationModals] = useState([]);
  const { loading, setLoading } = useLoading();
  const [dragAndDropPhotoCaption, setDragAndDropPhotoCaption] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { apiAddress } = useGlobalState();
  const { isAuthorized, token } = useSessionUser();

  const imageUrl = (photo) => {
    return `${apiAddress}/RandomHandler/Index/PhotoID=${photo.photoID}/Size=M`;
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const response = await getPhotosFromServerAsync(albumId, token);
      setPhotos(response.data);
      setCaptions(response.data.map(p => p.caption));
      if (response.data.length > 0) {
        const albumCaption = response.data[0]?.albumCaption ?? 'No album caption available';
        setAlbumCaption(albumCaption);
      } else {
        if (albumId > 0) {
          const response = await getAlbumById(albumId);
          const albumCaption = response.data?.caption ?? 'No album caption available';
          setAlbumCaption(albumCaption);
        }
      }

      setShowDeleteConfirmationModals(response.data.map(() => false));
      setLoading(false);
    };
    fetchPhotos();
  }, [albumId]);

  const handlePhotoAdded = async () => {
    const response = await getPhotosFromServerAsync(albumId);
    setPhotos(response.data);
    setCaptions(response.data.map(p => p.caption));
    setShowDeleteConfirmationModals(response.data.map(() => false));
    setDragAndDropPhotoCaption('');
  };

  const handleNewCaptionChanged = (value) => setDragAndDropPhotoCaption(value);

  const handleDelete = async (index) => {
    setLoading(true);
    await deletePhotoOnServerAsync(photos[index].photoID, token);
    const updatedPhotos = photos.filter((_, idx) => idx !== index);
    setPhotos(updatedPhotos);
    setCaptions(updatedPhotos.map(p => p.caption));
    setShowDeleteConfirmationModals(updatedPhotos.map(() => false));
    setLoading(false);
  };

  const toggleDelete = (index) => {
    const updatedModals = showDeleteConfirmationModals.map((el, idx) => idx === index ? !el : el);
    setShowDeleteConfirmationModals(updatedModals);
  };

  const handleUpdate = async (index) => {
    setSelectedIndex(index);
    setLoading(true)
    await updatePhotoCaptionOnServerAsync(photos[index].photoID, captions[index], token);
    setLoading(false);
  };

  const propsAnimate = {
    startStyle: { opacity: 0 },
    endStyle: { opacity: 1 },
    duration: 1,
  };

  const rows = [];
  let cols = [];

  const fileUploadElement = (
    <td key="0">
      <TextAreaInput text={dragAndDropPhotoCaption} placeholder={'Enter caption'} onTextChanged={handleNewCaptionChanged} />
      <PhotoFrame defaultImage={true}>
        <FileUploadFunction albumId={albumId} caption={dragAndDropPhotoCaption} onPhotoAdded={handlePhotoAdded} />
      </PhotoFrame>
    </td>
  );

  photos.forEach((photo, index) => {
    const element = (
      <td key={photo.photoID}>
        <div>
          {isAuthorized ? (
            <TextAreaInput text={captions[index]} placeholder={'Enter caption'} onTextChanged={(value) => {
              const updatedCaptions = [...captions];
              updatedCaptions[index] = value;
              setCaptions(updatedCaptions);
            }} />
          ) : (
            captions[index]
          )}
        </div>
        <PhotoFrame>
          <Animate delay={index / 24} play {...propsAnimate}>
            <Link to={`/photodetails/${photo.photoID}`}>
              <img src={imageUrl(photo)} alt="" style={{ border: '4px solid white' }} />
            </Link>
          </Animate>
        </PhotoFrame>
        {isAuthorized ? (
          <div>
            <a onClick={() => toggleDelete(index)} style={{ marginRight: '10px' }}>
              <FontAwesomeIcon icon={faTrash} size={'1x'} />
            </a>
            <div style={{ display: 'inline-block' }}>
              <DeleteConfirmation showModal={showDeleteConfirmationModals[index]} confirmModal={() => handleDelete(index)} hideModal={() => toggleDelete(index)} message={`Do you want to remove ${photo.caption}?`} />
            </div>
            <a onClick={() => handleUpdate(index)} style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faSave} size={'1x'} />
            </a>
            <FontAwesomeIcon icon={faSpinner} size={'2x'} spin style={(loading && index === selectedIndex) ? { opacity: '1' } : { opacity: '0' }} />
          </div>
        ) : null}
      </td>
    );
    cols.push(element);
    if ((index + 1) % 5 === 0 && index < photos.length - 1) {
      rows.push(<tr key={photo.photoID.toString() + "_"}>{cols}</tr>);
      cols = [];
    }
  });

  if (!isAuthorized && photos.length === 0) {
    rows.push(<tr key="empty"><td><h4>Album empty</h4></td></tr>);
  } else {
    if (photos.length % 5 === 0) {
      rows.push(<tr key="0_">{cols}</tr>);
      if (isAuthorized) {
        cols = [fileUploadElement];
        rows.push(<tr key="00_">{cols}</tr>);
      }
    } else {
      if (isAuthorized) {
        cols.push(fileUploadElement);
      }
      rows.push(<tr key="0_">{cols}</tr>);
    }
  }

  return (
    <Container>
      <Row>
        <Col className="row-height">
          <Col md={3} className="hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
            <Row>
              <Col md={12}>
                <h4 />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h4 />
                <h4>{albumCaption}</h4>
              </Col>
            </Row>
          </Col>
          <Col md={9} className="col-md-height">
            <Row>
              <Col md={12}>
                <h4 />
              </Col>
            </Row>
            <Row>
              <div className="buttonbar buttonbar-top">
                <Link to='/albums'>
                  <img alt="" src="/assets/images/button-gallery.gif" />
                </Link>
              </div>
              <Row className="justify-content-md-center">
                <Col xs lg="6">
                </Col>
                <Col md="auto">
                  <FontAwesomeIcon icon={faSpinner} size={'2x'} spin style={loading ? { opacity: '1' } : { opacity: '0' }} />
                </Col>
              </Row>
              <Col md={12}>
                <table className="view" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Photos;
