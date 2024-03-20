import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

const Products = () => {
  const [dssp, setDssp] = useState([

  ]);
  const [sp, setSp] = useState({});

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setDssp(res.data.products));
  }, []);
  const [IdtoDelete, setIdtoDelete] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIdtoDelete(id);
  }
  const HandleChange = (e) => {
    let name = e.target.name;    
    let value = e.target.value;
    setSp({ ...sp, [name]: value });
  }
  const handleAdd = (e) => {
    e.preventDefault();
    setDssp([...dssp, sp]);
  }
  


    const HandleDelete = (id) => {
      setDssp(dssp.filter(item =>item.id !== IdtoDelete))
      handleClose();
            
    }
  
  
  return (<>
    
      <Container>
        <Row>
             <Col md={3}>
                <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Mã số :</Form.Label>
                <Form.Control type="text" name="id" onChange={HandleChange} />
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> 
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" name="title" onChange={HandleChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Giá tiến</Form.Label>
                <Form.Control type="text" name="price" onChange={HandleChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tồn kho</Form.Label>
                <Form.Control type="text" name="stock" onChange={HandleChange} />
              </Form.Group >
              <Button variant="success" onClick={handleAdd} type="submit">
                Thêm
              </Button>
            </Form>
             </Col>
              <Col md={9}>
              <h1> Danh sach san pham</h1>
                 <Table striped bordered hover>
              <thead>
              <tr>
                 
                  <th>Mã số sp</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng tồn kho</th>
                  <th>Chức năng</th>
                  <th>Hình ảnh</th>
                </tr>
              </thead>
                    <tbody>{
                        dssp.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                            <td><Button variant="danger" onClick={() => handleShow(item.id)}><FontAwesomeIcon icon={faTrash} /></Button>{' '}</td>
                            <td><img src={item.thumbnail} style={{width : '100px'}}/> </td>
                            </tr>
                            
                        )) 
                    }
              </tbody>
            </Table>
              </Col>
        </Row>
    </Container>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cảnh báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xoá</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={HandleDelete}>
            <FontAwesomeIcon icon={faTrash}/>
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon={faClose}/>
          </Button>
        </Modal.Footer>
      </Modal>
    </>);
}
 
export default Products;