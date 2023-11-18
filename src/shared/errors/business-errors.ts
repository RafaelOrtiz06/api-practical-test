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
  MIN_LENGTH,
  NOT_ASSOCIATED,
}

export const ErrorMessage = (errorType: ErrorType, resource: string) => {
  const messages = {
    [ErrorType.NOT_ALLOWED]: `${resource} not allowed`,
    [ErrorType.NOT_FOUND]: `${resource} with given id was not found`,
    [ErrorType.MIN_LENGTH]: `${resource} name must have at least 10 characters`,
    [ErrorType.NOT_ASSOCIATED]: `${resource} with the given id is not associated`,
  };

  return messages[errorType];
};
