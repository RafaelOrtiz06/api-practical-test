import { Injectable } from '@nestjs/common';
import {
  BusinessError,
  BusinessLogicException,
  ErrorMessage,
  ErrorType,
} from '../../../shared/errors/business-errors';
import { Supermarket } from '../../entities/supermarket.entity';

@Injectable()
export class SupermarketsValidationService {
  async validateName(name: string) {
    if (name.length < 10) {
      throw new BusinessLogicException(
        ErrorMessage(ErrorType.MIN_LENGTH, 'supermarket'),
        BusinessError.PRECONDITION_FAILED,
      );
    }
  }

  async validateExistingSupermarket(supermarket: Supermarket) {
    if (!supermarket) {
      throw new BusinessLogicException(
        ErrorMessage(ErrorType.NOT_FOUND, 'supermarket'),
        BusinessError.NOT_FOUND,
      );
    }
  }

  async validateAssociatedSupermarket(supermarket: Supermarket) {
    if (!supermarket) {
      throw new BusinessLogicException(
        ErrorMessage(ErrorType.NOT_ASSOCIATED, 'supermarket'),
        BusinessError.BAD_REQUEST,
      );
    }
  }
}
