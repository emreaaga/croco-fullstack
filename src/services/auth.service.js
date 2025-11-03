import { userRepository, tokenRepository } from '../repositories/index.js';
import { config, transporter } from '../config/index.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  jwtService,
  hashService,
} from '../utils/index.js';

/**
 * Service responsible for managing auth entities.
 */
class AuthService {
  /**
   * Register a new user (name, email, password).
   * @async
   * @param {Object} validatedData - User payload
   * @param {string} validatedData.name - User's name
   * @param {string} validatedData.email - User's email
   * @param {string} validatedData.password - User's password
   * @throws {BadRequestError} If payload not provided
   * @returns {Promise<{id: number, name: string, email: string}>} Created user object
   */
  async register(validatedData) {
    if (!validatedData) throw new BadRequestError('No provided data.');

    const hashedPassword = await hashService.hashPassword(validatedData.password);
    validatedData.password = hashedPassword;
    const result = await userRepository.create(validatedData);

    return result;
  }

  /**
   * Authenticate user and create a session.
   * @async
   * @param {Object} validatedData - User payload
   * @param {string} validatedData.email - User's email
   * @param {string} validatedData.password - User's password
   * @throws {BadRequestError} If email or password format is invalid
   * @throws {BadRequestError} If email or password is incorrect
   * @throws {BadRequestError} If account is not approved
   * @returns {Promise<{ refresh_token: string, access_token: string }>}
   */
  async login(validatedData) {
    if (!validatedData.email || !validatedData.password || validatedData.password.length < 6) {
      throw new BadRequestError('Invalid email or password format');
    }
    const { email, password } = validatedData;

    const [user] = await userRepository.findByEmail(email);

    if (!user) throw new BadRequestError('Incorect email or password');
    else if (user.status !== 'approved') {
      throw new BadRequestError('Wait until an admin approves your account.');
    }

    const match = await hashService.comparePasswords(password, user.password);
    if (!match) throw new BadRequestError('Incorect email or password');

    const refresh_token = jwtService.createRefreshToken(user.id);
    const access_token = jwtService.createAccessToken(user.id, user.email, user.roles);

    const days = config.jwt.jwtRefreshExpiration;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    await tokenRepository.saveRefreshToken(user.id, refresh_token, expiresAt);

    return { refresh_token, access_token };
  }

  /**
   * Get current authenticated user's data.
   * @async
   * @param {number} userId - User ID
   * @throws {NotFoundError} If user not found
   * @returns {Promise<{ id: number, name: string, email: string, role: string, is_email_verifed: boolean }>}
   */
  async getMe(userId) {
    const [user] = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    delete user.password;
    return user;
  }

  /**
   * Invalidate all user sessions (logout).
   * @async
   * @param {number} userId - User ID
   * @returns {Promise<void>}
   */
  async logOut(userId) {
    await tokenRepository.deleteByUserId(userId);
  }

  /**
   * Change user's password (requires old password).
   * @async
   * @param {Object} validatedData - User payload
   * @param {string} validatedData.old_password - Current password
   * @param {string} validatedData.password - New password
   * @param {number} userId - User ID
   * @throws {BadRequestError} If new password equals current password
   * @throws {NotFoundError} If user not found
   * @throws {BadRequestError} If current password is invalid
   * @returns {Promise<void>}
   */
  async changePassword(validatedData, userId) {
    const { old_password, password } = validatedData;
    if (old_password === password) {
      throw new BadRequestError('New password cannot be the same as current one.');
    }
    const [user] = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    const match = await hashService.comparePasswords(old_password, user.password);
    if (!match) throw new BadRequestError('Incorect current password');
    const hashedPassword = await hashService.hashPassword(password);
    await userRepository.updatePassword(user.id, hashedPassword);
  }

  /**
   * Send email verification link (JWT-based).
   * @async
   * @param {number} userId - User ID
   * @throws {NotFoundError} If user not found
   * @throws {BadRequestError} If email is already verified
   * @returns {Promise<void>}
   */
  async sendVerification(userId) {
    const [user] = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    if (user.is_email_verifed) throw new BadRequestError('User email already verified.');

    const token = jwtService.createEmailToken(user.id, user.email);
    const verifyUrl = `${config.email.emailFrom}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
      from: '"Crocodile Pay" <noreply@crocodile-pay.uz>',
      to: user.email,
      subject: 'Email verification link',
      html: `<p>Click the link to verify your email:</p>
       <a href="${verifyUrl}">Verify Email</a>`,
    });
  }

  /**
   * Verify user's email using a verification token.
   * @async
   * @param {string} token - Email verification JWT
   * @throws {NotFoundError} If user is not found
   * @throws {BadRequestError} If email is already verified
   * @throws {BadRequestError} If token email does not match user email
   * @returns {Promise<void>}
   */
  async verifyEmail(token) {
    const encoded = jwtService.verifyEmail(token);
    const [user] = await userRepository.findById(encoded.id);
    if (!user) throw new NotFoundError('User not found.');
    if (user.is_email_verifed) throw new BadRequestError('User email already verified.');
    if (encoded.email !== user.email) throw new BadRequestError('Token email doesn’t match user email');

    await userRepository.updateEmailStatus(user.id);
  }

  /**
   * Refresh access token using refresh token.
   * @async
   * @param {string} refresh_token - Refresh token
   * @throws {UnauthorizedError} If refresh token is not provided
   * @throws {NotFoundError} If token record or user is not found
   * @throws {UnauthorizedError} If refresh token owner is invalid
   * @throws {BadRequestError} If token is revoked or user has no permission
   * @returns {Promise<string>} New access token
   */
  async refreshToken(refresh_token) {
    if (!refresh_token) throw new UnauthorizedError('Not authenticated.');
    const payload = jwtService.verifyRefresh(refresh_token);
    const data = await tokenRepository.findByToken(refresh_token);

    if (!data) throw new NotFoundError('User not found');
    if (data.user_id !== payload.id) throw new UnauthorizedError('Invalid refresh token owner.');

    if (data.revoked === true) throw new BadRequestError('User doesnt have permission.');

    const access_token = jwtService.createAccessToken(
      data.user.id,
      data.user.email,
      data.user.roles
    );

    return access_token;
  }
}

export const authService = new AuthService();
