export interface ConfirmationWindowInterface {
  header: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
}

export const DefaultConfirmationWindowMessage: ConfirmationWindowInterface = {
  header: 'Warning!',
  message: 'Are you sure you want to do this action? It may be irreversible.',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
};
