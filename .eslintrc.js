module.exports = {
  "extends": "next/core-web-vitals",
  "rules": {
    "@next/next/no-img-element": "off", // cf pages has no loader
    "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
}
