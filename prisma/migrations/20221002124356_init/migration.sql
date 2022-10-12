-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurant_name" TEXT NOT NULL,
    "restaurant_number" INTEGER NOT NULL,
    "restaurant_slogan" TEXT NOT NULL,
    "restaurant_address" TEXT NOT NULL,
    "restaurant_type" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "date_array" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "attempt" INTEGER NOT NULL,
    "one_time_password" INTEGER NOT NULL,
    "mail_sent" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
