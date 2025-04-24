export class CustomError extends Error {
    status: number
    msg: string
  
    constructor(status: number, msg: string) {
        super(msg)
        this.status = status
        this.msg = msg
        this.name = this.constructor.name
    }
}