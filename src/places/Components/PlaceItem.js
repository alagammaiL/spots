import Card from "../../shared/Components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/Components/FormElements/Button";
import { useState } from "react";
import Modal from "../../shared/Components/UIElements/Modal";
import Map from "../../shared/Components/UIElements/Map";
import { useContext } from "react";
import { Authcontext } from "../../shared/Components/Context/Auth-Context";
import { useHttpHook } from "../../shared/Components/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
export default function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const { loading, error, fetchApiCall, handlecancelOnError } = useHttpHook();
  const [showConfirmModal, setConfirmModal] = useState(false);
  const { isLogin, userId, token } = useContext(Authcontext);
  const navigate = useNavigate();
  const placeId = props.id;
  function handleOpenMap() {
    setShowMap(true);
  }
  function handleCloseMap() {
    setShowMap(false);
  }
  async function handleDelete(e) {
    setConfirmModal(false);
    try {
      await fetchApiCall(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "DELETE",
        { Authorization: `Bearer ${token}` }
      );
      console.log("Delete success, calling onDelete");
      console.log("props.onDelete:", props.onDelete);
      props.onDelete(placeId);
    } catch (err) {
      console.log("delete failed", err);
    }
  }
  return (
    <>
      {showMap && (
        <Modal
          show={showMap}
          onCancel={handleCloseMap}
          header={props.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={handleCloseMap}>Close</Button>}
        >
          <div className="map-container">
            <Map center={props.coordinates} zoom={16} />
          </div>
        </Modal>
      )}
      {showConfirmModal && (
        <Modal
          show={showConfirmModal}
          onCancel={() => {
            setConfirmModal(false);
          }}
          header="Are you sure?"
          footerClass="place-item__modal-actions"
          footer={
            <>
              <Button
                inverse
                onClick={() => {
                  setConfirmModal(false);
                }}
              >
                Cancel
              </Button>
              <Button danger onClick={(e) => handleDelete(e)}>
                Delete
              </Button>
            </>
          }
        >
          <p>
            Do you want to delete the place? Please note that it can't be
            undeone thereafter
          </p>
        </Modal>
      )}
      <li className="place-item">
        <Card className="place-item__content">
          {loading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleOpenMap}>
              VIEW ON MAP
            </Button>
            {console.log("hello", userId, props.creatorId._id)}
            {userId === props.creatorId._id && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button
                  danger
                  onClick={() => {
                    setConfirmModal(true);
                  }}
                >
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
