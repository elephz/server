const { PrismaClient } = require("@prisma/client");
const { pagination } = require("prisma-extension-pagination");
const prisma = new PrismaClient().$extends(
  pagination({
    pages: {
      limit: 10, 
      includePageCount: true, // include counters by default
    },
  })
);

module.exports = prisma;