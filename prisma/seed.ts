import { prisma } from "../src/config/database.js";

async function main() {
  const terms = [];
  for (let i = 1; i < 7; i++) {
    terms.push({ number: i });
  }
  terms.map(async (term) => {
    await prisma.term.upsert({
      where: { number: term.number },
      update: {},
      create: term,
    });
  });

  const categories = [
    { name: "Projeto" },
    { name: "Prática" },
    { name: "Recuperação" },
  ];
  categories.map(async (category) => {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  });

  const teachers = [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }];
  teachers.map(async (teacher) => {
    await prisma.teacher.upsert({
      where: { name: teacher.name },
      update: {},
      create: teacher,
    });
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
    await prisma.discipline.upsert({
      where: {
        nameTermIdentifier: {
          name: disciplines[i].name,
          termId: disciplines[i].term,
        },
      },
      update: {},
      create: {
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
    await prisma.teachersDisciplines.upsert({
      where: {
        teacherDisciplineIdentifier: {
          teacherId: teachersDisplines[i].teacherId,
          disciplineId: teachersDisplines[i].disciplieId,
        },
      },
      update: {},
      create: {
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
