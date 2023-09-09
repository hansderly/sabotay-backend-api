/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `GroupMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `GroupMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_alias_key" ON "GroupMember"("alias");
