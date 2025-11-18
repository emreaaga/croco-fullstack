import { userRepository } from '../repositories/index.js';
import { BadRequestError, NotFoundError } from '../utils/index.js';

/**
 * Service responsible for managing users entities.
 */
class UserService {
  /**
   * Get all users.
   * @async
   * @param {Object} validatedData - Pagination payload
   * @param {number} validatedData.page - Current page number
   * @param {number} validatedData.page_size - Number of items per page
   * @throws {BadRequestError} If validation data is not provided
   * @returns {Promise<{data: Object[], pagination: Object}>} - Paginated list of users
   */
  async getAll(validatedData) {
    if (!validatedData) throw new BadRequestError('Validation data is required');
    const users = await userRepository.findAll(validatedData.page, validatedData.page_size);
    return users;
  }

  /**
   * Update a user's status by user ID.
   * @async
   * @param {string} userStatus - User's new status
   * @param {number} userId - User ID
   * @throws {BadRequestError} If User status or id not provided
   * @throws {BadRequestError} If provided user status is invalid
   * @throws {NotFoundError} If the user not found
   * @returns {Promise<{id: number, status: string}>} Updated user object
   */
  async updateStatus(userStatus, userId) {
    if (!userStatus || !userId) throw new BadRequestError('User status or ID not provided.');

    const allowedStatuses = ['approved', 'rejected'];
    if (!allowedStatuses.includes(userStatus))
      throw new BadRequestError('Invalid user status value.');

    const [result] = await userRepository.updateStatus(userId, userStatus);
    if (!result) throw new NotFoundError('User not found.');

    return result;
  }

  /**
   * Delete a user by ID.
   * @async
   * @param {number} userId - Id of the user to delete
   * @param {string} userRole - Role of the user performing the deletion
   * @throws {BadRequestError} If the target user does not exist
   * @throws {BadRequestError} If the deleting user has the same role as the target user
   * @returns {Promise<void>}
   */
  async delete(userId, userRole) {
    const [user] = await userRepository.findById(userId);
    if (!user) throw new BadRequestError('User not found.');
    if (userRole === user.role) throw new BadRequestError('Admin cant delete admin.');
    const result = await userRepository.deleteOne(userId);
    if (!result) throw new BadRequestError('User not found.');
  }
}

export const userService = new UserService();
