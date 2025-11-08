import { Router } from 'express';
import {
  register,
  login,
  getMe,
  logout,
  changePassword,
  sendVerification,
  verifyEmail,
  refreshToken,
} from '../controllers/auth.controllers.js';
import { authMiddleware, validateBody } from '../middlewares/index.js';
import { RegisterSchema, LoginSchema, ChangePasswordSchema } from '../validations/index.js';
import {
  emailLimiter,
  loginLimiter,
  registerLimiter,
  changePasswordLimiter,
  verifyEmailLimiter,
} from '../config/rateLimiter.js';

const router = Router();

router.post('/register', registerLimiter, validateBody(RegisterSchema), register);
router.post('/login', loginLimiter, validateBody(LoginSchema), login);
router.get('/me', authMiddleware, getMe);
router.post('/logout', authMiddleware, logout);
router.post(
  '/change-password',
  changePasswordLimiter,
  authMiddleware,
  validateBody(ChangePasswordSchema),
  changePassword
);
router.post('/send-verification', emailLimiter, authMiddleware, sendVerification);
//VALIDATE!
router.get('/verify-email', verifyEmailLimiter, verifyEmail);
router.get('/refresh', refreshToken);

export default router;
