import "./PlaceList.css";
import Card from "../../shared/Components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/Components/FormElements/Button";
export default function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. May be create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((item) => {
        return (
          <PlaceItem
            key={item._id}
            id={item._id}
            image={item.imageUrl}
            title={item.title}
            description={item.description}
            address={item.address}
            creatorId={item.creator}
            coordinates={item.location}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
}
