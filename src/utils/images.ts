import { PhotoType } from "../types/porfolios";

export const getUserImage = (id) => {
  return `https://ap-portfolio-backend.up.railway.app/upload/${id}
  `;
};

export const getImage = (photo: PhotoType) => {
  return `https://ap-portfolio-backend.up.railway.app/upload/${photo._id}.${
    photo?.name?.split(".")[1]
  }`;
};
