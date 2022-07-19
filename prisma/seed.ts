import { prisma } from "../src/config/database.js";

async function main() {
  const terms = [];
  for (let i = 1; i < 7; i++) {
    terms.push({ number: i });
  }
  await prisma.term.createMany({
    data: [...terms],
  });

  const categories = [
    { name: "Projeto" },
    { name: "Prática" },
    { name: "Recuperação" },
  ];
  await prisma.category.createMany({
    data: categories,
  });

  const teachers = [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }];
  await prisma.teacher.createMany({
    data: teachers,
  });

  const disciplines = [
    { name: "HTML e CSS", term: 1 },
    { name: "JavaScript", term: 2 },
    { name: "React", term: 3 },
    { name: "Humildade", term: 1 },
    { name: "Planejamento", term: 2 },
    { name: "Autoconfiança", term: 1 },
  ];
  for (let i = 0; i < disciplines.length; i++) {
    await prisma.discipline.create({
      data: {
        name: disciplines[i].name,
        termId: disciplines[i].term,
      },
    });
  }

  const teachersDisplines = [
    { teacherId: 1, disciplieId: 1 },
    { teacherId: 1, disciplieId: 2 },
    { teacherId: 1, disciplieId: 3 },
    { teacherId: 2, disciplieId: 4 },
    { teacherId: 2, disciplieId: 5 },
    { teacherId: 2, disciplieId: 6 },
  ];
  for (let i = 0; i < teachersDisplines.length; i++) {
    await prisma.teachersDisciplines.create({
      data: {
        teacherId: teachersDisplines[i].teacherId,
        disciplineId: teachersDisplines[i].disciplieId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//   await prisma.$queryRaw`ALTER TABLE terms AUTO_INCREMENT = 1`;
//   await prisma.$queryRaw`ALTER TABLE disciplines AUTO_INCREMENT = 1`;
//   await prisma.$queryRaw`ALTER TABLE teachers AUTO_INCREMENT = 1`;
