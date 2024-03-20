// import { useState } from 'react';
// import './studentlist.css';
// const StudentList = () => {
//     const [dssv, setDssv] = useState(
//       [
//         { hoTen: 'Nguyen Van A ', Tuoi: 18 },
//         { hoTen: 'Nguyen Van B ', Tuoi: 20 },
//         { hoTen: 'Nguyen Van C ', Tuoi: 20 },
//         { hoTen: 'Nguyen Van D ', Tuoi: 20 },
        
//     ]
//     );
//     const [sv, setSv] = useState({});
//     const handleChange = (e) => {
//         let name = e.target.name;
//         let value = e.target.value;
//         setSv(sv=> ({...sv, [name] : value}))
//     }
//     const handleClick = (e) => {
//         e.preventDefault();
//     setDssv([...dssv,sv ]);
//   }
//     return (
//         <>
//             <form>
//                 Ho ten : <input type='text' name='hoTen' onChange={handleChange}></input>
//                 <br />
//                 Tuoi : <input type='text' name='Tuoi' onChange={handleChange}></input>
//                 <br />
//                  <button onClick={e=> handleClick(e)}>ADD</button>
//         </form>
       
//         <table className="table">
//             <thead>
//                 <tr>
//                     <th>Ho ten</th>
//                     <th>Tuoi</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     dssv.map(item => (
//                         <tr>
//                             <td>{item.hoTen}</td>
//                             <td>{item.Tuoi}</td>
//                         </tr>
                       
//                     ))
//                 }
//             </tbody>
//       </table>

//         </>)
// }
// export default StudentList;

