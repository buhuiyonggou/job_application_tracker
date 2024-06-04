/*
  Warnings:

  - The primary key for the `Job_Providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jobProvider` on the `Job_Providers` table. All the data in the column will be lost.
  - The `id` column on the `Job_Providers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job_Providers" DROP CONSTRAINT "Job_Providers_pkey",
DROP COLUMN "jobProvider",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Job_Providers_pkey" PRIMARY KEY ("id");
