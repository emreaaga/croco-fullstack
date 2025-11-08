import { validationError } from '../../utils/index.js';

export const validateQuery = validateSchema => {
  return (request, response, next) => {
    const result = validateSchema.safeParse(request.query);

    if (!result.success) {
      const message = validationError(result.error);

      return response.status(400).json({ success: false, code: 'VALIDATION_ERROR', message });
    }

    request.validatedData = result.data;
    next();
  };
};
