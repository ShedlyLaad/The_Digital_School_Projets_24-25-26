import React, { useReducer } from 'react';
import { actionTypes, initialState } from './reducer';

const MovieCard = ({ movie }) => {
  const [state, dispatch] = useReducer(actionTypes, initialState);

  const handleLikeClick = () => {
    dispatch({
      type: actionTypes.LIKE_TOGGLE,
      payload: {
        likes: state.liked ? state.likes - 1 : state.likes + 1
      }
    });
  };

  const handleCommentClick = () => {
    dispatch({
      type: actionTypes.COMMENT_TOGGLE
    });
  };

  return (
    <div className="card card full-image">
      <div className="wrapper" style={{backgroundImage: `url(${movie.image})`}}>
        <div className="header">
          <div className="date">
            <span className="day">12</span>
            <span className="month">Aug</span>
            <span className="year">2016</span>
          </div>
          <ul className="menu-content">
            <li>
              <a href="#" className="fa fa-bookmark-o"></a>
            </li>
            <li>
              <a href="#" className="fa fa-heart-o">
                <span>{state.likes}</span>
              </a>
            </li>
            <li>
              <a href="#" className="fa fa-comment-o">
                <span>{movie.comment}</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="data">
          <div className="content">
            <span className="author">{movie.author}</span>
            <h1 className="title">
              <a href="#">{movie.title}</a>
            </h1>
            <p className="text">{movie.resume}</p>
            <a href={movie.trailer} className="button">
              Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
