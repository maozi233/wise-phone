


const protocol = 'http:';
export const API_URL = `http://wise-s-api.ketongtx.com/wise-wises/rs/client/`;
export const API_UPLOAD_URL = `${API_URL}ClientUpload?type=1`;
/*

function checkResponse(response) {
  let contentType = response.headers["content-type"];
  // Msg.hideLoading();
  if (response.status === 200) {
    if (contentType.indexOf(CONTENT_TYPE.html) !== -1) {
      return response.text;
    }

    if (contentType.indexOf(CONTENT_TYPE.json) !== -1) {
      let result = response.data?response.data:JSON.parse(response.request.responseText);
      if (result.code != 0) {
        Msg.alert("错误信息",result.msg,()=>{
          if(result.code=="00000001"){
            location.href="#/login";
            return false;
          }
        });
        // alert(result.msg);
        return false;
      } else {
        return result.result;
      }
    }
  } else {
    Msg.alert("错误信息",`${response.status} ${response.statusText}`);
  }
}

axios.interceptors.response.use(checkResponse, (error) => {
  // Do something with response error
  // Msg.hideLoading();
  // Msg.alert("错误信息",error);
  return Promise.reject(error);
});
*/

/*export class HttpClient {

  static call(url, {method = 'get', headers = null, body = null, mask = true, postData = false, external = false} = {}) {
    url = external ? url : API_URL + url;
    if (url.indexOf("?") === -1) {
      url += "?";
    } else {
      url += "&";
    }
    url += `_t=${new Date().getTime()}`;
    if (ENV.DEBUG) {
      url += "&" + ENV.DEBUG_STR;
    }

    let params = {
      baseURL: API_URL,
      method: method,
      url: url,
      responseType: "json",
      withCredentials: true// default
    };

    if (headers) {
      params.headers = headers;
    }
    if (method === 'get') {
      params.params = body;
    } else {
      params.data = postData ? body : qs.stringify(body);
    }
    if (mask) {
      Msg.loading();
    }
    return axios(params);
  }

  static get(url, {mask = true, external = false} = {}) {
    return HttpClient.call(url, {
      external,
      mask
    });
  }


  static post(url, {body = {}, method = "post", mask = true, postData = false, external = true} = {}) {
    return HttpClient.call(url, {
      method,
      headers: {
        [CONTENT_TYPE_KEY]: CONTENT_TYPE.form
      },
      body: body,
      external,
      postData,
      mask,
    });
  }

  static put(url, {body = {}, mask = true, postData = false, external = false} = {}) {
    return HttpClient.post(url, {body, method: "put", postData, external, mask});
  }

  static destroy(url, {body = {}, mask = true, postData = false, external = false} = {}) {
    return HttpClient.post(url, {body, method: "delete", postData, external, mask});
  }

  static postBody(url, {body = {}, method = "post", mask = true, postData = true, external = false}) {
    return HttpClient.call(url, {
      method,
      headers: {
        [CONTENT_TYPE_KEY]: CONTENT_TYPE.json
      },
      body: body,
      postData,
      external,
      mask
    });
  }

}*/
