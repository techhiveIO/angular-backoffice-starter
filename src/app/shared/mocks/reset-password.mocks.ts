import {ResetPasswordViewInterface, ResetPasswordViewType} from '../../features/auth/models/view-types.model';

export const MOCKED_NEW_REQUEST_VIEW_CONFIG: ResetPasswordViewInterface = {
  viewType: ResetPasswordViewType.TYPE_NEW_REQUEST,
  attemptedEmail: 'ali@techhive.io',
};

export const MOCKED_RESET_TOKEN_VIEW_CONFIG: ResetPasswordViewInterface = {
  viewType: ResetPasswordViewType.TYPE_RESET_TOKEN,
  resetToken: 'token',
};
