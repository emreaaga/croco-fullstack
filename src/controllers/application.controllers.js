import { applicationService } from '../services/index.js';

/**
 * Handle creation of a new application.
 */
export const createApplicationController = async (request, response) => {
  const result = await applicationService.create(request.validatedData);
  return response.status(201).json({
    success: true,
    message: 'Application created successfully.',
    data: result,
  });
};

/**
 * Get paginated list of applications.
 */
export const getApplicationsController = async (request, response) => {
  const { data, pagination } = await applicationService.getAll(request.validatedData);
  return response.status(200).json({
    success: true,
    data,
    pagination,
  });
};

/**
 * Delete an application by its ID.
 */
export const deleteApplicationController = async (request, response) => {
  await applicationService.delete(Number(request.params.id));
  return response.status(200).json({ success: true, message: 'Deleted successfully.' });
};
