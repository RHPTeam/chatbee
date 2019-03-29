/**
 * define config project
 * team RHP
 */
module.exports = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 8888,
	URL: process.env.BASE_URL || 'http://localhost:8888',
	MONGODB_URI: process.env.MONGODB_URI || 'mongodb://YOUR_URI',
	MONGODB_ATLAS_PW: process.env.MONGODB_ATLAS_PW || 'admin',
	JWT_SECRET: 'adminzinbeechat',
	gmail_email: 'kythuatchatbee@gmail.com',
	gmail_password: '$chatbee@123$',
	pfx: './zinbee.pfx',
	passphrase: '198586367',
}
