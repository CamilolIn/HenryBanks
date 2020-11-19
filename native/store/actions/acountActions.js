import axios from "axios";
import { GET_ACCOUNT, RECHARGE_QR, RECHARGE_CARD } from "../constans/constans";


import { BACK_URL } from "../../env";
import Toast from "react-native-toast-message";



export function getAccount(id) {
  return (dispatch) => {
    axios
      .get(`${BACK_URL}/api/accounts/getAccounts/`, {
        params: {
          _id: id,
        },
      })
      .then((res) => {
          console.log(res.data)
        dispatch({
          type: GET_ACCOUNT,
          data: res.data || [],
        });

      })
      .catch((error) => {
        console.log(error)
      });
  };
}


export function rechargeByQr(data) {
  return (dispatch) => {
    console.log(data)
    axios
      .post(`${BACK_URL}/api/accounts/rechargeByQR/`, data)
      .then((res) => {
          console.log(res.data)
        dispatch({
          type: RECHARGE_QR,
          data: res.data || {},
        });

      })
      .catch((error) => {
        console.log(error)
      });
  };
}

export function rechargeByCard(data, onSuccess) {
  return (dispatch) => {
    console.log('***est este***')
    console.log(data)
    axios
      .post(`${BACK_URL}/api/accounts/rechargeByCard`, data)
      .then((res) => {
        console.log('*****res card recharse***')
          console.log(res.data)
        dispatch({
          type: RECHARGE_CARD,
          data: res.data || {},
        });
        setTimeout(()=> {
          Toast.show({
            type: "success",
            position: "top",
            text1: ` Transaccion exitosa ... `,
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }, 3000)

        Toast.show({
          type: "success",
          position: "top",
          text1: `Cargando ... `,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });


      })
      .catch((error) => {
        console.log(error)
      });
  };
}