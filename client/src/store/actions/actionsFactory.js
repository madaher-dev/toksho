import axios from 'axios';

export const post = (body, url, type, typeFail) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`${url}`, body, config);

    dispatch({
      type,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err.response.data.message
    });
  }
};

export const get = (url, type, typeFail) => async dispatch => {
  try {
    console.log('hello');
    const res = await axios.get(`${url}`);
    console.log(res);
    dispatch({
      type,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: typeFail,
      payload: err.response.data.message
    });
  }
};

export const patch = (body, url, type, typeFail) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(`${url}`, body, config);

    dispatch({
      type,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: typeFail
      //payload: err.response.data.message
    });
  }
};
