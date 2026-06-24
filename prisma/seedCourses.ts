import { prisma } from "@/lib/prisma";

async function main() {
  const collegeId = "cmqr240cz0009uo58609dw5d1";

  await prisma.course.createMany({
    data: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        collegeId,
      },
      {
        name: "B.E Information Technology",
        duration: "4 Years",
        collegeId,
      },
      {
        name: "BCA (Bachelor of Computer Applications)",
        duration: "3 Years",
        collegeId,
      },
      {
        name: "MCA (Master of Computer Applications)",
        duration: "2 Years",
        collegeId,
      },
      {
        name: "M.Sc Computer Science",
        duration: "2 Years",
        collegeId,
      },
      {
        name: "B.Sc Computer Science",
        duration: "3 Years",
        collegeId,
      },
    ],
  });

  console.log("Courses seeded successfully 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });