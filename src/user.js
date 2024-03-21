import { faCheck, faInfo, faPen, faPlus, faSearch, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row, Table } from "react-bootstrap";

const Users = () => {
    //State users chứa danh sách tài khoản
    const [user, setUser] = useState([]);
  //Lay du lieu
  const [newUser, setNewUser] = useState({});
    useEffect(() => {
        axios.get("https://dummyjson.com/users").then(res => setUser(res.data.users))
    }, []);
    const [Showuserinfo, setShowuserinfo] = useState(false);
    const HandlecloseInfo = () => setShowuserinfo(false);
    const HandleShowInfo = () => setShowuserinfo(true);
  const [selectedUser, setSelectedUser] = useState({});
  // State showDeleteMOdal cho phép ẩn/hiện modal xác nhận xoá 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
   const HandlecloseDeleteModal = () => setShowDeleteModal(false);
  const HandleShowDeleteModal = () => setShowDeleteModal(true);
  // State showAddMOdal cho phép ẩn/hiện modal xác nhận them
  const [showAddModal, setShowAddModal] = useState(false);
   const HandlecloseAddModal = () => setShowAddModal(false);
  const HandleShowAddModal = () => setShowAddModal(true);
  // State mode cho biết chế độ: true là thêm, false là sửa
  const [mode, setMode] = useState(true);
  // Xử lí sự kiện onchange của input
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  }
  // Thêm/ Sửa tài khoản vào danh sách 
  const handleAdd = () => {
    if(mode){
      axios.post('https://dummyjson.com/users/add', newUser)
        .then(res => {
          setUser([...user, newUser]);
          HandlecloseAddModal();
        });
    } else {
      axios.put(`https://dummyjson.com/users/${newUser.id}`, newUser)
        .then(res => {
          let data = user;
          let index = data.findIndex(item => item.id === newUser.id)
          data[index] = newUser;
          setUser(data);
          HandlecloseAddModal();
        });

    }
  }
  //Xoá tài khoản đang chọn 
  const handleDelete = () => {
    axios.delete(`https://dummyjson.com/users/${selectedUser.id}`)
      .then(res => {
        setUser(user.filter(item => item.id !== selectedUser.id));
        HandlecloseDeleteModal();
    })
  }
  //State : Keyword lưu từ khoá tìm kiếm
  // const [searchInfo, setSearchInfo] = useState("");

  const [keyword, setKeyword] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    let result = user.filter(item => (item.firstName + " " + item.lastName).includes(keyword));
    setUser(result)
  }


    return (
      <>
        <Form >
             <Form.Control type="text " placeholder="Nhập vào thông tin tìm kiếm ... " onChange={(e) => setKeyword(e.target.value)}/>
        <Button style={{margin : "15px 15px 15px 0"}} onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
        </Button>
        </Form>
        <Button variant="success" style={{ marginBottom: '10px' }} onClick={() => { setMode(true); setNewUser({}); HandleShowAddModal()}}>
          <FontAwesomeIcon icon={faPlus} /> Thêm user
        </Button>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Phone</th>
              <th>Function</th>
              <th> Xoá tài khoản </th>
              <th>Sửa tài khoản</th>
                </tr>
            </thead>
            <tbody>
               {     user.map(item => (
                        <tr>
                        <td>{item.id}</td>
                       <td>{item.firstName} {item.lastName}</td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                       <td>{item.phone}</td>
                       <td><Button variant='info' onClick={() => { setSelectedUser(item); HandleShowInfo() }}><FontAwesomeIcon icon={faInfo}/></Button></td>
                   <td><Button variant='danger' onClick={() => { setSelectedUser(item); HandleShowDeleteModal() }}><FontAwesomeIcon icon={faTrash} /></Button>
                   </td>
                   <td>  <Button variant="warning" onClick={() => { setMode(false); setSelectedUser(item); setNewUser(item); HandleShowAddModal()}}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                    
                 </tr>
                    
          
               ))
                    }
                </tbody>
        </Table>
                    {/* (Modal hiển thị chi tiết tài khoản) */}
             <Modal show={Showuserinfo} size="lg " centered onHide={HandlecloseDeleteModal}>
        <Modal.Header closeButton onHide={HandlecloseInfo}>
                    <Modal.Title>{selectedUser.firstName} {selectedUser.lastName}</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <Image src={selectedUser.image} style={{width : "100%"}} />
                        </Col>
                          <Col md={4}>
                            <dl>
                                <dt>Maiden name:</dt>
                                <dd>{selectedUser.maidenName}</dd>
                                <dt>Age:</dt>
                                <dd>{selectedUser.age}</dd>
                                <dt>gender:</dt>
                                <dd>{selectedUser.gender}</dd>
                                <dt>Email:</dt>
                                <dd>{selectedUser.email}</dd>
                          </dl>
                        </Col>
                        <col md={4}></col>
                    </Row>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandlecloseInfo}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        {/*  Modal Xác nhận tài khoản  */}
        <Modal show={showDeleteModal} onHide={HandlecloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
          <Modal.Body>Are you sure you want delete user:{selectedUser.firstName} {selectedUser.lastName}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDelete}>
           <FontAwesomeIcon icon={faCheck}/>Confirm
          </Button>
          <Button variant="secondary" onClick={HandlecloseDeleteModal}>
          <FontAwesomeIcon icon={faTimes}/>Cancel
          </Button>
        </Modal.Footer>
        </Modal>
        {/* Modal hiển thị form liên hệ */}
         <Modal show={showAddModal} onHide={HandlecloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{mode ? 'Add new user': 'Edit user'}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
              
             <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First Name: </Form.Label>
                    <Form.Control type="text" name="firstName" value={newUser.firstName} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control type="text" name="lastName" value={newUser.lastName} onChange={handleChange} />
                  </Form.Group> 
             </Col>
               <Col md={4}>
                  <Form.Group className="mb-3"  controlId="exampleForm.ControlInput3">
                    <Form.Label>Maiden Name: </Form.Label>
                    <Form.Control type="text" name="maidenName" value={newUser.maidenName} onChange={handleChange} />
                  </Form.Group>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>age: </Form.Label>
                    <Form.Control type="number" name="age"value={newUser.age} onChange={handleChange} />
                  </Form.Group>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" name="email" value={newUser.email} onChange={handleChange}/>
                  </Form.Group>
               </Col></Row>
              </Form>
            
          </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAdd}>
           <FontAwesomeIcon icon={faCheck}/>Save
          </Button>
          <Button variant="secondary" onClick={HandlecloseAddModal}>
          <FontAwesomeIcon icon={faTimes}/>Cancel
          </Button>
        </Modal.Footer>
        </Modal>
        </>
    )
}
export default Users;