import { Injectable } from '@nestjs/common';
import { allowedCountries } from '../../utils/allowed-cities';
import {
  BusinessLogicException,
  BusinessError,
  ErrorMessage,
  ErrorType,
} from '../../../shared/errors/business-errors';
import { City } from '../../entities/city.entity';

@Injectable()
export class CitiesValidationService {
  async validateCountryName(name: string) {
    if (!allowedCountries.includes(name)) {
      throw new BusinessLogicException(
        ErrorMessage(ErrorType.NOT_ALLOWED, 'city'),
        BusinessError.BAD_REQUEST,
      );
    }
  }

  async validateExistingCity(city: City) {
    if (!city) {
      throw new BusinessLogicException(
        ErrorMessage(ErrorType.NOT_FOUND, 'city'),
        BusinessError.NOT_FOUND,
      );
    }
  }
}
