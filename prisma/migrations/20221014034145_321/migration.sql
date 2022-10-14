/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Channel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Grade" TEXT NOT NULL,
    "SubjectName" TEXT NOT NULL,
    CONSTRAINT "Channel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("Grade", "SubjectName", "authorId", "id", "name") SELECT "Grade", "SubjectName", "authorId", "id", "name" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
