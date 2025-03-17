import { Response } from "express"

type sendResponseInterface <T> =  {
    success?: boolean,
    statusCode: number,
    message: string,
    data?: T | T[] | null,
}

const sendResponse = <T>(res: Response, data: sendResponseInterface<T>) => {
    res.status(data.statusCode).json({
      status: true,
      statusCode: data.statusCode,
      message: data.message,
      data: data.data,
    })
  }

export default sendResponse