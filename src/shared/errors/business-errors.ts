export function BusinessLogicException(message: string, type: number) {
  this.message = message;
  this.type = type;
}

export enum BusinessError {
  NOT_FOUND,
  PRECONDITION_FAILED,
  BAD_REQUEST,
}

export enum ErrorType {
  NOT_ALLOWED,
  NOT_FOUND,
}

export const ErrorMessage = (errorType: ErrorType, resource: string) => {
  const messages = {
    [ErrorType.NOT_ALLOWED]: `${resource} not allowed`,
    [ErrorType.NOT_FOUND]: `${resource} with given id was not found`,
  };

  return messages[errorType];
};
