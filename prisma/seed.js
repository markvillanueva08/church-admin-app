require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({ log: ['error'] });

async function main() {
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const superUser = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@servelink.com',
        password: hashedPassword,
        role: 'SUPER_USER',
      },
    });
    console.log('Created super user:', superUser.email);
  } else {
    console.log('Users already exist, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
