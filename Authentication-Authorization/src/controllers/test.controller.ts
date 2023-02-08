import { Request, Response } from 'express';
import { testService } from '../services';

const test = async (req: Request, res: Response): Promise<void> => {
  const response = {
    isSuccess: false,
    statusCode: 400,
    message: 'Test not working',
    developerMessage: '',
    isReadOnly: false,
    data: {},
  }

  const data = await testService.test()
  if (data) {
    response.statusCode = 200
    response.isSuccess = true
    response.message = 'Test controller ok'
    response.data = data
  } else {
    response.developerMessage = 'something went wrong'
  }
  res.status(response.statusCode).json(response)
}

const testSqaureFunction = async (num: number): Promise<number> => {
  return num*num
}

export default { test, testSqaureFunction }