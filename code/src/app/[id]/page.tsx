import api from "@/api";
import Link from "next/link";

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const restaurant = await api.fetchById(id);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}

export async function generateStaticParams() {
  const restaurants = await api.list();

  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default async function RestaurantPage({ params: { id }, params }: { params: { id: string } }) {
  const restaurant = await api.fetchById(id);


  return (
    <article key={restaurant.id}>
      <div>
        <Link href="/" prefetch={false}>
          BACK
        </Link>
      </div>
      <pre>
        <code>
          {JSON.stringify(params, null, 2)}
        </code>
      </pre>
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex gap-2 text-lg font-bold">
        <span>{restaurant.name}</span>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
    </article>
  );
}