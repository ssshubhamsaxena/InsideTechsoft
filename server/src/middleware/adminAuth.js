export function createAdminToken() {
  return Buffer.from(`${process.env.ADMIN_EMAIL || 'admin@insidetechsoft.com'}:${process.env.ADMIN_PASSWORD || 'admin123'}`).toString('base64')
}

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (token !== createAdminToken()) {
    return res.status(401).json({ message: 'Admin authentication required.' })
  }

  return next()
}
