import Api from "./Api";
export const postGenericService = (url,param) => {
    return new Promise((resolve, reject) => {
        // debugger;
      Api.post(url,param)
        .then(response => {
          debugger
          if (response.statusCode == 200) {
            resolve(response.body);
          } 
          else  if (response.statusCode == 204) {
            resolve(response.body);
          }
          if (response.statusCode == 202) {
            resolve(response.body);
          } 
          else if(response.statusCode==503)
          {
            resolve(response.body)
          }
          else if(response.statusCode==401){
            resolve(response.body)
          }
          else if(response.statusCode==201){
            resolve(response.body)
          }
          else if(response.statusCode==500){
            resolve(response.body)
          }
          else if(response.statusCode==400){
            resolve(response.body)
          }
          else if(response.statusCode==404){
            resolve(response.body)
          }
          else {
            var params = response.body.parameters;
            if (typeof params != "undefined" && params.length > 0) {
              var message = response.body.message;
              params.forEach((item, index) => {
                message = message.replace("%" + (index + 1), item);
              });
              reject(message);
            } else {
              reject(response.body.message);
            }
          }
        })
        .catch(reject);
    });
  };

  export const getGenericService = (url,param) => {
    return new Promise((resolve, reject) => {
        // debugger;
      Api.get(url,param)
        .then(response => {
          debugger
          if (response.statusCode == 200) {
            resolve(response.body);
          } 
          if (response.statusCode == 202) {
            resolve(response.body);
          } 
          else  if (response.statusCode == 204) {
            resolve(response.body);
          }else if (response.statusCode == 500){
            resolve(response.body);
          }else if (response.statusCode == 400){
            resolve(response.body);
          }
          else {
            resolve(response.body);
            var params = response.body.parameters;
            if (typeof params != "undefined" && params.length > 0) {
              var message = response.body.message;
              params.forEach((item, index) => {
                message = message.replace("%" + (index + 1), item);
              });
              reject(message);
            } else {
              reject(response.body.message);
            }
          }
        })
        .catch(reject);
    });
  };

  export const putGenericService = (url,param) => {
    return new Promise((resolve, reject) => {
        // debugger;
      Api.put(url,param)
        .then(response => {
          debugger
          if (response.statusCode == 200) {
            resolve(response.body);
          } 
          if (response.statusCode == 202) {
            resolve(response.body);
          } 
          else  if (response.statusCode == 204) {
            resolve(response.body);
          }else if (response.statusCode == 500){
            resolve(response.body);
          }else if (response.statusCode == 400){
            resolve(response.body);
          }
          else {
            resolve(response.body);
            var params = response.body.parameters;
            if (typeof params != "undefined" && params.length > 0) {
              var message = response.body.message;
              params.forEach((item, index) => {
                message = message.replace("%" + (index + 1), item);
              });
              reject(message);
            } else {
              reject(response.body.message);
            }
          }
        })
        .catch(reject);
    });
  };

  export const deleteGenericService = (url,param) => {
    return new Promise((resolve, reject) => {
        // debugger;
      Api.delete(url,param)
        .then(response => {
          debugger
          if (response.statusCode == 200) {
            resolve(response.body);
          } 
          if (response.statusCode == 202) {
            resolve(response.body);
          } 
          else  if (response.statusCode == 204) {
            resolve(response.body);
          }else if (response.statusCode == 500){
            resolve(response.body);
          }
          else {
            var params = response.body.parameters;
            if (typeof params != "undefined" && params.length > 0) {
              var message = response.body.message;
              params.forEach((item, index) => {
                message = message.replace("%" + (index + 1), item);
              });
              reject(message);
            } else {
              reject(response.body.message);
            }
          }
        })
        .catch(reject);
    });
  };


