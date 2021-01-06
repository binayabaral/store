import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Binaya Baral',
		email: 'binaya.baral5@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
