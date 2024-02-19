import Feed from './Feed';
import banner3 from './utils/banner3.jpg';
import banner3m from './utils/banner3m.jpg';

const Home = ({ posts }) => {
    return (
        <main className="Home">
            <div className='bannerdiv'>
                    <img src={banner3} alt="Banner" className='banner'/>
                   
                    <div className='bannertext'>Your Social Media <br />for Movies</div>
                </div>
                {posts.length ? (
                    <Feed posts={posts} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No posts to display.
                    </p>
                )}
        </main>
    )
}

export default Home