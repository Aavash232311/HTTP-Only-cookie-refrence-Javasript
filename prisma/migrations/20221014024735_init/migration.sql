-- CreateTable
CREATE TABLE "ClassRoom" (
    "sessionId" INTEGER,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "ClassRoom_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassRoom_sessionId_key" ON "ClassRoom"("sessionId");
