import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import movies from "@/dummy.json";
import { MovieData } from "@/types";
import { Suspense } from "react";
import { delay } from "@/util/delay";
import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function AllMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }, // 요청의 결과를 무조건 캐싱함 이유 : 한번 호출된 이후에는 다시는 호출하지 않아서 웬만하면 업데이트가 없어서?
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </>
  );
}

async function RecoMovie() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovie: MovieData[] = await response.json();

  return (
    <>
      {recoMovie.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.reco_conatiner}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecoMovie />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          <Suspense fallback={<MovieListSkeleton count={5} />}>
            <AllMovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
