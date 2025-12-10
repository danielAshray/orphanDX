-- CreateTable
CREATE TABLE "PracticeConnection" (
    "id" SERIAL NOT NULL,
    "practiceId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PracticeConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PracticeConnection_practiceId_key" ON "PracticeConnection"("practiceId");

-- AddForeignKey
ALTER TABLE "PracticeConnection" ADD CONSTRAINT "PracticeConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
