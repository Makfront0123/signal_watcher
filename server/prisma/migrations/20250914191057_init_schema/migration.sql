-- CreateTable
CREATE TABLE "public"."Watchlist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "terms" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watchlistId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
