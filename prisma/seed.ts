import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding REAL colleges data...");

  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  // 👤 Users
  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Student ${i + 1}`,
          email: `student${i + 1}@mail.com`,
          password: "hashed_password"
        }
      })
    )
  );

  // 🏫 REAL COLLEGES DATA
  const collegesData = [
    {
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai",
      fees: 250000,
      rating: 4.9,
      placements: "Average 21 LPA, Highest 3+ Cr (international)",
      overview:
        "One of the top engineering institutes in India known for CS, AI, and research excellence."
    },
    {
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi",
      fees: 240000,
      rating: 4.9,
      placements: "Average 20 LPA, Highest 2+ Cr",
      overview:
        "Premier IIT with strong research output and industry collaboration."
    },
    {
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai",
      fees: 250000,
      rating: 4.9,
      placements: "Average 21 LPA, Highest 3+ Cr",
      overview:
        "Top-ranked IIT known for computer science and entrepreneurship culture."
    },
    {
      name: "Indian Institute of Technology Madras",
      location: "Chennai",
      fees: 230000,
      rating: 4.9,
      placements: "Average 19 LPA, Highest 1.9 Cr",
      overview:
        "Best IIT in NIRF rankings with strong AI/ML and research ecosystem."
    },
    {
      name: "Indian Institute of Technology Kanpur",
      location: "Kanpur",
      fees: 220000,
      rating: 4.8,
      placements: "Average 18 LPA, Highest 1.5 Cr",
      overview:
        "Known for strong core engineering and theoretical computer science."
    },
    {
      name: "Indian Institute of Technology Kharagpur",
      location: "Kharagpur",
      fees: 220000,
      rating: 4.8,
      placements: "Average 17 LPA, Highest 2 Cr",
      overview:
        "Oldest IIT with massive campus and diverse branches."
    },
    {
      name: "National Institute of Technology Trichy",
      location: "Tiruchirappalli",
      fees: 180000,
      rating: 4.6,
      placements: "Average 15 LPA, Highest 1.2 Cr",
      overview:
        "Top NIT in India with excellent placements and ROI."
    },
    {
      name: "National Institute of Technology Surathkal",
      location: "Karnataka",
      fees: 175000,
      rating: 4.6,
      placements: "Average 16 LPA, Highest 1 Cr",
      overview:
        "Strong coding culture and coastal campus."
    },
    {
      name: "Visvesvaraya National Institute of Technology",
      location: "Nagpur",
      fees: 150000,
      rating: 4.4,
      placements: "Average 10 LPA, Highest 40 LPA",
      overview:
        "One of the top NITs in Maharashtra with good ROI."
    },
    {
      name: "Motilal Nehru National Institute of Technology",
      location: "Prayagraj",
      fees: 160000,
      rating: 4.5,
      placements: "Average 14 LPA, Highest 1 Cr",
      overview:
        "Strong academics and decent placement record."
    }
  ];

  // 🏫 Insert Colleges + Relations
  for (let i = 0; i < collegesData.length; i++) {
    const college = await prisma.college.create({
      data: {
        ...collegesData[i],

        courses: {
          create: [
            { name: "Computer Science Engineering", duration: "4 Years" },
            { name: "Electronics Engineering", duration: "4 Years" },
            { name: "Mechanical Engineering", duration: "4 Years" }
          ]
        },

        reviews: {
          create: [
            {
              user: `Student ${i + 1}`,
              comment: "Excellent campus and placements are good.",
              rating: 5
            },
            {
              user: `Alumni ${i + 1}`,
              comment: "Good ROI but competitive environment.",
              rating: 4
            }
          ]
        }
      }
    });
  }

  // ❤️ Saved colleges
  const allColleges = await prisma.college.findMany();

  for (let i = 0; i < users.length; i++) {
    await prisma.savedCollege.create({
      data: {
        userId: users[i].id,
        collegeId: allColleges[i % allColleges.length].id
      }
    });
  }

  console.log("✅ REAL DATA SEED COMPLETED");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });