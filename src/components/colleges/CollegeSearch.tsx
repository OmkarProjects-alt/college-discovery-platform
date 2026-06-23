"use client"

import { Search } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

const CollegeSearch = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);

    if(!value) {
      params.delete("search");
    } else {
      params.set("search", value)
    }

    router.push(`/colleges?${params.toString()}`)
  }

  return (
    <div className='md:w-lg'>
      <div className='relative'>
          <input 
            onChange={handleChange}
            defaultValue={searchParams.get("search") || ""}
            type="text" 
            className='w-full outline-none rounded-2xl p-2 border border-neutral-300 px-13'
            placeholder="Search by college name, location or your rank"
          />

          <div className='absolute bottom-2 left-3 text-neutral-400 '>
            <Search />
          </div>
      </div>
    </div>
  )
}

export default CollegeSearch
