import React, { FC, useEffect, useState } from "react";
import Listing from "../../components/Listing";
import { BACKEND_URL } from "../../const";

const Home: FC = () => {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/listings`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(res.status)  
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setListings(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <div className="container">
    <p className="is-size-1 my-6">All listings ({listings.length})</p>
    <div className="columns is-flex-mobile is-justify-content-center is-flex-wrap-wrap">
      {listings.map(({ id, title, description, images }) => <Listing key={id} id={id} view='minimal' title={title} imgSrc={`/livingroom${id}.jpeg`} description={description} />)}
    </div>
  </div>;
};

export default Home;
