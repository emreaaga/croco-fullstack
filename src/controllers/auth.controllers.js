import { authService } from '../services/index.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookie.js';

/**
 * Register a new user account.
 */
export const registerController = async (request, response) => {
  const result = await authService.register(request?.validatedData);

  return response.status(201).json({
    success: true,
    message: 'User created successfully.',
    data: result,
  });
};

/**
 * Authenticate user and create a session.
 */
export const loginController = async (request, response) => {
  const { access_token, refresh_token } = await authService.login(request.validatedData);
  setAuthCookies(response, access_token, refresh_token);

  return response.status(200).json({ success: true, message: 'User logged in successfully.' });
};

/**
 * Get current authenticated user data.
 */
export const getMeController = async (request, response) => {
  const user = await authService.getMe(request.userId);
  return response.status(200).json({ success: true, user: user });
};

/**
 * Log out user and clear authentication cookies.
 */
export const logOutController = async (request, response) => {
  await authService.logOut(request.userId);
  clearAuthCookies(response);
  return response.status(200).json({
    success: 'true',
    message: 'Logged out successfully.',
  });
};

/**
 * Change user's password and invalide current session.
 */
export const changePasswordController = async (request, response) => {
  await authService.changePassword(request.validatedData, request.userId);
  clearAuthCookies(response);

  return response.status(200).json({ success: true, message: 'Password changed!' });
};

/**
 * Send email verification link containing a JWT token.
 */
export const sendVerificationController = async (request, response) => {
  await authService.sendVerification(request.userId);

  return response.status(200).json({ success: true, message: 'Link sent!' });
};

/**
 * Verify user's email address using verification(JWT) token.
 */
export const verifyEmailController = async (request, response) => {
  await authService.verifyEmail(request.query?.token);

  return response.status(200).json({ success: true, message: 'Email verified!' });
};

/**
 * Refresh user's access token using refresh token.
 */
export const refreshTokenController = async (request, response) => {
  const accessToken = await authService.refreshToken(request.cookies?.refresh_token);
  setAuthCookies(response, accessToken, request.cookies?.refresh_token);

  return response.status(200).json({ success: true, message: 'Token refreshed.' });
};
