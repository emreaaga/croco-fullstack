import { Router } from 'express';
import {
  getUsersController,
  changeUserStatusController,
  deleteUserController,
} from '../controllers/user.controolers.js';
import { authMiddleware, handleValidate, isAdminMiddleware } from '../middlewares/index.js';
import { PaginateValidation, UserPatchSchema } from '../validations/index.js';

const router = Router();
router.get(
  '/',
  authMiddleware,
  isAdminMiddleware,
  handleValidate(PaginateValidation, true),
  getUsersController
);
router.patch(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  handleValidate(UserPatchSchema),
  changeUserStatusController
);
router.delete('/:id', authMiddleware, isAdminMiddleware, deleteUserController);

export default router;
