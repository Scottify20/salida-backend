import { UserInFireStore } from '../models/User';
import { SalidaResponse } from './SalidaResponse';

export interface SalidaUserDataReponse extends SalidaResponse {
  data: UserInFireStore;
}
