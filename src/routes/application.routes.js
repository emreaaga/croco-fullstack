import { Router } from 'express';
import {
  createApplicationController,
  getApplicationsController,
  deleteApplicationController,
} from '../controllers/application.controllers.js';
import { handleValidate, authMiddleware, isAdminMiddleware } from '../middlewares/index.js';
import { PaginateValidation, ApplicationSchema } from '../validations/index.js';
import { createApplicatonLimiter } from '../config/rateLimiter.js';

const router = Router();

router.post(
  '/',
  createApplicatonLimiter,
  handleValidate(ApplicationSchema),
  createApplicationController
);
router.get(
  '/',
  authMiddleware,
  handleValidate(PaginateValidation, true),
  getApplicationsController
);
router.delete('/:id', authMiddleware, isAdminMiddleware, deleteApplicationController);

export default router;
