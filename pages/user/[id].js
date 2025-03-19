import React from "react";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}

const UserDetail = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p className="font-semibold text-lg">{user.name}</p>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Phone: {user.phone}</p>
        <p className="text-gray-600">Website: {user.website}</p>
        <p className="text-gray-600">Company: {user.company.name}</p>
      </div>
    </div>
  );
};

export default UserDetail;
