

function Construct(props) {
  let info = props.info;
  info.module = 3;
  info.week = 18;
  info.day = 7;
  info.hour = 23;
  info.min = 59;


  return (
    <div className="App">
      <header className="App-header">
        <h1>Under construction</h1>
        <h2>Coming on (or before)</h2>
        <h2>
          Module: {props.info.module} Week: {props.info.week} Day:{" "}
          {props.info.day}
        </h2>
        <h2>
          by or <strong>WELL BEFORE</strong> {props.info.hour}:{props.info.min}{"  "}
          Pacific Time
        </h2>
      </header>
    </div>
  );
}

export default Construct;
