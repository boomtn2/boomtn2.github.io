const axios = require('axios');
const cheerio = require('cheerio');

// URL của trang web bạn muốn lấy href
const url =
  'https://wikisach.net/truyen/nu-xung-mot-long-thoat-khoi-ngheo-kho-XPeg51S4CBCPEOh4';

getInfoBook(url);

function a(W) {
  function V(d, c) {
    return (d >>> c) | (d << (32 - c));
  }
  for (
    var U,
      T,
      S = Math.pow,
      R = S(2, 32),
      Q = 'length',
      P = '',
      O = [],
      N = 8 * W[Q],
      M = (a.h = a.h || []),
      L = (a.k = a.k || []),
      K = L[Q],
      J = {},
      I = 2;
    64 > K;
    I++
  ) {
    if (!J[I]) {
      for (U = 0; 313 > U; U += I) {
        J[U] = I;
      }
      (M[K] = (S(I, 0.5) * R) | 0), (L[K++] = (S(I, 1 / 3) * R) | 0);
    }
  }
  for (W += '\x80'; (W[Q] % 64) - 56; ) {
    W += '\x00';
  }
  for (U = 0; U < W[Q]; U++) {
    if (((T = W.charCodeAt(U)), T >> 8)) {
      return;
    }
    O[U >> 2] |= T << (((3 - U) % 4) * 8);
  }
  for (O[O[Q]] = (N / R) | 0, O[O[Q]] = N, T = 0; T < O[Q]; ) {
    var H = O.slice(T, (T += 16)),
      G = M;
    for (M = M.slice(0, 8), U = 0; 64 > U; U++) {
      var F = H[U - 15],
        E = H[U - 2],
        D = M[0],
        C = M[4],
        B =
          M[7] +
          (V(C, 6) ^ V(C, 11) ^ V(C, 25)) +
          ((C & M[5]) ^ (~C & M[6])) +
          L[U] +
          (H[U] =
            16 > U
              ? H[U]
              : (H[U - 16] +
                  (V(F, 7) ^ V(F, 18) ^ (F >>> 3)) +
                  H[U - 7] +
                  (V(E, 17) ^ V(E, 19) ^ (E >>> 10))) |
                0),
        A =
          (V(D, 2) ^ V(D, 13) ^ V(D, 22)) +
          ((D & M[1]) ^ (D & M[2]) ^ (M[1] & M[2]));
      (M = [(B + A) | 0].concat(M)), (M[4] = (M[4] + B) | 0);
    }
    for (U = 0; 8 > U; U++) {
      M[U] = (M[U] + G[U]) | 0;
    }
  }
  for (U = 0; 8 > U; U++) {
    for (T = 3; T + 1; T--) {
      var z = (M[U] >> (8 * T)) & 255;
      P += (16 > z ? 0 : '') + z.toString(16);
    }
  }
  return P;
}

function getInfoBook(url) {
  axios
    .get(url)
    .then((response) => {
      // Lấy nội dung của phản hồi
      const htmlContent = response.data;

      let signKey = htmlContent.match(/signKey\s*=\s*"(.*?)";/);
      if (signKey) signKey = signKey[1];

      let bookID = htmlContent.match(/bookId\s*=\s*"(.*?)";/);
      if (bookID) bookID = bookID[1];

      let fuzzySignText = htmlContent.match(/function fuzzySign[\s\S]*?}/);
      if (fuzzySignText) fuzzySignText = fuzzySignText[0];

      console.log(signKey);
      console.log(bookID);
      console.log(fuzzySignText);

      let start = '0';
      let size = '501';

      try {
        // Thực thi chuỗi JavaScript bằng cách sử dụng eval()
        let parameterValue = signKey + '0501';

        let fuzzyKey = eval(
          fuzzySignText + 'fuzzySign("' + parameterValue + '");'
        );
        console.log(fuzzyKey);
        let key = a(fuzzyKey);
        fetchData(bookID, signKey, key);
        return null;
      } catch (error) {
        console.error('Error executing JavaScript code:', error);
        return error;
      }
    })
    .catch((error) => {
      console.error('Đã xảy ra lỗi:', error);
    });
}

function fetchData(bookId, signKey, sign) {
  var url = 'https://wikisach.net/book/index?';
  var bookIdA = bookId;
  var start = '0';
  var size = '501';

  // Xây dựng query string từ các tham số
  var queryString =
    url +
    'bookId=' +
    bookIdA +
    '&start=' +
    start +
    '&size=' +
    size +
    '&signKey=' +
    signKey +
    '&sign=' +
    sign;

  console.log(queryString);
  // Thực hiện yêu cầu GET
  axios
    .get(queryString)
    .then((response) => {
      // Kiểm tra trạng thái của response
      if (response.status == 200) {
        var content = response.data;
        console.log(content); // Log nội dung nhận được từ response
        return content;
      } else {
        console.log('Failed to fetch data. Response code: ' + response.status);
        return response.status;
      }
    })
    .catch((error) => {
      console.error('Đã xảy ra lỗi:', error);
    });
}
