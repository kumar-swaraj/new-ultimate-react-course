const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="friendNameInput">👫 Friend name</label>
      <input id="friendNameInput" type="text" />

      <label htmlFor="imageUrlInput">🌄 Image URL</label>
      <input id="imageUrlInput" type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with XYZ</h2>

      <label htmlFor="billValueInput">💰 Bill value</label>
      <input id="billValueInput" type="number" />

      <label htmlFor="myExpenseInput">🧍‍♀️ Your expense</label>
      <input id="myExpenseInput" type="number" />

      <label htmlFor="friendsExpenseInput">👫 XYZ's expense</label>
      <input id="friendsExpenseInput" disabled />

      <label htmlFor="payerSelect">🤑 Who is paying the bill</label>
      <select id="payerSelect">
        <option value="user">You</option>
        <option value="friend">XYZ</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
