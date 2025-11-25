import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { listUsers, createUser, getUser, updateUser, resetPassword, deleteUser } from '../controllers/userControllers.js';

const router = express.Router();

router.use(requireAuth, requireRole('admin'));

router.get('/', listUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.patch('/:id/reset-password', resetPassword);
router.delete('/:id', deleteUser);

export default router;
