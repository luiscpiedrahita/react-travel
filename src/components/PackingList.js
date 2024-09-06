import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState(1);

  let sortedItems;
  console.log(typeof sortBy);
  if (sortBy === 1) sortedItems = items.slice();
  else if (sortBy === 2)
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === 3)
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      {sortedItems && sortedItems.length > 0 && (
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
              key={item.id}
            />
          ))}
        </ul>
      )}

      <div className="actions">
        <select
          name="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(Number(e.target.value))}
        >
          <option value={1}>Sort by input order</option>
          <option value={2}>Sort by description</option>
          <option value={3}>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
