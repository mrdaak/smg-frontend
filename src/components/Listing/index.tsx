import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as DOMPurify from 'dompurify';

interface ListingProps {
  id: string;
  imgSrc: string | undefined;
  title: string;
  description?: string;
  view: "minimal" | "full"
}

const Listing: FC<ListingProps> = ({ id, imgSrc, title, description, view }) => {
  const cleanDesc = description && DOMPurify.sanitize(description)
  const isMinimal = view === 'minimal';

  return (
    <div className={`${isMinimal ? 'listing--minimal' : ''} card mb-6 column mr-4`}>
      {imgSrc && <div className="card-image">
        <Link to={`/details/${id}`}>
        <figure className="image is-square">
          <img src={imgSrc} loading="lazy" alt="livingroom" />
        </figure>
        </Link>
        </div>}
        <div className="card-content">
          <p className="is-size-4 has-text-weight-semibold mb-2" style={{minHeight: '70px'}}><Link className="has-text-black" to={`/details/${id}`}>{title}</Link></p>
          <div className={`content`}>
            {cleanDesc && <div className={`listing__description ${isMinimal ? 'listing__description--minimal' : ''}`} dangerouslySetInnerHTML={{__html: cleanDesc}} />}  
            {isMinimal && <Link to={`/details/${id}`}>Read more</Link>}
          </div>
        </div>
    </div>
  );
};

export default Listing;
