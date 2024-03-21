import { faCheck, faInfo, faPen, faPlus, faSearch, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";

const Post = () => {
    useEffect(() => {
        axios.get("https://dummyjson.com/posts").then(res => setPosts(res.data.posts))
    }, []);
    const [Posts, setPosts] = useState([]);
    const [newPosts, setNewPosts] = useState({});
    // Ẩn/ hiện chi tiết bài viết
    const [showPostInfo, setShowPostInfo] = useState(false);
    const HandleShowInfo = () => setShowPostInfo(true);
    const HandleCloseInfo = () => setShowPostInfo(false);
  const [selectedPost, setSelectedPost] = useState({});
  // State showDeleteMOdal cho phép ẩn/hiện modal xác nhận xoá 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
   const HandlecloseDeleteModal = () => setShowDeleteModal(false);
    const HandleShowDeleteModal = () => setShowDeleteModal(true);
      // State showAddMOdal cho phép ẩn/hiện modal xác nhận them
  const [showAddModal, setShowAddModal] = useState(false);
   const HandlecloseAddModal = () => setShowAddModal(false);
  const HandleShowAddModal = () => setShowAddModal(true);
     //Xoá tài khoản đang chọn 
  const handleDelete = () => {
    axios.delete(`https://dummyjson.com/users/${selectedPost.id}`)
      .then(res => {
        setPosts(Posts.filter(item => item.id !== selectedPost.id));
        HandlecloseDeleteModal();
    })
  }
     // State mode cho biết chế độ: true là thêm, false là sửa
  const [mode, setMode] = useState(true);
      // Xử lí sự kiện onchange của input
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewPosts({ ...newPosts, [name]: value });
  }
      // Thêm/ Sửa tài khoản vào danh sách 
    const handleAdd = () => {
      console.log(newPosts);
    if(mode){
      axios.post('https://dummyjson.com/posts/add', newPosts)
        .then(res => {
          setPosts([...Posts, newPosts]);
          HandlecloseAddModal();
        });
    } else {
      axios.put(`https://dummyjson.com/posts/${newPosts.id}`, newPosts)
        .then(res => {
          let data = Posts;
          let index = data.findIndex(item => item.id === newPosts.id)
          data[index] = newPosts;
          setPosts(data);
          HandlecloseAddModal();
        });

    }
    }
    // State: Từ khoá tìm kiếm 
  const [keyword, setKeyword] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
    let result = Posts.filter(item => item.title.includes(keyword));
    setPosts(result)
  }
  return (<>
    <Form>
      <Form.Control type="text " placeholder="Nhập vào thông tin tìm kiếm ... " onChange={(e) => setKeyword(e.target.value)}/>
        <Button style={{margin : "15px 15px 15px 0"}} onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} /> Tìm kiếm
        </Button> 
    </Form>
            <Button variant="success" style={{ marginBottom: '10px' }} onClick={() => { setMode(true); setNewPosts({}); HandleShowAddModal()}}>
          <FontAwesomeIcon icon={faPlus} /> Add Posts
        </Button>
             <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>UserId</th>
                    <th>Reactions</th>
              <th>Chi tiết bài viết</th>
              <th> Xoá Bài viết </th>
              <th>Sửa Bài viết</th>
                </tr>
            </thead>
            <tbody>
               {     Posts.map(item => (
                        <tr>
                        <td>{item.id}</td>
                       <td>{item.title}</td>
                        <td>{item.body}</td>
                        <td>{item.userId}</td>
                       <td>{item.reactions}</td>
                       <td><Button variant='info' onClick={() => { setSelectedPost(item); HandleShowInfo() }} ><FontAwesomeIcon icon={faInfo}/></Button></td>
                   <td><Button variant='danger' onClick={() => { setSelectedPost(item); HandleShowDeleteModal() }} ><FontAwesomeIcon icon={faTrash} /></Button>
                   </td>
                   <td>  <Button variant="warning" onClick={() => { setMode(false); setSelectedPost(item); setNewPosts(item); HandleShowAddModal()}}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button></td>
                    
                 </tr>
                    
          
               ))
                    }
                </tbody>
        </Table>
            <Modal show={showPostInfo} size="lg " centered onHide={HandlecloseDeleteModal}>
        <Modal.Header closeButton onHide={HandleCloseInfo}>
                    <Modal.Title>{selectedPost.firstName} {selectedPost.lastName}</Modal.Title>
        </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            {/* <Image src={selectedPost.Image} style={{width : "100%"}} /> */}
                        </Col>
                          <Col md={4}>
                            <dl>
                                <dt>Title</dt>
                                <dd>{selectedPost.title}</dd>
                                <dt>Body</dt>
                                <dd>{selectedPost.body}</dd>
                                <dt>UserId</dt>
                                <dd>{selectedPost.userId}</dd>
                                <dt>Reactions</dt>
                                <dd>{selectedPost.reactions}</dd>
                          </dl>
                        </Col>
                        <col md={4}></col>
                    </Row>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleCloseInfo}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
         {/*  Modal Xác nhận tài khoản  */}
        <Modal show={showDeleteModal} onHide={HandlecloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
          <Modal.Body>Are you sure you want delete user:{selectedPost.title}</Modal.Body>
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
          <Modal.Title>{mode ? 'Add new Post': 'Edit Post'}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
              
             <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title </Form.Label>
                    <Form.Control type="text" name="title" value={newPosts.title} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Body </Form.Label>
                    <Form.Control type="text" name="body" value={newPosts.body} onChange={handleChange} />
                  </Form.Group> 
             </Col>
               <Col md={4}>
                  <Form.Group className="mb-3"  controlId="exampleForm.ControlInput3">
                    <Form.Label>UserId	 </Form.Label>
                    <Form.Control type="text" name="userId" value={newPosts.userId} onChange={handleChange} />
                  </Form.Group>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Reactions	</Form.Label>
                    <Form.Control type="number" name="reactions"value={newPosts.reactions} onChange={handleChange} />
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
    </>);
}
 
export default Post;