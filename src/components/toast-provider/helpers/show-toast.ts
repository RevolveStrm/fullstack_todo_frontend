import { toast } from 'react-toastify';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const showToast = (type: ToastType, message: string): void => {
  switch (type) {
    case ToastType.SUCCESS: {
      toast.success(message);
      break;
    }
    case ToastType.ERROR: {
      toast.error(message);
      break;
    }
    default:
      break;
  }
};
