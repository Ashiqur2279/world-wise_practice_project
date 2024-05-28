import Header from "../component/Header";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <Header />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide</h2>
          <p>
            Discover breathtaking destinations with our curated tours, designed
            to offer you the ultimate travel experience. Our packages cater to
            every traveler's desires, from serene beaches and vibrant cities to
            majestic mountains and exotic locales. Each tour is thoughtfully
            crafted, ensuring you enjoy the best sights, sounds, and flavors of
            your chosen destination.
          </p>
          <p>
            Enjoy peace of mind with our comprehensive services. Our expert
            guides are passionate about sharing their knowledge, ensuring you
            get the most out of every moment. With top-notch accommodations,
            seamless transportation, and personalized itineraries, all you need
            to do is relax and immerse yourself in the adventure. Book now and
            let us turn your travel dreams into reality!
          </p>
        </div>
      </section>
    </main>
  );
}
