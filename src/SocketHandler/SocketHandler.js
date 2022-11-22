class SocketHandler {
    static Instance = null;
    constructor() {
        if (SocketHandler.Instance === null) {
            SocketHandler.Instance = this;
            console.log("Connecting................................");
            this.ws = new WebSocket('ws://192.168.1.7:8000/ws/superadmin/?Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5MTc1ODQwLCJpYXQiOjE2NjkwODk0NDAsImp0aSI6ImYyMDJkNzUxZTVhNTQyZjBiNDA3YTg1Nzg1MDc3NmQ2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInVzZXJfdHlwZSI6IkEifQ.cGsPy8Nae-JoYwjZyShsgRIarS98Ifougjunn_RzlJ0');

            this.managerEvent = new Event("managers");

            this.ws.onopen = function (event) {
                var socketStatusEvent = new CustomEvent("socketstatus", {
                    "detail": "connected"
                });
                document.dispatchEvent(socketStatusEvent);
            };

            this.ws.onmessage = (e) => {
                const jsonObj = JSON.parse(e.data);
                if (jsonObj.hasOwnProperty("event")) {
                    if (jsonObj.event === "mastersdata") {
                        var mastersDataEvent = new CustomEvent("mastersdata", {
                            "detail": jsonObj.data
                        });
                        document.dispatchEvent(mastersDataEvent);
                    }
                    if (jsonObj.event === "usersdata") {
                        var usersDataEvent = new CustomEvent("usersdata", {
                            "detail": jsonObj.data
                        });
                        document.dispatchEvent(usersDataEvent);
                    }
                }
            }
        }
        else {
            return SocketHandler.Instance;
        }
    }

    callEventWithData(dataObj) {
        this.ws.send(dataObj);
    }
}
export default SocketHandler;