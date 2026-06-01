-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "applications" TEXT[] DEFAULT ARRAY[]::TEXT[];
