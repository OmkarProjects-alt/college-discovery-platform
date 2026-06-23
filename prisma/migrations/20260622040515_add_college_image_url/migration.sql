-- AlterTable
ALTER TABLE "public"."College" ADD COLUMN     "imageUrl" TEXT;


SELECT column_name
FROM information_schema.columns
WHERE table_name = 'College';