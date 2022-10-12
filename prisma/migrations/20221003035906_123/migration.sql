/*
  Warnings:

  - Added the required column `class_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "attempt" INTEGER NOT NULL,
    "one_time_password" INTEGER NOT NULL,
    "mail_sent" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class_name" TEXT NOT NULL
);
INSERT INTO "new_User" ("active", "attempt", "createdAt", "email", "full_name", "id", "mail_sent", "one_time_password", "password") SELECT "active", "attempt", "createdAt", "email", "full_name", "id", "mail_sent", "one_time_password", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
