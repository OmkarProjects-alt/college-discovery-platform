import { api } from '@/lib/axios';
import { prisma } from '@/lib/prisma';
import { skip } from 'node:test';

export async function getColleges (filters?: {
    location?: string,
    search?: string,
    rating?: string,
    fees?: string,
    course?: string,
}, 
    page = 1,
    limit = 6,
)  {
  const searchAsNumber = Number(filters?.search);
    const college = prisma.college.findMany({
               where: {
                ...(filters?.search && {
                    OR: [
                        {    
                            name: {
                                contains: filters?.search,
                                mode: "insensitive",
                            },
                        },
                        {
                            location: {
                                contains: filters?.search,
                                mode: "insensitive"
                            },
                        },
                        {
                          courses:{
                              some: {
                                name: {
                                  contains: filters.search,
                                  mode: "insensitive",
                                }
                              }
                            }
                        },
                       ...(Number.isFinite(searchAsNumber)
                          ? [{ cutoffRank: { gte: searchAsNumber } }]
                          : []),
                    ]
                }),

                ...(filters?.location && {
                    location: {
                      contains: filters.location,
                      mode: "insensitive"
                    }
                }),

                ...(filters?.rating && {
                    rating: {
                        gte: Number(filters.rating)
                    },
                }),

                ...(filters?.fees && {
                    fees: {
                        lte: Number(filters?.fees)
                    },
                }),

                ...(filters?.course  && {
                    courses: {
                      some: {
                        name: filters?.course,
                      }
                    }
                })
               },

               skip: (page - 1) * limit,
               take: limit,
            })


    return college;
}

export async function getCollege({ id }: { id: string }) {
  return await prisma.college.findUnique({
    where: { id },
    include: {
      courses: true,
      reviews: true,
    },
  });
}

export async function getRelatedCollege({
  id,
  fees,
  instituteType,
}: {
  id: string;
  fees: number;
  instituteType: string | null;
}) {
  return prisma.college.findMany({
    where: {
      NOT: {
        id,
      },

      OR: [
        {
          instituteType,
        },
        {
          fees: {
            gte: fees - 50000,
            lte: fees + 50000,
          },
        },
      ],
    },

    select: {
        id: true,
        name: true,
        imageUrl: true,
        rating: true,
        location: true,
    },

    take: 3,
  });
}


export async function saveCollege(collegeId: string ) {
  const result = await api.post('/colleges/saved-colleges',
    { collegeId }
  )

  return result.data;
}

export async function getAllSavedCollegs() {
  const result = await api.get('/colleges/saved-colleges')

  return result.data;
}

export async function removedSavedCollege(collegeId: string ){
  const result = await api.delete('/colleges/saved-colleges',
    {
      data: { collegeId },
    } 
  )

  return result.data;
}