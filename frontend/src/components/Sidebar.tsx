import Link from 'next/link';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { Image } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import img from "../assets/kota.jpg";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Example: Clearing user authentication token
    localStorage.removeItem('token'); // Assuming 'token' is your stored JWT or authentication token
    
    // Redirect to login page
    router.push('/login'); // Ensure the route matches your login page's path
  };

  return (
    <div className="flex flex-col h-screen w-64 p-4" style={{ backgroundColor: 'rgb(250, 200, 0)' }}>
      <div className="flex items-center justify-center mt-10">
        <Image
          alt="Kota Shop Logo" 
          className="w-20 h-20 rounded-full cursor-pointer"
          src={img.src}
          width={270}
        />
      </div>
      <List className="mt-10">
        <Link href="/" passHref>
          <ListItem button className="my-2 hover:bg-[#F4538A] rounded">
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <Link href="/table" passHref>
          <ListItem button className="my-2 hover:bg-[#F4538A] rounded">
            <ListItemText primary="Table" />
          </ListItem>
        </Link>
      </List>
      <Divider className="my-4" />
      <div className="mt-auto mb-10 ml-4">
        <Button color="danger" className="w-full backdrop-filter backdrop-blur-md px-4 py-2 rounded-lg" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
