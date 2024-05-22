export default function Item({ item, onDeleteItems, onToggleItem }) {
    return (
        <li>
            <input onClick={() => onToggleItem(item.id)} type="checkbox" value={item.packed} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.amount} {item.description}</span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    );
}
