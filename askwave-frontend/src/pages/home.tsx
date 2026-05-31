import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Logo from '../images/AskWaveLogo.png';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import PostForm from '../forum/createPostForm';
import Posts from '../forum/posts';
import YourPosts from '../forum/yourPosts';
import SearchResult from '../forum/searchResult';
import { searchPosts } from '../forum/forumApi';
import { Post } from '../forum/forumTypes';
import './home.css';

const Home = () => {
    const location = useLocation();
    const { username } = location.state || {};

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [seed, setSeed] = useState(1);

    const openForm = () => {
        setIsFormVisible(true);
    };

    const closeForm = () => {
        setSeed(Math.random());
        setIsFormVisible(false);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    const [allPosts, setShowAllPosts] = useState(true);
    const [yourPosts, setShowYourPosts] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searched, setSearched] = useState(false);

    const showAllPosts = (category: string) => {
      setSeed(Math.random());
      setShowAllPosts(true);
      setShowYourPosts(false);  
      setSearched(false);
      setSelectedCategory(category);
    };

    const showYourPosts = () => {
      setSeed(Math.random());
      setShowYourPosts(true);
      setShowAllPosts(false);
      setSearched(false);
    };

    const showSearchedPosts = () => {
      setShowYourPosts(false);
      setShowAllPosts(false);
      setSearched(true);
    };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Post[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === '') {
        alert('Please enter a search query before searching.');
        return;
    }
    try {
        const data = await searchPosts(searchQuery);
        setSearchResult(data);
        showSearchedPosts();
        setSearchQuery('');
        } catch (error) {
        console.error('Error during publish:', error);
        }
    };

    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
      isLoggedIn ? (
        <div className='Home'>
            <div className="WelcomeBanner">
                <p>Welcome, {username}</p>
            </div>
            <div className="LogoContainer">
                <img src={Logo} alt="AskWave logo" className="Logo" style={{ width: '200px', height: '200px' }} />
            </div>
            <input type="text" placeholder="Search..." className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <Button variant="contained" className='button' onClick={() => handleSearch(searchQuery)}><SearchIcon/></Button>
            

            <div className='Main'>
            <div className='LeftBar'>
                <Button variant="contained" className='button' style={{ marginBottom: '10px' }} onClick={openForm}> New Post </Button>
                <Button variant="contained" className='button' style={{ marginBottom: '10px' }} onClick={() => showAllPosts('all')}> All discussions </Button>
                <Button variant="contained" className='button' style={{ marginBottom: '10px' }} onClick={showYourPosts}> Your Posts </Button>

                <h3>Categories</h3>
                <ul className='categories' style={{ color: '#004AAD', padding: '0' }}>
                <li><Button className='cat' onClick={() => showAllPosts('General')}>General</Button> </li>
                <li><Button className='cat' onClick={() => showAllPosts('Resources')}>Resources</Button> </li>
                <li><Button className='cat' onClick={() => showAllPosts('Academic')}>Academic</Button> </li>
                <li><Button className='cat' onClick={() => showAllPosts('CCAs')}>CCAs</Button> </li>
                <li><Button className='cat' onClick={() => showAllPosts('Events')}>Events</Button> </li>
                <li><Button className='cat' onClick={() => showAllPosts('Well-being')}>Well-being</Button> </li>
                </ul>

                <Button variant="contained" className='button' style={{ marginTop: '10px' }} onClick={handleLogout}> Log Out </Button>
            </div>

            <div className="posts-container">

            {(() => {
              if (allPosts) {
                return(<div>
                  <h3>All Discussions</h3>
                  <Posts key={seed} selected_category={selectedCategory}/>
                </div>); 
              } else if (yourPosts) {
                return(<div>
                  <h3>Your Posts</h3>
                  <YourPosts key={seed}/>
                </div>); 
              } else if(searched) {
                return(<div>
                   {searchResult.length > 0 && (
                    <div>
                      <h3>Search Results</h3>
                      <SearchResult searchResults={searchResult} />
                    </div>
                  )}

                  {searchResult.length === 0 && <p>No results found</p>}
                </div>);
              }
            })()}

            
            </div>


            </div>

            <Modal
                className='createPostForm'
                open={isFormVisible}
                onClose={closeForm}
            >
                <div className="modal-content">
                    <PostForm onClose={closeForm}/>
                </div>
            </Modal>
      </div>
          ) : <h3 className='expiredSessionTitle'>Your session expired, please log in again.</h3>
    );
  };
  export default Home;
