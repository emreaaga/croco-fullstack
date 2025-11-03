import { applicationRepository } from '../repositories/index.js';
import { BadRequestError } from '../utils/index.js';

class ApplicationService {
  async create(data) {
    const result = await applicationRepository.create(data);
    return result;
  }

  async getAll(data) {
    const result = await applicationRepository.findAll(data.page, data.page_size);
    return result;
  }

  async delete(appId) {
    const result = await applicationRepository.deleteOne(appId);
    if (!result) throw new BadRequestError('Application not found.');
  }
}

export const applicationService = new ApplicationService();
