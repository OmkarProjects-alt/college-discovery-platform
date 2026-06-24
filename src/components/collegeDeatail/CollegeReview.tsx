import { Star } from "lucide-react";

type Props = {
  reviews: {
    id: string;
    userId: string,
    comment: string;
    rating: number;
    collegeId: string;
  }[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CollegeReview({ reviews }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Student Reviews
        </h2>

        <span className="text-sm text-gray-500">
          {reviews.length} reviews
        </span>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No reviews yet
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[280px] max-w-[280px] bg-gray-50 border border-neutral-200 rounded-xl p-4 hover:shadow-md transition"
            >

              <div className="flex items-center justify-between mb-3">

                <div className="flex items-center gap-3">

                  <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm">
                    {}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {/* {review.user} */}
                    </p>
                    <p className="text-xs text-gray-400">
                      Verified Student
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                  <Star size={14} fill="#facc15" />
                  {review.rating}
                </div>

              </div>

              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                {review.comment}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}