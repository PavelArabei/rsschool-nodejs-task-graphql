import { POST, PROFILE, USER } from './parent.model.js';

export type CreateUserDto = Omit<USER, 'id'>;
export interface CreateUser {
  dto: CreateUserDto;
}
export interface UpdateUser {
  id: string;
  dto: USER;
}

export type CreatePostDto = Omit<POST, 'id'>;
export interface CreatePost {
  dto: CreatePostDto;
}
export interface UpdatePost {
  id: string;
  dto: POST;
}

export type CreateProfileDto = Omit<PROFILE, 'id'>;
export interface CreateProfile {
  dto: CreateProfileDto;
}
export interface UpdateProfile {
  id: string;
  dto: PROFILE;
}

export interface subscribeArgs {
  userId: string;
  authorId: string;
}
