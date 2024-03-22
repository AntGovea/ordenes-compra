import { Container, Nav, Navbar } from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <>
      {" "}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Inicio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/save">Alta</Nav.Link>
            <Nav.Link href="/show">Listado</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
