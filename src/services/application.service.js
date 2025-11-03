import { applicationRepository } from '../repositories/index.js';
import { BadRequestError } from '../utils/index.js';

/**
 * Service responsible for managing application entities.
 */
class ApplicationService {
  /**
   * Create a new application.
   * @async
   * @param {Object} data - Application payload
   * @param {string} data.name - User's name
   * @param {string} data.siteUrl - Website URL
   * @param {string} data.phoneNumber - User's phone number
   * @returns {Promise<Object>} Created application object
   */
  async create(data) {
    const result = await applicationRepository.create(data);
    return result;
  }

  /**
   * Get all applications.
   * @async
   * @param {Object} data - Pagination payload
   * @param {number} data.page - Current page number
   * @param {number} data.page_size = Number of items per page
   * @returns {Promise<{data: Object[], pagination: Object}>} Paginated list of applications
   */
  async getAll(data) {
    const result = await applicationRepository.findAll(data.page, data.page_size);
    return result;
  }

  /**
   * Delete an application by ID.
   * @async
   * @param {number} appId - Application id
   * @throws {BadRequestError} If the application is not found
   * @returns {Promise<void>}
   */
  async delete(appId) {
    const result = await applicationRepository.deleteOne(appId);
    if (!result) throw new BadRequestError('Application not found.');
  }
}

export const applicationService = new ApplicationService();
