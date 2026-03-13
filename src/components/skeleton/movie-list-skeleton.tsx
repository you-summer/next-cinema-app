import MovieItemSkeleton from "./movie-item-skeleton";

export default function MovieListSkeleton({ count }: { count: number }) {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => {
        return <MovieItemSkeleton key={`movie-item-skeleton-${idx}`} />;
      })}
    </>
  );
}
