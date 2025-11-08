import { userService } from '../services/index.js';

/**
 * Get paginated list of users.
 */
export const getUsers = async (request, response) => {
  const { data, pagination } = await userService.getAll(request.validatedData);
  return response.status(200).json({
    success: true,
    data,
    pagination,
  });
};

/**
 * Change a user's status by ID.
 */
export const updateUserStatus = async (request, response) => {
  await userService.updateStatus(request.validatedData.status, request.paramsId);
  return response.status(200).json({ success: true, message: 'User status updated successfully.' });
};

/**
 * Delete a user by ID.
 */
export const deleteUser = async (request, response) => {
  await userService.delete(request.paramsId);
  return response.status(200).json({ success: true, message: 'Deleted successfully.' });
};
