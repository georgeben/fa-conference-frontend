import store from "../store";
import toast from "./toast";
export default function (error) {
  if (process.env.NODE_ENV !== "production") {
    console.log("An error occurred", error);
  }
  if (!error.response) {
    return toast.error("Something went wrong, please try again later");
  }
  switch (error.response.status) {
    case 401:
      // Quietly log the user out and send the user to the login screen
      toast.error(error.response.data.message);
      store.dispatch("logout");
      // if (router.currentRoute.path === "/login") {
      //   return;
      // }
      // router.replace("/login");
      break;
    case 404:
      toast.error(
        error.response.data.message ||
        "Something went wrong. The resource you are requesting for isn't found",
      );
      break;
      // return router.push({ name: "not-found" });
    case 500:
      return toast.error("Something bad happened. Please try again later");
    default:

      toast.error(error.response.data.message);
      return;
  }
}
