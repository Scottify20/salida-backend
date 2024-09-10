import { UserInFireStore } from '../models/User';
import MessageResponse from './MessageResponse';

export default interface UserDataResponse extends MessageResponse {
  message: string;
  data?: UserInFireStore;
}
