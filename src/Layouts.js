import { Container, Nav, Navbar } from "react-bootstrap";
import {  Link,  Outlet } from "react-router-dom";

const Layouts = () => {
    return (<>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <Navbar.Brand><Link to="https://www.facebook.com/NDA2005/" className="nav-link" target="_blank">Duy Anh</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Link to="/login" className="nav-link">Đăng nhập</Link>
            <Link to="/products"className="nav-link">Sản phẩm</Link>
            <Link to="/user"className="nav-link">Tài khoản</Link>
            <Link to="/posts"className="nav-link">Bài viết</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
        </Navbar>
        <Outlet />
    </>);
}
 
export default Layouts;