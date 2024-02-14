import candySaleImage from './images/candysale.png';

function Construct(props) {
  let info = props.info;
  info.module = 3;
  info.week = 18;
  info.day = 7;
  info.hour = 23;
  info.min = 59;


  return (
    <div className="App">
      <img src={candySaleImage} className='w-100' alt="candy" />
    </div>
  );
}

export default Construct;
