import Feeds from "./module/feed"
import AddPost from "./module/feed/addPost"
import AddFriendsList from "./module/friends/addFriendsList"
import AboutUser from "./module/user/aboutUser"
import CoverPage from "./module/user/coverpage"
import UserProfile from "./module/user/userProfile"

const Home = () => {
  //here the all components are declared for the home page
  // use the concern component for the further modules
  return (
    <div className='container'>
      <div className='home-page'>
        <div className='row'>
          <div className='col-md-4 col-sm-6'>
            <UserProfile />
            <AboutUser />
          </div>
          <div className='col-md-8 col-sm-6'>
            <CoverPage />
            <div className='row'>
              <div className='col-md-7 col-sm-4'>
                <AddPost />
                <Feeds />
              </div>
              <div className='col-md-5 col-sm-4'>
                <AddFriendsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
