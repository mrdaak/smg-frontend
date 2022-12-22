import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Listing from "../../components/Listing";
import { BACKEND_URL } from "../../const";
import IListing from "../../types";

interface Params {
  listingId: string
}

const DetailsPage: FC = () => {
  const { listingId } = useParams<Params>();

  const [error, setError] = useState<number | string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listing, setListing] = useState<IListing>([] as any);

  useEffect(() => {
    fetch(`${BACKEND_URL}/listings/${listingId}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return Promise.reject(res.status)        
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setListing(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (error === 404) {
    return (
      <div className="container is-max-desktop">
        <article style={{ width: '400px', margin: '0 auto' }} className="message is-warning mt-6">
          <div className="message-header">Listing not found.</div>
          <div className="message-body">
            <p>There is no listing with ID: {listingId}</p><br />
            <Link to={`/`}>Visit homepage</Link>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container is-max-desktop">
      <p className="is-size-4 my-6"><Link to="/">← All listings</Link></p>

      <Listing id={listing.id} view="full" title={listing.title} description={listing.description} imgSrc={`/livingroom${listing.id}.jpeg`} />
    </div>
  );
};

export default DetailsPage;
