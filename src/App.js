import { useState } from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems(items => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item=>item.id !== id));
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeleteItems={handleDeleteItem} onToggleItem={handleToggleItem} />
            <Stats />
        </div>
    )
}

function Logo() {
    return <h1>🏝️ Far away 🧳</h1>
}

function Form({onAddItems}) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {description, amount, packed: false, id: Date.now()}
        console.log(newItem);

        onAddItems(newItem);

        setDescription('');
        setAmount(1);
    }


    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select value={amount} onChange={e=>setAmount(Number(e.target.value))}>
                {Array.from({length: 20}, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
            </select>
            <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
            <button>Add</button>
        </form>
    )
}

function PackingList({items, onDeleteItems, onToggleItem}) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => <Item item={item} onDeleteItems={onDeleteItems} onToggleItem={onToggleItem} key={item.id} />)}
            </ul>
        </div>
    )
}

function Stats() {
    return (
        <footer className="stats">
            <em>🧳 You have X items on your list and you already packed X (X%)</em>
        </footer>
    )
}

function Item({item, onDeleteItems, onToggleItem}) {
    return (
        <li>
            <input onClick={() => onToggleItem(item.id)} type="checkbox" value={item.packed}/>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.amount} {item.description}</span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    )
}