/*
  Warnings:

  - You are about to drop the `ClassRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ClassRoom";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" INTEGER,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Grade" TEXT NOT NULL,
    "SubjectName" TEXT NOT NULL,
    CONSTRAINT "Session_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "Session"("sessionId");
