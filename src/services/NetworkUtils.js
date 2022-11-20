import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { Alert } from "react-native";

class NetworkUtils {
  constructor(options) {
   this.baseUrl = options.baseUrl;
  }

  get(endpoint, token = null) {
    return this.requestHttp("GET", this.baseUrl + endpoint, null);
  }

  post(endpoint, params, token = null) {
    return this.requestHttp("POST", this.baseUrl + endpoint, params);
  }

  put(endpoint, params, token = null) {
    return this.requestHttp("PUT", this.baseUrl + endpoint, params);
  }

  delete(endpoint, params, token = null) {
    return this.requestHttp("DELETE", this.baseUrl + endpoint, params);
  }

  getInternetStatus = () => {
    let lStatus = false;
    NetInfo.addEventListener((state) => {
      lStatus = state.isConnected;
      if (!state.isConnected) {
        Alert.alert("", "Please check your internet connection", "default");
      }
    });
    return lStatus;
  };
  async requestHttp(method, url, params) {
    
    return new Promise((resolve, reject) => {
      debugger;
      var options = {
        method,
        url,
        crossdomain: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(params),
      };

      axios(options)
        .then((response) => {
          resolve({ statusCode: response.status, body: response.data });
        })
        .catch((error) => {
          if (error.response != undefined) {
            resolve({
              statusCode: error.response.status,
              body: error.response.data,
            });
          } else {
            Alert.alert("Server Error!", "Can not connect to server");
          }
        });
    });
  }
}

export default NetworkUtils;
