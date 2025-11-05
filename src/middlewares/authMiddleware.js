import { UnauthorizedError, jwtService } from '../utils/index.js';
import { config } from '../config/index.js';

export const authMiddleware = async (request, response, next) => {
  if (config.app.env === 'test') return next();
  const token = request.cookies?.access_token;
  if (!token) throw new UnauthorizedError('Not authenticated.');

  const encoded = jwtService.verifyAccess(token);
  if (!encoded?.id) throw new UnauthorizedError('Invalid token payload.');

  request.userId = encoded.id;
  request.userRole = encoded.role;
  next();
};
