import { toast, ToastContent, ToastOptions } from 'react-toastify';
import notificationSound from '../assets/notification.mp3';

// TODO :D

function playSound() {
  const sound = new Audio(notificationSound);
  sound.play();
}

export function notify(content: ToastContent, options?: ToastOptions) {
  return toast(content, {
    ...options,
    onOpen: playSound,
  });
}

notify.error = (content: ToastContent, options?: ToastOptions) => {
  notify(content, { ...options, type: 'error' });
};

notify.info = (content: ToastContent, options?: ToastOptions) => {
  notify(content, { ...options, type: 'info' });
};

notify.success = (content: ToastContent, options?: ToastOptions) => {
  notify(content, { ...options, type: 'success' });
};

notify.warning = (content: ToastContent, options?: ToastOptions) => {
  notify(content, { ...options, type: 'warning' });
};
