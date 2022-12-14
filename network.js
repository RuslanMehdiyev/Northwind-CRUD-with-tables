const axiosInstance = axios.create({
  baseURL: "https://northwind.vercel.app/api",
});

const network = {
  postAll: async (url, data) => {
    await axiosInstance
      .post(url, data)
      .then((res) => {
        if (res.status == 201) {
          toast.classList.add("display");
          setTimeout(() => {
            toast.classList.remove("display");
          }, 2000);
        }
      })
      .catch(() => {
        toastError.classList.add("display");
        setTimeout(() => {
          toastError.classList.remove("display");
        }, 2000);
      });
  },
  getAll: async (url) => {
    let array = [];
    await axiosInstance.get(url).then((res) => (array = res));
    return array;
  },
  deleteMethod: async (url, id) => {
    await axiosInstance.delete(url + id).then((res) => res);
  },
  putMethod: async (url, id, newData) => {
    await axiosInstance({
      url: `${url}/${id}`,
      method: "PUT",
      data: newData,
    });
  },
};
