import { useState } from "react";
import Logo from "./Logo"
import "./index.css";



const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item])
  }

  const handleDeleteItem = (id) => {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <>
    <Logo/>
    <Form  onAddItems={handleAddItems}/>
    <PackingList items={items} onDeleteItem={handleDeleteItem}/>
    <Stats/>
    </>
  )
};
export default App;



const Form = ({onAddItems}) => {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1);

  const newItem = {description, quantity, packed:false, id: Date.now()};

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!description) return;
    // console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

return(
<form className="add-form" onSubmit={handleSubmit}>
<h3>What do you need for your trip? </h3>
<select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>

  {Array.from({length: 20}, (_, i)  => i + 1).map((num) => 
  <option 
  value={num}
  key={num} 
  >
    {num}
  </option>
   )} 
</select>
<input type="text" 
placeholder="item..."
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<button className="btn">ADD</button>
</form>
)
};


const PackingList = ({ items, onDeleteItem}) => {
  return(
   <div className="list">
    <ul>
      {
        items.map((item) => <Item item={item} key={item.id} onDeleteItem={onDeleteItem}/>)
      }
    </ul>
    </div>
    
  )
};

const Item = ({item, onDeleteItem}) => {
  return(

    <li key={item.id}>
      <input type="checkbox"/>
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {''}
        {item.description}
      </span>
      <button style={{color: "black", fontSize: "30px"}} onClick={() => onDeleteItem(item.id)}>&times;</button>
      
    </li>
  )
}

const Stats = () => {
  return(
    <footer className="stats">
     <em>
      You have X items on your list, and you already packed X (X%)
      </em> 
    </footer>
  )
};