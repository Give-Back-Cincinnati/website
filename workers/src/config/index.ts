// declare env variables as globals
declare const NODE_ENV: string
declare const SEGMENT_WRITE_KEY: string // this is ALREADY encoded in base64
declare const RECAPTCHA_SECRET_KEY: string

export default {
  NODE_ENV: NODE_ENV,
  SEGMENT_WRITE_KEY: SEGMENT_WRITE_KEY,
  RECAPTCHA_SECRET_KEY: RECAPTCHA_SECRET_KEY,
}
