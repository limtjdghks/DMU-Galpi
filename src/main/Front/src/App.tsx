import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './assets/styles/App.css';
import { api } from './AxiosInstance';

function App() {
  const [message, setMessage] = useState<any[]>([])
  useEffect(() => {
    api.get('/api/hello').then(
      (res) => {setMessage(res.data)}
    )
  },[])
  return (
    <div className="App">
      <Button >{message}</Button>
    </div>
  );
}

export default App;