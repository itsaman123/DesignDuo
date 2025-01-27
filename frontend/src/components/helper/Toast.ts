import toast from 'react-hot-toast';
export const showToast = (toastType: 'success' | 'info' | 'error', toastMessage: string) => {
  switch (toastType) {
    case 'success':
      toast.success(toastMessage);
      break;
    case 'info':
      toast(toastMessage);
      break;
    case 'error':
      toast.error(toastMessage);
      break;
    default:
      console.warn('Invalid toast type');
  }
};