import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const colleges = [
    {
      name: "NIT Tiruchirappalli",
      location: "Tiruchirappalli, Tamil Nadu",
      fees: 180000,
      rating: 4.7,
      placements: "Average Package ₹14 LPA",
      overview:
        "NIT Trichy is among the top National Institutes of Technology in India. It offers strong engineering programs, excellent faculty, impressive placement records, and modern campus infrastructure.",
      instituteType: "Government",
      naacGrade: "A+",
      established: 1964,
      link: "https://www.nitt.edu",
      cutoffRank: 5000,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyYxxgT4W0IdodZFyZRRMEZmaSXmmqze9NqH1YS_s09p9o7EgM-t6IxJA&s=10",
    },

    {
      name: "COEP Technological University",
      location: "Pune, Maharashtra",
      fees: 120000,
      rating: 4.6,
      placements: "Average Package ₹10 LPA",
      overview:
        "COEP is one of India's oldest engineering institutions with a rich academic legacy. It provides quality education, strong industry connections, and a vibrant student community.",
      instituteType: "Government",
      naacGrade: "A+",
      established: 1854,
      link: "https://www.coeptech.ac.in",
      cutoffRank: 12000,
      imageUrl:
        "https://www.coeptech.ac.in/wp-content/uploads/elementor/thumbs/COEP-Website-Pic-1-r4qfk1ygvn7y9y1tf4vppvonlurjzsbf6jrltou9w8.jpg",
    },

    {
      name: "VIT Vellore",
      location: "Vellore, Tamil Nadu",
      fees: 195000,
      rating: 4.5,
      placements: "Average Package ₹9 LPA",
      overview:
        "VIT Vellore is one of India's leading private universities known for strong placements, modern infrastructure, global collaborations, and a diverse student population from across the country.",
      instituteType: "Private",
      naacGrade: "A++",
      established: 1984,
      link: "https://vit.ac.in",
      cutoffRank: 25000,
      imageUrl:
        "https://vit.ac.in/wp-content/uploads/2023/06/banner7.webp",
    },

    {
      name: "SRM Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      fees: 220000,
      rating: 4.4,
      placements: "Average Package ₹8 LPA",
      overview:
        "SRM is a well-known private university offering engineering, management, and science programs. It has strong industry partnerships, good placements, and extensive campus facilities.",
      instituteType: "Private",
      naacGrade: "A++",
      established: 1985,
      link: "https://www.srmist.edu.in",
      cutoffRank: 35000,
      imageUrl:
        "https://campuspro.co.in/collage-image/1748857603_row_139.jpg",
    },

    {
      name: "BITS Pilani",
      location: "Pilani, Rajasthan",
      fees: 280000,
      rating: 4.8,
      placements: "Average Package ₹21 LPA",
      overview:
        "BITS Pilani is one of India's most prestigious private institutions. It is known for academic flexibility, entrepreneurship culture, strong alumni network, and excellent placements.",
      instituteType: "Private",
      naacGrade: "A++",
      established: 1964,
      link: "https://www.bits-pilani.ac.in",
      cutoffRank: 3000,
      imageUrl:
        "https://www.catalyser.in/public/img/blog/bitcblog1.jpg",
    },

    {
      name: "Manipal Institute of Technology",
      location: "Manipal, Karnataka",
      fees: 325000,
      rating: 4.3,
      placements: "Average Package ₹8 LPA",
      overview: "MIT Manipal offers quality engineering education with modern infrastructure, international exposure, and strong placement opportunities across multiple industries.",
      instituteType: "Private",
      naacGrade: "A+",
      established: 1957,
      link: "https://manipal.edu",
      cutoffRank: 45000,
      imageUrl:
        "https://mitmanipal.managementquotainfo.in/wp-content/uploads/sites/8/2019/12/MIT-Manipal.jpg",
    },

    {
      name: "KIIT University",
      location: "Bhubaneswar, Odisha",
      fees: 185000,
      rating: 4.2,
      placements: "Average Package ₹7 LPA",
      overview:
        "KIIT is a rapidly growing private university known for modern facilities, multidisciplinary education, and good placement opportunities for engineering students.",
      instituteType: "Private",
      naacGrade: "A++",
      established: 1992,
      link: "https://kiit.ac.in",
      cutoffRank: 60000,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzjmLCdbVfjQxz9QXfBkd6yFB6bn4DfdGeEKzss-Xf8h2nIup4XRtphQ&s=10",
    },

    {
      name: "PCCOE Pune",
      location: "Pune, Maharashtra",
      fees: 135000,
      rating: 4.1,
      placements: "Average Package ₹6.5 LPA",
      overview:
        "PCCOE is a reputed engineering college in Pune known for industry-focused learning, practical exposure, and steady placement records in IT and core sectors.",
      instituteType: "Private",
      naacGrade: "A",
      established: 1999,
      link: "https://www.pccoepune.com",
      cutoffRank: 75000,
      imageUrl:
        "https://www.pccoepune.com/images/popup-gallery/13.jpg",
    },
    {
      name: "DY Patil College of Engineering",
      location: "Pune, Maharashtra",
      fees: 145000,
      rating: 3.9,
      placements: "Average Package ₹5.5 LPA",
      instituteType: "Private",
      naacGrade: "A",
      established: 1984,
      link: "https://engg.dypvp.edu.in",
      cutoffRank: 95000,
      overview: "DY Patil College provides engineering education with a focus on practical skills, campus activities, and industry-oriented training programs.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSumrx8HE1k8k9QQtlA2iv2i2abpkY8NoSx5D1DGZlrGSkBKxkqJRUR4&s=10"
    },
    {
      name: "Sinhgad College of Engineering",
      location: "Pune, Maharashtra",
      fees: 115000,
      rating: 3.7,
      placements: "Average Package ₹4.5 LPA",
      instituteType: "Private",
      naacGrade: "B++",
      established: 1996,
      link: "https://cms.sinhgad.edu",
      cutoffRank: 120000,
      overview: "Sinhgad College is a popular engineering institution offering affordable education, experienced faculty, and opportunities for technical and extracurricular growth.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwronpLU5jj9ToCE9kXpPuP1tlIoze6YGDJ7AnvJ7VpvP7LGQ1R4i2TJA&s=10"
    }
  ];

  await prisma.college.createMany({
    data: colleges,
    skipDuplicates: true,
  });

  console.log("✅ Colleges inserted");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });