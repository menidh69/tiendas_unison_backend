import React, {Fragment, useContext, useEffect, useState, useMemo} from 'react';
import StarIcon from './StarIcon';

function RatingIcon(props) {
    const {
      index,
      rating,
      hoverRating,
      onMouseEnter,
      onMouseLeave,
      onSaveRating,
    } = props;
    
    const fill = useMemo(() => {
      if (hoverRating >= index) {
        return true;
      } else if (!hoverRating && rating >= index) {
        return true;
      }
      return false;
    }, [rating, hoverRating, index]);
    return (
        <div 
          className="cursor-pointer"
          onMouseEnter={() => onMouseEnter(index)} 
          onMouseLeave={() => onMouseLeave()} 
          onClick={() => onSaveRating(index)}>
          <StarIcon fill={fill} />
        </div>
    )
  }

  

  export default RatingIcon;