/*
  Warnings:

  - A unique constraint covering the columns `[termId,name]` on the table `disciplines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teachersDisciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "disciplines_termId_name_key" ON "disciplines"("termId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "teachersDisciplines_teacherId_disciplineId_key" ON "teachersDisciplines"("teacherId", "disciplineId");
