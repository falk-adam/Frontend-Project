/*UserProfilePage:
See and edit user information (current user)*/

import { useAuth } from "../../hooks/useAuth";
import { getCurrentUser } from "../../api/userService";
import { useEffect } from "react";


// Visa inloggad användare
// Visa: username, email, phone nr, profile picture, description
// Mina listings och mina bookings ska finnas

function UserProfilePage() {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  console.log("currentUser: " , currentUser)

    
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("fetched user: ", data);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user: ", error)
      }
    };
    fetchCurrentUser();
  }, [])

  return (
    <div className="bg-gray-400 w-full flex flex-col gap-2 justify-center items-center p-10">
      <h2 className="text-xl">UserProfile</h2>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Role:</strong> {currentUser.roles.join(", ")}
      </p>
      <p>
        <strong>Description:</strong> {userInfo.description}
      </p>
    </div>
  );
}

export default UserProfilePage;
