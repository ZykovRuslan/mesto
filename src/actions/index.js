import { api } from '../components/api';

export const actionGetUserInfo = (onChange) => {
  api.getUserInfo().then((result) => onChange(result));
};

export const actionSetUserInfo = (data) => {
  return api.setUserInfo(data);
};

export const actionGetInitialCards = (onRenderCards) => {
  api.getInitialCards().then((result) => onRenderCards(result));
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
