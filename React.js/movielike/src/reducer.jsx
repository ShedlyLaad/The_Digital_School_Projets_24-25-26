export const initialState = {
    likes: 0,
    comments: [],
    liked: false,
    commentClicked: false
  };
  
  export const actionTypes = {
    LIKE_TOGGLE: 'LIKE_TOGGLE',
    COMMENT_TOGGLE: 'COMMENT_TOGGLE'
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.LIKE_TOGGLE:
        return {
          ...state,
          likes: action.payload.likes,
          liked: !state.liked
        };
      case actionTypes.COMMENT_TOGGLE:
        return {
          ...state,
          commentClicked: !state.commentClicked
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  