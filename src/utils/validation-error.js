import z from 'zod';

export const validationError = errors => {
  const flattened = z.flattenError(errors);
  const fieldErrors = flattened.fieldErrors;
  const formErrors = flattened.formErrors;

  const result = {};

  if (Object.keys(fieldErrors).length) {
    for (const [key, value] of Object.entries(fieldErrors)) {
      result[key] = value[0];
    }
  }

  if (formErrors.length) {
    result.form = formErrors.join(' | ');
  }

  if (Object.keys(result).length === 0) {
    return 'Validation error.';
  }

  return result;
};
