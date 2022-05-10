import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";
import Link from "next/link";
const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <List
        itemLayout="horizontal "
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between ">
                 <Link href={`/user/${user.username}`}>
                   <a>
                  {user.username}

                   </a>
                 </Link>
                  {state &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-primary pointr px-3"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-primary pointr px-3"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
    </>
  );
};
export default People;
