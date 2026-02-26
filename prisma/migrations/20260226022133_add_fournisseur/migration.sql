-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FournisseurToProduit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FournisseurToProduit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FournisseurToProduit_B_index" ON "_FournisseurToProduit"("B");

-- AddForeignKey
ALTER TABLE "_FournisseurToProduit" ADD CONSTRAINT "_FournisseurToProduit_A_fkey" FOREIGN KEY ("A") REFERENCES "Fournisseur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FournisseurToProduit" ADD CONSTRAINT "_FournisseurToProduit_B_fkey" FOREIGN KEY ("B") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
