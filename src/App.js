import './App.css'
import SocketHandler from './SocketHandler/SocketHandler';

function App() {

    new SocketHandler();

    document.addEventListener('mastersdata', (e) => {
        console.log("In the masters listener",e.detail);
    }, false);

    document.addEventListener('usersdata', (e) => {
        console.log("In the users listener",e.detail);
    }, false);

    const apiCall = {
        "event": "usersdata",
        "data": {
            "id":0
        }
    };

    document.addEventListener('socketstatus', (e) => {
        if(e.detail === "connected"){
            
            new SocketHandler().callEventWithData(JSON.stringify(apiCall));
        }
    }, false);
    

    return (<>
        <h1 >---</h1>
    </>)
}

export default App;

