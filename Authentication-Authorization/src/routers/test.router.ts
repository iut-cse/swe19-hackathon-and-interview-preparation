import { Router } from 'express'
import { testController } from '../controllers'

import auth from '../middlewires/auth'

const router = Router()

router.get('/test', auth(['user']), testController.test)

export default router
