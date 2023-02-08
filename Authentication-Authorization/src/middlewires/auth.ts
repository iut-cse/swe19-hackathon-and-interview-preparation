import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'

import { jwtUtils } from '../utils'

const auth =
  (roles: string[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
  ): Response<any, Record<string, any>> | void => {
    const accessToken: string = get(req, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    )
    // const refreshToken = get(req, 'headers.x-refresh')

    if (!accessToken)
      res.status(403).json({ message: 'Access Token not given' })

    const { decoded } = jwtUtils.verifyJwt(accessToken)

    if (decoded) {
      res.locals.user = decoded
      const jwtRoles = res.locals.user.role
      const roleSuccess = roles.some((val) => jwtRoles.includes(val))
      if (roleSuccess) {
        console.log('user')
        return next()
      }
      return res.status(401).json({ message: 'User not assign for this role' })
    }
    return res.status(401).json({ message: 'Not authenticated' })
  }

export default auth
