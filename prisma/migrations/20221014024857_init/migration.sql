/*
  Warnings:

  - Added the required column `Grade` to the `ClassRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ClassRoom` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassRoom" (
    "sessionId" INTEGER,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Grade" TEXT NOT NULL,
    CONSTRAINT "ClassRoom_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClassRoom" ("authorId", "id", "sessionId") SELECT "authorId", "id", "sessionId" FROM "ClassRoom";
DROP TABLE "ClassRoom";
ALTER TABLE "new_ClassRoom" RENAME TO "ClassRoom";
CREATE UNIQUE INDEX "ClassRoom_sessionId_key" ON "ClassRoom"("sessionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
