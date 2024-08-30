export default class CustomAPIError extends Error {
    constructor(msg: string) {
        super(msg)
    }
}