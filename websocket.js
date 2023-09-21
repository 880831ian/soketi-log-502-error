import ws from "k6/ws";
import { check } from "k6";

export const options = {
  vus: 1000,
  duration: "30s",
};

export default function () {
  const url =
    "wss://socket.XXX.com/app/XXX-ws?protocol=7&client=js&version=7.4.1&flash=false";

  const res = ws.connect(url, function (socket) {
    socket.on("open", () => console.log("connected"));
    socket.on("message", (data) => console.log("Message received: ", data));
    socket.on("close", () => console.log("disconnected"));
  });

  check(res, { "status is 101": (r) => r && r.status === 101 });
}
