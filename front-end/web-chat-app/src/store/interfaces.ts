import { AuthState } from 'providers/AuthProvider/slice';
import { GeneralState } from 'providers/GeneralProvider/slice';
import {MessengerState} from 'providers/MessengerProvider/slice'

export interface CombinedState {
  auth: AuthState;
  general: GeneralState;
  messages:MessengerState
}
