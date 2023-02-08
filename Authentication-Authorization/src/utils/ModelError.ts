/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose'

class ModelError {
  error: string

  constructor(error: unknown) {
    this.error = this.processError(error)
  }

  processError(error: unknown): string {
    if (error === undefined) {
      return 'Unknown error'
    }
    if (typeof error === 'string') {
      return error
    }
    if (error instanceof mongoose.Error.ValidationError) {
      let errors = ''

      Object.keys(error.errors).forEach((key: string) => {
        errors = `${errors + error.errors[key].message}, `
      })

      return errors.slice(0, errors.length - 2)
    }
    if (error instanceof Error) {
      return error.message
    }
    return 'Mongo error'
  }
}

export default ModelError
