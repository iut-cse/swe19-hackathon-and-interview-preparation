import { Router } from 'express';
import { testController } from '../controllers';

const router = Router()

router.get('/test', testController.test)

export default router