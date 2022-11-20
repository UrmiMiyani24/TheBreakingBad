import NetworkUtils from "./NetworkUtils";
import { Host } from "../config/Constants";

 const Api = new NetworkUtils({
  baseUrl: Host
});

export default Api;

