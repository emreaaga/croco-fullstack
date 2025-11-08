import { Router } from 'express';
import { createApp, getApps, deleteApp } from '../controllers/application.controllers.js';
import {
  authMiddleware,
  isAdminMiddleware,
  validateParams,
  validateBody,
  validateQuery,
} from '../middlewares/index.js';
import {
  PaginateValidation,
  ApplicationSchema,
  paramValidationSchema,
} from '../validations/index.js';
import { createApplicatonLimiter } from '../config/rateLimiter.js';

const router = Router();
router.post('/', createApplicatonLimiter, validateBody(ApplicationSchema), createApp);
router.get('/', authMiddleware, validateQuery(PaginateValidation), getApps);
router.delete(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  validateParams(paramValidationSchema),
  deleteApp
);

export default router;
