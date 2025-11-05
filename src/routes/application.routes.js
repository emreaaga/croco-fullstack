import { Router } from 'express';
import { createApp, getApps, deleteApp } from '../controllers/application.controllers.js';
import { handleValidate, authMiddleware, isAdminMiddleware } from '../middlewares/index.js';
import { PaginateValidation, ApplicationSchema } from '../validations/index.js';
import { createApplicatonLimiter } from '../config/rateLimiter.js';

const router = Router();

router.post('/', createApplicatonLimiter, handleValidate(ApplicationSchema), createApp);

router.get('/', authMiddleware, handleValidate(PaginateValidation, true), getApps);

//VALIDATE!
router.delete('/:id', authMiddleware, isAdminMiddleware, deleteApp);

export default router;
