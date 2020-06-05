const got = require("got");

const btnGetLink = document.getElementById("btn-get-link");
const sd = document.getElementById("url-sd");
const hd = document.getElementById("url-hd");

const urlSD = (url) => {
  sd.href = url;
  sd.innerHTML = url;
};

const urlHD = (url) => {
  hd.href = url;
  hd.innerHTML = url;
};

const getLink = () => {
  const input = document.getElementById("input-get-link");
  console.log(input.value);

  let link = input.value;

  getLinkSD(link).then((el) => urlSD(el.url));

  getLinkHD(link).then((el) => urlHD(el.url));
};

btnGetLink.addEventListener("click", getLink);

//link download video from facebook
const getLinkSD = (link) => {
  return got(link)
    .then((res) => {
      const link = res.body.split('sd_src:"')[1].split('",hd_tag')[0];
      return {
        url: link,
      };
    })
    .catch((error) => {
      hd.href = "#";
      hd.innerHTML = "Not found url video SD";
    });
};

const getLinkHD = (link) => {
  return got(link)
    .then((res) => {
      const link = res.body.split('hd_src:"')[1].split('",sd_src:"')[0];
      return {
        url: link,
      };
    })
    .catch((error) => {
      hd.href = "#";
      hd.innerHTML = "Not found url video HD";
    });
};
