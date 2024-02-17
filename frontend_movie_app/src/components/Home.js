import Feed from './Feed';
import banner from './utils/banner.jpg';

const Home = ({ posts }) => {
    return (
        <main className="Home">
            <div className='bannerdiv'>
                    <img src={banner} alt="Banner" className='banner'/>
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