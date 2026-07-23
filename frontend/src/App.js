import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {

  const [data, setData] = useState({
    semaphore: 0,
    resources: 0,
    waitingQueue: [],
    processes: []
  });

  const loadData = async () => {
    const res = await api.get("/status");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const waitProcess = async (id) => {
    const res = await api.post("/wait", {
      processId: id
    });

    setData(res.data);
  };

  const signalProcess = async (id) => {
    const res = await api.post("/signal", {
      processId: id
    });

    setData(res.data);
  };

  const reset = async () => {
    const res = await api.post("/reset");
    setData(res.data);
  };

  return (
    <div className="container">

      <h1>Semaphore Synchronization</h1>

      <div className="status">

        <h3>Semaphore : {data.semaphore}</h3>

        <h3>Resources : {data.resources}</h3>

      </div>

      <h3>
        Waiting Queue :
        {
          data.waitingQueue.length === 0
          ? " Empty"
          : " " + data.waitingQueue.join(", ")
        }
      </h3>

      <table>

        <thead>

          <tr>

            <th>Process</th>

            <th>Status</th>

            <th>Wait()</th>

            <th>Signal()</th>

          </tr>

        </thead>

        <tbody>

          {
            data.processes.map(process => (

              <tr key={process.id}>

                <td>{process.id}</td>

                <td>{process.status}</td>

                <td>

                  <button
                    className="wait"
                    onClick={() => waitProcess(process.id)}
                  >
                    Wait()
                  </button>

                </td>

                <td>

                  <button
                    className="signal"
                    onClick={() => signalProcess(process.id)}
                  >
                    Signal()
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

      <button
        className="reset"
        onClick={reset}
      >
        Reset
      </button>

    </div>
  );

}

export default App;