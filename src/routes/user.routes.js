import { Router } from 'express';
import { getUsers, updateUserStatus, deleteUser } from '../controllers/user.controolers.js';
import {
  authMiddleware,
  validateBody,
  validateQuery,
  validateParams,
  isAdminMiddleware,
} from '../middlewares/index.js';
import {
  PaginateValidation,
  UserPatchSchema,
  paramValidationSchema,
} from '../validations/index.js';

const router = Router();
router.get('/', authMiddleware, isAdminMiddleware, validateQuery(PaginateValidation), getUsers);
router.patch(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  validateParams(paramValidationSchema),
  validateBody(UserPatchSchema),
  updateUserStatus
);
router.delete(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  validateParams(paramValidationSchema),
  deleteUser
);

export default router;
