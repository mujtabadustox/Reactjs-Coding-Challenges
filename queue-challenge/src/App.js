import { useEffect, useState } from "react";
import "./app.css";

function App() {
  const [counters, setCounters] = useState([[], [], [], [], []]);
  const [data, setData] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) => {
        return prevCounters.map((counter, index) => {
          return counter.map((c, i) => {
            if (i === 0) {
              // Top element
              if (c > 0) {
                c = c - 1;
              } else if (c <= 0) {
                c = null;
              }
            } else if (prevCounters[index][i - 1] === null) {
              // Decrement if the element above is fully decremented
              if (c > 0) {
                c = c - 1;
              } else if (c <= 0) {
                c = null;
              }
            }
            return c;
          });
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeData = (event) => {
    setData(event.target.valueAsNumber);
  };

  const putQueue = (event) => {
    event.preventDefault();

    let wholeSum = 100000000;
    let i = 1000000;
    counters.map((counter, index) => {
      if (counter !== null) {
        const sum = counter.reduce((c, x) => {
          return c + x;
        }, 0);

        if (sum <= wholeSum) {
          wholeSum = sum;
          i = index;
        }
      }

      return null;
    });

    const newArr = counters.map((counter, index) => {
      if (index === i) {
        counter.push(data);
      }

      return counter;
    });

    setCounters(newArr);
  };

  return (
    <>
      <h1>Hi Mom!</h1>
      <form onSubmit={putQueue}>
        <label>Enter</label>
        <input required value={data} onChange={changeData} type="number" />
        <button type="submit">checkout</button>
      </form>
      <div className="xyz">
        {counters &&
          counters.map((counter, index) => (
            <div key={index}>
              <div className="nn">
                <div className="abc">{index}</div>
              </div>
              <div className="ll">
                {counter &&
                  counter.map((c, i) => (
                    <>
                      {c !== null && (
                        <div className="pp" key={i}>
                          {c}
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
