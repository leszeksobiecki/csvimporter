import {useForm } from 'react-hook-form';
import { useState } from 'react';
import './App.css';

type FormValues = {
  file: FileList;
}

function App() {

  const [status, setStatus] = useState<string>();
  const [employees, setEmployees] = useState([]);
  const { 
    register, 
    handleSubmit,
    setError,
    formState: { errors },
    reset
  } = useForm<FormValues>({ mode: 'all' });

  const getEmployeeList = async () => {
    await fetch("/list")
    .then((response) => response.json())
    .then(json => {
      setEmployees(json);
      setStatus('Employee list fetched successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  const onSubmit = async (data: { file: FileList; }) => {
    
    const formData = new FormData();
    const file = data.file[0];
    formData.append("file", file);

    if (file.type !== "text/csv"){
      setError("file", {
        type: "filetype",
        message: "Only CSV is valid."
      });
      return;
    }
    reset();

    await fetch("/upload", {
        method: "POST",
        body: formData,
    })
    .then((response) => {
        if (response.ok){
          setStatus('File uploaded successfully!');
          getEmployeeList();
        }           
        else 
          throw new Error('Network response was not OK');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};


  return (
		<div className="App">
			<div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" {...register('file', {required: true})} />
          <input type="submit" value="Upload"/>
        </form>
			</div>
      {errors.file &&
        <div style={{ color: "red" }}> {errors.file?.message}</div>
      }
      
      <div style={{ color: "green" }}>{status}</div>
			<div>
        {employees.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => <tr key={employee['id']}><td>{employee['name']}</td><td>{employee['email']}</td><td>{employee['phoneNumber']}</td></tr>)}
            </tbody>
          </table>
        }
			</div>
		</div>
  );
}

export default App;
