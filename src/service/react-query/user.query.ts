import { IStore, updateStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { ApiService } from '../api/ApiClient';

interface signupResponseI {
  user: any;
  accessToken: string;
  refreshToken: string;
}

export const useSignup = () => {
  const signupRequestService = ApiService.createInstance();

  return useMutation(
    (payload: any) => {
      return signupRequestService.signup({
        data: payload,
      });
    },
    {
      onSuccess: (data: signupResponseI) => {
        // set token into local storage
        localStorage.setItem('data', JSON.stringify(data));
        updateStore((state: IStore) => {
          state.UserSlice.isLoggedIn = true;
          state.UserSlice.user = data.user;
        });
      },
      onError: (error: any) => {
        updateStore((state: IStore) => {
          state.UserSlice.isError = true;
          state.UserSlice.errorMess = error.message;
        });
      },
    }
  );
};

export const useLogin = () => {
  const loginRequestService = ApiService.createInstance();
  return useMutation(
    (payload) => {
      return loginRequestService.login({
        data: payload,
      });
    },
    {
      onSuccess: (data: signupResponseI) => {
        // set token into local storage
        localStorage.setItem('data', JSON.stringify(data));
        updateStore((state: IStore) => {
          state.UserSlice.isLoggedIn = true;
          state.UserSlice.user = data.user;
        });
      },
    }
  );
};
