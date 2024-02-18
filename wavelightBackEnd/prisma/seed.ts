// seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  const createdUser = await prisma.user.create({
    data: {
      email: 'nei_beal@hotmail.com',
      name: 'Roiney Beal',
      password: await bcrypt.hash('84001409', 10),
    },
  });

  console.log('User created:', createdUser);
}

seed()
  .catch((error) => {
    console.error('Error seeding database:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
