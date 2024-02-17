import Feed from './Feed';
import banner from './utils/banner.jpg';
import banner2 from './utils/banner2.jpg';

const Home = ({ posts }) => {
    return (
        <main className="Home">
            <div className='bannerdiv'>
                    <img src={banner} alt="Banner" className='banner'/>
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