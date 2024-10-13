import * as apiClient from "../../helpers/ApiHelpers";

export const getPhotosFromServerAsync = async (albumId) => {
  try {
    const response = await apiClient.getHelper('/api/photos/album/' + albumId);
    return { data: response };
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}

export const deletePhotoOnServerAsync = async (photoId, token) => {
  try {
    const response = await apiClient.deleteHelper('/api/photos/delete/' + photoId, token);
    return { data: response };
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}

export const updatePhotoCaptionOnServerAsync = async (photoId, caption, token) => {
  try {
    const response = await apiClient.putHelper('/api/photos/update/' + photoId, caption, token);
    return { data: response };
  } catch (error) {
    throw error; // Rethrow the error to be handled by the caller
  }
}

export const getAlbumById = async (albumId) => {
  const response = await apiClient.getHelper('/api/albums/' + albumId);
  return { data: response };
}
