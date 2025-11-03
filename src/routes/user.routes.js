import { Router } from 'express';
import { getUsers, updateUserStatus, deleteUser } from '../controllers/user.controolers.js';
import { authMiddleware, handleValidate, isAdminMiddleware } from '../middlewares/index.js';
import { PaginateValidation, UserPatchSchema } from '../validations/index.js';

const router = Router();
router.get(
  '/',
  authMiddleware,
  isAdminMiddleware,
  handleValidate(PaginateValidation, true),
  getUsers
);
router.patch(
  '/:id',
  authMiddleware,
  isAdminMiddleware,
  handleValidate(UserPatchSchema),
  updateUserStatus
);
router.delete('/:id', authMiddleware, isAdminMiddleware, deleteUser);

export default router;
