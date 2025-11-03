import jwt from 'jsonwebtoken';
import { UnauthorizedError, BadRequestError } from './index.js';
import { config } from '../config/index.js';

class JwtService {
  constructor({ jwtSecret, refreshSecret, emailSecret }) {
    this.jwtSecret = jwtSecret;
    this.refreshSecret = refreshSecret;
    this.emailSecret = emailSecret;
  }
  createAccessToken(id, email, role) {
    return jwt.sign({ id, email, role }, this.jwtSecret, {
      expiresIn: `${config.jwt.jwtAccessExpiration}m`,
    });
  }
  createRefreshToken(id) {
    return jwt.sign({ id }, this.refreshSecret, {
      expiresIn: `${config.jwt.jwtRefreshExpiration}d`,
    });
  }
  createEmailToken(id, email) {
    return jwt.sign({ id, email }, this.emailSecret, {
      expiresIn: `${config.jwt.jwtEmailExpiration}m`,
    });
  }
  verifyAccess(accessToken) {
    return this.#verify(accessToken, this.jwtSecret);
  }
  verifyRefresh(refreshToken) {
    return this.#verify(refreshToken, this.refreshSecret);
  }
  verifyEmail(emailToken) {
    return this.#verify(emailToken, this.emailSecret);
  }
  #verify(token, secret) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') throw new UnauthorizedError('Token expired.');
      if (err.name === 'JsonWebTokenError') throw new BadRequestError('Invalid token.');
      throw new UnauthorizedError('Invalid session.');
    }
  }
}

export const jwtService = new JwtService({
  jwtSecret: config.jwt.jwtSecret,
  refreshSecret: config.jwt.refreshSecret,
  emailSecret: config.jwt.emailSecret,
});
