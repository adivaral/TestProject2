import React, { useState, useRef, useEffect } from 'react';
import './index.css';

function App() {
   const [data, setData] = useState([]);
   const [currValue, setCurrValue] = useState('');
   const inputRef = useRef();

   function submit(){
      if (currValue !== '') {
         setData([...data, currValue]);
         setCurrValue('');
      }
   }

   function enterPressed(event) {
      var code = event.keyCode || event.which;
      if (currValue !== '' && code === 13) {
         setData([...data, currValue]);
         setCurrValue('');
      }
   }

   function handleEdit(index, itemD) {
      setCurrValue(data[index]);
      inputRef.current.focus();
      setData(data.filter((item) => item !== itemD));
   }

   function handleDelete(itemD) {
      setData(data.filter((item) => item !== itemD));
   }

   useEffect(() => {
      const dataItem = JSON.parse(localStorage.getItem('dataItem'));
      if (dataItem !== null) {
         setData(dataItem);
      }
   }, []);

   useEffect(() => {
      if (data.length >= 0) {
         localStorage.setItem('dataItem', JSON.stringify(data));
      }
   }, [data]);

   return (
      <>
         <div className='wrapper'>
            <header>Todo App</header>
            <div className='inputField'>
               <input
                  type='text'
                  name='inputData'
                  value={currValue}
                  ref={inputRef}
                  onChange={(e) => setCurrValue(e.target.value)}
                  onKeyPress={(e) => enterPressed(e)}
               />
            </div>
            <ul className='todoList'>
               {data &&
                  data.map((item, key) => {
                     return (
                        <li>
                           {item}
                           <span className='icon'>
                              <button
                                 onClick={() => handleEdit(key, item)}
                                 className='btn'
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => handleDelete(item)}
                                 className='btn'
                              >
                                 Delete
                              </button>
                           </span>
                        </li>
                     );
                  })}
            </ul>
            <div className='footer'>
               <span>
                  You have <span className='pendingTasks'>{data.length}</span>{' '}
                  pending tasks
               </span>
               <button onClick={()=>submit()} className='active'>Add!</button>

               <button onClick={() => setData([])} className='active'>Clear!</button>
            </div>
         </div>
      </>
   );
}

export default App;
