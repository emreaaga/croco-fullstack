import { userService } from '../services/index.js';

/**
 * Get paginated list of users.
 */
export const getUsersController = async (request, response) => {
  const { data, pagination } = await userService.getAll(request?.validatedData);
  return response.status(200).json({
    success: true,
    data,
    pagination,
  });
};

/**
 * Change a user's status by ID.
 */
export const changeUserStatusController = async (request, response) => {
  await userService.updateStatus(request?.validatedData?.status, Number(request.params?.id));
  return response.status(200).json({ success: true, message: 'User status updated successfully.' });
};

/**
 * Delete a user by ID.
 */
export const deleteUserController = async (request, response) => {
  await userService.delete(Number(request.params.id));
  return response.status(200).json({ success: true, message: 'Deleted successfully.' });
};
