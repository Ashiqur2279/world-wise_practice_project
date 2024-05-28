// Uses the same styles as Product
import Header from "../component/Header";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <Header />
      <section>
        <div>
          <h2>
            Join with us
            <br />
            Just $9/month.
          </h2>
          <p>
            Explore the world with our exclusive tour packages! Whether you're
            dreaming of a tropical beach, a cultural city escape, or an
            adventurous mountain trek, we have the perfect itinerary for you.
            Join us for an unforgettable journey, complete with expert guides,
            luxurious accommodations, and unique experiences. Book your
            adventure today and create memories that will last a lifetime!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
