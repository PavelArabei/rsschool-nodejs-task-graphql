import { POST, PROFILE, USER } from './parent.model.js';

export type CreateUserDto = Omit<USER, 'id'>;
export interface CreateUser {
  dto: CreateUserDto;
}

export type CreatePostDto = Omit<POST, 'id'>;
export interface CreatePost {
  dto: CreatePostDto;
}

export type CreateProfileDto = Omit<PROFILE, 'id'>;
export interface CreateProfile {
  dto: CreateProfileDto;
}
