import { notification } from 'antd';

const messageSuccessDefault = 'Successful operation';
const descriptionSuccessDefault = '';

const messageErrorDefault = 'Something went wrong';
const descriptionErrorDefault = 'Try it again.';

export const feedbackSuccess = (
  message = messageSuccessDefault,
  description = descriptionSuccessDefault
) => {
  notification['success']({
    message: message,
    description: description,
  });
};

export const feedbackError = (
  message = messageErrorDefault,
  description = descriptionErrorDefault
) => {
  notification['error']({
    message: message,
    description: description,
  });
};
