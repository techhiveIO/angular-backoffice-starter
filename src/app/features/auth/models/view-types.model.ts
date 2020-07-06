export enum ResetPasswordViewType {
  TYPE_EMAIL_SENT = 'TYPE_EMAIL_SENT',
  TYPE_NEW_REQUEST = 'TYPE_NEW_REQUEST',
  TYPE_RESET_TOKEN = 'TYPE_RESET_TOKEN',
}

export interface ResetPasswordViewInterface {
  viewType: ResetPasswordViewType;
  attemptedEmail?: string;
  resetToken?: string;
}
