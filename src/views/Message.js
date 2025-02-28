import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Message(props) {
    const handleMesazhiMbyll = () => {
        localStorage.setItem("shfaqMesazhinPasRef", false)
        props.setShfaqMesazhin(false)
    }
    return (
        <Modal show='true'>
            <Modal.Header >
                <Modal.Title style={props.tipi === "success" ? { color: "#009879" } : { color: "red" }}>{props.tipi === "success" ? "Success !" : "There seems to be a mistake !"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: props.pershkrimi }} />

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleMesazhiMbyll} variant={'outline-' + props.tipi}>
                    Close
                </Button >
            </Modal.Footer>

        </Modal>
    )
}

export default Message;