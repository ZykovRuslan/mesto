import { api } from '../components/api';

export const actionSetUserInfo = (data) => {
  return api.setUserInfo(data);
};

export const actionAddNewCard = (data) => {
  return api.addNewCard(data);
};

export const actionLikeCard = (id, hasLike) => {
  if (!hasLike) {
    return api.likeCard(id);
  }
  return api.dislikeCard(id);
};

export const actionDeleteCard = (id) => {
  return api.deleteCard(id);
};

export const actionSetUserAvatar = (data) => {
  return api.setUserAvatar(data);
};
