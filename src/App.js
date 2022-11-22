import './App.css'
import SocketHandler from './SocketHandler/SocketHandler';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect } from 'react';


function App() {

    new SocketHandler();
    var tableObj = null;
    const tableMap = new Map();

    const useDataFun =
        (e) => {
            console.log("In the users listener", Object.values(e.detail));
            const jsonArr = Object.values(e.detail);
            console.log(e.detail);
            for (let i = 0; i < jsonArr.length; i++) {
                let obj = jsonArr[i];
                if(tableMap.has(obj.user_id))
                {
                    const rowNumber = tableMap.get(obj.user_id);
                    tableObj.row(rowNumber).data([obj.user_id,
                        obj.username,
                        obj.master_id,
                        obj.credit_limit,
                        obj.leverage_limit,
                        obj.notification_limit,
                        obj.extra_credit_limit,
                        obj.auto_square_off,
                        obj.current_profit_loss,
                        obj.total_pnl]).draw();
                }
                else{
                    tableMap.set(obj.user_id,tableObj.rows().count());
                    console.log(obj.user_id,tableObj.rows().count());
                    tableObj.row.add([obj.user_id,
                        obj.username,
                        obj.master_id,
                        obj.credit_limit,
                        obj.leverage_limit,
                        obj.notification_limit,
                        obj.extra_credit_limit,
                        obj.auto_square_off,
                        obj.current_profit_loss,
                        obj.total_pnl]).draw();
                }
                // console.log(obj.master_id);
                
            }
    }

    useEffect(() => {
        document.addEventListener('usersdata', useDataFun,false);
    
        // cleanup this component
        return () => {
            document.removeEventListener('usersdata', useDataFun,false);
        };
      }, []);





    document.addEventListener('mastersdata', (e) => {
        console.log("In the masters listener", e.detail);
    }, false);




    const apiCall = {
        "event": "usersdata",
        "data": {
            "id": 0
        }
    };

    document.addEventListener('socketstatus', (e) => {
        if (e.detail === "connected") {
            console.log("connected")
            new SocketHandler().callEventWithData(JSON.stringify(apiCall));
        }
    }, false);


    $(document).ready(function () {
        if (tableObj == null) {
            tableObj = $('#example').DataTable();
            console.log("asdasdasdasd");
        }
    });


    // console.log("user",Object.values(userData))
    return (<>

        <div className="container mt-5">
            <table id="example" className="display" >
                <thead>
                    <tr>
                        <th>user_id</th>
                        <th>username</th>
                        <th>master_id</th>
                        <th>credit_limit</th>
                        <th>leverage_limit</th>
                        <th>notification_limit</th>
                        <th>extra_credit_limit</th>
                        <th>auto_square_off</th>
                        <th>current_profit_loss</th>
                        <th>total_pnl</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </>)
}

export default App;

