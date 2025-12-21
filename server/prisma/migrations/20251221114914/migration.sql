-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "labOrderId" TEXT NOT NULL,
    "recomendations" JSONB[],
    "result" JSONB[],
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_labOrderId_key" ON "TestResult"("labOrderId");

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_labOrderId_fkey" FOREIGN KEY ("labOrderId") REFERENCES "LabOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
