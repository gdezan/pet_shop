export const masks = {
  currency: value => {
    if (Number.isNaN(value)) {
      return "0.00";
    }
    var str = value.toString();
    str = str.replace(/[^0-9]|^0+/g, "");
    if (str.length < 3) {
      str = str.padStart(3, 0);
    }
    // adding decimal point before the last two chars and converting to a known format
    str = str.replace(/(.*)(..)$/, "$1,$2").toLocaleString("en-US");

    return str;
  },
  percent: value => {
    if (Number.isNaN(value)) {
      return "0";
    }
    var str = value.toString();
    str = str.replace(/[^0-9]|^0+/g, "");
    if (str.length > 2) {
      return str.slice(1);
    }

    return str;
  },
};

export const formatters = {
  inputToPrice: value => {
    return parseInt(value.replace(/[^0-9]|^0+/g, ""));
  },
};

export const objectToQueryString = obj => {
  return Object.keys(obj)
    .map(key => key + "=" + obj[key])
    .join("&");
};
