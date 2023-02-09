import './App.css';
import { useState, useEffect } from 'react';

function ListItem({number, index, deleteItem}) {
  return (
    <div className='flex-parent list-item'>
      <div className='flex-grow'>
        {number}
      </div>
      <div className='flex-shrink'>
        <button className='delete-button' onClick={() => deleteItem(index)}>x</button>
      </div>
    </div>
  )
}

function AddNumber({inputNumber, handleChange, handleSubmit}) {
  return (
    <form className='flex-parent' onSubmit={handleSubmit}>
      <input 
        type='number' 
        id='inputNumber' 
        name='number' 
        value={inputNumber} 
        onChange={handleChange}
        className='flex-grow'/>
      <button type='submit' className='add-button flex-shrink'>Add</button>
    </form>
  )
}

function Adder() {
  const [numbers, setNumbers] = useState([]);
  const [inputNumber, setInputNumber] = useState('');
  const [sum, setSum] = useState('0');

  function handleSubmit(e) {
    e.preventDefault();

    const newNumber = Number(e.target.number.value);
    setNumbers([
      ...numbers,
      newNumber
    ]);

    setInputNumber('');
  }

  function handleChange(e) {
    setInputNumber(e.target.value);
  }

  function deleteItem(index) {
    const newNumbers = numbers.slice();
    newNumbers.splice(index, 1);
    setNumbers([...newNumbers]);
  }

  useEffect(() => {
    setSum(numbers.reduce((sum, currentValue) => sum + currentValue, 0));
  }, [numbers]);

  return (
    <div className='adder'>
      <AddNumber
        inputNumber={inputNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div>
        {numbers.map((number, index) => {
          return <ListItem
            key={index}
            number={number}
            index={index}
            deleteItem={deleteItem}
          />
        })}
      </div>
      <div className='sum'>
        Sum: {sum}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Adder/>
    </div>
  );
}

export default App;
