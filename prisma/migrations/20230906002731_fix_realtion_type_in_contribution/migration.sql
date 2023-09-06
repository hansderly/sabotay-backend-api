/*
  Warnings:

  - You are about to drop the column `contribution_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `contribution_id` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_group_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contribution_id_fkey";

-- DropIndex
DROP INDEX "Contribution_group_id_key";

-- AlterTable
ALTER TABLE "Contribution" ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "group_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "contribution_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contribution_id";

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
