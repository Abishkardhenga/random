/*
  Warnings:

  - Made the column `salt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "salt" SET NOT NULL;
