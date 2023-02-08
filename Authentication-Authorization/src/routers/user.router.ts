import { Router } from 'express';
import userController from '../controllers/user.controller';
import auth from '../middlewires/auth';

const router = Router()

router.post('/create', userController.createUser)
router.post('/login', userController.userLogin)

export default router