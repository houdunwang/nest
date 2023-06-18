import { ValidationError, ValidationPipe } from '@nestjs/common'

export class ValidatePipe extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): any[] {
    return validationErrors.map((error) => {
      return {
        field: error.property,
        message: Object.values(error.constraints)[0],
      }
    })
  }
}
