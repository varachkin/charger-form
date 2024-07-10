import axios from "axios";

// const serverIP = "http://0.0.0.0:6006"; 
// const serverIP = "https://tardis.test.spaco.cloud/api/"
const serverIP = "http://ec2-3-143-131-213.us-east-2.compute.amazonaws.com:21001/api/v1"

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxODYwMDYxNSwianRpIjoiNjIwMGVlODUtM2Q3NC00YjFkLWI5NmQtNDMwY2ExMDhlNWZiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IiIsIm5iZiI6MTcxODYwMDYxNSwiZXhwIjoxNzIwNDAwNjE1LCJhdWQiOiJhbmRyemVqQHZlbmRvcm9ib3RpY3MuY29tIiwiY2xpZW50X2lkIjoyNywic2NvcGUiOiJQQjAxIn0.H8rpavkyliArvQjuPGWdwyUhsJBLk4rXLoQ0knZVNoI';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxOTk5NzYyMCwianRpIjoiMjI0NGRhM2UtN2MwZC00Y2M1LTgzMDgtYzUyOTQ4ODZmMjNlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IiIsIm5iZiI6MTcxOTk5NzYyMCwiZXhwIjoxNzIxNzk3NjIwLCJhdWQiOiJhbmRyemVqQHZlbmRvcm9ib3RpY3MuY29tIiwiY2xpZW50X2lkIjoyNywic2NvcGUiOiJQQjAxIn0.5j3kZM-0wKmLCUPze2jOokYhm1so2_oE4upIQv0Sqx8';

const config = {
  headers: {
    'accept': 'application/json',
    'authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};



// export const sendData = async (transactionId, data) => {
//   console.log(transactionId, data)
//   const url = serverIP + `/transactions/data?transaction_id=${transactionId}`
//   try {
//     const response = await axios.post(url, data, config);
//     console.log(response);
//   } catch (error) {
//     console.error('There has been a problem with your axios operation:', error);
//   }
// };

export const sendData = async (transactionId, data) => {
  try {
      const response = await axios.post(
          serverIP + `/transactions/data?transaction_id=${transactionId}`,
          {...data},
          {
              headers: {
                  accept: 'application/json',
                  authorization: `Bearer ${token}`
              },
          }
      );
      return response;
  } catch (error) {
      console.error('Error beginning charging:', error);
      throw error;
  }
};

