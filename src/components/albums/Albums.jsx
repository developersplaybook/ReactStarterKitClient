import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import AlbumFrame from './AlbumFrame';
import * as apiClient from "../../helpers/ApiHelpers";
import { useLoading, useSessionUser } from '../contexts/GlobalStateContext';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const {isAuthorized, token} = useSessionUser();
  const { loading, setLoading } = useLoading();
  const [errorStates, setErrorStates] = useState({}); // Object to manage error state for each album

  useEffect(() => {
    navigate('/albums');
  }, [navigate]);

  useEffect(() => {
    getAlbumsWithPhotoCount('api/albums');
    initializeErrorStates(albums);
  }, [isAuthorized]);

  // Function to initialize errorStates based on fetched albums
  const initializeErrorStates = (albums) => {
    const initialErrorStates = {};
    albums.forEach(album => {
      initialErrorStates[album.albumID] = false;
    });
    setErrorStates(initialErrorStates);
  };

  const noEmptyAlbumsExists = (albums) => {
    return albums.every(album => album.photoCount > 0);
  };

  const getAlbumsWithPhotoCount = async (url) => {
    setLoading(true);
    try {
      const response = await apiClient.getHelper(url, token);
      setAlbums([...response]);

      // Check if no empty albums exist after setting the state
      if (isAuthorized && noEmptyAlbumsExists(response)) {
        const emptyAlbum = { albumID: 0, photoCount: 0, caption: '', isPublic: true };
        setAlbums(prevAlbums => [...prevAlbums, emptyAlbum]);
      }
    } catch (error) {
        alert('ServerAPI must be started. Please read the book for info! ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (albumId) => {
    setLoading(true);
    await apiClient.deleteHelper(`/api/albums/delete/${albumId}`, token);
    const updatedAlbums = albums.filter(album => album.albumID !== albumId)
    setAlbums(updatedAlbums);
    if (isAuthorized && noEmptyAlbumsExists(updatedAlbums)) {
      const emptyAlbum = { albumID: 0, photoCount: 0, caption: '', isPublic: true };
      setAlbums(prevAlbums => [...prevAlbums, emptyAlbum]);
    }

    setErrorStates((prev) => {
      const updatedErrorStates = { ...prev };
      delete updatedErrorStates[albumId];
      return updatedErrorStates;
    });

    setLoading(false);
  };

  const handleUpdate = async (albumId, newCaption) => {
    setLoading(true);
    try {
      await apiClient.putHelper(`/api/albums/Update/${albumId}`, newCaption, token);
      setAlbums(albums.map(album => album.albumID === albumId ? { ...album, caption: newCaption } : album));
      setErrorStates((prev) => ({ ...prev, [albumId]: false }));
    } catch (error) {
      console.error("Failed to update album:", error);

      // If there's an error, set the error state for the caption
      setErrorStates((prev) => ({ ...prev, [albumId]: true }));
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (albumId, caption) => {
    setLoading(true);
    try {
      const newAlbum = await apiClient.postHelper(`/api/albums/add`, caption, token);
      setAlbums([...albums.filter(album => album.albumID !== 0), newAlbum]);
      setErrorStates((prev) => ({ ...prev, [newAlbum.albumID]: false }));
    } catch (error) {
      console.error("Failed to add album:", error);

      // If there's an error, set the error state for the caption
      setErrorStates((prev) => ({ ...prev, [albumId]: true }));
    } finally {
      setLoading(false);
    }
  };

  
  const handleCaptionChange = (albumID) => {
    setErrorStates((prev) => ({ ...prev, [albumID]: false }));
  };


  const rows = [];
  for (let i = 0; i < albums.length; i += 2) {
    rows.push(
      <tr key={albums[i].albumID}>
        <AlbumFrame
          AlbumID={albums[i].albumID}
          PhotoCount={albums[i].photoCount}
          Caption={albums[i].caption}
          IsPublic={albums[i].isPublic}
          ItemCount={i}
          handleDelete={() => handleDelete(albums[i].albumID)}
          handleUpdate={(caption) => handleUpdate(albums[i].albumID, caption)}
          handleAdd={(caption) => handleAdd(albums[i].albumID, caption)} // Pass the function to handle add
          hasError={!!errorStates[albums[i].albumID]} // Check error state for each caption
          onCaptionChange={() => { handleCaptionChange(albums[i].albumID) }} // Function to handle caption change
        />
        {albums[i + 1] && (
          <AlbumFrame
            AlbumID={albums[i + 1].albumID}
            PhotoCount={albums[i + 1].photoCount}
            Caption={albums[i + 1].caption}
            IsPublic={albums[i + 1].isPublic}
            ItemCount={i + 1}
            handleDelete={() => handleDelete(albums[i + 1].albumID)}
            handleUpdate={(caption) => handleUpdate(albums[i + 1].albumID, caption)}
            handleAdd={(caption) => handleAdd(albums[i + 1].albumID, caption)} // Pass the function to handle add
            hasError={!!errorStates[albums[i + 1].albumID]} // Check error state for each caption
            onCaptionChange={() => { handleCaptionChange(albums[i + 1].albumID) }} // Function to handle caption change
          />
        )}
      </tr>
    );
  }

  return (
    <div className="container">
      <Row>
        <Col className="row-height">
          <Col md={3} className="hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
            <Row>
              <Col md={12}>
                <h4>Photo albums</h4>
              </Col>
            </Row>
          </Col>
          <Col md={9} className="col-md-height">
            <Row>
              <FontAwesomeIcon
                icon={faSpinner}
                size="2x"
                spin
                style={{ opacity: loading ? '1' : '0' }}
              />
              <table className="album-frame" style={{ fontSize: '10px', fontFamily: 'verdana, arial, helvetica, sans-serif' }}>
                <tbody>
                  {rows}
                </tbody>
              </table>
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Albums;
