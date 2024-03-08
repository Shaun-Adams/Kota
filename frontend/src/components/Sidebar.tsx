import Link from 'next/link';
import {List, ListItem, ListItemText, Divider } from '@mui/material';
import kotaImage from '../assets/kota.jpg'; // Ensure this import is correct
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/react';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout operations here...
    router.push('/Login');
  };

  return (
    <div className="flex flex-col h-screen w-64 p-4" style={{ backgroundColor: 'rgb(250, 200, 0)' }}>
      <div className="flex items-center justify-center mt-10">
          {/* <img src={kotaImage.src} alt="Kota Shop Logo" className="w-20 h-20 rounded-full cursor-pointer" /> */}
      </div>
      <List className="mt-10">
        {/* Correctly wrap ListItem with Link */}
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
