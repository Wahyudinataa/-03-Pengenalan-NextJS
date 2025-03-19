export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return {
    props: { users }, // Kirim users sebagai props
  };
}

const User = ({ users }) => {
  console.log("Data yang diterima di props:", users); 

  return (
    <div>
      <h1>Daftar User</h1>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.name}</li> // user.id sebagai key
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </ul>
    </div>
  );
};

export default User;
